const api = require('../services/api.service')

module.exports = {
  //chama o form
  createAccountPage: async (req, res) => {
    res.render("forms/createAccount");
  },

  //CRIA CONTA DIGITAL
  createAccount: async (req, res) => {
    try {
      const data = req.body
      console.log(data)
      const token = req.session.token
      const account = await api.post("/account/create", data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      console.log(account.data.message)
      return res.json(account.data.message)
    } catch (err) {
      console.log(err)
      res.status(err.status || 400).send(err)
    }
  },


  balance: async (req, res) => {
    try {
      const token = req.session.token
      const balance = await api.get("/account/balance", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      console.log(balance.data)
      return res.json(balance.data.balance)
    } catch (err) {
      console.log(err.response)
      res.status(err.status || 400).send(err.stack)
    }
  },


  accountStatus: async (req, res) => {
    try {
      const token = req.session.token
      const status = await api.get("/account/status", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      console.log(status.data.status)
      return res.json(status.data.status)
    } catch (err) {
      res.status(err.status || 400).send({ message: err.message || err.stack })
    }
  },

  verifyDocuments: async (req, res) => {
    try {
      const token = req.session.token
      const documents = await api.get("/account/documents", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      console.log(documents.data)
      return res.json(documents.data)
    } catch (err) {
      res.status(err.status || 400).send({ message: err.message || err.stack })
    }
  },
}