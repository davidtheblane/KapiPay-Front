const newCompany = {
  init: async () => {
    document.getElementById('btn_save').addEventListener('click', newCompany.validate)
  },

  validate: async () => {
    const cnpj = document.getElementsByName('cnpj')[0].value
    const description = document.getElementsByName('description')[0].value

    let validate = true;
    let message = ''

    if (cnpj.length != 14 || typeof cnpj != 'string') {
      message = 'CNPJ Inválido'
      validate = false
    }

    if (description.length > 200) {
      message = 'A descrição deve ser menor.'
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
        companyType: document.getElementsByName('companyType')[0].value,
        companyName: document.getElementsByName('companyName')[0].value,
        name: document.getElementsByName('name')[0].value,
        cnpj: document.getElementsByName('cnpj')[0].value,
        description: document.getElementsByName('description')[0].value,
      })
    })

    const data = await response.json();

    if (!response.ok) {
      alert('Algo deu errado, verifique os campos')

    } else {
      newCompany.success()
      // window.location.assign("/login")
    }

  },

  //SWEET ACESS BUTTON
  success: async function () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'Fornecedor Cadastrado com Sucesso'
    })
  },


  loadCompanies: () => {
    const companyType = document.getElementById('companyType')
    fetch("/account/company", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then((data) => {
        const serviceName = data.map(function (item) {
          return item.companyType;
        });

        serviceName.forEach(name => {
          companyType.innerHTML += `<option>${name}</option>`
        });

      })
      .catch(err => {
        err.message || console.log(err.stack)
      })
  },
}
window.onload = newCompany.loadCompanies()
document.addEventListener('DOMContentLoaded', newCompany.init)
