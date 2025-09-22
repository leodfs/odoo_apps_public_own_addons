import { patch } from "@web/core/utils/patch";
import { SelectPartnerButton } from "@point_of_sale/app/screens/product_screen/control_buttons/select_partner_button/select_partner_button";

patch(SelectPartnerButton.prototype, {
    getButtonClasses() {
        let classes = "";
        if (!this.pos.config.extend_customer_name_button) {
            classes = classes + " text-truncate";
        }
        return classes;
    },
    get customerName() {
        let customerName = "";
        if (this.props.partner) {
            customerName = this.props.partner.name;
        }
        if (this.pos.config.extend_customer_name_button && customerName.length > 0) {
            customerName = customerName.length > 46 ? customerName.substring(0, 46) + " ..." : customerName;
        }
        return customerName;
    }
});
