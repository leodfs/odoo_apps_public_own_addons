import * as Chrome from "@point_of_sale/../tests/tours/utils/chrome_util";
import * as Dialog from "@point_of_sale/../tests/tours/utils/dialog_util";
import * as ProductScreen from "@point_of_sale/../tests/tours/utils/product_screen_util";
import * as combo from "@point_of_sale/../tests/tours/utils/combo_popup_util";
import { registry } from "@web/core/registry";

function countIs(count) {
    return {
        content: `the cart counts ${count} items`,
        trigger: `#item_count_value:contains("Total Items in Cart: ${count}")`,
    };
}

registry.category("web_tour.tours").add("olb_pos_items_count.ItemsCountTour", {
    steps: () =>
        [
            Chrome.startPoS(),
            Dialog.confirm("Open Register"),
            ProductScreen.clickDisplayedProduct("Napkin"),
            countIs(1),
            // A combo is one item sold, not one per product inside it.
            ProductScreen.clickDisplayedProduct("Sundae Combo"),
            combo.select("Cone"),
            combo.select("Sprinkles"),
            Dialog.confirm(),
            countIs(2),
            // A product given back is not an item sold.
            ProductScreen.clickDisplayedProduct("Napkin"),
            ProductScreen.selectedOrderlineHas("Napkin", "2.00"),
            countIs(3),
            ProductScreen.clickNumpad("+/-"),
            ProductScreen.selectedOrderlineHas("Napkin", "-2.00"),
            countIs(1),
        ].flat(),
});
