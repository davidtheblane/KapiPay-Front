const { Router } = require('express');
const AccessController = require('../controllers/access.controller')
// const CepController = require('../controllers/cep.controller')

const apiLogin = require("../services/login.service")
const loginRouter = new Router(apiLogin);


// Authenticated
loginRouter.get('/index', AccessController.indexPage)

// ACCESS ROUTES
loginRouter.get('/', AccessController.loginPage)
loginRouter.get('/login', AccessController.loginPage)
loginRouter.get('/register', AccessController.registerPage)
loginRouter.get('/forgot_password', AccessController.forgotPasswordPage)
loginRouter.get('/reset_password', AccessController.resetPasswordPage)
loginRouter.get('/logout', AccessController.logout)



loginRouter.post('/login', AccessController.login)
loginRouter.post('/register', AccessController.register)
loginRouter.post('/forgot_password', AccessController.forgotPassword)
loginRouter.post('/reset_password', AccessController.resetPassword)




module.exports = loginRouter;