/** @odoo-module */

import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { ConfirmPopup } from "@point_of_sale/app/utils/confirm_popup/confirm_popup";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";

patch(PaymentScreen.prototype, {
    /**
     * @override
     */
    async validateOrder(isForceValidate) {
        if (this.pos.config.required_customer) {
            if (!this.currentOrder.get_partner()) {
                const { confirmed } = await this.popup.add(ConfirmPopup, {
                    title: _t("Required Customer"),
                    body: _t("You must select the customer to complete the order."),
                });
                if (confirmed) {
                    this.selectPartner();
                }
                return;
            }
        }
        await super.validateOrder(isForceValidate);
    },
});
