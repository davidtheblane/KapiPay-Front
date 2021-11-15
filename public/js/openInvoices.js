const openInvoices = {
  init: async () => {
    // document.getElementById('btn_save').addEventListener('click', openInvoices.validate)
  },

  validate: async () => {
    // const cnpj = document.getElementsByName('cnpj')[0].value
    // const description = document.getElementsByName('description')[0].value
    // let companyName = document.getElementsByName('companyName')[0].value
    // let typedName = document.getElementsByName('typedName')[0].value

    // let validate = true;
    // let message = ''

    // if (companyName != "" && typedName != "") {
    //   message = 'Verifique se você digitou apenas um dos campos com o nome da empresa.'
    //   validate = false
    // }
    // if (cnpj.length != 14 || typeof cnpj != 'string') {
    //   message = 'CNPJ Inválido'
    //   validate = false
    // }

    // if (description.length > 200) {
    //   message = 'A descrição deve ser menor.'
    //   validate = false
    // }

    // if (!validate) {
    //   alert(message)
    // } else {
    //   newCompany.send()
    // }
    openInvoices.send()

  },

  send: async () => {
    // const response = await fetch("/account/company", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify({
    //     companyType: document.getElementsByName('companyType')[0].value,
    //     name: document.getElementsByName('companyName')[0].value || document.getElementsByName('typedName')[0].value,
    //     cnpj: document.getElementsByName('cnpj')[0].value,
    //     description: document.getElementsByName('description')[0].value,
    //   })
    // })
    // const data = await response.json();

    // if (!response.ok) {
    //   alert(data.message)

    // } else {
    //   openInvoices.success()
    //   // window.location.assign("/login")
    // }

  },

  loadOpenInvoices: () => {
    fetch("/account/invoices", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        // const company = data.map(function (item) {
        //   return item.name;
        // });
        // company.forEach(item => {
        //   companyName.innerHTML += `<option>${item}</option>`
        // });

      })
      .catch(err => {
        err.message || console.log(err.stack)
      })
  },

}




window.onload = openInvoices.loadOpenInvoices()
document.addEventListener('DOMContentLoaded', openInvoices.init)

