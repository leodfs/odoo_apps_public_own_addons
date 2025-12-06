{
    'name': 'POS Required Customer',
    'version': '18.0.1.0.2',
    'author': 'Leo Daniel FS',
    'maintainer': 'Leo Daniel FS',
    'support': 'l30dfs@gmail.com',
    'website': 'https://www.linkedin.com/in/leo-daniel-flores',
    'summary': 'Require customer at the point of sale',
    'description': """
This module requires the user to select a customer 
before processing the order in the point of sale.
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
            'lf_pos_required_customer/static/src/**/*',
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
