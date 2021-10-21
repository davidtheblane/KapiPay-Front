const api = require('../services/api.service')

module.exports = {
  //chama o form
  createAccountPage: async (req, res) => {
    res.render("forms/account");
  },

  //cria conta
  createAccount: async (req, res) => {
    console.log("chegou no controller")
    try {
      const token = req.headers.authorization
      const account = await api.post("/account/create", {
        headers: {
          "Authorization": token
        }
      })
      console.log(account.data)
      console.log("conta criada")
      return res.json(account.data)
    } catch (err) {
      res.status(400).send({ message: err.message || err.stack })
    }
  },

  balance: async (req, res) => {
    try {
      const token = req.headers.authorization
      const balance = await api.get("/account/balance", {
        headers: {
          "Authorization": token
        }
      })
      console.log(balance.data.balance)
      return res.json(balance.data.balance)
    } catch (err) {
      res.send(console.error(err.stack || err.message))
    }
  },

  accountStatus: async (req, res) => {
    try {
      const token = req.headers.authorization
      const status = await api.get("/account/status", {
        headers: {
          "Authorization": token
        }
      })
      console.log(status.data.status)
      return res.json(status.data.status)
    } catch (error) {
      res.sendStatus(400, { message: error.message })
    }
  },

  verifyDocuments: async (req, res) => {

    try {
      const token = req.headers.authorization
      const documents = await api.get("/account/documents", {
        headers: {
          "Authorization": token
        }
      })
      console.log(documents.data)
      return res.json(documents.data)
    } catch (error) {
      res.sendStatus(400, { message: error.message })
    }
  },
}