const apiLogin = require('../services/login.service');

module.exports = {

  //show pages
  loginPage: async (req, res) => res.render("pages/login"),
  registerPage: async (req, res) => res.render("pages/register"),
  forgotPasswordPage: async (req, res) => res.render("pages/forgot_password"),
  resetPasswordPage: async (req, res) => res.render("pages/reset_password"),



  //execute actions
  login: async (req, res) => {
    try {
      const response = await apiLogin.post('/login', req.body)
      res.send(response.data)

    } catch (err) {
      res.send(console.error(err.stack || err.message))
    }
  },

  register: async (req, res) => {
    try {
      const response = await apiLogin.post('/register', req.body)
      res.send(response.data)

    } catch (error) {
      res.send(console.error(err.stack || err.message))
    }
  },

  forgotPassword: async (req, res) => {
    const email = req.body
    try {
      const response = await apiLogin.post('/forgot_password', email)
      res.send(response.data)

    } catch (err) {
      res.send(console.error(err.stack || err.message))
    }
  },

  resetPassword: async (req, res) => {
    const email = req.body.email
    const token = req.body.token
    const password = req.body.password
    try {
      const response = await apiLogin.post('/reset_password', email, token, password)
      res.send(response.data)

    } catch (err) {
      res.send(console.error(err.stack || err.message))
    }
  },

}