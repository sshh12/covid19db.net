let axios = require("axios");

module.exports = axios.create({
  baseURL: "https://api.covid19db.net", // set to localhost:5000 for local development
});
