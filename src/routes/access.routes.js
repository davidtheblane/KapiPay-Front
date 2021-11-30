const { Router } = require('express');
const AccessController = require('../controllers/access.controller');
// Axios Instance
const api = require("../services/api.service");
const router = new Router(api);

//Auth Middleware
const isAuth = require("../middleware/is-auth");

// MAIN PAGE
router.get('/index', isAuth, AccessController.indexPage);
router.get('/user/profile-card', isAuth, AccessController.cardPage);
router.get('/user/profile-bank-account', isAuth, AccessController.cardBankAccountPage);
router.get('/user/profile', isAuth, AccessController.userDataPage);


// ACCESS ROUTES
router.get('/', AccessController.loginPage);
router.get('/login', AccessController.loginPage);
router.get('/register', AccessController.registerPage);
router.get('/forgot_password', AccessController.forgotPasswordPage);
router.get('/reset_password', AccessController.resetPasswordPage);
router.get('/user/data', isAuth, AccessController.userData);
router.get('/logout', AccessController.logout);
//POST
router.post('/login', AccessController.login);
router.post('/register', AccessController.register);
router.post('/forgot_password', AccessController.forgotPassword);
router.post('/reset_password', AccessController.resetPassword);


module.exports = router;