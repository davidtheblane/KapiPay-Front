const apiLogin = require('../services/login.service');

module.exports = {

  login: async (req, res) => {
    res.render("pages/login");
  },

  doLogin: async (req, res) => {
    try {
      const response = await apiLogin.post('/login', req.body)
      res.send(response.data)

    } catch (err) {
      res.send(console.error(err.stack || err.message))
    }

  },

  register: async (req, res) => {
    res.render("pages/register")
  },

  doRegister: async (req, res) => {
    try {
      const response = await apiLogin.post('/register', req.body)
      res.send(response.data)

    } catch (error) {
      res.send({ message: error.response.data.error })
    }
  },

  logout: async (req, res) => {
    req.logOut();
    req.session = null;
    windows.assign('/login')
    // res.redirect("pages/login");
  }



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