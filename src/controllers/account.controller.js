const api = require('../services/api.service')

module.exports = {
  //chama o form
  createAccountPage: async (req, res) => {
    res.render("forms/createAccount");
  },

  //CRIA CONTA DIGITAL
  createAccount: async (req, res) => {
    try {
      const data = {
        token: req.headers.authorization,
        // resourcetoken: req.headers.resourcetoken
      }
      const account = await api.post("/account/create", {
        headers: {
          "Authorization": `Bearer ${data.token}`
        }
      })

      console.log(account)
      return res.json(account)
    } catch (err) {
      console.log(err.response)
      res.status(err.status || 400).send({ err: err.stack })
    }
  },


  balance: async (req, res) => {
    try {
      const data = {
        token: req.headers.authorization,
        resourcetoken: req.headers.resourcetoken
      }
      console.log(data)
      // const resourcetoken = req.headers.resourcetoken

      const balance = await api.get("/account/balance", {
        headers: {
          "Authorization": `Bearer ${data.token}`,
          "resourcetoken": data.resourcetoken
        }
      })
      console.log(balance.data)
      return res.json(balance.data.balance)
    } catch (err) {
      res.status(err.status || 400).send(err.stack)


    }
  },


  accountStatus: async (req, res) => {
    try {
      const data = {
        token: req.headers.authorization,
        resourcetoken: req.headers.resourcetoken
      }
      const status = await api.get("/account/status", {
        headers: {
          "Authorization": `Bearer ${data.token}`,
          "resourcetoken": data.resourcetoken
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
      const data = {
        token: req.headers.authorization,
        resourcetoken: req.headers.resourcetoken
      }
      const documents = await api.get("/account/documents", {
        headers: {
          "Authorization": `Bearer ${data.token}`,
          "resourcetoken": data.resourcetoken
        }
      })
      console.log(documents.data)
      return res.json(documents.data)
    } catch (err) {
      res.status(err.status || 400).send({ message: err.message || err.stack })
    }
  },
}