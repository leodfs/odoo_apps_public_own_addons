
from odoo import models, api


class Model(models.AbstractModel):
    _inherit = 'base'

    @api.model
    def _tags_invisible_per_country(self, arch, view, view_type, tags, countries):
        """
        Utility method to modify the visibility of specified XML tags in a view's arch XML
        based on the country of the current company.

        Args:
            arch (etree._Element): The arch XML element of the view.
            view (etree._Element): The view XML element.
            view_type (str): Type of the view, either 'form', kanban or 'list'.
            tags (list): List of tag names or tuples representing Xpath queries for tags to make invisible.
            countries (list): List of country references to check against the current company's country.

        Returns:
            Tuple[etree._Element, etree._Element]: The modified arch and view elements.

        This function checks if the country of the current company is in the provided list of countries.
        If true, it returns the original arch and view without modification. Otherwise, it iterates through
        the specified tags and makes corresponding elements invisible in the arch XML.

        Example:
            Assuming tags = [('field', 'annexed_establishment'), ('group', 'extended_info')], countries = [self.env.ref('base.pe')],
            and the current company's country is 'Peru', the function will modify the arch XML to make
            elements with Xpath queries "//field[@name='annexed_establishment']" and "//group[@name='extended_info']"
            invisible.

        Note:
            This function is intended to be called from the '_get_view' method of an Odoo model.
        """

        if not (isinstance(tags, list) and isinstance(countries, list)):
            return arch, view

        if not (tags and countries):
            return arch, view

        current_company_country = self.env.company.country_id
        if current_company_country in countries:
            return arch, view

        for tag in tags:
            if isinstance(tag, tuple):
                xpath_query = f"//{tag[0]}[@name='{tag[1]}']"
                nodes = arch.xpath(xpath_query)
                for node in nodes:
                    if view_type in ('form', 'kanban'):
                        node.set('invisible', '1')
                    elif view_type == 'list':
                        node.set('column_invisible', 'True')

        return arch, view

    @api.model
    def _get_view_cache_key(self, view_id=None, view_type='form', **options):
        key = super()._get_view_cache_key(view_id, view_type, **options)
        return key + (self.env.company,)
