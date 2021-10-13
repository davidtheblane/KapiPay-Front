const { Router } = require('express');
const AccountController = require('../controllers/account.controller');

const router = new Router();

router.get('/balance', (req, res) => {
  res.render("pages/main");
})

router.get('/balance', AccountController.balance)
// router.get('/balance', AccountScript.balance)


// router.get('/balance', (req, res) => {
//   res.render("index");
// })

module.exports = router