const api = require('../services/api.service')

module.exports = {
  //chama o form
  createAccountPage: async (req, res) => {
    res.render("forms/createAccount");
  },

  //cria conta
  createAccount: async (req, res) => {
    console.log("chegou no controller")
    try {
      const token = req.headers.authorization
      const resourcetoken = req.headers.resourcetoken
      const account = await api.post("/account/create", {
        headers: {
          "Authorization": token,
          "resourcetoken": resourcetoken
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
      const resourcetoken = req.headers.resourcetoken

      const balance = await api.get("/account/balance", {
        headers: {
          "Authorization": token,
          "resourcetoken": resourcetoken
        }
      })
      console.log(balance.data.balance)
      return res.json(balance.data.balance)
    } catch (err) {
      res.status(400).send({ message: err.message || err.stack })
    }
  },


  accountStatus: async (req, res) => {
    try {
      const token = req.headers.authorization
      const resourcetoken = req.headers.resourcetoken
      const status = await api.get("/account/status", {
        headers: {
          "Authorization": token,
          "resourcetoken": resourcetoken
        }
      })
      console.log(status.data.status)
      return res.json(status.data.status)
    } catch (err) {
      res.status(400).send({ message: err.message || err.stack })
    }
  },

  verifyDocuments: async (req, res) => {

    try {
      const token = req.headers.authorization
      const resourcetoken = req.headers.resourcetoken
      const documents = await api.get("/account/documents", {
        headers: {
          "Authorization": token,
          "resourcetoken": resourcetoken
        }
      })
      console.log(documents.data)
      return res.json(documents.data)
    } catch (err) {
      res.status(400).send({ message: err.message || err.stack })
    }
  },
}