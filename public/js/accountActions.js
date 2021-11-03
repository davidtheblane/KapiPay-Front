
const header = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
}

const accountActions = {

  // GET BALANCE
  balance: () => {

    document.getElementById('balance').addEventListener('click', () => {
      const result = document.getElementById('balance-result')
      result.innerHTML = ''

      fetch("/account/balance", header)
        .then(response => response.json())
        .then((balance) => {
          //Apresenta no front
          let p = document.createElement('p')
          p.setAttribute('class', 'output')
          p.innerHTML = `Seu Saldo é de: ${balance}`
          result.appendChild(p)

        })
        .catch(err => {
          err.message || console.log(err.stack)
        })
    })
  },
  //ACCOUNT STATUS
  accountStatus: () => {
    document.getElementById('account_status').addEventListener('click', () => {
      const result = document.getElementById('status-result')
      result.innerHTML = ''

      fetch("/account/status", header)
        .then(response => response.json())
        .then((status) => {
          //Apresenta no front
          let p = document.createElement('p')
          p.setAttribute('class', 'output')
          p.innerHTML = `O status da conta é: ${status}<hr>`
          result.appendChild(p)
        })
        .catch(err => {
          err.message || console.log(err.stack)
        })
    })
  },

  //VERIFY DOCUMENT STATUS
  verifyDocuments: () => {
    document.getElementById('verify_documents').addEventListener('click', () => {
      const result = document.getElementById('docs-result')
      result.innerHTML = ''

      fetch("/account/documents", header)
        .then(response => response.json())
        .then((documents) => {
          const selfieStatus = documents._embedded.documents[0].approvalStatus
          const docLink = documents._embedded.documents[0]._links.self.href
          const dockStatus = documents._embedded.documents[1].approvalStatus
          const selfieLink = documents._embedded.documents[1]._links.self.href
          //pega referencia do elemento pai onde o resultado sera inserido
          let p = document.createElement('p')
          p.setAttribute('class', 'output')
          p.innerHTML = `<hr>
          <a href="${docLink}"><p>CPF/RG: ${dockStatus}</p></a>
          <a href="${selfieLink}"><p>Selfie: ${selfieStatus}</p></a>
          <hr>`
          result.appendChild(p)
        })
        .catch(err => {
          err.message || console.log(err.stack)
        })
    })
  },



}

document.addEventListener('DOMContentLoaded', accountActions.accountStatus)
document.addEventListener('DOMContentLoaded', accountActions.balance)
document.addEventListener('DOMContentLoaded', accountActions.verifyDocuments)
