from odoo.tests import tagged

from odoo.addons.point_of_sale.tests.test_frontend import TestPointOfSaleHttpCommon


@tagged("post_install", "-at_install")
class TestSpanishTexts(TestPointOfSaleHttpCommon):
    """The texts Odoo 19 leaves in English come out in the language of the cashier."""

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.env["res.lang"]._activate_lang("es_PE")
        cls.pos_admin.lang = "es_PE"
        cls.main_pos_config.cash_control = True
        cls.env["product.product"].create({
            "name": "Lot Product",
            "type": "consu",
            "is_storable": True,
            "tracking": "lot",
            "available_in_pos": True,
            "list_price": 10.0,
            "taxes_id": False,
        })

    def test_the_texts_are_in_spanish(self):
        self.main_pos_config.with_user(self.pos_admin).open_ui()
        self.start_pos_tour("olb_pos_translation_fix.SpanishTextsTour", login="pos_admin")
        session = self.main_pos_config.current_session_id
        cash_move = session.statement_line_ids
        self.assertEqual(cash_move.amount, -5.0)
        # The label of the statement line names the type, not "out".
        self.assertIn("Salida de efectivo", cash_move.payment_ref)
        self.assertNotIn("-out-", cash_move.payment_ref)
        # The note of the session too.
        notes = session.message_ids.mapped("body")
        self.assertTrue(any("Salida de efectivo - Importe" in (note or "") for note in notes), notes)
