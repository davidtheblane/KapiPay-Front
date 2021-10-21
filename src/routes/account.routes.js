const { Router } = require('express');
const AccountController = require('../controllers/account.controller');
const CepController = require('../controllers/cep.controller');

const api = require("../services/api.service")
const serviceCep = require("../services/cep.service")

const router = new Router(api);
const cepRouter = new Router(serviceCep)



router.get('/balance', AccountController.balance);
router.get('/status', AccountController.accountStatus);
router.get('/documents', AccountController.verifyDocuments);
router.get('/create', AccountController.createAccountPage)

router.post('/create', AccountController.createAccount)

cepRouter.get('/cep', CepController.getCep)

module.exports = router