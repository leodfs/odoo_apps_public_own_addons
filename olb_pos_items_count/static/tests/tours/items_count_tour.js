import * as Chrome from "@point_of_sale/../tests/pos/tours/utils/chrome_util";
import * as Dialog from "@point_of_sale/../tests/generic_helpers/dialog_util";
import * as PaymentScreen from "@point_of_sale/../tests/pos/tours/utils/payment_screen_util";
import * as ProductScreen from "@point_of_sale/../tests/pos/tours/utils/product_screen_util";
import * as ReceiptScreen from "@point_of_sale/../tests/pos/tours/utils/receipt_screen_util";
import * as combo from "@point_of_sale/../tests/pos/tours/utils/combo_popup_util";
import { registry } from "@web/core/registry";

function countIs(count) {
    return {
        content: `the cart counts ${count} items`,
        trigger: `.order-summary .items-count:contains("Total Items"):contains("${count}")`,
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
            ProductScreen.clickDisplayedProduct("Napkin"),
            ProductScreen.selectedOrderlineHas("Napkin", "2"),
            countIs(3),
            // A product given back is not an item sold.
            ProductScreen.clickDisplayedProduct("Spoon"),
            ProductScreen.clickNumpad("+/-"),
            ProductScreen.selectedOrderlineHas("Spoon", "-1"),
            countIs(3),
            ProductScreen.clickPayButton(),
            PaymentScreen.clickPaymentMethod("Bank"),
            PaymentScreen.clickValidate(),
            ReceiptScreen.isShown(),
            {
                content: "the receipt counts the items too",
                trigger: `.pos-receipt .receipt-items-count:contains("Total Items"):contains("3")`,
            },
        ].flat(),
});
