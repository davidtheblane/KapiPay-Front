const { Router } = require('express');
const AccessController = require('../controllers/access.controller')
const api = require("../services/api.service")
const router = new Router(api);

router.get('/', (req, res) => {
  res.render("index");
})

router.get('/login', AccessController.login)
router.get('/register', AccessController.register)

router.post('/login', AccessController.doLogin)
router.post('/register', AccessController.doRegister)

router.delete('/logout', AccessController.logout)



module.exports = router;