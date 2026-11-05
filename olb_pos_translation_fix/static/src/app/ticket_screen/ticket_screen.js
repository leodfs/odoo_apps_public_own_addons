import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { TicketScreen } from "@point_of_sale/app/screens/ticket_screen/ticket_screen";

patch(TicketScreen.prototype, {
    /** What the empty list of orders says: a literal of the native template. */
    get emptyOrderListText() {
        return this.pos.data.network.loading ? _t("Loading...") : _t("No orders found");
    },
});
