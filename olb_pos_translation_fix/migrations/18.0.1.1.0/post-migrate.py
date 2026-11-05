from odoo import SUPERUSER_ID, api


def migrate(cr, version):
    """The title of the Actions window was added to the translated texts.

    An upgrade keeps the translations already in the database, so reload the
    ones of this module over them; other modules are not touched.
    """
    env = api.Environment(cr, SUPERUSER_ID, {})
    env["ir.module.module"].search([("name", "=", "olb_pos_translation_fix")])._update_translations(overwrite=True)
