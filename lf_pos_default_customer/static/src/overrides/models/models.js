/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { Order } from "@point_of_sale/app/store/models";

patch(Order.prototype, {
    /**
     * @override
     */
    setup(_defaultObj, options) {
        super.setup(...arguments);
        const defaultPartner = this.pos.config.default_customer_id;
        if (defaultPartner) {
            const partner = this.pos.db.get_partner_by_id(defaultPartner[0]);
            if (options.json) {
                if (!options.json.partner_id) {
                    this.set_partner(partner);
                }
            } else {
                this.set_partner(partner);
            }
        }
    },
});
