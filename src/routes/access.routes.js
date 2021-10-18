const { Router } = require('express');
const AccessController = require('../controllers/access.controller')
// const AccountController = require('../controllers/account.controller');

// const api = require("../services/api.service")
const apiLogin = require("../services/login.service")
// const router = new Router(api);
const loginRouter = new Router(apiLogin);


loginRouter.get('/', (req, res) => {
  res.render("index");
})

// ACCESS ROUTES
loginRouter.get('/login', AccessController.login)
loginRouter.get('/register', AccessController.register)

loginRouter.post('/login', AccessController.doLogin)
loginRouter.post('/register', AccessController.doRegister)

loginRouter.delete('/logout', AccessController.logout)


// // ACCOUNT ROUTES
// router.get('/account/balance', AccountController.balance);
// router.get('/account/status', AccountController.accountStatus);
// router.get('/account/documents', AccountController.verifyDocuments);
// router.get('/account/create', AccountController.createAccountPage)

// router.post('/account/create', AccountController.createAccount)


module.exports = loginRouter;