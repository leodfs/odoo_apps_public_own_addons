from odoo import api, models


class PosOrder(models.Model):
    _inherit = 'pos.order'

    @api.model
    def _order_fields(self, ui_order):
        order_fields = super()._order_fields(ui_order)
        session = self.env['pos.session'].browse(
            ui_order['pos_session_id']
        )
        if not ui_order.get('partner_id') and session.config_id.default_customer_id:
            order_fields.update({
                'partner_id': session.config_id.default_customer_id.id
            })
        return order_fields
