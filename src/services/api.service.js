const axios = require('axios').default
require('dotenv').config()


const APIUrl = process.env.API_SERVER || "http://localhost:5050/";
const BearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTY1MzJmNDJhZTk0YmEwMzM2MmJmNSIsImlhdCI6MTYzNDMxOTIzMCwiZXhwIjoxNjM0NDA1NjMwfQ.9FTulw784w511kJwR9pq_qH-G7jEQAKvQq-AJJAsM30"
const resourcetoken = process.env.RESOURCE_TOKEN;


const api = axios.create({
  baseURL: APIUrl,
  headers: {
    "Content-Type": "Application/json",
    "Accept": "Application/json",
    "Authorization": `Bearer ${BearerToken}`,
    "resourcetoken": `${resourcetoken}`,
  }
});

module.exports = api;

//////////////////////////////

// const api = axios.create({
//   baseURL: APIUrl,
// });

// api.interceptors.request.use((config) => {
//   const token = document.cookie.split('=')[1]
//   console.log(token)
//   if (token) {

//     console.log('token existe')
//     config.headers = {
//       "Content-Type": "Application/json",
//       "Accept": "Application/json",
//       "Authorization": `Bearer ${BearerToken}`,
//       "resourcetoken": `${resourcetoken}`,
//     }
//   } else {
//     console.log('token não existe')
//   }
//   return config;
// })

// module.exports = api;