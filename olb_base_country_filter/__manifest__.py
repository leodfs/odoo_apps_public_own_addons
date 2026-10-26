{
    "name": "Base Country Filter",
    "version": "19.0.1.0.0",
    "author": "Olbrix",
    "company": "Olbrix",
    "maintainer": "Olbrix",
    "support": "l30dfs@gmail.com",
    "summary": "Show country-specific fields and sections only to companies "
    "of the countries they apply to",
    "description": """
Country-Based Screen Adaptation
===============================

Localization features usually add fields, columns and sections that only make
sense for companies of a given country (for example, tax identification or
legal reporting data for Peru). In a multi-company, multi-country database,
showing those elements to every company clutters the screens and confuses
users.

This technical module provides the common engine that adapts the screens to
the country of the company the user is currently working with. Modules built
on top of it simply declare which fields, groups or pages belong to which
countries, and the engine takes care of the rest:

* Forms and kanban cards hide the elements that do not apply to the current
  company's country.
* List views hide the corresponding columns completely.
* Switching company in the company selector instantly shows the screens
  adapted to the new company's country.

This module does not change any screen by itself; it is a dependency of other
Olbrix modules.
""",
    "category": "Technical",
    "depends": [
        # Odoo Community
        "base",
    ],
    "module_type": "official",
    "application": False,
    "images": [
        "static/description/banner.png",
        "static/description/icon.png",
    ],
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
