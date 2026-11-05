import * as Chrome from "@point_of_sale/../tests/tours/utils/chrome_util";
import * as Dialog from "@point_of_sale/../tests/tours/utils/dialog_util";
import * as ProductScreen from "@point_of_sale/../tests/tours/utils/product_screen_util";
import * as PaymentScreen from "@point_of_sale/../tests/tours/utils/payment_screen_util";
import * as ReceiptScreen from "@point_of_sale/../tests/tours/utils/receipt_screen_util";
import { negate } from "@point_of_sale/../tests/tours/utils/common";
import { registry } from "@web/core/registry";

// Runs with a cashier in Peruvian Spanish: every text this module writes as a
// translatable one has to come out in Spanish.
const numberPopup = ".modal:has(.input-symbol)";

function openMenuItem(content, pattern) {
    return [
        Chrome.clickMenuButton(),
        {
            content,
            trigger: "span.dropdown-item",
            run: () => {
                const item = [...document.querySelectorAll("span.dropdown-item")].find((el) =>
                    pattern.test(el.innerText.trim())
                );
                if (!item) {
                    throw new Error(`No menu item matches ${pattern}`);
                }
                item.click();
            },
        },
    ];
}

registry.category("web_tour.tours").add("olb_pos_translation_fix.SpanishTextsTour", {
    steps: () =>
        [
            Chrome.startPoS(),
            Dialog.confirm(),
            {
                content: "browser prints do nothing during the tour",
                trigger: "body",
                run: () => {
                    window.print = () => {};
                },
            },

            // Number popup: the tip of the payment screen.
            ProductScreen.clickDisplayedProduct("Whiteboard Pen"),
            ProductScreen.clickPayButton(),
            {
                content: "add a tip",
                trigger: ".payment-screen button:has(.fa-heart)",
                run: "click",
            },
            {
                content: "the confirm button of the number popup is in Spanish",
                trigger: `${numberPopup} .modal-footer .btn-primary:contains("Confirmar")`,
            },
            {
                content: "the discard button of the number popup is in Spanish",
                trigger: `${numberPopup} .modal-footer .btn-secondary:contains("Descartar")`,
            },
            {
                content: "no button of the number popup is left in English",
                trigger: negate(
                    `${numberPopup} .modal-footer:contains("Ok"), ${numberPopup} .modal-footer:contains("Discard")`
                ),
            },
            {
                content: "discard the tip",
                trigger: `${numberPopup} .modal-footer .btn-secondary`,
                run: "click",
            },

            // Receipt screen: the example address of the email field.
            PaymentScreen.clickPaymentMethod("Cash"),
            PaymentScreen.clickValidate(),
            {
                content: "the email field gives its example in Spanish",
                trigger: ".receipt-screen input.send-receipt-email-input[placeholder='p. ej., juan.perez@correo.com']",
            },
            ReceiptScreen.clickNextOrder(),
            ProductScreen.isShown(),

            // Ticket screen: an empty search and no selected order.
            ...openMenuItem("open the orders", /^Órdenes/),
            {
                content: "search for an order that does not exist",
                trigger: ".ticket-screen .pos-search-bar input",
                run: "edit zzzz",
            },
            {
                content: "search it in the first field",
                trigger: ".ticket-screen .pos-search-bar .search ul li",
                run: "click",
            },
            {
                content: "the empty list says it in Spanish",
                trigger: ".ticket-screen h3:contains('No se encontraron órdenes')",
            },
            {
                content: "open the orders without a selected order",
                trigger: ".ticket-screen",
                run: () => {
                    // Only reachable this way from the tour: the right pane shows
                    // its message when no order is selected.
                    window.posmodel.showScreen("ProductScreen");
                    window.posmodel.selectedOrderUuid = null;
                    window.posmodel.showScreen("TicketScreen");
                },
            },
            {
                content: "the empty right pane says it in Spanish, without quotes",
                trigger: ".ticket-screen h3:contains('Seleccione una orden'):not(:contains(\"'\"))",
            },
            {
                content: "back to a new order",
                trigger: ".ticket-screen",
                run: () => {
                    window.posmodel.add_new_order();
                    window.posmodel.showScreen("ProductScreen");
                },
            },
            ProductScreen.isShown(),

            // Cash out.
            ...openMenuItem("open the cash in and out", /^Entrada\/salida de efectivo$/),
            {
                content: "choose cash out",
                trigger: ".modal button.input-type:contains('Salida de efectivo')",
                run: "click",
            },
            {
                content: "enter an amount",
                trigger: ".modal .input-amount input",
                run: "edit 5",
            },
            Chrome.fillTextArea(".cash-reason", "Bolsas"),
            Dialog.confirm(),
            {
                content: "the notification names the cash out in Spanish",
                trigger: ".o_notification:contains('Se registró correctamente una salida de efectivo de')",
            },
            {
                content: "nothing of the notification is left in English",
                trigger: negate(".o_notification:contains(' out ')"),
            },

            // Tracked product: the lot icon of the line.
            ProductScreen.clickDisplayedProduct("Lot Product"),
            Dialog.confirm(),
            {
                content: "the lot icon of the line explains itself in Spanish",
                trigger: ".orderline .line-lot-icon[title^='Lote de producto']",
            },
        ].flat(),
});
