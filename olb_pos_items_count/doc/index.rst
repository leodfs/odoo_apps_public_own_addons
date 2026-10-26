===============
POS Items Count
===============

The number of items the customer is paying for, on the order of the point of
sale and on the printed receipt.

Requirements
============

* Odoo 19.0 Community or Enterprise (on premise or Odoo.sh)
* Point of Sale app

Installation
============

#. Copy the ``olb_pos_items_count`` folder into your custom addons path, or add
   it to your Odoo.sh repository.
#. Restart the Odoo server.
#. Go to **Apps**, click **Update Apps List**, search for *POS Items Count*
   and click **Activate**.

There is nothing to configure.

Usage
=====

* The order shows *Total Items*, above the taxes, updated as products are added.
* The printed receipt shows the same count as *Total Items*.
* Quantities add up, a combo counts as one item and a product given back
  (negative quantity) is not counted.

A user manual with screenshots is included in the module, in ``doc/manual``
(English and Spanish, PDF).

Español
=======

La orden del punto de venta y el recibo impreso muestran *Total de artículos*:
la suma de las cantidades, con cada combo contado una vez. No hay nada que
configurar. El manual en español (PDF) está en ``doc/manual``.

Support
=======

Write to l30dfs@gmail.com with your Odoo version and a
screenshot of the issue.
