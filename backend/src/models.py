"""
Definitions for database models (tables).
"""

from . import db


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
