const apiLogin = require('../services/login.service');

module.exports = {

  //show pages
  loginPage: async (req, res) => {
    session = req.session
    if (session.userEmail) {
      res.render("index")
    } else {
      res.render("pages/login")
    }
  },
  indexPage: async (req, res) => res.render("index"),
  registerPage: async (req, res) => res.render("pages/register"),
  forgotPasswordPage: async (req, res) => res.render("pages/forgot_password"),
  resetPasswordPage: async (req, res) => res.render("pages/reset_password"),


  //execute actions
  login: async (req, res) => {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password
      }

      const response = await apiLogin.post('/login', data)
      if (response.data) {
        session = req.session
        session.userEmail = data.email;
        // console.log(session)
        // console.log(response.data)
        res.send(response.data)
      } else {
        res.send('Email ou password invalido')
      }

    } catch (err) {
      console.log(err)
      res.status(err.status || 400).send({ message: err.response.data.message })
    }
  },

  register: async (req, res) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    try {
      const response = await apiLogin.post('/register', data)
      res.send(response.data)

    } catch (err) {
      res.status(err.status || 400).send(err)
    }
  },

  forgotPassword: async (req, res) => {
    const data = {
      email: req.body.email,
    }
    try {
      const response = await apiLogin.post('/forgot_password', data)
      res.status(200).send(response.data)

    } catch (err) {
      console.log(err.response.data.message)
      res.status(err.status || 400).send({ message: err.response.data.message })
    }
  },

  resetPassword: async (req, res) => {
    const data = {
      email: req.body.email,
      token: req.body.token,
      password: req.body.password
    }
    // console.log(email, token, password)
    try {
      const response = await apiLogin.post('/reset_password', data)
      // console.log(response.data)
      res.status(200).send(response.data)

    } catch (err) {
      // console.log(err.response.data)
      res.status(err.status || 400).send({ message: err.response.data })
    }
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.redirect('/');
  },

}