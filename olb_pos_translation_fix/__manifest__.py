{
    "name": "POS Translation Fix",
    "version": "18.0.1.1.0",
    "author": "Olbrix",
    "company": "Olbrix",
    "maintainer": "Olbrix",
    "support": "l30dfs@gmail.com",
    "summary": "Point of sale texts that Odoo 18 leaves in English, in the language of the cashier",
    "description": """
POS Translation Fix
===================

Some texts of the point of sale of Odoo 18 stay in English whatever the
language of the cashier: Odoo writes them inside code, where its translations
never reach. This module writes them so that they are translated, as Odoo 19
does. It installs by itself with the point of sale.

* **Actions**: the window of the Actions button has its title translated.

* **Number windows**: the windows that ask for a number (employee PIN,
  discount, tip, guests, price, quantity) show *Confirm* and *Discard* in the
  language of the cashier, instead of *Ok* and *Discard*.

* **Orders**: the list of orders says *Loading...*, *No orders found* and
  *Select an order* translated, without quotes.

* **Lots and serial numbers**: the icon of a line with a lot or serial number
  says whether it is valid in the language of the cashier.

* **Receipt by email**: the example address of the email field is translated.

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
