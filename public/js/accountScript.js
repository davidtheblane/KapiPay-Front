const dotenv = ('dotenv')
const BearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTY1MzJmNDJhZTk0YmEwMzM2MmJmNSIsImlhdCI6MTYzNDEzODAwMiwiZXhwIjoxNjM0MjI0NDAyfQ.wFHR50AaTmnNJBkff_Q68IRscZM0nVFyxfWDQ4bKxxU"
const ResourceToken = "BFBE2F8263AAD912E3159026ECAC481BEA90165A2C77EA2E35E111AC09B2F32A"

const accountActions = {

  // GET BALANCE
  balance: async () => {

    document.getElementById('balance').addEventListener('click', async () => {

      try {
        const response = await fetch("http://localhost:5050/account/balance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "Application/json",
            "Authorization": `Bearer ${BearerToken}`,
            "resourcetoken": `${ResourceToken}`
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
    });
  },

  // ACCOUNT STATUS
  accountStatus: async () => {

    document.getElementById('account_status').addEventListener('click', async () => {
      try {

        const response = await fetch("http://localhost:5050/account/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "Application/json",
            "Authorization": `Bearer ${BearerToken}`,
            "resourcetoken": `${ResourceToken}`
          },
        });
        if (response.ok) {
          const data = await response.json()
          //pega referencia do elemento pai onde o resultado sera inserido
          const fatherElement = document.getElementById('account_status')
          let p = document.createElement('p')
          p.setAttribute('class', 'output')
          p.textContent = `O status da sua conta é: ${data.status}`
          fatherElement.appendChild(p)
        }

      } catch (error) {
        res.status(400).send({ message: error.message })
      }
    });
  },

  // VERIFY DOCUMENTS
  verifyDocuments: async () => {

    document.getElementById('verify_documents').addEventListener('click', async () => {
      try {

        const response = await fetch("http://localhost:5050/account/documents", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "Application/json",
            "Authorization": `Bearer ${BearerToken}`,
            "resourcetoken": `${ResourceToken}`
          },
        });
        if (response.ok) {
          const data = await response.json()
          const selfieStatus = data._embedded.documents[0].approvalStatus
          const docLink = data._embedded.documents[0]._links.self.href
          const dockStatus = data._embedded.documents[1].approvalStatus
          const selfieLink = data._embedded.documents[1]._links.self.href

          //pega referencia do elemento pai onde o resultado sera inserido
          const fatherElement = document.getElementById('verify_documents')
          let p = document.createElement('p')
          p.setAttribute('class', 'output')
          p.innerHTML = `
          <a href="${docLink}"><p>CPF/RG: ${dockStatus}</p></a>
          <a href="${selfieLink}"><p>Selfie: ${selfieStatus}</p></a>
          `
          fatherElement.appendChild(p)
        }

      } catch (error) {
        res.status(400).send({ message: error.message })
      }
    });
  },

}

document.addEventListener('DOMContentLoaded', accountActions.accountStatus)
document.addEventListener('DOMContentLoaded', accountActions.balance)
document.addEventListener('DOMContentLoaded', accountActions.verifyDocuments)

