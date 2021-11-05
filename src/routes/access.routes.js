const { Router } = require('express');
const AccessController = require('../controllers/access.controller');

// Axios Instance
const api = require("../services/api.service");
const router = new Router(api);

//Auth Middleware
const isAuth = require("../middleware/is-auth");

// MAIN PAGE
router.get('/index', isAuth, AccessController.indexPage);
// ACCESS ROUTES
router.get('/', AccessController.loginPage);
router.get('/login', AccessController.loginPage);
router.get('/register', AccessController.registerPage);
router.get('/forgot_password', AccessController.forgotPasswordPage);
router.get('/reset_password', AccessController.resetPasswordPage);
//POST
router.post('/login', AccessController.login);
router.post('/register', AccessController.register);
router.post('/forgot_password', AccessController.forgotPassword);
router.post('/reset_password', AccessController.resetPassword);
router.get('/logout', AccessController.logout);


module.exports = router;