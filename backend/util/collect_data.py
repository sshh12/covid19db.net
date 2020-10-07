#!/usr/bin/python
"""
Used to setup a directory called "data" with subdirectories "countries",
"case-statistics", and "risk-factor-statistics". Subsequently collects the necessary
data for all instances of each model and creates separate files within each subdirectory
corresponding to the relevant country. The intent of the script is not to then serve
the created .json files, but rather use them to cleanly setup the database multiple
times if necessary without wasting additional API calls.

Example:
/data
    /countries
        ...
        USA.json
        ...
    /case-statistics
        ...
        USA.json
        ...
    /risk-factor-statistics
        ...
        USA.json
        ...
"""

import os
import copy
import json
from pathlib import Path

import requests
import config
from requests.exceptions import HTTPError

DIR_PATH = os.path.dirname(os.path.realpath(__file__))
DATA_PATH = os.path.join(DIR_PATH, "../data")


def create_directories():
    """
    Creates the directory structure shown above
    """
    print("Creating directories")
    try:
        os.mkdir(DATA_PATH)
    # Used to ensure that someone does not accidentally update the data when it already exists
    except FileExistsError:
        print("Data directory already exists. Please delete it and re-run this script.")
        raise
    sub_dirs = frozenset({"countries", "case-statistics", "risk-factor-statistics"})
    for sub_dir in sub_dirs:
        sub_dir_path = os.path.join(DATA_PATH, sub_dir)
        try:
            os.makedirs(sub_dir_path)
        except FileExistsError:
            print(os.path.join("data", sub_dir) + " already exists.")
            raise


def get_request(url, params=None, headers=None, allow_error=False):
    """
    Makes a get request for the given url and returns the parsed json result
    """
    response = None
    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        response = response.json()
    except HTTPError:
        response = None
        if not allow_error:
            print("Failed to get resource located at: " + url)
            raise
    return response


def get_field(data, field):
    """
    Returns the given field in data or None if it is not present.
    """
    if field in data:
        return data[field]
    return None


def build_country(country_data):
    """
    Creates a dict describing all of the relevant attributes of a country
    instance and returns it.
    country_data - a response from REST Countries
    """
    # remove unnecessary fields
    country_data.pop("topLevelDomain", None)
    country_data.pop("demonym", None)
    country_data.pop("gini", None)
    country_data.pop("nativeName", None)
    country_data.pop("numericCode", None)
    country_data.pop("translations", None)
    country_data.pop("cioc", None)
    # reorganize fields
    country_data["codes"] = {"alpha2Code": country_data.pop("alpha2Code"), "alpha3Code": country_data.pop("alpha3Code")}
    code = country_data["codes"]["alpha3Code"]
    # read capital data and insert into this country instance
    capital_data_dir = Path(DIR_PATH) / "../capital_data" / code
    capital_info = json.load((capital_data_dir / (code + ".json")).open())
    location = capital_info["candidates"][0]["geometry"]["location"]
    country_data["capital"] = {
        "name": country_data.pop("capital"),
        "location": {"lat": location["lat"], "lng": location["lng"]},
        "img": config.OUR_API_URL + "/images/capitals/" + capital_info["image_name"],
    }
    country_data["alternateNames"] = country_data.pop("altSpellings")
    country_data["region"] = {"region": country_data.pop("region"), "subregion": country_data.pop("subregion")}
    latlng = country_data.pop("latlng")
    country_data["location"] = {"lat": latlng[0], "lng": latlng[1]}
    # TODO: use News API to later populate news field
    country_data["news"] = None
    country_data["sources"] = [
        {
            "name": "REST Countries",
            "url": config.REST_COUNTRIES_API_URL + "/alpha/" + code,
        },
        {"name": "Google Places API", "url": "https://maps.googleapis.com/maps/api/place"},
        {"name": "NewsAPI", "url": config.NEWS_API_URL},
    ]
    return country_data


def build_risk_factor_statistics(country_data, owid_data):
    """
    Creates a dict describing all of the relevant attributes of an instance
    of risk factor statistics and returns it.
    country_data - a response from REST Countries
    owid_data - the matching entry in the OWID dataset for the given country
    """
    rfs_data = dict()
    rfs_data["country"] = {
        "codes": {"alpha2Code": country_data["alpha2Code"], "alpha3Code": country_data["alpha3Code"]},
        "name": country_data["name"],
    }
    rfs_data["location"] = {"lat": country_data["latlng"][0], "lng": country_data["latlng"][1]}
    rfs_data["populationDensity"] = get_field(owid_data, "population_density")
    rfs_data["medianAge"] = get_field(owid_data, "median_age")
    rfs_data["aged65Older"] = get_field(owid_data, "aged_65_older")
    rfs_data["aged70Older"] = get_field(owid_data, "aged_70_older")
    rfs_data["gdpPerCapita"] = get_field(owid_data, "gdp_per_capita")
    rfs_data["gini"] = get_field(country_data, "gini")
    rfs_data["extremePovertyRate"] = get_field(owid_data, "extreme_poverty")
    rfs_data["cardiovascDeathRate"] = get_field(owid_data, "cardiovasc_death_rate")
    rfs_data["diabetesPrevalence"] = get_field(owid_data, "diabetes_prevalence")
    rfs_data["femaleSmokers"] = get_field(owid_data, "female_smokers")
    rfs_data["maleSmokers"] = get_field(owid_data, "male_smokers")
    rfs_data["hospitalBedsPerThousand"] = get_field(owid_data, "hospital_beds_per_thousand")
    rfs_data["lifeExpectancy"] = get_field(owid_data, "life_expectancy")
    rfs_data["humanDevelopmentIndex"] = get_field(owid_data, "human_development_index")
    rfs_data["handwashingFacilities"] = get_field(owid_data, "handwashing_facilities")
    rfs_data["sources"] = [
        {"name": "REST Countries", "url": config.REST_COUNTRIES_API_URL + "/alpha/" + country_data["alpha3Code"]},
        {"name": "OWID COVID-19 dataset", "url": config.OWID_DATASET_URL},
    ]
    return rfs_data


def build_case_statistics(country_data, case_data, owid_data):
    """
    Creates a dict describing all of the relevant attributes of an instance
    of case statistics and returns it.
    country_data - a response from REST Countries
    case_data - a response from COVID-19 API
    owid_data - the matching entry in the OWID dataset for the given country
    """
    total_population = country_data["population"]
    last_reported_data = case_data[-1]
    recent_reported_data = case_data[-9:]
    cs_data = dict()
    cs_data["country"] = {
        "codes": {"alpha2Code": country_data["alpha2Code"], "alpha3Code": country_data["alpha3Code"]},
        "name": country_data["name"],
    }
    cs_data["location"] = {"lat": country_data["latlng"][0], "lng": country_data["latlng"][1]}
    cs_data["date"] = last_reported_data["Date"][:10]
    cs_data["totals"] = {
        "cases": last_reported_data["Confirmed"],
        "deaths": last_reported_data["Deaths"],
        "recovered": last_reported_data["Recovered"],
        "active": last_reported_data["Active"],
    }
    cs_data["new"] = {
        "cases": last_reported_data["Confirmed"] - recent_reported_data[-2]["Confirmed"],
        "deaths": last_reported_data["Deaths"] - recent_reported_data[-2]["Deaths"],
        "recovered": last_reported_data["Recovered"] - recent_reported_data[-2]["Recovered"],
        "active": last_reported_data["Active"] - recent_reported_data[-2]["Active"],
    }
    cs_data["smoothedNew"] = {
        "cases": owid_data["data"][-1]["new_cases_smoothed"],
        "deaths": owid_data["data"][-1]["new_deaths_smoothed"],
    }
    cs_data["percentages"] = {
        "fatality": cs_data["totals"]["deaths"] / cs_data["totals"]["cases"] * 100,
        "infected": cs_data["totals"]["cases"] / total_population * 100,
        "haveRecovered": cs_data["totals"]["recovered"] / cs_data["totals"]["cases"] * 100,
        "active": cs_data["totals"]["active"] / cs_data["totals"]["cases"] * 100,
    }
    cs_data["derivativeNew"] = {"cases": 0, "deaths": 0, "recovered": 0, "active": 0}
    # calculate 7-day rolling average of derivateNew
    for i in range(0, len(recent_reported_data) - 2):
        prev_data = recent_reported_data[i]
        cur_data = recent_reported_data[i + 1]
        next_data = recent_reported_data[i + 2]
        cs_data["derivativeNew"]["cases"] += (next_data["Confirmed"] - cur_data["Confirmed"]) - (
            cur_data["Confirmed"] - prev_data["Confirmed"]
        )
        cs_data["derivativeNew"]["deaths"] += (next_data["Deaths"] - cur_data["Deaths"]) - (
            cur_data["Deaths"] - prev_data["Deaths"]
        )
        cs_data["derivativeNew"]["recovered"] += (next_data["Recovered"] - cur_data["Recovered"]) - (
            cur_data["Recovered"] - prev_data["Recovered"]
        )
        cs_data["derivativeNew"]["active"] += (next_data["Active"] - cur_data["Active"]) - (
            cur_data["Active"] - prev_data["Active"]
        )
    # len(recent_reported_data) - 2 is expected to be 7
    cs_data["derivativeNew"]["cases"] /= len(recent_reported_data) - 2
    cs_data["derivativeNew"]["deaths"] /= len(recent_reported_data) - 2
    cs_data["derivativeNew"]["recovered"] /= len(recent_reported_data) - 2
    cs_data["derivativeNew"]["active"] /= len(recent_reported_data) - 2
    testing_data = {
        "newTests": {"date": None, "value": None},
        "totalTests": {"date": None, "value": None},
        "newTestsSmoothed": {"date": None, "value": None},
        "positiveRate": {"date": None, "value": None},
    }
    # testing data is very sparse
    for entry in owid_data["data"]:
        date = entry["date"]
        if "new_tests" in entry:
            testing_data["newTests"]["value"] = entry["new_tests"]
            testing_data["newTests"]["date"] = date
        if "total_tests" in entry:
            testing_data["totalTests"]["value"] = entry["total_tests"]
            testing_data["totalTests"]["date"] = date
        if "new_tests_smoothed" in entry:
            testing_data["newTestsSmoothed"]["value"] = entry["new_tests_smoothed"]
            testing_data["newTestsSmoothed"]["date"] = date
        if "positive_rate" in entry:
            testing_data["positiveRate"]["value"] = entry["positive_rate"]
            testing_data["positiveRate"]["date"] = date
    cs_data["testing"] = testing_data
    cs_data["history"] = case_data
    # remove unnecessary fields from historical data entries
    for entry in cs_data["history"]:
        entry.pop("CountryCode", None)
        entry.pop("Province", None)
        entry.pop("City", None)
        entry.pop("CityCode", None)
        entry.pop("Lat", None)
        entry.pop("Lon", None)
        entry["Date"] = entry["Date"][:10]
    cs_data["sources"] = [
        {"name": "REST Countries", "url": config.REST_COUNTRIES_API_URL + "/alpha/" + country_data["alpha3Code"]},
        {"name": "OWID COVID-19 dataset", "url": config.OWID_DATASET_URL},
        {"name": "COVID-19 API", "url": config.COVID19_API_URL + "/total/country/" + country_data["alpha3Code"]},
    ]
    return cs_data


def populate_directories():
    """
    Pulls all the necessary data from the APIs and other data sources in order
    to populate the directories with the data that will be inserted into the database
    """
    print("Getting OWID dataset")
    owid_data = get_request(config.OWID_DATASET_URL)
    print("Successfully retrieved OWID dataset")
    print("Getting entire REST Countries dataset")
    countries_data = get_request(config.REST_COUNTRIES_API_URL + "/all")
    print("Successfully retrieved REST Countries dataset")
    print("Creating instance files")
    cnt = 0
    for key in owid_data.keys():
        alpha3_code = key
        # special cases for KOS and WRL
        if alpha3_code == "OWID_KOS":
            alpha3_code = "KOS"
        elif alpha3_code == "OWID_WRL":
            continue
        country_data = None
        for country in countries_data:
            if country["alpha3Code"] == alpha3_code:
                country_data = country
                break
        # continue if fail to retrieve country data
        if country_data is None:
            print(alpha3_code + " does not have a REST Countries entry")
            continue
        case_data = get_request(config.COVID19_API_URL + "/total/country/" + alpha3_code, allow_error=True)
        # continue if fail to retrieve case statistics data
        if case_data is None or len(case_data) < 9:
            print(alpha3_code + " does not have a COVID-19 API entry")
            continue
        # replace country name with most common name
        country_data["name"] = owid_data[key]["location"]
        print(country_data["name"] + " (" + country_data["alpha3Code"] + ")")
        country_instance = build_country(copy.deepcopy(country_data))
        rfs_instance = build_risk_factor_statistics(country_data, owid_data[key])
        cs_instance = build_case_statistics(country_data, case_data, owid_data[key])
        # write instances to json files
        # country file
        file = open(os.path.join(DATA_PATH, "countries/" + alpha3_code + ".json"), "w")
        json.dump(country_instance, file, ensure_ascii=False, sort_keys=True)
        file.close()
        # risk factor statistics file
        file = open(os.path.join(DATA_PATH, "risk-factor-statistics/") + alpha3_code + ".json", "w")
        json.dump(rfs_instance, file, ensure_ascii=False, sort_keys=True)
        file.close()
        # case statistics file
        file = open(os.path.join(DATA_PATH, "case-statistics/") + alpha3_code + ".json", "w")
        json.dump(cs_instance, file, ensure_ascii=False, sort_keys=True)
        file.close()
        cnt += 1
    print("Finished processing " + str(cnt) + " countries")


if __name__ == "__main__":
    create_directories()
    populate_directories()
