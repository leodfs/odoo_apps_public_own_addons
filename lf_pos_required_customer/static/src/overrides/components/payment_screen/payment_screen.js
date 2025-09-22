import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { ask } from "@point_of_sale/app/store/make_awaitable_dialog";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";

patch(PaymentScreen.prototype, {
    // @Override
    async validateOrder(isForceValidate) {
        if (this.pos.config.required_customer) {
            if (!this.currentOrder.get_partner()) {
                const confirmed = await ask(this.dialog, {
                    title: _t("Require Customer"),
                    body: _t("You must select the customer to complete the order."),
                });
                if (confirmed) {
                    this.pos.selectPartner();
                }
                return false;
            }
        }
        await super.validateOrder(isForceValidate);
    },
});
