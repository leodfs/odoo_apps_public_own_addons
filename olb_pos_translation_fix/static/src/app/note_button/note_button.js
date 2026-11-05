import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { makeAwaitable } from "@point_of_sale/app/utils/make_awaitable_dialog";
import { TextInputPopup } from "@point_of_sale/app/components/popups/text_input_popup/text_input_popup";
import { NoteButton } from "@point_of_sale/app/screens/product_screen/control_buttons/orderline_note_button/orderline_note_button";

patch(NoteButton.prototype, {
    // Same as the native method, but the title of a line is one translated
    // text. Odoo's ": Add " is in no translation file: the extractor of 19.0
    // skips the first _t() after the arrow function that builds the buttons,
    // so the title is built before it here.
    async openTextInput(selectedNote) {
        const selectedLine = this.pos.getOrder().getSelectedOrderline();
        let title = _t("Add a ") + this.props.label;
        if (selectedLine) {
            title = _t("%(product)s: Add %(note)s", {
                product: selectedLine.product_id.name,
                note: this.props.label,
            });
        }
        let buttons = [];
        if (this.type === "internal" || !selectedLine) {
            buttons = this.pos.models["pos.note"].readAll().map((note) => ({
                label: note.name,
                class: note.color ? `o_colorlist_item_color_${note.color}` : "",
            }));
        }
        return await makeAwaitable(this.dialog, TextInputPopup, {
            title,
            buttons,
            rows: 4,
            startingValue: selectedNote,
        });
    },
});
