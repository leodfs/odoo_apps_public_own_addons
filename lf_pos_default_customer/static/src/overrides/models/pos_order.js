import { PosOrder } from "@point_of_sale/app/models/pos_order";
import { patch } from "@web/core/utils/patch";

patch(PosOrder.prototype, {
    // @Override
    setup() {
        super.setup(...arguments);
        if(this.config.default_customer_id && !this.partner_id && !this.uiState.locked){
            this.update({ partner_id: this.config.default_customer_id });
        }
    },
});
