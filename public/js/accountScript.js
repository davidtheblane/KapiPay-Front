const token = document.cookie.split("=")[1]
const header = {
  headers: {
    "Authorization": `Bearer ${token}`
  }
}

const accountActions = {

  // GET BALANCE
  balance: () => {
    document.getElementById('balance').addEventListener('click', () => {

      fetch("/account/balance", header)
        .then(response => response.json())
        .then((balance) => {
          //Apresenta no front
          let p = document.createElement('p')
          document.getElementById('balance').appendChild(p)
          p.setAttribute('class', 'output')
          p.innerHTML = `<hr>
              Seu Saldo é de: ${balance}
              <hr>`
        })
        .catch(err => {
          err.message || console.log(err.stack)
        })
    })
  },

  accountStatus: () => {
    document.getElementById('account_status').addEventListener('click', () => {

      fetch("/account/status", header)
        .then(response => response.json())
        .then((status) => {
          //Apresenta no front
          let p = document.createElement('p')
          document.getElementById('account_status').appendChild(p)
          p.setAttribute('class', 'output')
          p.innerHTML = `<hr>
          O status da conta é: ${status}
          <hr>`
        })
        .catch(err => {
          err.message || console.log(err.stack)
        })
    })
  },

  verifyDocuments: () => {
    document.getElementById('verify_documents').addEventListener('click', () => {

      fetch("/account/documents", header)
        .then(response => response.json())
        .then((documents) => {
          const selfieStatus = documents._embedded.documents[0].approvalStatus
          const docLink = documents._embedded.documents[0]._links.self.href
          const dockStatus = documents._embedded.documents[1].approvalStatus
          const selfieLink = documents._embedded.documents[1]._links.self.href
          //pega referencia do elemento pai onde o resultado sera inserido
          let p = document.createElement('p')
          document.getElementById('verify_documents').appendChild(p)
          p.setAttribute('class', 'output')
          p.innerHTML = `<hr>
          <a href="${docLink}"><p>CPF/RG: ${dockStatus}</p></a>
          <a href="${selfieLink}"><p>Selfie: ${selfieStatus}</p></a>
          <hr>`
        })
        .catch(err => {
          err.message || console.log(err.stack)
        })
    })
  },

  // CREATE ACCOUNT
  // createAccount: () => {
  //   document.getElementById('btn_digital_account').addEventListener('click', () => {

  //     fetch("/account/create", header)
  //       .then(response => response.json)
  //       .then((createResponse) => {
  //         let p = document.createElement('p')
  //         document.getElementById('btn_digital_account').appendChild(p)
  //         p.setAttribute('class', 'output')
  //         p.innerHTML = `<hr>
  //       Conta Criada: ${createResponse.name}
  //       <hr>`
  //       })

  //   // if (!(response.ok)) {
  //   //   console.log("a resposta não veio")
  //   // } else {
  //   //   const balance = await response.json()
  //   //   //pega referencia do elemento pai onde o resultado sera inserido
  //   //   const fatherElement = document.getElementById('btn_digital_account')
  //   //   let p = document.createElement('p')
  //   //   p.setAttribute('class', 'output')
  //   //   p.innerHTML = `<hr>
  //   //   Seu Saldo é de: ${balance}
  //   //   <hr>`
  //   //   fatherElement.appendChild(p)
  //   // }
  // })
  //   },

}

document.addEventListener('DOMContentLoaded', accountActions.accountStatus)
document.addEventListener('DOMContentLoaded', accountActions.balance)
document.addEventListener('DOMContentLoaded', accountActions.verifyDocuments)
// document.addEventListener('DOMContentLoaded', accountActions.createAccount)
