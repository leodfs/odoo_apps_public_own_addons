{
    'name': 'POS Default Customer',
    'version': '18.0.1.0.1',
    'author': 'Leo Daniel FS',
    'maintainer': 'Leo Daniel FS',
    'support': 'l30dfs@gmail.com',
    'website': 'https://www.linkedin.com/in/leo-daniel-flores',
    'summary': 'Default customer for each point of sale',
    'description': """
This module allows you to configure a default client for each point of sale.
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
            'lf_pos_default_customer/static/src/**/*',
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
