const axios = require('axios').default
require('dotenv').config()


const APIUrl = process.env.API_SERVER || "http://localhost:5050/";
//Bearer esta por enquanto para facilitar testes
const resourcetoken = process.env.RESOURCE_TOKEN;
const BearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTY1MzJmNDJhZTk0YmEwMzM2MmJmNSIsImlhdCI6MTYzNDU2MjY0NSwiZXhwIjoxNjM0NjQ5MDQ1fQ.UcVC5rYaogdGiysuljTaR-_NUmhEjXFw5uR4RGJgCZY"

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
//   const token = cookie.split('=')[1]
//   console.log(token)

//   if (token) {

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

//   return config;
// })

// module.exports = api;