from odoo.tests import TransactionCase, tagged
from odoo.tools.misc import file_open
from odoo.tools.translate import PoFileReader, TranslationModuleReader

# Every text the module writes as a translatable one.
TERMS = {
    "Loading...",
    "No orders found",
    "Valid product lot",
    "Invalid product lot",
    "e.g. john.doe@mail.com",
    "Cash In",
    "Cash Out",
    "Cash in/out of %s is ignored.",
    "%(type)s - Amount: %(amount)s",
    "Successfully made a %(type)s of %(amount)s.",
    "%(product)s: Add %(note)s",
    "Add a ",
}


@tagged("post_install", "-at_install")
class TestTranslations(TransactionCase):

    def test_the_exporter_finds_every_text(self):
        # A term the exporter does not find is dropped from the .po files
        # the next time they are generated.
        exported = {
            source
            for module, _type, _name, _res_id, source, _value, _comments
            in TranslationModuleReader(self.env.cr, modules=["olb_pos_translation_fix"])
            if module == "olb_pos_translation_fix"
        }
        self.assertEqual(exported, TERMS)

    def test_every_spanish_file_translates_every_text(self):
        for lang in ("es", "es_419", "es_PE"):
            with self.subTest(lang=lang), file_open(f"olb_pos_translation_fix/i18n/{lang}.po", "rb") as po:
                translated = {entry["src"] for entry in PoFileReader(po) if entry["value"]}
                self.assertFalse(TERMS - translated)
