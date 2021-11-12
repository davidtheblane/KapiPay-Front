const { Router } = require('express');
const AccountController = require('../controllers/account.controller');
const CompanyController = require('../controllers/company.controller');
const InvoiceController = require('../controllers/invoice.controller');

const multer = require('multer');
// const upload = multer({ dest: 'src/config/uploads/' });
const upload = multer({ storage: multer.memoryStorage() });

// Axios Instance
const api = require("../services/api.service");
const router = new Router(api);

//Auth Middleware
const isAuth = require("../middleware/is-auth");

//ACCOUNT ROUTES
// router.use(isAuth)
// SHOW PAGES
router.get('/send-documents', isAuth, AccountController.sendDocumentsPage);
router.get('/create', isAuth, AccountController.createAccountPage);
router.get('/user/profile-card', isAuth, AccountController.cardPage);
router.get('/user/profile', isAuth, AccountController.userDataPage);


router.get('/company-page', isAuth, CompanyController.newCompanyPage);
router.get('/invoice', isAuth, InvoiceController.newInvoicePage);
// GET INFO
router.get('/balance', isAuth, AccountController.balance);
router.get('/status', isAuth, AccountController.accountStatus);
router.get('/documents', isAuth, AccountController.verifyDocuments);
router.get('/company', isAuth, CompanyController.getCompany);
router.get('/invoice', isAuth, InvoiceController.getInvoice);
router.get('/user/data', isAuth, AccountController.userData);
// router.post('/cardHash', isAuth, AccountController.cardHash);


//POST
// router.post('/cardHash', isAuth, AccountController.cardHash);
router.post('/create', isAuth, AccountController.createAccount);
router.post('/company', isAuth, CompanyController.newCompany);
router.post('/invoice', isAuth, InvoiceController.newInvoice);
router.post('/send-documents/:id', isAuth, upload.any(), AccountController.sendDocuments);
// router.post('/send-documents/:id', isAuth, upload.fields([{ name: 'cpf-upload', maxCount: 1 }, { name: 'selfie-upload', maxCount: 1 }]), AccountController.sendDocuments);



module.exports = router