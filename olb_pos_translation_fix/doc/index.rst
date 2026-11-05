===================
POS Translation Fix
===================

Point of sale texts that Odoo 18.0 leaves in English, shown in the language of
the cashier. Spanish translation included (es, es_419, es_PE).

Requirements
============

* Odoo 18.0 Community or Enterprise (on premise or Odoo.sh)
* Point of Sale (``point_of_sale``)

Installation
============

#. Copy the ``olb_pos_translation_fix`` folder into your custom addons path, or
   add it to your Odoo.sh repository.
#. Restart the Odoo server.
#. Go to **Apps**, click **Update Apps List**, search for
   *POS Translation Fix* and click **Activate**. In a new database it
   installs by itself with the Point of Sale.
#. Reload the point of sale in the browser of each till.

Usage
=====

Nothing to set up. With a cashier working in Spanish, the texts listed in the
manual appear translated: the number windows, the list of orders, the title
of the Actions window, the cash in and out
notification, receipt and label, the e-mail field of the receipt screen and
the lot icons of a line.

A short user manual is included in the module, in ``doc/manual`` (English
and Spanish, PDF).

Español
=======

No hay nada que configurar: con el cajero en español, los textos que Odoo
deja en inglés aparecen traducidos. Recargue el punto de venta después de
instalarlo.

Support
=======

Write to l30dfs@gmail.com with your Odoo version and a
screenshot of the issue.
