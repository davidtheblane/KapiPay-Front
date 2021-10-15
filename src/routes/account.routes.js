const { Router } = require('express');
const AccountController = require('../controllers/account.controller');
const api = require("../services/api.service")
const router = new Router(api);

router.get('/balance', AccountController.balance);
router.get('/status', AccountController.accountStatus);
router.get('/documents', AccountController.verifyDocuments);
router.get('/account', AccountController.createAccount)


module.exports = router