const { Router } = require('express');
const AccessController = require('../controllers/access.controller')
const AccountController = require('../controllers/account.controller');
const CompanyController = require('..//controllers/company.controller');

const api = require("../services/api.service")
const router = new Router(api);

// const apiLogin = require("../services/login.service")
// const loginRouter = new Router(apiLogin);


// Authenticated
router.get('/index', AccessController.indexPage)

// ACCESS ROUTES
router.get('/', AccessController.loginPage)
router.get('/login', AccessController.loginPage)
router.get('/register', AccessController.registerPage)
router.get('/forgot_password', AccessController.forgotPasswordPage)
router.get('/reset_password', AccessController.resetPasswordPage)
router.get('/logout', AccessController.logout)

router.post('/login', AccessController.login)
router.post('/register', AccessController.register)
router.post('/forgot_password', AccessController.forgotPassword)
router.post('/reset_password', AccessController.resetPassword)

//ACCOUNT ROUTES
router.get('/account/balance', AccountController.balance);
router.get('/account/status', AccountController.accountStatus);
router.get('/account/documents', AccountController.verifyDocuments);
router.get('/create', AccountController.createAccountPage)

router.get('/account/company', CompanyController.newCompanyPage)
router.get('/account/company', CompanyController.getCompany)


router.post('/account/create', AccountController.createAccount)
router.post('/account/company', CompanyController.newCompany)


module.exports = router;