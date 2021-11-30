const api = require('../services/api.service')
require('dotenv').config()

module.exports = {
  //chama o form
  createAccountPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("forms/createAccount", { email: email });
  },

  //CHAMA AS PAGINAS
  sendDocumentsPage: async (req, res) => {
    const email = req.session.userEmail;
    res.render("forms/sendDocuments", { email: email });
  },



  //CRIA CONTA DIGITAL
  createAccount: async (req, res) => {
    const data = req.body
    console.log(data)
    const token = req.session.token
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
    try {
      const account = await api.post("/account/create", data, config)

      console.log(account.data.message)
      return res.json(account.data.message)
    } catch (err) {
      console.log(err.response.data)
      res.status(err.status || 400).send(err.response.data)
    }
  },

  // SALDO
  balance: async (req, res) => {
    const token = req.session.token
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
    try {
      const balance = await api.get("/account/balance", config)
      console.log(balance.data.balance)
      return res.json(balance.data.balance)
    } catch (err) {
      console.log(err.stack)
      res.status(err.status || 400).send(err.stack)
    }
  },

  // STATUS DA CONTA
  accountStatus: async (req, res) => {
    const token = req.session.token
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
    try {
      const status = await api.get("/account/status", config)
      console.log(status.data.status)
      return res.json(status.data.status)
    } catch (err) {
      res.status(err.status || 400).send({ message: err.message || err.stack })
    }
  },

  // STATUS DE DOCUMENTOS
  verifyDocuments: async (req, res) => {
    const token = req.session.token
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
    try {
      const documents = await api.get("/account/documents", config)
      return res.json(documents.data)
    } catch (err) {
      res.status(err.status || 400).send({ message: err.message || err.stack })
    }
  },

  // ENVIA DOCUMENTOS
  sendDocuments: async (req, res) => {
    const token = req.session.token;
    const id = req.params.id;
    const formData = req.files;
    console.log(req.files)
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
    try {
      const documents = await api.post(`/account/documents/${id}`, { formData }, config)
      console.log(documents.data)
      return res.json(documents.data)
      // res.send(formData)
    } catch (err) {
      // console.log(err.response)
      return res.status(err.status || 400).send(err.stack)
    }
  },

  // ENVIA HASH DO CARTAO DE CREDITO
  cardHash: async (req, res) => {
    const token = req.session.token
    const hash = req.body
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
    try {
      const response = await api.post("/account/save_card", hash, config)
      return res.json(response.data)
    }
    catch (err) {
      console.log(err)
      return res.status(err.status || 400).send(err)
    }
  },

  // SALVA DADOS DE UMA CONTA BANCARIA TRADICIONAL DO USUARIO 
  bankAccount: async (req, res) => {
    const token = req.session.token
    const data = req.body
    // console.log(data)
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
    try {
      const response = await api.post("/account/bank_account", data, config)
      // console.log(response)
      return res.json(response.data)
    }
    catch (err) {
      console.log(err.response)
      return res.status(err.status || 400).send(err)
    }
  },

  cardPayment: async (req, res) => {
    const token = req.session.token
    const data = req.body
    // console.log(data)
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
    try {
      const response = await api.post("/account/payment_card", data, config)
      return res.json(response.data)
    } catch (err) {
      console.log(err)
      res.status(err.status || 400).send(err)
    }
  },

}