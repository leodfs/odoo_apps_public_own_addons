from odoo import Command
from odoo.tests import tagged

from odoo.addons.point_of_sale.tests.test_frontend import TestPointOfSaleHttpCommon


@tagged("post_install", "-at_install")
class TestItemsCount(TestPointOfSaleHttpCommon):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        product = cls.env["product.product"]

        def item(name, price):
            return Command.create({
                "product_id": product.create({"name": name, "list_price": price, "taxes_id": False}).id,
                "extra_price": 0,
            })

        combos = cls.env["product.combo"].create([
            {"name": "Base", "combo_item_ids": [item("Cone", 5), item("Cup", 5)]},
            {"name": "Topping", "combo_item_ids": [item("Sprinkles", 1), item("Syrup", 1)]},
        ])
        product.create({
            "name": "Sundae Combo", "type": "combo", "list_price": 6, "taxes_id": False,
            "available_in_pos": True, "combo_ids": [Command.set(combos.ids)],
        })
        product.create({"name": "Napkin", "list_price": 1, "taxes_id": False, "available_in_pos": True})

    def test_items_count_units_sold(self):
        self.main_pos_config.with_user(self.pos_user).open_ui()
        self.start_pos_tour("olb_pos_items_count.ItemsCountTour")
