/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { CustomerButton } from "@point_of_sale/app/screens/product_screen/control_buttons/customer_button/customer_button";

patch(CustomerButton.prototype, {
    getButtonClasses() {
        let classes = "";
        if (this.partner) {
            classes = classes + "btn-primary";
        } else {
            classes = classes + "btn-light";
        }
        if (!this.pos.config.extend_customer_name_button) {
            classes = classes + " text-truncate";
        }
        return classes
    },
    get customerName() {
        let customerName = "";
        if (this.partner) {
            customerName = this.partner.name;
        }
        if (this.pos.config.extend_customer_name_button && customerName.length > 0) {
            customerName = customerName.length > 46 ? customerName.substring(0, 46) + " ..." : customerName;
        }
        return customerName;
    }
});
