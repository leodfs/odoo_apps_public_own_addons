from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    pos_required_customer = fields.Boolean(
        related='pos_config_id.required_customer',
        readonly=False,
    )
