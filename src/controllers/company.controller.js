const api = require('../services/api.service')

module.exports = {
  //chama o form
  newCompanyPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("forms/company", { email: email });
  },

  //NEW COMPANY
  newCompany: async (req, res) => {
    const company = { company: req.body }
    const token = req.session.token
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
    try {
      const response = await api.post("/account/company", company, config)

      console.log(response.data)
      return res.json(response.data)
    } catch (err) {
      console.log(err.response.data)
      res.status(err.status || 400).send(err.response.data)
    }
  },


  getCompany: async (req, res) => {
    try {
      const token = req.session.token
      const response = await api.get("/account/company", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      return res.json(response.data)
    } catch (err) {
      res.status(400).send({ message: err.message || err.stack })
    }
  },



}