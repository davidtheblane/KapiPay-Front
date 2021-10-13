module.exports = {

  balance: async (req, res) => {
    try {
      const response = await fetch("http://localhost:5050/account/balance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "Application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTY1MzJmNDJhZTk0YmEwMzM2MmJmNSIsImlhdCI6MTYzNDA0ODIxNSwiZXhwIjoxNjM0MTM0NjE1fQ.owmLPfstlqw5OG4ojNocvEScAl4obdkSQACgspRVles`,
          "resourcetoken": "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A"
        },
      });
      if (response.ok) {
        const data = await response.json()
        //pega referencia do elemento pai onde o resultado sera inserido
        const fatherElement = document.getElementById('balance')
        let p = document.createElement('p')
        p.setAttribute('class', 'output')
        p.textContent = `Seu Saldo é de: ${data.balance}`
        fatherElement.appendChild(p)
      }

    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  },
}
