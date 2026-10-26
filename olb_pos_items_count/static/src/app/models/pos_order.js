import { patch } from "@web/core/utils/patch";
import { PosOrder } from "@point_of_sale/app/models/pos_order";

patch(PosOrder.prototype, {
    /**
     * Units sold: a combo counts once, not once per product inside it, and a
     * product given back (negative quantity) is not an item sold.
     */
    get itemCount() {
        return this.lines
            .filter((line) => !line.combo_parent_id && line.qty > 0)
            .reduce((count, line) => count + line.qty, 0);
    },
});
