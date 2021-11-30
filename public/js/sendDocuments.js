const documents = {

  //ACCOUNT STATUS
  accountStatus: () => {
    const result = document.getElementById('status-result')
    result.innerHTML = 'Carregando...'

    fetch("/account/status", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((status) => {
        //Apresenta no front
        let p = document.createElement('p')
        p.setAttribute('class', 'output')

        p.innerHTML = JSON.stringify(status)
        result.innerHTML = ''
        result.appendChild(p)

        documents.verifyDocuments()

      })
      .catch(err => {
        err
      })
  },

  //VERIFY DOCUMENTS
  verifyDocuments: () => {
    const result = document.getElementById('docs-result')
    result.innerHTML = 'Carregando...'

    fetch("/account/documents", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((docData) => {
        const selfieStatus = docData[0].approvalStatus
        const dockStatus = docData[1].approvalStatus

        let p = document.createElement('p')
        p.setAttribute('class', 'output')
        p.innerHTML = `
         <p>CPF: ${dockStatus}</p>
         <p>Selfie: ${selfieStatus}</p><hr>`
        result.innerHTML = ''
        result.appendChild(p)
        //pegando id da cobraça pelo link gerado da juno
        const docId = docData[0]._links.self.href.slice(-20)
        const selfId = docData[0]._links.self.hrefselfieLink.slice(-20)
        console.log(docId)
        console.log(selfId)

        return res.send({ docId, selfId })

      })
      .catch(err => {
        err.message || console.log(err)
      })

  },

  //SEND DOCUMENTS
  sendDocuments: () => {
    //POST CPF
    document.getElementById('cpf-upload').addEventListener('change', (event) => {
      const handleImageUpload = event => {
        const files = event.target.files
        const formData = new FormData()
        formData.append('cpf-upload', files[0])

        const options = {
          method: 'POST',
          body: formData,
        }

        const id = 'doc' //identificador do id a ser chamado no backend
        fetch(`/account/send-documents/${id}`, options)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            // alert('Enviado com sucesso!')
          })
          .catch(err => {
            console.error(err)
            alert("Ops! Deu erro... tente novamente.")
          })
      }
      handleImageUpload(event)
    })

    // POST SELFIE
    document.getElementById('selfie-upload').addEventListener('change', (event) => {
      const handleImageUpload = event => {
        const files = event.target.files
        const formData = new FormData()
        formData.append('selfie-upload', files[0])

        const options = {
          method: 'POST',
          body: formData,
        }

        const id = 'selfie' //identificador do id a ser chamado no backend
        fetch(`/account/send-documents/${id}`, options)
          .then(response => response.json())
          .then(data => {
            console.log(data)

          })
          .catch(err => {
            console.error(err)
          })
      }
      handleImageUpload(event)
    })
  },

}
window.onload = documents.accountStatus
document.addEventListener('DOMContentLoaded', documents.sendDocuments)
