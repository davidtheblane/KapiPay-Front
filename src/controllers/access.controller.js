const { response } = require('express');
const api = require('../services/api.service');

module.exports = {

  login: async (req, res) => {
    res.render("pages/login");
  },

  doLogin: async (req, res) => {
    try {
      const response = await api.post('/login', req.body)
      res.status(200).send(response.data)
    } catch (error) {
      res.status(400).send({ message: error.response.data.error })
    }
  },

  register: async (req, res) => {
    res.render("pages/register")
  },

  doRegister: async (req, res) => {
    try {
      const response = await api.post('/register', req.body)
      res.status(200).send(response.data)
    } catch (error) {
      res.status(400).send({ message: error.response.data.error })
    }
  },

  logout: async (req, res) => {
    req.logOut();
    res.redirect("pages/login");
  }



}

// balance: async (req, res) => {
//   try {
//     const balance = await api.get("/account/balance")
//     console.log(balance.data.balance)
//     return res.json(balance.data.balance)
//   } catch (error) {
//     res.sendStatus(400, { message: error.message })
//   }
// },