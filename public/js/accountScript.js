const getBalance = {
  init: async () => {
    document.getElementById('balance').addEventListener('click', event => {
      console.log(event.target)
    })

    // document.getElementById('balance').addEventListener('click', getBalance.load)
  },

  load: async () => {
    const balance = await fetch('account/balance', (req, res) => {
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


document.addEventListener('DOMContentLoaded', getBalance.init)
// window.onload = login.init()


