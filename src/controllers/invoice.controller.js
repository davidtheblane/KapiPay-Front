const api = require('../services/api.service')

module.exports = {
  //chama o form
  newInvoicePage: async (req, res) => {
    res.render("forms/invoice");
  },

  //NEW COMPANY
  newInvoice: async (req, res) => {
    try {
      const token = req.headers.authorization
      console.log(token)
      const response = await api.post("/account/charge", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      console.log(response)
      return res.json(response)
    } catch (err) {
      console.log(err)
      res.status(err.status || 400).send(err)
    }
  },


  getInvoice: async (req, res) => {
    try {
      const token = req.headers.authorization

      const balance = await api.get("/account/charges", {
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

  getInvoiceById: async (req, res) => {
    try {
      const token = req.headers.authorization

      const balance = await api.get("/account/charges/:id", {
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


}