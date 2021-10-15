const accountActions = {

  // GET BALANCE
  balance: () => {
    document.getElementById('balance').addEventListener('click', async () => {

      const response = await fetch("/account/balance")

      if (!(response.ok)) {
        console.log("a resposta não veio")
      } else {
        const balance = await response.json()
        //pega referencia do elemento pai onde o resultado sera inserido
        const fatherElement = document.getElementById('balance')
        let p = document.createElement('p')
        p.setAttribute('class', 'output')
        p.innerHTML = `<hr>
        Seu Saldo é de: ${balance}
        <hr>`
        fatherElement.appendChild(p)
      }
    })
  },

  accountStatus: () => {
    document.getElementById('account_status').addEventListener('click', async () => {

      const response = await fetch("/account/status")

      if (!response.ok) {
        console.log("a resposta não veio, talvez o token esteja invalido")
      } else {
        const status = await response.json()
        //pega referencia do elemento pai onde o resultado sera inserido
        const fatherElement = document.getElementById('account_status')
        let p = document.createElement('p')
        p.setAttribute('class', 'output')
        p.innerHTML = `<hr>
        O status da conta é: ${status}
        <hr>`
        fatherElement.appendChild(p)
      }
    })
  },

  verifyDocuments: () => {
    document.getElementById('verify_documents').addEventListener('click', async () => {

      const response = await fetch("/account/documents")

      if (!(response.ok)) {
        console.log("a resposta não veio")
      } else {
        console.log('requisição feita')

        const documents = await response.json()
        const selfieStatus = documents._embedded.documents[0].approvalStatus
        const docLink = documents._embedded.documents[0]._links.self.href
        const dockStatus = documents._embedded.documents[1].approvalStatus
        const selfieLink = documents._embedded.documents[1]._links.self.href


        //pega referencia do elemento pai onde o resultado sera inserido
        const fatherElement = document.getElementById('verify_documents')
        let p = document.createElement('p')
        p.setAttribute('class', 'output')
        p.innerHTML = `<hr>
          <a href="${docLink}"><p>CPF/RG: ${dockStatus}</p></a>
          <a href="${selfieLink}"><p>Selfie: ${selfieStatus}</p></a>
          <hr>
          `
        fatherElement.appendChild(p)
      }
    })
  },

}

document.addEventListener('DOMContentLoaded', accountActions.accountStatus)
document.addEventListener('DOMContentLoaded', accountActions.balance)
document.addEventListener('DOMContentLoaded', accountActions.verifyDocuments)
