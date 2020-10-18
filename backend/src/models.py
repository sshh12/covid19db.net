"""
Definitions for database models (tables).
"""

from sqlalchemy.orm import load_only
from . import db, const


class Countries(db.Model):
    """
    Database model representing a country.
    """

    id = db.Column(db.Integer, primary_key=True)
    # alternateNames
    alternate_names = db.Column(db.ARRAY(db.String), nullable=False)
    # area
    area = db.Column(db.Float, nullable=True)
    # borders
    borders = db.Column(db.ARRAY(db.String), nullable=False)
    # callingCodes
    calling_codes = db.Column(db.ARRAY(db.String), nullable=False)
    # capital
    capital_img = db.Column(db.String, nullable=False)
    capital_location_lat = db.Column(db.Float, nullable=False)
    capital_location_lng = db.Column(db.Float, nullable=False)
    capital_name = db.Column(db.String, nullable=False)
    # codes
    alpha2_code = db.Column(db.String(2), unique=True, nullable=False)
    alpha3_code = db.Column(db.String(3), unique=True, nullable=False)
    # currencies
    currencies = db.Column(db.ARRAY(db.JSON), nullable=False)
    # flag
    flag = db.Column(db.String, nullable=False)
    # languages
    languages = db.Column(db.ARRAY(db.JSON), nullable=False)
    # location
    location_lat = db.Column(db.Float, nullable=False)
    location_lng = db.Column(db.Float, nullable=False)
    # name
    name = db.Column(db.String, unique=True, nullable=False)
    # news
    news = db.Column(db.ARRAY(db.JSON), nullable=True)
    # population
    population = db.Column(db.Float, nullable=False)
    # region
    region = db.Column(db.String, nullable=False)
    subregion = db.Column(db.String, nullable=False)
    # regionalBlocs
    regional_blocs = db.Column(db.ARRAY(db.JSON), nullable=False)
    # sources
    sources = db.Column(db.ARRAY(db.JSON), nullable=False)
    # timezones
    timezones = db.Column(db.ARRAY(db.String), nullable=False)

    @staticmethod
    def fix_attributes(attributes):
        """
        Translates the given request attributes into the corresponding columns in
        the database.
        """
        attr_to_cols = {
            "alternateNames": [Countries.alternate_names],
            "area": [Countries.area],
            "borders": [Countries.borders],
            "callingCodes": [Countries.calling_codes],
            "capital": [
                Countries.capital_img,
                Countries.capital_location_lat,
                Countries.capital_location_lng,
                Countries.capital_name,
            ],
            "codes": [Countries.alpha3_code, Countries.alpha2_code],
            "currencies": [Countries.currencies],
            "flag": [Countries.flag],
            "languages": [Countries.languages],
            "location": [Countries.location_lat, Countries.location_lng],
            "name": [Countries.name],
            "news": [Countries.news],
            "population": [Countries.population],
            "region": [Countries.region],
            "regionalBlocs": [Countries.regional_blocs],
            "sources": [Countries.sources],
            "timezones": [Countries.timezones],
        }
        fixed = list()
        for attribute in attributes:
            fixed += attr_to_cols[attribute]
        return fixed

    @staticmethod
    def retrieve_all(attributes):
        """
        Retrieves all entries from the Countries table in the database, including only the given attributes.
        """
        ret = []
        all_entries = Countries.query.options(load_only(*Countries.fix_attributes(attributes))).all()
        for entry in all_entries:
            ret += [entry.polished(attributes)]
        return ret

    @staticmethod
    def retrieve_by_id(identifier, id_type, attributes):
        """
        Retrieves the entry from the Countries table in the database corresponding
        to the given identifier. id_type should be one of const.Identifier. Only the fields indicated
        by attributes are included in the retrieval.
        """
        entry = None
        fixed_attr = Countries.fix_attributes(attributes)
        if id_type == const.Identifier.COUNTRY_NAME:
            entry = Countries.query.filter_by(name=identifier).options(load_only(*fixed_attr)).first()
        elif id_type == const.Identifier.ALPHA3_CODE:
            entry = Countries.query.filter_by(alpha3_code=identifier).options(load_only(*fixed_attr)).first()
        elif id_type == const.Identifier.ALPHA2_CODE:
            entry = Countries.query.filter_by(alpha2_code=identifier).options(load_only(*fixed_attr)).first()
        if entry is not None:
            entry = entry.polished(attributes)
        return entry

    def polished(self, attributes):
        """
        Transforms this Countries database entry into a usable dict with only the given attributes.
        """
        ret = dict()
        if "alternateNames" in attributes:
            ret["alternateNames"] = self.alternate_names
        if "area" in attributes:
            ret["area"] = self.area
        if "borders" in attributes:
            ret["borders"] = self.borders
        if "callingCodes" in attributes:
            ret["callingCodes"] = self.calling_codes
        if "capital" in attributes:
            ret["capital"] = dict()
            capital = ret["capital"]
            capital["location"] = dict()
            capital["img"] = self.capital_img
            capital["location"]["lat"] = self.capital_location_lat
            capital["location"]["lng"] = self.capital_location_lng
            capital["name"] = self.capital_name
        if "codes" in attributes:
            ret["codes"] = dict()
            codes = ret["codes"]
            codes["alpha3Code"] = self.alpha3_code
            codes["alpha2Code"] = self.alpha2_code
        if "currencies" in attributes:
            ret["currencies"] = self.currencies
        if "flag" in attributes:
            ret["flag"] = self.flag
        if "languages" in attributes:
            ret["languages"] = self.languages
        if "location" in attributes:
            ret["location"] = dict()
            location = ret["location"]
            location["lat"] = self.location_lat
            location["lng"] = self.location_lng
        if "name" in attributes:
            ret["name"] = self.name
        if "news" in attributes:
            ret["news"] = self.news
        if "population" in attributes:
            ret["population"] = self.population
        if "region" in attributes:
            ret["region"] = dict()
            region = ret["region"]
            region["region"] = self.region
            region["subregion"] = self.subregion
        if "regionalBlocs" in attributes:
            ret["regionalBlocs"] = self.regional_blocs
        if "sources" in attributes:
            ret["sources"] = self.sources
        if "timezones" in attributes:
            ret["timezones"] = self.timezones
        return ret

    def __repr__(self):
        return self.name + " (" + self.alpha2_code + ", " + self.alpha3_code + ")"


class CaseStatistics(db.Model):
    """
    Database model representing an instance of case statistics.
    """

    id = db.Column(db.Integer, primary_key=True)
    # can retrieve other relevant country data using this ISO code
    country_alpha3_code = db.Column(db.String(3), unique=True, nullable=False)
    # date
    date = db.Column(db.String, nullable=False)
    # derivativeNew
    derivative_new_active = db.Column(db.Float, nullable=False)
    derivative_new_cases = db.Column(db.Float, nullable=False)
    derivative_new_deaths = db.Column(db.Float, nullable=False)
    derivative_new_recovered = db.Column(db.Float, nullable=False)
    # history
    history = db.Column(db.ARRAY(db.JSON), nullable=False)
    # new
    new_active = db.Column(db.Integer, nullable=False)
    new_cases = db.Column(db.Integer, nullable=False)
    new_deaths = db.Column(db.Integer, nullable=False)
    new_recovered = db.Column(db.Integer, nullable=False)
    # percentages
    percent_active = db.Column(db.Float, nullable=False)
    percent_fatality = db.Column(db.Float, nullable=False)
    percent_have_recovered = db.Column(db.Float, nullable=False)
    percent_infected = db.Column(db.Float, nullable=False)
    # smoothedNew
    smoothed_new_cases = db.Column(db.Float, nullable=False)
    smoothed_new_deaths = db.Column(db.Float, nullable=False)
    # sources
    sources = db.Column(db.ARRAY(db.JSON), nullable=False)
    # testing
    new_tests = db.Column(db.JSON, nullable=False)
    new_tests_smoothed = db.Column(db.JSON, nullable=False)
    positive_rate = db.Column(db.JSON, nullable=False)
    total_tests = db.Column(db.JSON, nullable=False)
    # totals
    total_active = db.Column(db.Integer, nullable=False)
    total_cases = db.Column(db.Integer, nullable=False)
    total_deaths = db.Column(db.Integer, nullable=False)
    total_recovered = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return self.country_alpha3_code + " " + self.date + " " + str(self.total_cases)


class RiskFactorStatistics(db.Model):
    """
    Database model representing an instance of risk factor statistics.
    """

    id = db.Column(db.Integer, primary_key=True)
    # can retrieve other relevant country data using this ISO code
    country_alpha3_code = db.Column(db.String(3), unique=True, nullable=False)
    # aged65Older
    aged_65_older = db.Column(db.Float, nullable=True)
    # aged70Older
    aged_70_older = db.Column(db.Float, nullable=True)
    # cardiovascDeathRate
    cardiovascular_death_rate = db.Column(db.Float, nullable=True)
    # diabetesPrevalence
    diabetes_prevalence = db.Column(db.Float, nullable=True)
    # extremePovertyRate
    extreme_poverty_rate = db.Column(db.Float, nullable=True)
    # femaleSmokers
    female_smokers = db.Column(db.Float, nullable=True)
    # gdpPerCapita
    gdp_per_capita = db.Column(db.Float, nullable=True)
    # gini
    gini = db.Column(db.Float, nullable=True)
    # handwashingFacilities
    handwashing_facilities = db.Column(db.Float, nullable=True)
    # hospitalBedsPerThousand
    hospital_beds_per_thousand = db.Column(db.Float, nullable=True)
    # humanDevelopmentIndex
    human_development_index = db.Column(db.Float, nullable=True)
    # lifeExpectancy
    life_expectancy = db.Column(db.Float, nullable=True)
    # maleSmokers
    male_smokers = db.Column(db.Float, nullable=True)
    # medianAge
    median_age = db.Column(db.Float, nullable=True)
    # populationDensity
    population_density = db.Column(db.Float, nullable=True)
    # sources
    sources = db.Column(db.ARRAY(db.JSON), nullable=False)

    def __repr__(self):
        return self.country_alpha3_code + " " + str(self.gdp_per_capita) + " " + str(self.aged_70_older)


"""
The following "models" are just for storing global news and stats in the database
and there should only ever be a single row per corresponding table.
"""


class GlobalNews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    news = db.Column(db.ARRAY(db.JSON), nullable=False)

    def __repr__(self):
        return str(self.news)


class GlobalStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # totals
    total_cases = db.Column(db.Integer, nullable=False)
    total_deaths = db.Column(db.Integer, nullable=False)
    total_recovered = db.Column(db.Integer, nullable=False)
    total_active = db.Column(db.Integer, nullable=False)
    # new
    new_cases = db.Column(db.Integer, nullable=False)
    new_deaths = db.Column(db.Integer, nullable=False)
    new_recovered = db.Column(db.Integer, nullable=False)
    new_active = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return str(self.total_cases) + " " + str(self.new_cases)
