from odoo import api, models


class PosOrder(models.Model):
    _inherit = 'pos.order'

    @api.model
    def sync_from_ui(self, orders):
        data = super().sync_from_ui(orders)
        if len(orders) == 0:
            return data
        
        order_ids = self.browse([o['id'] for o in data['pos.order']])
        for order in order_ids:
            if not order.partner_id:
                order.partner_id = order.config_id.default_customer_id.id

        return data
