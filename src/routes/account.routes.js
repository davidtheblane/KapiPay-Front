const { Router } = require('express');
let api = require('../services/api.service');
const AccountController = require('../controllers/account.controller');

const router = new Router(api);

router.get('/balance', AccountController.balance)

// router.get('/balance', (req, res) => {
//   res.render("index");
// })

module.exports = router