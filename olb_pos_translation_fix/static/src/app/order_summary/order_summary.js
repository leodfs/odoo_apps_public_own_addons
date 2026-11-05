import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { OrderSummary } from "@point_of_sale/app/screens/product_screen/order_summary/order_summary";

patch(OrderSummary.prototype, {
    /** Tooltip of the lot icon of a line: literals of a t-attf in the native template. */
    lotIconTitle(line) {
        return line.hasValidProductLot() ? _t("Valid product lot") : _t("Invalid product lot");
    },
});
