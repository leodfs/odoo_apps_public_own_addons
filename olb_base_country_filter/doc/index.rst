===================
Base Country Filter
===================

Shows the fields of a localization only to the companies of its country.
A technical module used by localization modules; it changes nothing on its
own.

Requirements
============

* Odoo 19.0 Community or Enterprise (on premise or Odoo.sh)

Installation
============

It is installed with the modules that depend on it. To install it alone,
copy the ``olb_base_country_filter`` folder into your addons path, restart the
server and activate it from **Apps**.

Usage
=====

A module hides its fields in the companies of other countries from
``_get_view``::

    @api.model
    def _get_view(self, view_id=None, view_type='form', **options):
        arch, view = super()._get_view(view_id, view_type, **options)
        tags = [('field', 'l10n_pe_type_group')]
        countries = [self.env.ref('base.pe')]
        return self._tags_invisible_per_country(arch, view, view_type, tags, countries)

Forms and kanban cards hide the fields, lists remove their columns, and the
views are cached per company.

A user manual is included in ``doc/manual`` (English and Spanish, PDF).

Support
=======

Write to l30dfs@gmail.com with your Odoo version and a
screenshot of the issue.
