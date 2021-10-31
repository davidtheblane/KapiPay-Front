const { Router } = require('express');
const AccountController = require('../controllers/account.controller');
const CompanyController = require('..//controllers/company.controller');
const api = require("../services/api.service")
const router = new Router(api);




router.get('/balance', AccountController.balance);
router.get('/status', AccountController.accountStatus);
router.get('/documents', AccountController.verifyDocuments);
router.get('/create', AccountController.createAccountPage)

router.get('/company', CompanyController.newCompanyPage)
router.get('/company', CompanyController.getCompany)


router.post('/create', AccountController.createAccount)

router.post('/company', CompanyController.newCompany)


module.exports = router