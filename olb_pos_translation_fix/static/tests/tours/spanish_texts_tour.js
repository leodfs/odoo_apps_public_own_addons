/* global posmodel */

import * as Chrome from "@point_of_sale/../tests/pos/tours/utils/chrome_util";
import * as Dialog from "@point_of_sale/../tests/generic_helpers/dialog_util";
import * as ProductScreen from "@point_of_sale/../tests/pos/tours/utils/product_screen_util";
import * as PaymentScreen from "@point_of_sale/../tests/pos/tours/utils/payment_screen_util";
import * as ReceiptScreen from "@point_of_sale/../tests/pos/tours/utils/receipt_screen_util";
import { negate } from "@point_of_sale/../tests/generic_helpers/utils";
import { registry } from "@web/core/registry";

// Runs with a cashier in Peruvian Spanish: every text this module writes as a
// translatable one has to come out in Spanish.

function clickByText(content, selector, pattern) {
    return {
        content,
        trigger: selector,
        run: () => {
            const element = [...document.querySelectorAll(selector)].find((el) =>
                pattern.test(el.innerText.trim())
            );
            if (!element) {
                throw new Error(`Nothing in ${selector} matches ${pattern}`);
            }
            element.click();
        },
    };
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

            // Note of a line: the title of the popup.
            ProductScreen.clickDisplayedProduct("Whiteboard Pen"),
            clickByText("add a note to the line", ".control-buttons button, .product-screen button", /^Nota$/),
            {
                content: "the title of the note popup is in Spanish",
                trigger: ".modal .modal-title:contains('Whiteboard Pen: Agregar Nota')",
            },
            {
                content: "nothing of the title is left in English",
                trigger: negate(".modal .modal-title:contains(': Add')"),
            },
            {
                content: "close the note popup",
                trigger: ".modal .modal-footer .btn-secondary",
                run: "click",
            },

            // Receipt screen: the example address of the email field.
            ProductScreen.clickPayButton(),
            PaymentScreen.clickPaymentMethod("Cash"),
            PaymentScreen.clickValidate(),
            {
                content: "the email field gives its example in Spanish",
                trigger: ".receipt-screen input.send-receipt-email-input[placeholder='p. ej., juan.perez@correo.com']",
            },
            ReceiptScreen.clickNextOrder(),
            ProductScreen.isShown(),

            // Ticket screen: an empty search.
            {
                content: "open the orders",
                trigger: ".product-screen",
                run: () => posmodel.navigate("TicketScreen"),
            },
            {
                content: "search for an order that does not exist",
                trigger: ".ticket-screen .pos-search-bar input",
                run: "edit zzzz",
            },
            {
                content: "search it in the first field",
                trigger: ".ticket-screen .pos-search-bar ul li, .ticket-screen .pos-search-bar .dropdown-item",
                run: "click",
            },
            {
                content: "the empty list says it in Spanish",
                trigger: ".ticket-screen h3:contains('No se encontraron órdenes')",
            },
            {
                content: "back to the order",
                trigger: ".ticket-screen",
                run: () => posmodel.navigate("ProductScreen", { orderUuid: posmodel.getOrder().uuid }),
            },
            ProductScreen.isShown(),

            // Cash out.
            Chrome.clickMenuButton(),
            clickByText("open the cash in and out", "span.dropdown-item", /^Entrada\/salida de efectivo$/),
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
