const axios = require('axios').default
require('dotenv').config()

const APIUrl = process.env.API_SERVER || "http://localhost:5050/";
const resourcetoken = process.env.RESOURCE_TOKEN;

const api = axios.create({
  baseURL: APIUrl,
  headers: {
    "Content-Type": "Application/json",
    "Accept": "Application/json",
    "resourcetoken": `${resourcetoken}`,
  }
});

module.exports = api;
// Bearer esta por enquanto para facilitar testes

// const BearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTc3ODU5MmE2ZWM2ODI0NzgzZWY5NiIsImlhdCI6MTYzNDY0NjQ4NiwiZXhwIjoxNjM0NzMyODg2fQ.d5fRwe__wxOcm4FhkogH2Uiw2X8xZuNWYggvkzD8jxU"

// const api = axios.create({
//   baseURL: APIUrl,
//   headers: {
//     "Content-Type": "Application/json",
//     "Accept": "Application/json",
//     "Authorization": `Bearer ${BearerToken}`,
//     "resourcetoken": `${resourcetoken}`,
//   }
// });

// module.exports = api;

//////////////////////////////
// const api = axios.create({
//   baseURL: APIUrl,
// });

// api.interceptors.request.use((config) => {
//   const token = document.cookie.split("=")[1]
//   console.log(token)


//   if (token) {
//     console.log(token)
//     console.log('token existe')

//     config.headers = {
//       "Content-Type": "Application/json",
//       "Accept": "Application/json",
//       "Authorization": `Bearer ${token}`,
//       "resourcetoken": `${resourcetoken}`,
//     }
//   } else {
//     console.log('token não existe')
//     console.log(token)
//   }

//   console.log(token)
//   return config;
// })

// module.exports = api;


//////////

