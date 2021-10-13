const AccountController = require('../controllers/account.controller')

const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
  res.render("index");
})

router.get('/login', (req, res) => {
  res.render("pages/login");
})

router.post('/login', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

router.get('/register', (req, res) => {
  res.render("pages/register")
})

router.post('/register', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})


router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect("pages/login");
})

// router.get('/account/balance', (req, res) => {
//   const rota = JSON.stringify(res.data)
//   console.log("chegou na rota", rota)
// });


module.exports = router;