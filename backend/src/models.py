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
    codes_alpha2_code = db.Column(db.String(2), unique=True, nullable=False)
    codes_alpha3_code = db.Column(db.String(3), unique=True, nullable=False)
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
    population = db.Column(db.BigInteger, nullable=False)
    # region
    region_region = db.Column(db.String, nullable=False)
    region_subregion = db.Column(db.String, nullable=False)
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
            "codes": [Countries.codes_alpha2_code, Countries.codes_alpha3_code],
            "currencies": [Countries.currencies],
            "flag": [Countries.flag],
            "languages": [Countries.languages],
            "location": [Countries.location_lat, Countries.location_lng],
            "name": [Countries.name],
            "news": [Countries.news],
            "population": [Countries.population],
            "region": [Countries.region_region, Countries.region_subregion],
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
        elif id_type == const.Identifier.ALPHA2_CODE:
            entry = Countries.query.filter_by(codes_alpha2_code=identifier).options(load_only(*fixed_attr)).first()
        elif id_type == const.Identifier.ALPHA3_CODE:
            entry = Countries.query.filter_by(codes_alpha3_code=identifier).options(load_only(*fixed_attr)).first()
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
            codes["alpha2Code"] = self.codes_alpha2_code
            codes["alpha3Code"] = self.codes_alpha3_code
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
            region["region"] = self.region_region
            region["subregion"] = self.region_subregion
        if "regionalBlocs" in attributes:
            ret["regionalBlocs"] = self.regional_blocs
        if "sources" in attributes:
            ret["sources"] = self.sources
        if "timezones" in attributes:
            ret["timezones"] = self.timezones
        return ret

    def __repr__(self):
        return self.name + " (" + self.codes_alpha2_code + ", " + self.codes_alpha3_code + ")"


class CaseStatistics(db.Model):
    """
    Database model representing an instance of case statistics.
    """

    id = db.Column(db.Integer, primary_key=True)
    # country
    country_codes_alpha2_code = db.Column(db.String(2), unique=True, nullable=False)
    country_codes_alpha3_code = db.Column(db.String(3), unique=True, nullable=False)
    country_name = db.Column(db.String, unique=True, nullable=False)
    # date
    date = db.Column(db.String, nullable=False)
    # derivativeNew
    derivative_new_active = db.Column(db.Float, nullable=False)
    derivative_new_cases = db.Column(db.Float, nullable=False)
    derivative_new_deaths = db.Column(db.Float, nullable=False)
    derivative_new_recovered = db.Column(db.Float, nullable=False)
    # history
    history = db.Column(db.ARRAY(db.JSON), nullable=False)
    # location
    location_lat = db.Column(db.Float, nullable=False)
    location_lng = db.Column(db.Float, nullable=False)
    # new
    new_active = db.Column(db.BigInteger, nullable=False)
    new_cases = db.Column(db.BigInteger, nullable=False)
    new_deaths = db.Column(db.BigInteger, nullable=False)
    new_recovered = db.Column(db.BigInteger, nullable=False)
    # percentages
    percentages_active = db.Column(db.Float, nullable=False)
    percentages_fatality = db.Column(db.Float, nullable=False)
    percentages_have_recovered = db.Column(db.Float, nullable=False)
    percentages_infected = db.Column(db.Float, nullable=False)
    # smoothedNew
    smoothed_new_cases = db.Column(db.Float, nullable=False)
    smoothed_new_deaths = db.Column(db.Float, nullable=False)
    # sources
    sources = db.Column(db.ARRAY(db.JSON), nullable=False)
    # testing
    testing_new_tests = db.Column(db.JSON, nullable=False)
    testing_new_tests_smoothed = db.Column(db.JSON, nullable=False)
    testing_positive_rate = db.Column(db.JSON, nullable=False)
    testing_total_tests = db.Column(db.JSON, nullable=False)
    # totals
    totals_active = db.Column(db.BigInteger, nullable=False)
    totals_cases = db.Column(db.BigInteger, nullable=False)
    totals_deaths = db.Column(db.BigInteger, nullable=False)
    totals_recovered = db.Column(db.BigInteger, nullable=False)

    @staticmethod
    def fix_attributes(attributes):
        """
        Translates the given request attributes into the corresponding columns in
        the database.
        """
        attr_to_cols = {
            "country": [
                CaseStatistics.country_name,
                CaseStatistics.country_codes_alpha2_code,
                CaseStatistics.country_codes_alpha3_code,
            ],
            "date": [CaseStatistics.date],
            "derivativeNew": [
                CaseStatistics.derivative_new_active,
                CaseStatistics.derivative_new_cases,
                CaseStatistics.derivative_new_deaths,
                CaseStatistics.derivative_new_recovered,
            ],
            "history": [CaseStatistics.history],
            "location": [CaseStatistics.location_lat, CaseStatistics.location_lng],
            "new": [
                CaseStatistics.new_active,
                CaseStatistics.new_cases,
                CaseStatistics.new_deaths,
                CaseStatistics.new_recovered,
            ],
            "percentages": [
                CaseStatistics.percentages_active,
                CaseStatistics.percentages_fatality,
                CaseStatistics.percentages_have_recovered,
                CaseStatistics.percentages_infected,
            ],
            "smoothedNew": [CaseStatistics.smoothed_new_cases, CaseStatistics.smoothed_new_deaths],
            "sources": [CaseStatistics.sources],
            "testing": [
                CaseStatistics.testing_new_tests,
                CaseStatistics.testing_new_tests_smoothed,
                CaseStatistics.testing_positive_rate,
                CaseStatistics.testing_total_tests,
            ],
            "totals": [
                CaseStatistics.totals_active,
                CaseStatistics.totals_cases,
                CaseStatistics.totals_deaths,
                CaseStatistics.totals_recovered,
            ],
        }
        fixed = list()
        for attribute in attributes:
            fixed += attr_to_cols[attribute]
        return fixed

    @staticmethod
    def retrieve_all(attributes):
        """
        Retrieves all entries from the Case Statistics table in the database, including only the given attributes.
        """
        ret = []
        all_entries = CaseStatistics.query.options(load_only(*CaseStatistics.fix_attributes(attributes))).all()
        for entry in all_entries:
            ret += [entry.polished(attributes)]
        return ret

    @staticmethod
    def retrieve_by_id(identifier, id_type, attributes):
        """
        Retrieves the entry from the Case Statistics table in the database corresponding
        to the given identifier. id_type should be one of const.Identifier. Only the fields indicated
        by attributes are included in the retrieval.
        """
        entry = None
        fixed_attr = CaseStatistics.fix_attributes(attributes)
        if id_type == const.Identifier.COUNTRY_NAME:
            entry = CaseStatistics.query.filter_by(country_name=identifier).options(load_only(*fixed_attr)).first()
        elif id_type == const.Identifier.ALPHA2_CODE:
            entry = (
                CaseStatistics.query.filter_by(country_codes_alpha2_code=identifier)
                .options(load_only(*fixed_attr))
                .first()
            )
        elif id_type == const.Identifier.ALPHA3_CODE:
            entry = (
                CaseStatistics.query.filter_by(country_codes_alpha3_code=identifier)
                .options(load_only(*fixed_attr))
                .first()
            )
        if entry is not None:
            entry = entry.polished(attributes)
        return entry

    def polished(self, attributes):
        """
        Transforms this Case Statistics database entry into a usable dict with only the given attributes.
        """
        ret = dict()
        if "country" in attributes:
            ret["country"] = dict()
            country = ret["country"]
            country["name"] = self.country_name
            country["codes"] = dict()
            country["codes"]["alpha2Code"] = self.country_codes_alpha2_code
            country["codes"]["alpha3Code"] = self.country_codes_alpha3_code
        if "date" in attributes:
            ret["date"] = self.date
        if "derivativeNew" in attributes:
            ret["derivativeNew"] = dict()
            derNew = ret["derivativeNew"]
            derNew["active"] = self.derivative_new_active
            derNew["cases"] = self.derivative_new_cases
            derNew["deaths"] = self.derivative_new_deaths
            derNew["recovered"] = self.derivative_new_recovered
        if "history" in attributes:
            ret["history"] = self.history
        if "location" in attributes:
            ret["location"] = dict()
            ret["location"]["lat"] = self.location_lat
            ret["location"]["lng"] = self.location_lng
        if "new" in attributes:
            ret["new"] = dict()
            new = ret["new"]
            new["active"] = self.new_active
            new["cases"] = self.new_cases
            new["deaths"] = self.new_deaths
            new["recovered"] = self.new_recovered
        if "percentages" in attributes:
            ret["percentages"] = dict()
            percentages = ret["percentages"]
            percentages["active"] = self.percentages_active
            percentages["fatality"] = self.percentages_fatality
            percentages["haveRecovered"] = self.percentages_have_recovered
            percentages["infected"] = self.percentages_infected
        if "smoothedNew" in attributes:
            ret["smoothedNew"] = dict()
            smoothedNew = ret["smoothedNew"]
            smoothedNew["cases"] = self.smoothed_new_cases
            smoothedNew["deaths"] = self.smoothed_new_deaths
        if "sources" in attributes:
            ret["sources"] = self.sources
        if "testing" in attributes:
            ret["testing"] = dict()
            testing = ret["testing"]
            testing["newTests"] = self.testing_new_tests
            testing["newTestsSmoothed"] = self.testing_new_tests_smoothed
            testing["positiveRate"] = self.testing_positive_rate
            testing["totalTests"] = self.testing_total_tests
        if "totals" in attributes:
            ret["totals"] = dict()
            totals = ret["totals"]
            totals["active"] = self.totals_active
            totals["cases"] = self.totals_cases
            totals["deaths"] = self.totals_deaths
            totals["recovered"] = self.totals_recovered
        return ret

    def __repr__(self):
        return self.country_codes_alpha3_code + " " + self.date + " " + str(self.totals_cases)


class RiskFactorStatistics(db.Model):
    """
    Database model representing an instance of risk factor statistics.
    """

    id = db.Column(db.Integer, primary_key=True)
    # aged65Older
    aged_65_older = db.Column(db.Float, nullable=True)
    # aged70Older
    aged_70_older = db.Column(db.Float, nullable=True)
    # cardiovascDeathRate
    cardiovascular_death_rate = db.Column(db.Float, nullable=True)
    # country
    country_codes_alpha2_code = db.Column(db.String(2), unique=True, nullable=False)
    country_codes_alpha3_code = db.Column(db.String(3), unique=True, nullable=False)
    country_name = db.Column(db.String, unique=True, nullable=False)
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
    # location
    location_lat = db.Column(db.Float, nullable=False)
    location_lng = db.Column(db.Float, nullable=False)
    # maleSmokers
    male_smokers = db.Column(db.Float, nullable=True)
    # medianAge
    median_age = db.Column(db.Float, nullable=True)
    # populationDensity
    population_density = db.Column(db.Float, nullable=True)
    # sources
    sources = db.Column(db.ARRAY(db.JSON), nullable=False)

    @staticmethod
    def fix_attributes(attributes):
        """
        Translates the given request attributes into the corresponding columns in
        the database.
        """
        attr_to_cols = {
            "aged65Older": [RiskFactorStatistics.aged_65_older],
            "aged70Older": [RiskFactorStatistics.aged_70_older],
            "cardiovascDeathRate": [RiskFactorStatistics.cardiovascular_death_rate],
            "country": [
                RiskFactorStatistics.country_name,
                RiskFactorStatistics.country_codes_alpha2_code,
                RiskFactorStatistics.country_codes_alpha3_code,
            ],
            "diabetesPrevalence": [RiskFactorStatistics.diabetes_prevalence],
            "extremePovertyRate": [RiskFactorStatistics.extreme_poverty_rate],
            "femaleSmokers": [RiskFactorStatistics.female_smokers],
            "gdpPerCapita": [RiskFactorStatistics.gdp_per_capita],
            "gini": [RiskFactorStatistics.gini],
            "handwashingFacilities": [RiskFactorStatistics.handwashing_facilities],
            "hospitalBedsPerThousand": [RiskFactorStatistics.hospital_beds_per_thousand],
            "humanDevelopmentIndex": [RiskFactorStatistics.human_development_index],
            "lifeExpectancy": [RiskFactorStatistics.life_expectancy],
            "location": [RiskFactorStatistics.location_lat, RiskFactorStatistics.location_lng],
            "maleSmokers": [RiskFactorStatistics.male_smokers],
            "medianAge": [RiskFactorStatistics.median_age],
            "populationDensity": [RiskFactorStatistics.population_density],
            "sources": [RiskFactorStatistics.sources],
        }
        fixed = list()
        for attribute in attributes:
            fixed += attr_to_cols[attribute]
        return fixed

    @staticmethod
    def retrieve_all(attributes):
        """
        Retrieves all entries from the Risk Factor Statistics table in the database, including only the given attributes.
        """
        ret = []
        all_entries = RiskFactorStatistics.query.options(
            load_only(*RiskFactorStatistics.fix_attributes(attributes))
        ).all()
        for entry in all_entries:
            ret += [entry.polished(attributes)]
        return ret

    @staticmethod
    def retrieve_by_id(identifier, id_type, attributes):
        """
        Retrieves the entry from the Risk Factor Statistics table in the database corresponding
        to the given identifier. id_type should be one of const.Identifier. Only the fields indicated
        by attributes are included in the retrieval.
        """
        entry = None
        fixed_attr = RiskFactorStatistics.fix_attributes(attributes)
        if id_type == const.Identifier.COUNTRY_NAME:
            entry = (
                RiskFactorStatistics.query.filter_by(country_name=identifier).options(load_only(*fixed_attr)).first()
            )
        elif id_type == const.Identifier.ALPHA2_CODE:
            entry = (
                RiskFactorStatistics.query.filter_by(country_codes_alpha2_code=identifier)
                .options(load_only(*fixed_attr))
                .first()
            )
        elif id_type == const.Identifier.ALPHA3_CODE:
            entry = (
                RiskFactorStatistics.query.filter_by(country_codes_alpha3_code=identifier)
                .options(load_only(*fixed_attr))
                .first()
            )
        if entry is not None:
            entry = entry.polished(attributes)
        return entry

    def polished(self, attributes):
        """
        Transforms this Risk Factor Statistics database entry into a usable dict with only the given attributes.
        """
        ret = dict()
        if "aged65Older" in attributes:
            ret["aged65Older"] = self.aged_65_older
        if "aged70Older" in attributes:
            ret["aged70Older"] = self.aged_70_older
        if "cardiovascDeathRate" in attributes:
            ret["cardiovascDeathRate"] = self.cardiovascular_death_rate
        if "country" in attributes:
            ret["country"] = dict()
            country = ret["country"]
            country["name"] = self.country_name
            country["codes"] = dict()
            country["codes"]["alpha2Code"] = self.country_codes_alpha2_code
            country["codes"]["alpha3Code"] = self.country_codes_alpha3_code
        if "diabetesPrevalence" in attributes:
            ret["diabetesPrevalence"] = self.diabetes_prevalence
        if "extremePovertyRate" in attributes:
            ret["extremePovertyRate"] = self.extreme_poverty_rate
        if "femaleSmokers" in attributes:
            ret["femaleSmokers"] = self.female_smokers
        if "gdpPerCapita" in attributes:
            ret["gdpPerCapita"] = self.gdp_per_capita
        if "gini" in attributes:
            ret["gini"] = self.gini
        if "handwashingFacilities" in attributes:
            ret["handwashingFacilities"] = self.handwashing_facilities
        if "hospitalBedsPerThousand" in attributes:
            ret["hospitalBedsPerThousand"] = self.hospital_beds_per_thousand
        if "humanDevelopmentIndex" in attributes:
            ret["humanDevelopmentIndex"] = self.human_development_index
        if "lifeExpectancy" in attributes:
            ret["lifeExpectancy"] = self.life_expectancy
        if "location" in attributes:
            ret["location"] = dict()
            ret["location"]["lat"] = self.location_lat
            ret["location"]["lng"] = self.location_lng
        if "maleSmokers" in attributes:
            ret["maleSmokers"] = self.male_smokers
        if "medianAge" in attributes:
            ret["medianAge"] = self.median_age
        if "populationDensity" in attributes:
            ret["populationDensity"] = self.population_density
        if "sources" in attributes:
            ret["sources"] = self.sources
        return ret

    def __repr__(self):
        return self.country_codes_alpha3_code + " " + str(self.gini) + " " + str(self.gdp_per_capita)


"""
The following "models" are just for storing global news and stats in the database
and there should only ever be a single row per corresponding table.
"""


class GlobalNews(db.Model):
    """
    Database model representing a list of global COVID-19 news.
    """

    id = db.Column(db.Integer, primary_key=True)
    news = db.Column(db.ARRAY(db.JSON), nullable=False)

    @staticmethod
    def retrieve():
        """
        Retrieves global news from the database and returns it.
        """
        return GlobalNews.query.first().polished()

    def polished(self):
        """
        Transforms the raw properties of this class into a more usable dict.
        """
        return self.news

    def __repr__(self):
        return str(self.news)


class GlobalStats(db.Model):
    """
    Database model containing global COVID-19 statistics.
    """

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

    @staticmethod
    def retrieve():
        """
        Retrieves global statistics from the database and returns it.
        """
        return GlobalStats.query.first().polished()

    def polished(self):
        """
        Transforms the raw properties of this class into a more usable dict
        """
        ret = dict()
        ret["totals"] = dict()
        ret["totals"]["cases"] = self.total_cases
        ret["totals"]["deaths"] = self.total_deaths
        ret["totals"]["recovered"] = self.total_recovered
        ret["totals"]["active"] = self.total_active
        ret["new"] = dict()
        ret["new"]["cases"] = self.new_cases
        ret["new"]["deaths"] = self.new_deaths
        ret["new"]["recovered"] = self.new_recovered
        ret["new"]["active"] = self.new_active
        return ret

    def __repr__(self):
        return str(self.total_cases) + " " + str(self.new_cases)
