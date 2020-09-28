import React from "react";
import { Route, Switch } from "react-router-dom";

import { About, Cases, Countries, Main, Risks } from './pages/allPages'
import { CountryInstance0, CountryInstance1, CountryInstance2 } from './components/countryInstances/allCountryInstances';
import { CaseInstance0, CaseInstance1, CaseInstance2 } from './components/caseInstances/allCaseInstances';
import { RiskInstance0, RiskInstance1, RiskInstance2 } from './components/riskInstances/allRiskInstances';

function Routes() {
  return (
    <Switch>
      <Route exact path="/"><Main /></Route>
      <Route exact path="/home"><Main /></Route>
      <Route exact path="/about"><About /></Route>
      <Route exact path="/countries"><Countries /></Route>
      <Route exact path="/cases"><Cases /></Route>
      <Route exact path="/risks"><Risks /></Route>
      <Route exact path="/country-instance-0"><CountryInstance0 /></Route>
      <Route exact path="/country-instance-1"><CountryInstance1 /></Route>
      <Route exact path="/country-instance-2"><CountryInstance2 /></Route>
      <Route exact path="/case-instance-0"><CaseInstance0 /></Route>
      <Route exact path="/case-instance-1"><CaseInstance1 /></Route>
      <Route exact path="/case-instance-2"><CaseInstance2 /></Route>
      <Route exact path="/risk-instance-0"><RiskInstance0 /></Route>
      <Route exact path="/risk-instance-1"><RiskInstance1 /></Route>
      <Route exact path="/risk-instance-2"><RiskInstance2 /></Route>
    </Switch>
  );
}

export default Routes;