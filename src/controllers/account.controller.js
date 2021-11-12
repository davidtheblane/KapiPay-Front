const api = require('../services/api.service')
require('dotenv').config()

module.exports = {
  //chama o form
  createAccountPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("forms/createAccount", { email: email });
  },

  //chama o form
  sendDocumentsPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("forms/sendDocuments", { email: email });
  },

  userDataPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("pages/userProfile", { email: email });
  },

  cardPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("forms/addCard", { email: email });
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
      console.log(balance.data.balance)
      return res.json(balance.data.balance)
    } catch (err) {
      console.log(err.stack)
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
      // console.log(documents.data)
      return res.json(documents.data)
    } catch (err) {
      res.status(err.status || 400).send({ message: err.message || err.stack })
    }
  },
  sendDocuments: async (req, res) => {
    try {
      const token = req.session.token
      const id = req.params.id
      const formData = req.files;
      console.log(req.files)
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
      const documents = await api.post(`/account/documents/${id}`, { formData }, config)
      console.log(documents.data)
      return res.json(documents.data)
      // res.send(formData)
    } catch (err) {
      // console.log(err.response)
      return res.status(err.status || 400).send(err.stack)
    }
  },

  userData: async (req, res) => {
    try {
      const token = req.session.token
      const response = await api.get("/user/data", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      return res.json(response.data)
    } catch (err) {
      console.log(err)
      res.status(err.status || 400).send(err)
    }
  },

  // cardHash: async (req, res) => {
  //   const cardData = {
  //     cardNumber: req.body.cardNumber,
  //     holderName: req.body.holderName,
  //     securityCode: req.body.securityCode,
  //     expirationMonth: req.body.expirationMonth,
  //     expirationYear: req.body.expirationYear
  //   }
  //   console.log("cardData", cardData)
  //   try {
  //     console.log('chegou no controller de hash cartao')

  //     const publicToken = process.env.PUBLIC_TOKEN
  //     let checkout = new DirectCheckout(publicToken, false);

  //     checkout.getCardHash(cardData, cardHash => {
  //       console.log(cardHash)
  //       return res.json(cardHash)
  //     },
  //       function (err) {
  //         /* Erro - A variável error conterá o erro ocorrido ao obter o hash */
  //         return res.json(err)
  //       });

  //   } catch (err) {
  //     return res.status(err.status || 400).send(err)
  //   }
  // },

  // cardHash: async (req, res) => {
  //   console.log('chegou no controller de hash cartao')

  //   try {
  //     const publicToken = process.env.PUBLIC_TOKEN
  //     console.log(publicToken)
  //     return res.json(publicToken)

  //   } catch (err) {
  //     return res.status(err.status || 400).send(err)
  //   }
  // },


}