const api = require('../services/api.service')

module.exports = {
  //chama o form
  newInvoicePage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("forms/invoice", { email: email });
  },

  openInvoiceListPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("pages/openInvoices", { email: email });
  },

  //NEW INVOICE
  newInvoice: async (req, res) => {
    try {
      const token = req.session.token
      const data = req.body;
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }

      const response = await api.post("/account/invoice", { data }, config)

      return res.json(response.data)
    } catch (err) {
      console.log(err)
      res.status(err.status || 400).send(err.response.data)
    }
  },


  getInvoice: async (req, res) => {
    try {
      const token = req.session.token
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
      const response = await api.get("/account/invoices", config)
      return res.json(response.data)
    } catch (err) {
      res.status(400).send(err.response)
    }
  },

  getInvoiceById: async (req, res) => {
    try {
      const token = req.headers.authorization

      const response = await api.get("/account/invoices/:id", {
        headers: {
          "Authorization": token,
          "resourcetoken": resourcetoken
        }
      })
      console.log(response.data)
      return res.json(response.data)
    } catch (err) {
      res.status(400).send({ message: err.message || err.stack })
    }
  },


}