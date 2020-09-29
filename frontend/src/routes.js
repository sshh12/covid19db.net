import React from "react";
import { Route, Switch } from "react-router-dom";

import { About, Cases, Countries, Main, Risks } from './pages/allPages'
import { CountryInstanceGBR, CountryInstanceMEX, CountryInstanceUSA } from './components/countryInstances/allCountryInstances';
import { CaseInstanceGBR, CaseInstanceMEX, CaseInstanceUSA } from './components/caseInstances/allCaseInstances';
import { RiskInstanceGBR, RiskInstanceMEX, RiskInstanceUSA } from './components/riskInstances/allRiskInstances';

function Routes() {
  return (
    <Switch>
      <Route exact path="/"><Main /></Route>
      <Route exact path="/home"><Main /></Route>
      <Route exact path="/about"><About /></Route>
      <Route exact path="/countries"><Countries /></Route>
      <Route exact path="/cases"><Cases /></Route>
      <Route exact path="/risks"><Risks /></Route>
      <Route exact path="/countries/GBR"><CountryInstanceGBR /></Route>
      <Route exact path="/countries/MEX"><CountryInstanceMEX /></Route>
      <Route exact path="/countries/USA"><CountryInstanceUSA /></Route>
      <Route exact path="/cases/GBR"><CaseInstanceGBR /></Route>
      <Route exact path="/cases/MEX"><CaseInstanceMEX /></Route>
      <Route exact path="/cases/USA"><CaseInstanceUSA /></Route>
      <Route exact path="/risks/GBR"><RiskInstanceGBR /></Route>
      <Route exact path="/risks/MEX"><RiskInstanceMEX /></Route>
      <Route exact path="/risks/USA"><RiskInstanceUSA /></Route>
    </Switch>
  );
}

export default Routes;