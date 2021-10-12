
//GET BALANCE
// const accountActions = {

// getBalance: async () => {


//   document.getElementById('balance').addEventListener('click', async () => {
//     console.log('clicou no botao')
//     try {
//       const response = await fetch("http://localhost:5050/account/balance", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "Application/json",
//           "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTY1MzJmNDJhZTk0YmEwMzM2MmJmNSIsImlhdCI6MTYzNDA0ODIxNSwiZXhwIjoxNjM0MTM0NjE1fQ.owmLPfstlqw5OG4ojNocvEScAl4obdkSQACgspRVles`,
//           "resourcetoken": "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A"
//         },
//       });
//       if (response.ok) {
//         const data = await response.json()
//         //pega referencia do elemento pai onde o resultado sera inserido
//         const fatherElement = document.getElementById('balance')
//         let p = document.createElement('p')
//         p.setAttribute('class', 'output')
//         p.textContent = `Seu Saldo é de: ${data.balance}`
//         fatherElement.appendChild(p)
//       }
//     } catch (error) {
//       res.status(400).send({ message: error.message })
//     }


//   })

// },

// GET BALANCE
const getBalance = {
  init: async () => {
    document.getElementById('account_status').addEventListener('click', getBalance.load)
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
      getBalance.send(data)
    }
  },

  send: async (data) => {
    const fatherElement = document.getElementById('account_status')
    let p = document.createElement('p')
    p.setAttribute('class', 'output')
    p.textContent = `Seu saldo é de: ${data.balance}`
    fatherElement.appendChild(p)

  }
}


// ACCOUNT STATUS
// const getAccountStatus = {
//   init: async () => {
//     document.getElementById('account_status').addEventListener('click', getAccountStatus.load)
//   },

//   load: async () => {
//     const response = await fetch("http://localhost:5050/account/status", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "Application/json",
//         "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTY1MzJmNDJhZTk0YmEwMzM2MmJmNSIsImlhdCI6MTYzNDA0ODIxNSwiZXhwIjoxNjM0MTM0NjE1fQ.owmLPfstlqw5OG4ojNocvEScAl4obdkSQACgspRVles`,
//         "resourcetoken": "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A"
//       },
//     })

//     if (!response.ok) {
//       alert('algo deu errado!')
//     } else {
//       const data = await response.json()
//       getAccountStatus.send(data)
//     }
//   },

//   send: async (data) => {
//     const fatherElement = document.getElementById('account_status')
//     let p = document.createElement('p')
//     p.setAttribute('class', 'output')
//     p.textContent = `Documento vinculado a conta: ${data.document} || Sua conta está: ${data.status} || Numero da conta: ${data.accountNumber}`
//     fatherElement.appendChild(p)

//   }
// }
// }

window.onload = getBalance.init

// // Buscar elemento pai
// var elemento_pai = document.body;

// // Criar elemento
// var titulo = document.createElement('h1');

// // Criando o nó de texto de outra forma
// titulo.textContent = "Um título qualquer"

// // Inserir (anexar) o elemento filho (titulo) ao elemento pai (body)
// elemento_pai.appendChild(titulo);