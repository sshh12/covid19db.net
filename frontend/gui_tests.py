"""
GUI Tests

Requires:
  $ pip install selenium==3.141.0
  And https://chromedriver.chromium.org/downloads
"""
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class TestCovidDBGUI(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def visit_website(self):
        self.driver.get("https://covid19db.net/")

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()