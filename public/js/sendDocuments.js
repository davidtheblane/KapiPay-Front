const header = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
}

const documents = {

  //VERIFY DOCUMENT STATUS
  verifyDocuments: () => {
    const result = document.getElementById('docs-result')
    result.innerHTML = 'Carregando...'

    fetch("/account/documents", header)
      .then(response => response.json())
      .then((docData) => {
        const selfieStatus = docData[0].approvalStatus
        // const docLink = docData[0]._links.self.href
        const dockStatus = docData[1].approvalStatus
        // const selfieLink = docData[1]._links.self.href

        // //pega referencia do elemento pai onde o resultado sera inserido
        let p = document.createElement('p')
        p.setAttribute('class', 'output')
        p.innerHTML = `
         <p>CPF: ${dockStatus}</p>
         <p>Selfie: ${selfieStatus}</p>`
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
        const id = 'doc' //identificador do id a ser chamado no backend

        fetch(`/account/send-documents/${id}`, {
          method: 'POST',
          body: formData
        })
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

    // POST SELFIE
    document.getElementById('selfie-upload').addEventListener('change', (event) => {
      const handleImageUpload = event => {
        const files = event.target.files
        const formData = new FormData()
        formData.append('selfie-upload', files[0])
        const id = 'selfie' //identificador do id a ser chamado no backend

        fetch(`/account/send-documents/${id}`, {
          method: 'POST',
          body: formData
        })
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

    //   const result = document.getElementById('send-docs-result')
    //   result.innerHTML = ''

    //   fetch("/account/documents", {
    //     method: "PUT",
    //     body: formData
    //   })
    //     .then(response => response.json())
    //     .then((response) => {
    //       console.log("success")
    //       console.log(response)
    //     })
    //     .catch(err => {
    //       err.message || console.log(err)
    //     })
    // })
  },

}
window.onload = documents.verifyDocuments
document.addEventListener('DOMContentLoaded', documents.sendDocuments)
