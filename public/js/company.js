const newCompany = {
  init: async () => {
    document.getElementById('btn_save').addEventListener('click', newCompany.validate)
  },

  validate: async () => {
    const cnpj = document.getElementsByName('cnpj')[0].value

    let validate = true;
    let message = ''

    if (cnpj.length != 14) {
      message = 'CNPJ Inválido'
      validate = false
    }

    if (!validate) {
      alert(message)
    } else {
      newCompany.send()
    }
  },


  send: async () => {
    const response = await fetch("/account/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: document.getElementsByName('name')[0].value,
        cnpj: document.getElementsByName('cnpj')[0].value,
        companyService: document.getElementsByName('companyService')[0].value,
        description: document.getElementsByName('description')[0].value,
      })
    })

    const data = await response.json();

    if (!response.ok) {
      console.log(data)

    } else {

      console.log(data)
      alert('Fornecedor Salvo')
      // window.location.assign("/login")
    }

  }
}

window.onload = newCompany.init()
