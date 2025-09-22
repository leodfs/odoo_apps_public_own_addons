from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    pos_default_customer_id = fields.Many2one(
        related='pos_config_id.default_customer_id',
        readonly=False
    )
