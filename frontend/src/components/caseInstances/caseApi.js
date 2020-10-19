import axios from 'axios';

const url = 'http://localhost:5000/case-statistics';

class CaseApi {

  constructor() {
  }

  getAll(attributes) {
    var getURL = url + "?attributes=";
    for (var i = 0; i < attributes.length; i++) {
      getURL += attributes[i];
      getURL += ",";
    }
    getURL = getURL.substring(0, getURL.length - 1);

    var response = fetch(getURL).then(response => response.json());
    return response;
  }

  getInstance(country, attributes) {
    var getURL = url + `/${country}`;
    if (attributes.length > 0) {
      getURL += '?attributes=';
      for (var i = 0; i < attributes.length; i++) {
        getURL += attributes[i];
        getURL += ",";
      }
      getURL = getURL.substring(0, getURL.length - 1);
    }
    console.log(getURL);
    // var response = fetch(getURL).then(response => response.json());
    axios.get(getURL)
      .then(res => {
        console.log(res.data);
      })
    //return response;
  }

}

export default CaseApi;
