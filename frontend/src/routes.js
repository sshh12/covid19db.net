import React from "react";
import { Route, Switch } from "react-router-dom";

import { About, Cases, Countries, Main, Risks, GlobalNews } from './pages/allPages'
import { CaseInstanceGBR, CaseInstanceMEX, CaseInstanceUSA } from './components/caseInstances/allCaseInstances';
import { RiskInstanceGBR, RiskInstanceMEX, RiskInstanceUSA, RiskInstance } from './components/risks/allRiskInstances';
import CountryInstance from "./components/country/countryInstance";
import CaseInstance from "./components/caseInstances/caseInstance";

function Routes() {
  return (
    <Switch>
      <Route exact path="/"><Main /></Route>
      <Route exact path="/home"><Main /></Route>
      <Route exact path="/about"><About /></Route>
      <Route exact path="/countries"><Countries /></Route>
      <Route exact path="/countries/:countryCode" render={(props) => {
        const countryCode = props.match.params.countryCode;
        return <CountryInstance code={countryCode} />
      }}></Route>
      <Route exact path="/cases"><Cases /></Route>
      <Route exact path="/cases/:countryCode" render={(props) => {
        const countryCode = props.match.params.countryCode;
        return <CaseInstance code={countryCode} />
      }}></Route>
      <Route exact path="/risk-factor-statistics"><Risks /></Route>
      <Route exact path="/risk-factor-statistics/:countryCode" render={(props) => {
        const countryCode = props.match.params.countryCode;
        return <RiskInstance code={countryCode} />
      }}></Route>
      <Route exact path="/globalNews"><GlobalNews /></Route>
      <Route exact path="/cases/GBR"><CaseInstanceGBR /></Route>
      <Route exact path="/cases/MEX"><CaseInstanceMEX /></Route>
      <Route exact path="/cases/USA"><CaseInstanceUSA /></Route>
      {/* <Route exact path="/risks/GBR"><RiskInstanceGBR /></Route> */}

      {/* 
      <Route exact path="/risks/GBR"><RiskInstance /></Route>
      <Route exact path="/risks/MEX"><RiskInstanceMEX /></Route>
      <Route exact path="/risks/USA"><RiskInstanceUSA /></Route> */}
    </Switch>
  );
}

export default Routes;