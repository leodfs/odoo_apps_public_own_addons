import { PosOrder } from "@point_of_sale/app/models/pos_order";
import { patch } from "@web/core/utils/patch";
import { OrderWidget } from "@point_of_sale/app/generic_components/order_widget/order_widget";

/**
 * Units sold: a combo counts once, not once per product inside it, and a
 * product given back (negative quantity) is not an item sold.
 */
export function countItems(lines) {
    return lines
        .filter((line) => !line.combo_parent_id && line.qty > 0)
        .reduce((count, line) => count + line.qty, 0);
}

patch(PosOrder.prototype, {
    export_for_printing(baseUrl, headerData) {
        const receipt = super.export_for_printing(...arguments);
        receipt.item_count = countItems(this.get_orderlines());
        return receipt;
    },
});

patch(OrderWidget.prototype, {
    get item_count() {
        return countItems(this.props.lines);
    },
});
