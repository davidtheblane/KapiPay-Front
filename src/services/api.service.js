const axios = require('axios').default
require('dotenv').config()


const APIUrl = process.env.API_SERVER || "http://localhost:5050/";
const BearerToken = process.env.BEARER_TOKEN;
const resourcetoken = process.env.RESOURCE_TOKEN;


const api = axios.create({
  baseURL: APIUrl,
  headers: {
    "Content-Type": "Application/json",
    "Accept": "Application/json",
    "Authorization": `Bearer ${BearerToken}`,
    "resourcetoken": `${resourcetoken}`,
  }
})

module.exports = api;

// api.interceptors.request.use((config) => {
//   const token = document.cookie.split('=')[1]

//   if (token) {
//     config.headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   }
//   return config;
// })

//////////////////////////////

// const API_URL = process.env.API_URL;

// const axiosInstance = create({
//   baseURL: `${API_URL}/login`,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = document.cookie.split('=')[1]

//   if (token) {
//     config.headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   }
//   return config;
// })