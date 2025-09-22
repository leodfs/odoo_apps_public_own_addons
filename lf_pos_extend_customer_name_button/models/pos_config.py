from odoo import fields, models


class PosConfig(models.Model):
    _inherit = 'pos.config'

    extend_customer_name_button = fields.Boolean(
        string='Extend Customer Name on Button',
        default=False,
    )
