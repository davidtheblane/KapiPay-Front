const { Router } = require('express');
const AccountController = require('../controllers/account.controller');
const CompanyController = require('../controllers/company.controller');
const InvoiceController = require('../controllers/invoice.controller');

// Axios Instance
const api = require("../services/api.service");
const router = new Router(api);

//Auth Middleware
const isAuth = require("../middleware/is-auth");


//ACCOUNT ROUTES
router.get('/balance', isAuth, AccountController.balance);
router.get('/status', isAuth, AccountController.accountStatus);
router.get('/documents', isAuth, AccountController.verifyDocuments);
router.get('/create', isAuth, AccountController.createAccountPage);

router.get('/company', isAuth, CompanyController.newCompanyPage);
router.get('/invoice', isAuth, InvoiceController.newInvoicePage);

router.get('/company', isAuth, CompanyController.getCompany);
router.get('/invoice', isAuth, InvoiceController.getInvoice);
//POST
router.post('/create', isAuth, AccountController.createAccount);
router.post('/company', isAuth, CompanyController.newCompany);
router.post('/invoice', isAuth, InvoiceController.newInvoice);


module.exports = router