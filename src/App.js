import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import About from './about';
import Main from './main';
import Countries from './countries';
import Cases from './cases';
import Risks from './risks';
import Splash from './splash';
// import { Button } from "react-bootstrap";
import CountryInstance0 from './countryInstances/countryInstance0';
import CountryInstance1 from './countryInstances/countryInstance1';
import CountryInstance2 from './countryInstances/countryInstance2';
import CaseInstance0 from './caseInstances/caseInstance0';
import CaseInstance1 from './caseInstances/caseInstance1';
import CaseInstance2 from './caseInstances/caseInstance2';
import RiskInstance0 from './riskInstances/riskInstance0';
import RiskInstance1 from './riskInstances/riskInstance1';
import RiskInstance2 from './riskInstances/riskInstance2';

const AboutPage = () => (<About />);
const MainPage = () => (<Main />);
const SplashPage = () => (<Splash />);
const RisksPage = () => (<Risks />);
const CasesPage = () => (<Cases />);
const CountriesPage = () => (<Countries />);
const countryI0 = () => (<CountryInstance0 />);
const countryI1 = () => (<CountryInstance1 />);
const countryI2 = () => (<CountryInstance2 />);
const caseI0 = () => (<CaseInstance0 />);
const caseI1 = () => (<CaseInstance1 />);
const caseI2 = () => (<CaseInstance2 />);
const riskI0 = () => (<RiskInstance0 />);
const riskI1 = () => (<RiskInstance1 />);
const riskI2 = () => (<RiskInstance2 />);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={MainPage}></Route>
          <Route path="/about" component={AboutPage}></Route>
          <Route path="/countries" component={CountriesPage}></Route>
          <Route path="/cases" component={CasesPage}></Route>
          <Route path="/risks" component={RisksPage}></Route>
          <Route path="/splash" component={SplashPage}></Route>
          <Route path="/countryinstance0" component={countryI0}></Route>
          <Route path="/countryinstance1" component={countryI1}></Route>
          <Route path="/countryinstance2" component={countryI2}></Route>

          <Route path="/caseinstance0" component={caseI0}></Route>
          <Route path="/caseinstance1" component={caseI1}></Route>
          <Route path="/caseinstance2" component={caseI2}></Route>

          <Route path="/riskinstance0" component={riskI0}></Route>
          <Route path="/riskinstance1" component={riskI1}></Route>
          <Route path="/riskinstance2" component={riskI2}></Route>
        </div>
      </Router>
    );
  }
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <p>hello</p>


//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Button>React Bootstrap</Button>
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }
