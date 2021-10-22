const apiLogin = require('../services/login.service');

module.exports = {

  login: async (req, res) => res.render("pages/login"),

  register: async (req, res) => res.render("pages/register"),

  doLogin: async (req, res) => {
    try {
      const response = await apiLogin.post('/login', req.body)
      res.send(response.data)

    } catch (err) {
      res.send(console.error(err.stack || err.message))
    }
  },

  doRegister: async (req, res) => {
    try {
      const response = await apiLogin.post('/register', req.body)
      res.send(response.data)

    } catch (error) {
      res.send(console.error(err.stack || err.message))
    }
  },

  logout: async (req, res, next) => {
    // req.logOut();
    req.session = null;
    res.redirect('/login')
    // window.location.assign("/login")
  },

  // getCep: async (req, res) => {
  //   const id = req.params
  //   try {
  //     console.log('chegou na rota cep', req.params)
  //     const response = await apiLogin.get('/cep', req.params)
  //     res.send(response)
  //   } catch (err) {
  //     console.log('não passou da rota cep', req.params)
  //     res.status(400).send({ message: err.message || err.stack })
  //   }
  // }

}

// balance: async (req, res) => {
//   try {
//     const balance = await api.get("/account/balance")
//     console.log(balance.data.balance)
//     return res.json(balance.data.balance)
//   } catch (error) {
//     res.sendStatus(400, { message: error.message })
//   }
// },