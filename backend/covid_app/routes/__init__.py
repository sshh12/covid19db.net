"""
API routes module.
"""

from flask_restful import reqparse
from .. import api, const

# used to parse url query parameters
parser = reqparse.RequestParser()
parser.add_argument(
    "attributes",
    type=str,
    help="Specifies which attributes to include in the response. If multiple \
    attributes are specified, they should be delimited with commas.",
)
parser.add_argument(
    "query",
    type=str,
    help="Search query to perform when using the search endpoint.",
)


def error_response(http_code, error_message):
    """
    Returns an error response with the given code and message.
    """
    return {"error": error_message}, http_code


def validate_identifier(identifier):
    """
    Validates the given identifier. Returns a string indicating the type of
    identifier or None. Valid identifier types include: "country_name",
    "alpha3_code", and "alpha2_code".
    """
    if identifier in const.VALID_COUNTRY_NAMES:
        return const.Identifier.COUNTRY_NAME
    if identifier in const.VALID_ALPHA3_CODES:
        return const.Identifier.ALPHA3_CODE
    if identifier in const.VALID_ALPHA2_CODES:
        return const.Identifier.ALPHA2_CODE
    return None


def get_attributes(args):
    """
    Retrieves the attributes argument from args (if it exists) and transforms
    it into a frozenset. Returns the created frozenset or None if attributes
    was not specified by the client.
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
