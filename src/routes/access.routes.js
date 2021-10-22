const { Router } = require('express');
const AccessController = require('../controllers/access.controller')
// const CepController = require('../controllers/cep.controller')

const apiLogin = require("../services/login.service")
const loginRouter = new Router(apiLogin);


loginRouter.get('/', (req, res) => {
  res.render("index");
})
// chama cep
// loginRouter.get('/cep', CepController.getCep)

// ACCESS ROUTES
loginRouter.get('/login', AccessController.login)
loginRouter.get('/register', AccessController.register)


loginRouter.post('/login', AccessController.doLogin)
loginRouter.post('/register', AccessController.doRegister)

loginRouter.post('/logout', AccessController.logout)


module.exports = loginRouter;