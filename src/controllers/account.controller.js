const api = require('../services/api.service')


module.exports = {

  balance: async (req, res) => {
    try {
      const balance = await api.get("/account/balance")
      console.log(balance.data.balance)
      return res.json(balance.data.balance)
    } catch (error) {
      res.sendStatus(400, { message: error.message })
    }
  },

  accountStatus: async (req, res) => {
    try {
      const status = await api.get("/account/status")
      console.log(status.data.status)
      return res.json(status.data.status)
    } catch (error) {
      res.sendStatus(400, { message: error.message })
    }
  },

  verifyDocuments: async (req, res) => {
    console.log("chegou no controller")
    try {
      const documents = await api.get("/account/documents")
      console.log(documents.data)
      return res.json(documents.data)
    } catch (error) {
      res.sendStatus(400, { message: error.message })
    }
  },
}