import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { parseFloat } from "@web/views/fields/parsers";
import { formatDateTime } from "@web/core/l10n/dates";
import { CashMovePopup } from "@point_of_sale/app/navbar/cash_move_popup/cash_move_popup";
import { CashMoveReceipt } from "@point_of_sale/app/navbar/cash_move_popup/cash_move_receipt/cash_move_receipt";

const { DateTime } = luxon;

/**
 * The type of a cash move, translated as a whole.
 *
 * The native popup of 18.0 translates the bare type: `_t("in")` gives "en"
 * (another text of the point of sale) and "out" has no translation at all, so
 * the notification, the receipt, the note of the session and the label of the
 * statement line read "efectivo out". "Cash In" and "Cash Out" are the labels
 * of the two buttons of the popup, and what 19.0 and olb_pos_cash_in_out print.
 */
export function cashMoveTypeLabel(type) {
    return type === "in" ? _t("Cash In") : _t("Cash Out");
}

patch(CashMovePopup.prototype, {
    // Same steps as the native confirm(), with the type translated as a whole
    // and the texts out of template literals (the exporter of 18.0 does not
    // read inside `${...}`).
    async confirm() {
        const amount = parseFloat(this.state.amount);
        const formattedAmount = this.env.utils.formatCurrency(amount);
        if (!amount) {
            this.notification.add(_t("Cash in/out of %s is ignored.", formattedAmount));
            return this.props.close();
        }

        const type = this.state.type;
        const translatedType = cashMoveTypeLabel(type);
        const extras = { formattedAmount, translatedType };
        const reason = this.state.reason.trim();

        await this.pos.data.call(
            "pos.session",
            "try_cash_in_out",
            this._prepare_try_cash_in_out_payload(type, amount, reason, extras),
            {},
            true
        );
        await this.pos.logEmployeeMessage(
            _t("%(type)s - Amount: %(amount)s", { type: translatedType, amount: formattedAmount }),
            "CASH_DRAWER_ACTION"
        );
        await this.printer.print(CashMoveReceipt, {
            reason,
            translatedType,
            formattedAmount,
            headerData: this.pos.getReceiptHeaderData(),
            date: formatDateTime(DateTime.now()),
        });

        this.props.close();
        this.notification.add(
            _t("Successfully made a %(type)s of %(amount)s.", {
                type: translatedType.toLowerCase(),
                amount: formattedAmount,
            }),
            3000
        );
    },
});
