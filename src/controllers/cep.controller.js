// const apiLogin = require('../services/login.service');
// module.exports = {

//   getCep: async (req, res) => {
//     const id = req.params
//     try {
//       console.log('chegou na rota cep', req.params)
//       const response = await apiLogin.get('/cep', req.params)
//       res.send(response)
//     } catch (err) {
//       console.log('não passou da rota cep', req.params)
//       res.status(400).send({ message: err.message || err.stack })
//     }
//   }
// }
