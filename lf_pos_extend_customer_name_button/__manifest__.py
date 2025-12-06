{
    'name': 'POS Extend Customer Name Button',
    'version': '18.0.1.0.0',
    'author': 'Leo Daniel FS',
    'maintainer': 'Leo Daniel FS',
    'support': 'l30dfs@gmail.com',
    'website': 'https://www.linkedin.com/in/leo-daniel-flores',
    'summary': 'Extend the customer name on button in the point of sale',
    'description': """
This module extends the customer name on button in the point of sale.
""",
    'category': 'Sales/Point of Sale',
    'depends': [
        # Odoo community
        'point_of_sale',
    ],
    'data': [
        'views/res_config_settings_views.xml',
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'lf_pos_extend_customer_name_button/static/src/**/*',
        ],
    },
    "images": [
        "static/description/banner.jpg", 
        "static/description/icon.png"
    ],
    'module_type': 'official',
    'application': False,
    'installable': True,
    'auto_install': False,
    'license': 'Other proprietary',
    'currency': 'USD',
    'price': 0.00,
}
