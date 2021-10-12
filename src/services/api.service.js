const axios = require('axios').default

const API_SERVER = process.env.API_SERVER;

const api = axios.create({
  baseURL: API_SERVER,
  headers: {
    "Content-Type": "Application/json",
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTY1MzJmNDJhZTk0YmEwMzM2MmJmNSIsImlhdCI6MTYzNDA0ODIxNSwiZXhwIjoxNjM0MTM0NjE1fQ.owmLPfstlqw5OG4ojNocvEScAl4obdkSQACgspRVles`,
    "resourcetoken": "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A"
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