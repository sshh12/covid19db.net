"""
Defines the valid routes for the backend server.
"""
from flask_restful import Resource, reqparse
from . import api, const, models

# used to parse url query parameters
parser = reqparse.RequestParser()
parser.add_argument(
    "attributes",
    type=str,
    help="Specifies which attributes to include in the response. If multiple \
    attributes are specified, they should be delimited with commas.",
)


def get_attributes(args):
    """
    Retrieves the attributes argument from args (if it exists) and transforms
    it into a frozenset. Returns the created frozenset or None if attributes was
    not specified by the client.
    """
    ret = None
    if args["attributes"] is not None:
        attributes_str = args["attributes"]
        if attributes_str.find(",") == -1:
            ret = frozenset({attributes_str})
        else:
            ret = frozenset(attributes_str.split(","))
    return ret


def validate_attributes(attributes, valid_attributes):
    """
    Validates the given attributes by ensuring each specified value is a member
    of the given set.
    """
    for attribute in attributes:
        if attribute not in valid_attributes:
            return False
    return True


def validate_identifier(identifier):
    """
    Validates the given identifier. Returns a string indicating the type of identifier
    or None. Valid identifier types include: "country_name", "alpha3_code", and "alpha2_code".
    """
    if identifier in const.VALID_COUNTRY_NAMES:
        return const.Identifier.COUNTRY_NAME
    if identifier in const.VALID_ALPHA3_CODES:
        return const.Identifier.ALPHA3_CODE
    if identifier in const.VALID_ALPHA2_CODES:
        return const.Identifier.ALPHA2_CODE
    return None


def error_response(http_code, error_message):
    """
    Returns an error response with the given code and message.
    """
    return {"error": error_message}, http_code


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
            if not validate_attributes(attributes, const.VALID_COUNTRIES_ATTRIBUTES):
                return error_response(422, "Specified attributes are invalid")

            all_countries = models.Countries.retrieve_all(attributes)
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
            if not validate_attributes(attributes, const.VALID_COUNTRIES_ATTRIBUTES):
                return error_response(422, "Specified attributes are invalid")

            country = models.Countries.retrieve_by_id(identifier, id_type, attributes)
            return country

class CaseStatisticsAPI:
    @staticmethod
    def polish_attributes(attributes):
        # add defaults to attributes if specified
        if attributes is not None:
            attributes = frozenset({"country", "date", *attributes})
        # if attributes unspecified, include all
        else:
            attributes = frozenset(const.VALID_CASE_STATS_ATTRIBUTES)
        return attributes

    class CaseStatistics(Resource):
        def get(self):
            """
            Get all case statistics
            """
            args = parser.parse_args()
            attributes = CaseStatisticsAPI.polish_attributes(get_attributes(args))
            # validate attributes parameter
            if not validate_attributes(attributes, const.VALID_CASE_STATS_ATTRIBUTES):
                return error_response(422, "Specified attributes are invalid")
            
            all_case_statics = models.CaseStatistics.retrieve_all(attributes)
            return all_case_statics

    class CaseStatistic(Resource):
        def get(self, identifier):
            """
            Get a case statistic
            """           
            id_type = validate_identifier(identifier)
            # none indicates bad id
            if id_type is None:
                return error_response(422, "Bad identifier")

            args = parser.parse_args()
            attributes = CaseStatisticsAPI.polish_attributes(get_attributes(args))
            # validate attributes parameter
            if not validate_attributes(attributes, const.VALID_CASE_STATS_ATTRIBUTES):
                return error_response(422, "Specified attributes are invalid")

# adds all of the available endpoints to the given api object.
api.add_resource(CountriesAPI.Countries, "/countries")
api.add_resource(CountriesAPI.Country, "/countries/<identifier>")
api.add_resource(CaseStatisticsAPI.CaseStatistics, "/case-statistics")
api.add_resource(CaseStatisticsAPI.CaseStatistic, "/case-statistics/<identifier>")
