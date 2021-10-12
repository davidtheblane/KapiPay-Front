// const AccountRoutes = require('../../src/routes/account.routes')

const getBalance = {
  init: async () => {
    document.getElementById('balance').addEventListener('click', getBalance.load)
  },

  load: async () => {
    const balance = await fetch('/account/balance', (req, res) => {
      res.data
      console.log(res.data)
    })
    getBalance.send(balance)
  },

  send: async () => {
    let li = document.createElement('li')
    var result = document.createTextNode(balance)
    li.appendChild(result)
  }
}

window.onload = getBalance.init()