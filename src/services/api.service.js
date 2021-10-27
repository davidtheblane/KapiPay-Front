const axios = require('axios').default
require('dotenv').config()

const APIUrl = process.env.API_SERVER || "http://localhost:5050/";
// const resourcetoken = process.env.RESOURCE_TOKEN;

const api = axios.create({
  baseURL: APIUrl,
  headers: {
    "Content-Type": "Application/json",
    "Accept": "Application/json",
  }
});

module.exports = api;




//////////////////////////////

// const api = axios.create({
//   baseURL: APIUrl,
// });

// api.interceptors.request.use((config) => {
//   // const token = document.cookie.split("=")[1]
//   // console.log(token)
//   const cookieArray = document.cookie.split(";")
//   // console.log(cookies)
//   const token = cookieArray[0].split("=")[1]
//   const resourcetoken = cookieArray[1].split("=")[1]
//   console.log(token)
//   console.log(resourcetoken)

//   if (cookieArray) {
//     console.log('token existe')

//     config.headers = {
//       "Content-Type": "Application/json",
//       "Accept": "Application/json",
//       "Authorization": `Bearer ${token}`,
//       "resourcetoken": `${resourcetoken}`,
//     }
//   } else {
//     console.log('token não existe')
//   }

//   // console.log(token)
//   return config;
// })

// module.exports = api;


//////////

