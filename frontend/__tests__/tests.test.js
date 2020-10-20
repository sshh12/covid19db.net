import React from 'react'
import { shallow } from 'enzyme'

// import App from '../src/app'
// import CountryInstance from '../src/components/country/countryInstance'
// import RiskInstance from '../src/components/risks/riskInstance'
// import CaseInstance from '../src/components/caseInstances/caseInstance'
// import Main from '../src/pages/main'
import About from '../src/pages/about'
import Risk from '../src/pages/risks'
import Countries from '../src/pages/countries'
import Cases from '../src/pages/cases'
import { Totals, NewStats, GenStats, CaseResponseLine } from '../src/components/caseInstances/caseComponents'
import GlobalNews from '../src/pages/globalNews'
import CountryCard from '../src/components/country/countryCard'
import { GeneralInfo, GetImage, News, AllNews } from '../src/components/country/countryComponents'

const fakeData = {}
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakeData),
  })
);

// DUMB TESTS
describe('Sample Tests', () => {
  test('Sample Test', () => {
    expect(true).toBeTruthy();
  });

  test('Sample Test 2', () => {
    const x = true;
    expect(x).toBe(true);
  })

});

// describe('Model Instances (TODO)', () => {
//   // global.URL.createObjectURL = jest.fn();
//   test('Risk Instance Rendering Test', () => {
//     // jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
//     //   Map: () => ({})
//     // }));
//     const component = renderer.create(
//       <RiskInstance code="USA"></RiskInstance>,
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
  
//   test('TODO', () => {
//     expect(true).toBeTruthy();
//   });
// })

// describe('Pages Test (TODO)', () => {
//   test('TODO', () => {
//     expect(true).toBeTruthy();
//   });
// })


describe('Render Pages', () => {
  test('About', () => {
    // Render the Demoinstance component
    const test = shallow(<About/>); 
    expect(test).toMatchSnapshot();
  });

  test('Risk', () => {
      // Render the Demoinstance component
      const test = shallow(<Risk/>); 
      expect(test).toMatchSnapshot();
  });
  test('Country', () => {
    // Render the Demoinstance component
    const test = shallow(<Countries/>); 
    expect(test).toMatchSnapshot();
  });
  test('Cases', () => {
    // Render the Demoinstance component
    const test = shallow(<Cases/>); 
    expect(test).toMatchSnapshot();
  });
  // test('Main', () => {
  //   // Render the Demoinstance component
  //   const test = shallow(<Main/>); 
  //   expect(test).toMatchSnapshot();
  // });
  test('Global News', () => {
    // Render the Demoinstance component
    const test = shallow(<GlobalNews/>); 
    expect(test).toMatchSnapshot();
  });

});

describe('Render Components', () => {
  // Country Components
  test('Country: Country Card', () => {
    // Render the Demoinstance component
    const test = shallow(<CountryCard/>); 
    expect(test).toMatchSnapshot();
  });
  test('Country: General Info', () => {
    // Render the Demoinstance component
    const test = shallow(<GeneralInfo/>); 
    expect(test).toMatchSnapshot();
  });
  test('Country: Get Image', () => {
    // Render the Demoinstance component
    const test = shallow(<GetImage/>); 
    expect(test).toMatchSnapshot();
  });
  test('Country: News', () => {
    // Render the Demoinstance component
    const test = shallow(<News/>); 
    expect(test).toMatchSnapshot();
  });
  test('Country: All News', () => {
    // Render the Demoinstance component
    const test = shallow(<AllNews/>); 
    expect(test).toMatchSnapshot();
  });

  // Case components
  test('Case: Totals', () => {
    // Render the Demoinstance component
    const test = shallow(<Totals/>); 
    expect(test).toMatchSnapshot();
  });
  test('Case: New Stats', () => {
    // Render the Demoinstance component
    const test = shallow(<NewStats/>); 
    expect(test).toMatchSnapshot();
  });
  test('Case: Gen Stats', () => {
    // Render the Demoinstance component
    const test = shallow(<GenStats/>); 
    expect(test).toMatchSnapshot();
  });
  test('Case: Case Response Line', () => {
    // Render the Demoinstance component
    const test = shallow(<CaseResponseLine/>); 
    expect(test).toMatchSnapshot();
  });
})



// describe('Render', () => {
//     test('App', () => {
//         // Render the app component
//         const test = shallow(<App />); 
//         expect(test).toMatchSnapshot();
//     });
//     test('Risk Instance', () => {
//         // Render the Demoinstance component
//         const test = shallow(<RiskInstance />); 
//         expect(test).toMatchSnapshot();
//     });

//     test('Country Instance', () => {
//         // Render the PoliceInstance component
//         const test = shallow(<CountryInstance />); 
//         expect(test).toMatchSnapshot();
//     });

//     test('Country Card', () => {
//         // Render the DemoCard component
//         const test = shallow(<CountryCard />); 
//         expect(test).toMatchSnapshot();
//     });
//   });























// });











// // test('App', () => {
// //   // Render the app component
// //   const test = shallow(<App />); 
// //   expect(test).toMatchSnapshot();
// // });







// // import React from 'react';
// // import { render } from '@testing-library/react';
// // // import App from './App';
// // import ProjectInfo from '../pages/about'
// // import ReactDOM from 'react-dom' 
// // import { isTSAnyKeyword } from '@babel/types';


// // it("simply renders without crashing", () =>{
// //   const div = document.createElement("div");
// //   ReactDOM.render(<ProjectInfo></ProjectInfo>, div)

// // })

// var assert = require('assert');
// it('should return -1', function () {
//   assert.equal([1, 2].indexOf(5), -1);
// });