const getBalance = {
  init: async () => {
    document.getElementById('balance').addEventListener('click', getBalance.load)
  },

  load: async () => {
    const response = await fetch("http://localhost:5050/account/balance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "Application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTY1MzJmNDJhZTk0YmEwMzM2MmJmNSIsImlhdCI6MTYzNDA0ODIxNSwiZXhwIjoxNjM0MTM0NjE1fQ.owmLPfstlqw5OG4ojNocvEScAl4obdkSQACgspRVles`,
        "resourcetoken": "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A"
      },
    })

    if (!response.ok) {
      alert('algo deu errado!')
    } else {
      const data = await response.json()
      // alert(`Seu saldo é de: ${data.balance}`)
      getBalance.send(data)
    }
  },

  send: async (data) => {
    const outputBalance = document.getElementById('balance')
    console.log(outputBalance)
    const li = document.createElement('li')
    let result = document.createTextNode(`Seu saldo atual é de: ${data.balance}`)
    li.appendChild(result)

    outputBalance.appendChild(li)

  }
}

window.onload = getBalance.init()