{
    "name": "POS Items Count",
    "version": "19.0.1.0.0",
    "author": "Olbrix",
    "company": "Olbrix",
    "maintainer": "Olbrix",
    "support": "l30dfs@gmail.com",
    "summary": "Display total items count in point of sale order summary",
    "description": """
POS Items Count
===============

Cashiers who pack the order check the number of items against the bag, and
customers often ask how many items they are paying for.

* **Items in the order**: the order summary of the point of sale shows
  *Total Items* above the subtotal, updated as products are added.

* **Units sold**: a combo counts as one item, not one per product inside it,
  and a product given back (negative quantity) is not counted.

* **On the receipt**: the printed receipt shows the same *Total Items*.
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
            "olb_pos_items_count/static/src/**/*",
        ],
        "web.assets_tests": [
            "olb_pos_items_count/static/tests/tours/**/*",
        ],
    },
    "module_type": "official",
    "application": False,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
