# COVID-19 DB API Documentation

API: https://api.covid19db.net

Postman collection: https://documenter.getpostman.com/view/12799044/TVKJxuP4

## Country Endpoints

### GET

Retrieve all instances of countries.

- `/countries`


Retrieve a country instance. See the `identifier` parameter.

- `/countries/:identifier`

### Parameters

#### Query parameters

- `attributes`
    - **Query parameter**
    - **NOT REQUIRED**
    - Specifies which attributes of the country instance(s) to include in the response.
    - Separate multiple desired attributes by commas.
    - If omitted, all fields are included.
    - The `name` and `codes` attributes are always included in the response.
    - Options
        - `callingCodes`
        - `capital`
        - `alternateNames`
        - `region`
        - `population`
        - `location`
        - `area`
        - `timezones`
        - `borders`
        - `currencies`
        - `languages`
        - `flag`
        - `regionalBlocs`
        - `news`

#### Path parameters

- `identifier`
    - **Path parameter**
    - **REQUIRED**
    - Specifies the instance to select based on the relevant country.
    - See below for a full list of valid identifiers.

## Case Statistics Endpoints

### GET

Retrieve all instances of case statistics.

- `/case-statistics`

Retrieve an instance of case statistics. See the `identifier` parameter.

- `/case-statistics/:identifier`

### Parameters

#### Query parameters

- `attributes`
    - **Query parameter**
    - **NOT REQUIRED**
    - Specifies which attributes of the case statistics instance(s) to include in the response.
    - Separate multiple desired attributes by commas.
    - If omitted, all fields are included.
    - The `country` and `date` attributes are always included in the response.
    - Options
        - `location`
        - `totals`
        - `new`
        - `smoothedNew`
        - `percentages`
        - `derivativeNew`
        - `history`

#### Path parameters

- `identifier`
    - **Path parameter**
    - **REQUIRED**
    - Specifies the instance to select based on the relevant country.
    - See below for a full list of valid identifiers.

## Risk Factor Statistics Endpoints

### GET

Retrieve all instances of risk factor statistics.

- `/risk-factor-statistics`

Retireve an instance of risk factor statistics. See the `identifier` parameter.

- `/risk-factor-statistics/:identifier`

### Parameters

#### Query parameters

- `attributes`
    - **Query parameter**
    - **NOT REQUIRED**
    - Specifies which attributes of the risk factor statistics instance(s) to include in the response.
    - Separate multiple desired attributes by commas.
    - If omitted, all fields are included.
    - The `country` attribute is always included in the response.
    - Options
        - `location`
        - `populationDensity`
        - `medianAge`
        - `aged65Older`
        - `aged70Older`
        - `gdpPerCapita`
        - `gini`
        - `extremePovertyRate`
        - `cardiovascDeathRate`
        - `diabetesPrevalence`
        - `femaleSmokers`
        - `maleSmokers`
        - `hospitalBedsPerThousand`
        - `lifeExpectancy`
        - `humanDevelopmentIndex`
        - `handwashingFacilities`

#### Path parameters

- `identifier`
    - **Path parameter**
    - **REQUIRED**
    - Specifies the instance to select based on the relevant country.
    - See below for a full list of valid identifiers.

## Identifiers

### Afghanistan
- Afghanistan
- AF
- AFG

### Åland Islands
- Åland Islands
- AX
- ALA

### Albania
- Albania
- AL
- ALB

### Algeria
- Algeria
- DZ
- DZA

### American Samoa
- American Samoa
- AS
- ASM

### Andorra
- Andorra
- AD
- AND

### Angola
- Angola
- AO
- AGO

### Anguilla
- Anguilla
- AI
- AIA

### Antarctica
- Antarctica
- AQ
- ATA

### Antigua and Barbuda
- Antigua and Barbuda
- AG
- ATG

### Argentina
- Argentina
- AR
- ARG

### Armenia
- Armenia
- AM
- ARM

### Aruba
- Aruba
- AW
- ABW

### Australia
- Australia
- AU
- AUS

### Austria
- Austria
- AT
- AUT

### Azerbaijan
- Azerbaijan
- AZ
- AZE

### Bahamas
- Bahamas
- BS
- BHS

### Bahrain
- Bahrain
- BH
- BHR

### Bangladesh
- Bangladesh
- BD
- BGD

### Barbados
- Barbados
- BB
- BRB

### Belarus
- Belarus
- BY
- BLR

### Belgium
- Belgium
- BE
- BEL

### Belize
- Belize
- BZ
- BLZ

### Benin
- Benin
- BJ
- BEN

### Bermuda
- Bermuda
- BM
- BMU

### Bhutan
- Bhutan
- BT
- BTN

### Bolivia (Plurinational State of)
- Bolivia (Plurinational State of)
- BO
- BOL

### Bonaire, Sint Eustatius and Saba
- Bonaire, Sint Eustatius and Saba
- BQ
- BES

### Bosnia and Herzegovina
- Bosnia and Herzegovina
- BA
- BIH

### Botswana
- Botswana
- BW
- BWA

### Bouvet Island
- Bouvet Island
- BV
- BVT

### Brazil
- Brazil
- BR
- BRA

### British Indian Ocean Territory
- British Indian Ocean Territory
- IO
- IOT

### United States Minor Outlying Islands
- United States Minor Outlying Islands
- UM
- UMI

### Virgin Islands (British)
- Virgin Islands (British)
- VG
- VGB

### Virgin Islands (U.S.)
- Virgin Islands (U.S.)
- VI
- VIR

### Brunei Darussalam
- Brunei Darussalam
- BN
- BRN

### Bulgaria
- Bulgaria
- BG
- BGR

### Burkina Faso
- Burkina Faso
- BF
- BFA

### Burundi
- Burundi
- BI
- BDI

### Cambodia
- Cambodia
- KH
- KHM

### Cameroon
- Cameroon
- CM
- CMR

### Canada
- Canada
- CA
- CAN

### Cabo Verde
- Cabo Verde
- CV
- CPV

### Cayman Islands
- Cayman Islands
- KY
- CYM

### Central African Republic
- Central African Republic
- CF
- CAF

### Chad
- Chad
- TD
- TCD

### Chile
- Chile
- CL
- CHL

### China
- China
- CN
- CHN

### Christmas Island
- Christmas Island
- CX
- CXR

### Cocos (Keeling) Islands
- Cocos (Keeling) Islands
- CC
- CCK

### Colombia
- Colombia
- CO
- COL

### Comoros
- Comoros
- KM
- COM

### Congo
- Congo
- CG
- COG

### Congo (Democratic Republic of the)
- Congo (Democratic Republic of the)
- CD
- COD

### Cook Islands
- Cook Islands
- CK
- COK

### Costa Rica
- Costa Rica
- CR
- CRI

### Croatia
- Croatia
- HR
- HRV

### Cuba
- Cuba
- CU
- CUB

### Curaçao
- Curaçao
- CW
- CUW

### Cyprus
- Cyprus
- CY
- CYP

### Czech Republic
- Czech Republic
- CZ
- CZE

### Denmark
- Denmark
- DK
- DNK

### Djibouti
- Djibouti
- DJ
- DJI

### Dominica
- Dominica
- DM
- DMA

### Dominican Republic
- Dominican Republic
- DO
- DOM

### Ecuador
- Ecuador
- EC
- ECU

### Egypt
- Egypt
- EG
- EGY

### El Salvador
- El Salvador
- SV
- SLV

### Equatorial Guinea
- Equatorial Guinea
- GQ
- GNQ

### Eritrea
- Eritrea
- ER
- ERI

### Estonia
- Estonia
- EE
- EST

### Ethiopia
- Ethiopia
- ET
- ETH

### Falkland Islands (Malvinas)
- Falkland Islands (Malvinas)
- FK
- FLK

### Faroe Islands
- Faroe Islands
- FO
- FRO

### Fiji
- Fiji
- FJ
- FJI

### Finland
- Finland
- FI
- FIN

### France
- France
- FR
- FRA

### French Guiana
- French Guiana
- GF
- GUF

### French Polynesia
- French Polynesia
- PF
- PYF

### French Southern Territories
- French Southern Territories
- TF
- ATF

### Gabon
- Gabon
- GA
- GAB

### Gambia
- Gambia
- GM
- GMB

### Georgia
- Georgia
- GE
- GEO

### Germany
- Germany
- DE
- DEU

### Ghana
- Ghana
- GH
- GHA

### Gibraltar
- Gibraltar
- GI
- GIB

### Greece
- Greece
- GR
- GRC

### Greenland
- Greenland
- GL
- GRL

### Grenada
- Grenada
- GD
- GRD

### Guadeloupe
- Guadeloupe
- GP
- GLP

### Guam
- Guam
- GU
- GUM

### Guatemala
- Guatemala
- GT
- GTM

### Guernsey
- Guernsey
- GG
- GGY

### Guinea
- Guinea
- GN
- GIN

### Guinea-Bissau
- Guinea-Bissau
- GW
- GNB

### Guyana
- Guyana
- GY
- GUY

### Haiti
- Haiti
- HT
- HTI

### Heard Island and McDonald Islands
- Heard Island and McDonald Islands
- HM
- HMD

### Holy See
- Holy See
- VA
- VAT

### Honduras
- Honduras
- HN
- HND

### Hong Kong
- Hong Kong
- HK
- HKG

### Hungary
- Hungary
- HU
- HUN

### Iceland
- Iceland
- IS
- ISL

### India
- India
- IN
- IND

### Indonesia
- Indonesia
- ID
- IDN

### Côte d'Ivoire
- Côte d'Ivoire
- CI
- CIV

### Iran (Islamic Republic of)
- Iran (Islamic Republic of)
- IR
- IRN

### Iraq
- Iraq
- IQ
- IRQ

### Ireland
- Ireland
- IE
- IRL

### Isle of Man
- Isle of Man
- IM
- IMN

### Israel
- Israel
- IL
- ISR

### Italy
- Italy
- IT
- ITA

### Jamaica
- Jamaica
- JM
- JAM

### Japan
- Japan
- JP
- JPN

### Jersey
- Jersey
- JE
- JEY

### Jordan
- Jordan
- JO
- JOR

### Kazakhstan
- Kazakhstan
- KZ
- KAZ

### Kenya
- Kenya
- KE
- KEN

### Kiribati
- Kiribati
- KI
- KIR

### Kuwait
- Kuwait
- KW
- KWT

### Kyrgyzstan
- Kyrgyzstan
- KG
- KGZ

### Lao People's Democratic Republic
- Lao People's Democratic Republic
- LA
- LAO

### Latvia
- Latvia
- LV
- LVA

### Lebanon
- Lebanon
- LB
- LBN

### Lesotho
- Lesotho
- LS
- LSO

### Liberia
- Liberia
- LR
- LBR

### Libya
- Libya
- LY
- LBY

### Liechtenstein
- Liechtenstein
- LI
- LIE

### Lithuania
- Lithuania
- LT
- LTU

### Luxembourg
- Luxembourg
- LU
- LUX

### Macao
- Macao
- MO
- MAC

### Macedonia (the former Yugoslav Republic of)
- Macedonia (the former Yugoslav Republic of)
- MK
- MKD

### Madagascar
- Madagascar
- MG
- MDG

### Malawi
- Malawi
- MW
- MWI

### Malaysia
- Malaysia
- MY
- MYS

### Maldives
- Maldives
- MV
- MDV

### Mali
- Mali
- ML
- MLI

### Malta
- Malta
- MT
- MLT

### Marshall Islands
- Marshall Islands
- MH
- MHL

### Martinique
- Martinique
- MQ
- MTQ

### Mauritania
- Mauritania
- MR
- MRT

### Mauritius
- Mauritius
- MU
- MUS

### Mayotte
- Mayotte
- YT
- MYT

### Mexico
- Mexico
- MX
- MEX

### Micronesia (Federated States of)
- Micronesia (Federated States of)
- FM
- FSM

### Moldova (Republic of)
- Moldova (Republic of)
- MD
- MDA

### Monaco
- Monaco
- MC
- MCO

### Mongolia
- Mongolia
- MN
- MNG

### Montenegro
- Montenegro
- ME
- MNE

### Montserrat
- Montserrat
- MS
- MSR

### Morocco
- Morocco
- MA
- MAR

### Mozambique
- Mozambique
- MZ
- MOZ

### Myanmar
- Myanmar
- MM
- MMR

### Namibia
- Namibia
- NA
- NAM

### Nauru
- Nauru
- NR
- NRU

### Nepal
- Nepal
- NP
- NPL

### Netherlands
- Netherlands
- NL
- NLD

### New Caledonia
- New Caledonia
- NC
- NCL

### New Zealand
- New Zealand
- NZ
- NZL

### Nicaragua
- Nicaragua
- NI
- NIC

### Niger
- Niger
- NE
- NER

### Nigeria
- Nigeria
- NG
- NGA

### Niue
- Niue
- NU
- NIU

### Norfolk Island
- Norfolk Island
- NF
- NFK

### Korea (Democratic People's Republic of)
- Korea (Democratic People's Republic of)
- KP
- PRK

### Northern Mariana Islands
- Northern Mariana Islands
- MP
- MNP

### Norway
- Norway
- NO
- NOR

### Oman
- Oman
- OM
- OMN

### Pakistan
- Pakistan
- PK
- PAK

### Palau
- Palau
- PW
- PLW

### Palestine, State of
- Palestine, State of
- PS
- PSE

### Panama
- Panama
- PA
- PAN

### Papua New Guinea
- Papua New Guinea
- PG
- PNG

### Paraguay
- Paraguay
- PY
- PRY

### Peru
- Peru
- PE
- PER

### Philippines
- Philippines
- PH
- PHL

### Pitcairn
- Pitcairn
- PN
- PCN

### Poland
- Poland
- PL
- POL

### Portugal
- Portugal
- PT
- PRT

### Puerto Rico
- Puerto Rico
- PR
- PRI

### Qatar
- Qatar
- QA
- QAT

### Republic of Kosovo
- Republic of Kosovo
- XK
- KOS

### Réunion
- Réunion
- RE
- REU

### Romania
- Romania
- RO
- ROU

### Russian Federation
- Russian Federation
- RU
- RUS

### Rwanda
- Rwanda
- RW
- RWA

### Saint Barthélemy
- Saint Barthélemy
- BL
- BLM

### Saint Helena, Ascension and Tristan da Cunha
- Saint Helena, Ascension and Tristan da Cunha
- SH
- SHN

### Saint Kitts and Nevis
- Saint Kitts and Nevis
- KN
- KNA

### Saint Lucia
- Saint Lucia
- LC
- LCA

### Saint Martin (French part)
- Saint Martin (French part)
- MF
- MAF

### Saint Pierre and Miquelon
- Saint Pierre and Miquelon
- PM
- SPM

### Saint Vincent and the Grenadines
- Saint Vincent and the Grenadines
- VC
- VCT

### Samoa
- Samoa
- WS
- WSM

### San Marino
- San Marino
- SM
- SMR

### Sao Tome and Principe
- Sao Tome and Principe
- ST
- STP

### Saudi Arabia
- Saudi Arabia
- SA
- SAU

### Senegal
- Senegal
- SN
- SEN

### Serbia
- Serbia
- RS
- SRB

### Seychelles
- Seychelles
- SC
- SYC

### Sierra Leone
- Sierra Leone
- SL
- SLE

### Singapore
- Singapore
- SG
- SGP

### Sint Maarten (Dutch part)
- Sint Maarten (Dutch part)
- SX
- SXM

### Slovakia
- Slovakia
- SK
- SVK

### Slovenia
- Slovenia
- SI
- SVN

### Solomon Islands
- Solomon Islands
- SB
- SLB

### Somalia
- Somalia
- SO
- SOM

### South Africa
- South Africa
- ZA
- ZAF

### South Georgia and the South Sandwich Islands
- South Georgia and the South Sandwich Islands
- GS
- SGS

### Korea (Republic of)
- Korea (Republic of)
- KR
- KOR

### South Sudan
- South Sudan
- SS
- SSD

### Spain
- Spain
- ES
- ESP

### Sri Lanka
- Sri Lanka
- LK
- LKA

### Sudan
- Sudan
- SD
- SDN

### Suriname
- Suriname
- SR
- SUR

### Svalbard and Jan Mayen
- Svalbard and Jan Mayen
- SJ
- SJM

### Swaziland
- Swaziland
- SZ
- SWZ

### Sweden
- Sweden
- SE
- SWE

### Switzerland
- Switzerland
- CH
- CHE

### Syrian Arab Republic
- Syrian Arab Republic
- SY
- SYR

### Taiwan
- Taiwan
- TW
- TWN

### Tajikistan
- Tajikistan
- TJ
- TJK

### Tanzania, United Republic of
- Tanzania, United Republic of
- TZ
- TZA

### Thailand
- Thailand
- TH
- THA

### Timor-Leste
- Timor-Leste
- TL
- TLS

### Togo
- Togo
- TG
- TGO

### Tokelau
- Tokelau
- TK
- TKL

### Tonga
- Tonga
- TO
- TON

### Trinidad and Tobago
- Trinidad and Tobago
- TT
- TTO

### Tunisia
- Tunisia
- TN
- TUN

### Turkey
- Turkey
- TR
- TUR

### Turkmenistan
- Turkmenistan
- TM
- TKM

### Turks and Caicos Islands
- Turks and Caicos Islands
- TC
- TCA

### Tuvalu
- Tuvalu
- TV
- TUV

### Uganda
- Uganda
- UG
- UGA

### Ukraine
- Ukraine
- UA
- UKR

### United Arab Emirates
- United Arab Emirates
- AE
- ARE

### United Kingdom of Great Britain and Northern Ireland
- United Kingdom of Great Britain and Northern Ireland
- GB
- GBR

### United States of America
- United States of America
- US
- USA

### Uruguay
- Uruguay
- UY
- URY

### Uzbekistan
- Uzbekistan
- UZ
- UZB

### Vanuatu
- Vanuatu
- VU
- VUT

### Venezuela (Bolivarian Republic of)
- Venezuela (Bolivarian Republic of)
- VE
- VEN

### Viet Nam
- Viet Nam
- VN
- VNM

### Wallis and Futuna
- Wallis and Futuna
- WF
- WLF

### Western Sahara
- Western Sahara
- EH
- ESH

### Yemen
- Yemen
- YE
- YEM

### Zambia
- Zambia
- ZM
- ZMB

### Zimbabwe
- Zimbabwe
- ZW
- ZWE
