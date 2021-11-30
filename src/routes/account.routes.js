const { Router } = require('express');
const AccountController = require('../controllers/account.controller');
const CompanyController = require('../controllers/company.controller');
const InvoiceController = require('../controllers/invoice.controller');
// Axios Instance
const api = require("../services/api.service");
const router = new Router(api);
// to upload files
const multer = require('multer');
// const upload = multer({ dest: 'src/config/uploads/' });
const upload = multer({ storage: multer.memoryStorage() });

//Auth Middleware
const isAuth = require("../middleware/is-auth");
router.use(isAuth)

//ACCOUNT ROUTES
// SHOW PAGES
router.get('/send-documents', AccountController.sendDocumentsPage);
router.get('/create', AccountController.createAccountPage);
router.get('/company-page', CompanyController.newCompanyPage);
router.get('/invoices/list-open', InvoiceController.openInvoiceListPage);
router.get('/invoice', InvoiceController.newInvoicePage);

// GET
router.get('/balance', AccountController.balance);
router.get('/status', AccountController.accountStatus);
router.get('/documents', AccountController.verifyDocuments);
router.get('/company-type', CompanyController.getCompanyType);
router.get('/company', CompanyController.getCompany);
router.get('/invoices', InvoiceController.getInvoice);
//POST
router.post('/card-hash', AccountController.cardHash);
router.post('/bank-account', AccountController.bankAccount);
router.post('/payment_card', AccountController.cardPayment);
router.post('/create', AccountController.createAccount);
router.post('/company', CompanyController.newCompany);
router.post('/invoice', InvoiceController.newInvoice);
router.post('/send-documents/:id', upload.any(), AccountController.sendDocuments);
// router.post('/send-documents/:id',  upload.fields([{ name: 'cpf-upload', maxCount: 1 }, { name: 'selfie-upload', maxCount: 1 }]), AccountController.sendDocuments);

module.exports = router