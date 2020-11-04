"""
API class definition for countries.
"""
from flask_restful import Resource
from . import (
    const,
    parser,
    validate_attributes,
    get_attributes,
    error_response,
    validate_identifier,
)
from ..models.countries import Countries


class CountriesAPI:
    @staticmethod
    def polish_attributes(attributes):
        """
        Adds defaults to the attributes that were specified by the client.
        """
        # add defaults to attributes if specified
        if attributes is not None:
            attributes = frozenset({"name", "codes", *attributes})
        # if attributes unspecified, include all
        else:
            attributes = frozenset(const.VALID_COUNTRIES_ATTRIBUTES)
        return attributes

    class Countries(Resource):
        def get(self):
            """
            Get all countries
            """
            args = parser.parse_args()
            attributes = CountriesAPI.polish_attributes(get_attributes(args))
            # validate attributes parameter
            if not validate_attributes(
                attributes, const.VALID_COUNTRIES_ATTRIBUTES
            ):
                return error_response(422, "Specified attributes are invalid")

            all_countries = Countries.retrieve_all(attributes)
            return all_countries

    class Country(Resource):
        def get(self, identifier):
            """
            Get a country
            """
            id_type = validate_identifier(identifier)
            # none indicates bad id
            if id_type is None:
                return error_response(422, "Bad identifier")

            args = parser.parse_args()
            attributes = CountriesAPI.polish_attributes(get_attributes(args))
            # validate attributes parameter
            if not validate_attributes(
                attributes, const.VALID_COUNTRIES_ATTRIBUTES
            ):
                return error_response(422, "Specified attributes are invalid")

            country = Countries.retrieve_by_id(identifier, id_type, attributes)
            return country
