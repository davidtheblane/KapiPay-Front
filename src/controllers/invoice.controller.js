const api = require('../services/api.service')

module.exports = {
  //chama o form
  newInvoicePage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("forms/invoice", { email: email });
  },

  //NEW INVOICE
  newInvoice: async (req, res) => {
    try {
      const token = req.session.token
      const data = req.body;
      console.log(data)
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }

      const response = await api.post("/account/charge", { data }, config)
      console.log(response.data)

      return res.json(response.data)
    } catch (err) {
      console.log(err)
      res.status(err.status || 400).send(err.response.data)
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