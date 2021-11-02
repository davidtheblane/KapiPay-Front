const { Router } = require('express');
const AccessController = require('../controllers/access.controller')
const AccountController = require('../controllers/account.controller');
const CompanyController = require('..//controllers/company.controller');

const api = require("../services/api.service")
const router = new Router(api);

const isAuth = require("../middleware/is-auth");

// const apiLogin = require("../services/login.service")
// const loginRouter = new Router(apiLogin);


// MAIN PAGE
router.get('/index', isAuth, AccessController.indexPage)

// ACCESS ROUTES
router.get('/', AccessController.loginPage)
router.get('/login', AccessController.loginPage)
router.get('/register', AccessController.registerPage)
router.get('/forgot_password', AccessController.forgotPasswordPage)
router.get('/reset_password', AccessController.resetPasswordPage)

router.post('/login', AccessController.login)
router.post('/register', AccessController.register)
router.post('/forgot_password', AccessController.forgotPassword)
router.post('/reset_password', AccessController.resetPassword)
router.get('/logout', AccessController.logout)

//ACCOUNT ROUTES
router.get('/account/balance', isAuth, AccountController.balance);
router.get('/account/status', isAuth, AccountController.accountStatus);
router.get('/account/documents', isAuth, AccountController.verifyDocuments);
router.get('/create', isAuth, AccountController.createAccountPage)

router.get('/account/company', isAuth, CompanyController.newCompanyPage)
router.get('/account/company', isAuth, CompanyController.getCompany)


router.post('/account/create', isAuth, AccountController.createAccount)
router.post('/account/company', isAuth, CompanyController.newCompany)


module.exports = router;