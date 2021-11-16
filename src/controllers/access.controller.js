const apiLogin = require('../services/login.service');

module.exports = {

  // SHOW PAGES
  loginPage: async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("pages/login", { err: error });

  },

  registerPage: async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("pages/register", { err: error })
  },

  forgotPasswordPage: async (req, res) => res.render("pages/forgot_password"),

  resetPasswordPage: async (req, res) => res.render("pages/reset_password"),

  indexPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("index", { email: email })
  },

  userDataPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("pages/userProfile", { email: email });
  },

  cardPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("forms/addCard", { email: email });
  },



  //ACTIONS

  login: async (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    try {
      const response = await apiLogin.post('/login', data)
      const email = response.data.user.email
      const token = response.data.token
      // console.log(token)
      // console.log(email)
      if (token) {
        session = req.session
        req.session.isAuth = true;
        req.session.userEmail = email;
        req.session.token = token
        // console.log(session.id)
        res.status(200).send(response.data)
      }

    } catch (err) {
      req.session.error = err.response.data.message
      console.log(err.response.data)
      res.status(err.status || 400).send(err.response.data)
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
      console.log(response.data)
      res.status(200).send(response.data)

    } catch (err) {
      req.session.error = err.response.data.message
      res.status(err.status || 400).send(err.response.data)
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
      // console.log(err.response.data.message)
      req.session.error = err.response.data.message
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
      req.session.error = err.response.data.message
      res.status(err.status || 400).send({ message: err.response.data })
    }
  },

  logout: async (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect("/login");
    });
  },

  // SHOW USER PROFILE
  userData: async (req, res) => {
    try {
      const token = req.session.token
      const response = await apiLogin.get("/user/data", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      return res.json(response.data)
    } catch (err) {
      console.log(err)
      res.status(err.status || 400).send(err)
    }
  },

}