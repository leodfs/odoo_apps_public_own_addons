from odoo import models, fields


class PosConfig(models.Model):
    _inherit = 'pos.config'
    
    required_customer = fields.Boolean(
        string='Require Customer',
        help='Require customer at the point of sale',
    )
