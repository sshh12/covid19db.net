"""
API class definition for risk factor statistics.
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
from ..models.risk_factor_statistics import RiskFactorStatistics


class RiskFactorStatisticsAPI:
    @staticmethod
    def polish_attributes(attributes):
        # add defaults to attributes if specified
        if attributes is not None:
            attributes = frozenset({"country", *attributes})
        # if attributes unspecified, include all
        else:
            attributes = frozenset(const.VALID_RISK_FACTOR_STATS_ATTRIBUTES)
        return attributes

    class RiskFactorStatistics(Resource):
        def get(self):
            """
            Get all risk factor statistics
            """
            args = parser.parse_args()
            attributes = RiskFactorStatisticsAPI.polish_attributes(
                get_attributes(args)
            )
            # validate attributes parameter
            if not validate_attributes(
                attributes, const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
            ):
                return error_response(422, "Specified attributes are invalid")

            all_risk_factor_statics = RiskFactorStatistics.retrieve_all(
                attributes
            )
            return all_risk_factor_statics

    class RiskFactorStatistic(Resource):
        def get(self, identifier):
            """
            Get a risk factor statistic
            """
            id_type = validate_identifier(identifier)
            # none indicates bad id
            if id_type is None:
                return error_response(422, "Bad identifier")

            args = parser.parse_args()
            attributes = RiskFactorStatisticsAPI.polish_attributes(
                get_attributes(args)
            )
            # validate attributes parameter
            if not validate_attributes(
                attributes, const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
            ):
                return error_response(422, "Specified attributes are invalid")

            risk_factor_statistic = RiskFactorStatistics.retrieve_by_id(
                identifier, id_type, attributes
            )
            return risk_factor_statistic
