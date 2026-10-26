from lxml import etree

from odoo.tests import TransactionCase, tagged

ARCH = """
<{root}>
    <field name="name"/>
    <field name="vat"/>
    <group name="extra_info"><field name="ref"/></group>
</{root}>
"""


@tagged("post_install", "-at_install")
class TestCountryFilter(TransactionCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.country_pe = cls.env.ref("base.pe")
        cls.country_cl = cls.env.ref("base.cl")
        cls.company_pe = cls.env["res.company"].create(
            {"name": "Company PE", "country_id": cls.country_pe.id}
        )
        cls.company_pe_2 = cls.env["res.company"].create(
            {"name": "Company PE 2", "country_id": cls.country_pe.id}
        )
        cls.company_cl = cls.env["res.company"].create(
            {"name": "Company CL", "country_id": cls.country_cl.id}
        )
        cls.tags = [("field", "vat"), ("group", "extra_info")]

    def _apply(self, company, view_type="form", tags=None, countries=None):
        root = "list" if view_type == "list" else view_type
        arch = etree.fromstring(ARCH.format(root=root))
        Partner = self.env["res.partner"].with_company(company)
        new_arch, view = Partner._tags_invisible_per_country(
            arch,
            self.env["ir.ui.view"],
            view_type,
            self.tags if tags is None else tags,
            [self.country_pe] if countries is None else countries,
        )
        self.assertIs(new_arch, arch)
        return new_arch

    def _node(self, arch, tag, name):
        return arch.xpath(f"//{tag}[@name='{name}']")[0]

    def test_allowed_country_keeps_view(self):
        arch = self._apply(self.company_pe)
        for tag, name in self.tags:
            self.assertIsNone(self._node(arch, tag, name).get("invisible"))

    def test_other_country_hides_form_and_kanban_nodes(self):
        for view_type in ("form", "kanban"):
            arch = self._apply(self.company_cl, view_type)
            for tag, name in self.tags:
                self.assertEqual(self._node(arch, tag, name).get("invisible"), "1")
            self.assertIsNone(self._node(arch, "field", "name").get("invisible"))

    def test_other_country_hides_list_columns(self):
        arch = self._apply(self.company_cl, "list")
        node = self._node(arch, "field", "vat")
        self.assertEqual(node.get("column_invisible"), "True")
        self.assertIsNone(node.get("invisible"))

    def test_invalid_arguments_keep_view(self):
        for tags, countries in (
            ([], [self.country_pe]),
            (self.tags, []),
            ("vat", [self.country_pe]),
            (self.tags, self.country_pe),
        ):
            arch = self._apply(self.company_cl, tags=tags, countries=countries)
            self.assertIsNone(self._node(arch, "field", "vat").get("invisible"))

    def test_view_cache_key_depends_on_company(self):
        # Generic model (res.partner adds its own keys after this one)
        Lang = self.env["res.lang"]
        key_pe = Lang.with_company(self.company_pe)._get_view_cache_key()
        key_pe_2 = Lang.with_company(self.company_pe_2)._get_view_cache_key()
        self.assertEqual(key_pe[-1], self.company_pe)
        self.assertNotEqual(key_pe, key_pe_2)

    def test_get_views_integration(self):
        """End-to-end: a model using the helper in _get_view hides the fields
        only for companies outside the allowed countries."""
        Partner = self.env["res.partner"]
        country_pe = self.country_pe
        original_get_view = type(Partner)._get_view

        def _get_view(model, view_id=None, view_type="form", **options):
            arch, view = original_get_view(model, view_id, view_type, **options)
            return model._tags_invisible_per_country(
                arch, view, view_type, [("field", "vat")], [country_pe]
            )

        self.patch(type(Partner), "_get_view", _get_view)
        self.env.registry.clear_cache("templates")

        def vat_node(company):
            views = Partner.with_company(company).get_views([(False, "form")])
            arch = etree.fromstring(views["views"]["form"]["arch"])
            return arch.xpath("//field[@name='vat']")[0]

        self.assertNotEqual(vat_node(self.company_pe).get("invisible"), "1")
        self.assertEqual(vat_node(self.company_cl).get("invisible"), "1")
        # The PE view is still served (cache is not polluted by the CL one)
        self.assertNotEqual(vat_node(self.company_pe).get("invisible"), "1")
