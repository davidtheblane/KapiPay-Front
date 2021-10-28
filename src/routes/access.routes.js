const { Router } = require('express');
const AccessController = require('../controllers/access.controller')
// const CepController = require('../controllers/cep.controller')

const apiLogin = require("../services/login.service")
const loginRouter = new Router(apiLogin);


loginRouter.get('/', (req, res) => {
  const logged = true //implementar depois
  if (logged) {
    res.render("index");
  }
})

// ACCESS ROUTES
loginRouter.get('/login', AccessController.loginPage)
loginRouter.get('/register', AccessController.registerPage)
loginRouter.get('/forgot_password', AccessController.forgotPasswordPage)
loginRouter.get('/reset_password', AccessController.resetPasswordPage)



loginRouter.post('/login', AccessController.login)
loginRouter.post('/register', AccessController.register)
loginRouter.post('/forgot_password', AccessController.forgotPassword)
loginRouter.post('/reset_password', AccessController.resetPassword)


loginRouter.post('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})


module.exports = loginRouter;