import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { xml } from "@odoo/owl";
import { ControlButtonsPopup } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";

/**
 * The window of the Actions button. The native inline template of 18.0 writes
 * `title="'Actions'"`, a string expression QWeb never translates. Same template,
 * with the title translated as in 19.0.
 */
patch(ControlButtonsPopup, {
    template: xml`
        <Dialog bodyClass="'d-flex flex-column'" footer="false" title="title" t-on-click="props.close">
            <ControlButtons showRemainingButtons="true" close="props.close"/>
        </Dialog>
    `,
});

patch(ControlButtonsPopup.prototype, {
    get title() {
        return _t("Actions");
    },
});
