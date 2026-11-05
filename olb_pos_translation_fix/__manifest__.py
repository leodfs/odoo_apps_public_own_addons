{
    "name": "POS Translation Fix",
    "version": "19.0.1.0.0",
    "author": "Olbrix",
    "company": "Olbrix",
    "maintainer": "Olbrix",
    "support": "l30dfs@gmail.com",
    "summary": "Point of sale texts that Odoo 19 leaves in English, in the language of the cashier",
    "description": """
POS Translation Fix
===================

Some texts of the point of sale of Odoo 19 stay in English whatever the
language of the cashier: Odoo writes them inside code, where its translations
never reach, or leaves them out of its translation files. This module writes
them so that they are translated. It installs by itself with the point of
sale.

* **Orders**: the list of orders says *Loading...* and *No orders found*
  translated.

* **Lots and serial numbers**: the icon of a line with a lot or serial number
  says whether it is valid in the language of the cashier.

* **Receipt by email**: the example address of the email field is translated.

* **Notes of a line**: the title of the note window of a product is
  translated (Odoo leaves *: Add* in English).

* **Cash in and out**: the notification, the receipt, the note of the session
  and the label of the cash move say *Cash In* or *Cash Out* translated,
  instead of *in* or *out*.
""",
    "category": "Sales/Point of Sale",
    "depends": [
        # Odoo Community
        "point_of_sale",
    ],
    "images": [
        "static/description/banner.png",
        "static/description/icon.png",
    ],
    "assets": {
        "point_of_sale._assets_pos": [
            "olb_pos_translation_fix/static/src/**/*",
        ],
        "web.assets_tests": [
            "olb_pos_translation_fix/static/tests/tours/**/*",
        ],
    },
    "module_type": "official",
    "application": False,
    "installable": True,
    "auto_install": True,
    "license": "LGPL-3",
}
