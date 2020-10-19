import React from 'react';
import { render } from '@testing-library/react';
// import App from './App';
import ProjectInfo from './pages/about'
import ReactDOM from 'react-dom'


it("doesn't do anything bc this is a sample test", () =>{
  const div = document.createElement("div");
  ReactDOM.render(<ProjectInfo></ProjectInfo>, div)

})

// test('sample test does nothing', () => {
//   // const { getByText } = render(<App />);
//   // const linkElement = getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });