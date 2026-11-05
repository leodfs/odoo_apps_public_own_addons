import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { NumberPopup } from "@point_of_sale/app/utils/input_popups/number_popup";

patch(NumberPopup.prototype, {
    /**
     * The label of the confirm button. The native template of 18.0 writes
     * `props.confirmButtonLabel || 'Ok'`, an expression QWeb never translates.
     * As in 19.0, the default label is "Confirm", translated.
     */
    get confirmButtonLabel() {
        return this.props.confirmButtonLabel || _t("Confirm");
    },
});
