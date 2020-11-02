#!/usr/bin/python
"""
Unit tests for the backend.
"""

from unittest import main, TestCase
from covid_app import const
from covid_app.routes import (
    get_attributes,
    validate_attributes,
    validate_identifier,
    error_response,
)
from covid_app.models import Countries, CaseStatistics, RiskFactorStatistics


class TestBackend(TestCase):
    # tests for routes.py

    # get_attributes tests

    def test_get_attributes_1(self):
        attributes = "location,capital,population"
        args = {"attributes": attributes}
        result = get_attributes(args)
        self.assertEqual(result, {"location", "capital", "population"})

    def test_get_attributes_2(self):
        attributes = "location"
        args = {"attributes": attributes}
        result = get_attributes(args)
        self.assertEqual(result, {"location"})

    def test_get_attributes_3(self):
        args = {"attributes": None}
        result = get_attributes(args)
        self.assertEqual(result, None)

    # validate_attributes tests

    def test_validate_attributes_1(self):
        attributes = frozenset({"location", "capital", "population"})
        valid = frozenset(
            {"location", "capital", "population", "area", "news", "timezones"}
        )
        self.assertTrue(validate_attributes(attributes, valid))

    def test_validate_attributes_2(self):
        attributes = frozenset({"location", "capital", "population"})
        valid = frozenset(
            {"location", "population", "area", "news", "timezones"}
        )
        self.assertFalse(validate_attributes(attributes, valid))

    def test_validate_attributes_3(self):
        attributes = frozenset({"location", "capital", "population"})
        self.assertTrue(
            validate_attributes(attributes, const.VALID_COUNTRIES_ATTRIBUTES)
        )

    def test_validate_attributes_4(self):
        attributes = frozenset({"location", "capital", "population"})
        self.assertFalse(
            validate_attributes(attributes, const.VALID_CASE_STATS_ATTRIBUTES)
        )

    # validate_identifier tests

    def test_validate_identifier_1(self):
        self.assertIs(validate_identifier("SWE"), const.Identifier.ALPHA3_CODE)

    def test_validate_identifier_2(self):
        self.assertIs(validate_identifier("SE"), const.Identifier.ALPHA2_CODE)

    def test_validate_identifier_3(self):
        self.assertIs(
            validate_identifier("Sweden"), const.Identifier.COUNTRY_NAME
        )

    def test_validate_identifier_4(self):
        self.assertIs(validate_identifier("SWEland"), None)

    # error_response tests

    def test_error_response_1(self):
        result = error_response(200, "This isn't even an error???")
        self.assertEqual(
            result, ({"error": "This isn't even an error???"}, 200)
        )

    def test_error_response_2(self):
        result = error_response(404, "Resource doesn't exist")
        self.assertEqual(result, ({"error": "Resource doesn't exist"}, 404))

    # tests for models.py

    # Countries.retrieve_all tests

    def test_countries_retrieve_all_1(self):
        result = Countries.retrieve_all(const.VALID_COUNTRIES_ATTRIBUTES)
        first = result[0]
        self.assertEqual(const.VALID_COUNTRIES_ATTRIBUTES, first.keys())
        self.assertEqual(len(result), 185)

    def test_countries_retrieve_all_2(self):
        attributes = set(const.VALID_COUNTRIES_ATTRIBUTES)
        attributes.remove("location")
        attributes.remove("callingCodes")
        result = Countries.retrieve_all(attributes)
        first = result[0]
        self.assertEqual(attributes, first.keys())
        self.assertEqual(len(result), 185)

    def test_countries_retrieve_all_3(self):
        attributes = frozenset({"name", "codes"})
        result = Countries.retrieve_all(attributes)
        first = result[0]
        self.assertEqual(attributes, first.keys())
        self.assertEqual(len(result), 185)

    # Countries.retrieve_by_id tests

    def test_countries_retrieve_by_id_1(self):
        attributes = const.VALID_COUNTRIES_ATTRIBUTES
        result = Countries.retrieve_by_id(
            "USA", const.Identifier.ALPHA3_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["name"], "United States")
        self.assertEqual(result["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["codes"]["alpha2Code"], "US")

    def test_countries_retrieve_by_id_2(self):
        attributes = const.VALID_COUNTRIES_ATTRIBUTES
        result = Countries.retrieve_by_id(
            "US", const.Identifier.ALPHA2_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["name"], "United States")
        self.assertEqual(result["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["codes"]["alpha2Code"], "US")

    def test_countries_retrieve_by_id_3(self):
        attributes = const.VALID_COUNTRIES_ATTRIBUTES
        result = Countries.retrieve_by_id(
            "United States", const.Identifier.COUNTRY_NAME, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["name"], "United States")
        self.assertEqual(result["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["codes"]["alpha2Code"], "US")

    def test_countries_retrieve_by_id_4(self):
        attributes = set(const.VALID_COUNTRIES_ATTRIBUTES)
        attributes.remove("location")
        attributes.remove("languages")
        attributes.remove("currencies")
        result = Countries.retrieve_by_id(
            "USA", const.Identifier.ALPHA3_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["name"], "United States")
        self.assertEqual(result["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["codes"]["alpha2Code"], "US")

    def test_countries_retrieve_by_id_5(self):
        attributes = const.VALID_COUNTRIES_ATTRIBUTES
        result = Countries.retrieve_by_id(
            "USA", const.Identifier.ALPHA2_CODE, attributes
        )
        self.assertIs(result, None)


if __name__ == "__main__":
    main()
