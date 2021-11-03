const api = require('../services/api.service')

module.exports = {
  //chama o form
  newCompanyPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("forms/company", { email: email });
  },

  //NEW COMPANY
  newCompany: async (req, res) => {
    try {
      const token = req.headers.authorization
      console.log(token)
      const response = await api.post("/account/company", {
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


  getCompany: async (req, res) => {
    try {
      const token = req.headers.authorization

      const balance = await api.get("/account/companies", {
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