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
loginRouter.get('/login', AccessController.login)
loginRouter.get('/register', AccessController.register)


loginRouter.post('/login', AccessController.doLogin)
loginRouter.post('/register', AccessController.doRegister)

loginRouter.post('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})


module.exports = loginRouter;