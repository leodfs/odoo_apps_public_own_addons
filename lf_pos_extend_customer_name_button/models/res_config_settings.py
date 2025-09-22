from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    pos_extend_customer_name_button = fields.Boolean(
        related='pos_config_id.extend_customer_name_button',
        readonly=False
    )
