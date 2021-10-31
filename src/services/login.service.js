const axios = require('axios').default
require('dotenv').config()


const APIUrl = process.env.API_SERVER || "http://localhost:5050/";

const apiLogin = axios.create({
  baseURL: APIUrl,
  headers: {
    "Content-Type": "Application/json",
    "Accept": "Application/json",
    "X-Api-Version": 2
  }
});

module.exports = apiLogin;