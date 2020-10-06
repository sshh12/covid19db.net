#!/usr/bin/python
"""
Defines all of the constant values relevant to the backend
"""

# Data collection config
OWID_DATASET_URL = "https://covid.ourworldindata.org/data/owid-covid-data.json"
REST_COUNTRIES_API_URL = "https://restcountries.eu/rest/v2"
NEWS_API_URL = "https://newsapi.org/v2"
NEWS_API_VALID_COUNTRIES = frozenset(
    {
        "ae",
        "ar",
        "at",
        "au",
        "be",
        "bg",
        "br",
        "ca",
        "ch",
        "cn",
        "co",
        "cu",
        "cz",
        "de",
        "eg",
        "fr",
        "gb",
        "gr",
        "hk",
        "hu",
        "id",
        "ie",
        "il",
        "in",
        "it",
        "jp",
        "kr",
        "lt",
        "lv",
        "ma",
        "mx",
        "my",
        "ng",
        "nl",
        "no",
        "nz",
        "ph",
        "pl",
        "pt",
        "ro",
        "rs",
        "ru",
        "sa",
        "se",
        "sg",
        "si",
        "sk",
        "th",
        "tr",
        "tw",
        "ua",
        "us",
        "ve",
        "za",
    }
)
COVID19_API_URL = "https://api.covid19api.com"
