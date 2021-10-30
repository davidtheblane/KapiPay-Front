const api = require('../services/api.service')
const apiLogin = require('../services/login.service')


module.exports = {
  //chama o form
  createAccountPage: async (req, res) => {
    res.render("forms/createAccount");
  },

  //CRIA CONTA DIGITAL
  createAccount: async (req, res) => {
    console.log("chegou no controller")
    try {
      const token = req.headers.authorization
      const account = await apiLogin.post("/account/create", {
        headers: {
          "Authorization": token,
        }
      })

      console.log(account)
      return res.json(account)
    } catch (err) {
      console.log(err.response.config)
      res.status(err.status || 400).send({ err: err.stack })
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