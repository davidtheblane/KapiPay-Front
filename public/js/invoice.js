const newInvoice = {
  init: async () => {
    document.getElementById('btn_save').addEventListener('click', newInvoice.validate)
  },

  validate: async () => {
    const amount = document.getElementsByName('amount')[0].value

    let validate = true;
    let message = ''

    if (amount > 50) {
      message = 'No momento só podemos registrar valores menos que R$50,00.'
      validate = false
    }

    if (!validate) {
      alert(message)
    } else {
      newInvoice.send()
    }
  },


  send: async () => {

    const response = await fetch("/account/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        companyName: document.getElementsByName('companyName')[0].value,
        amount: document.getElementsByName('amount')[0].value,
        barcodeNumber: document.getElementsByName('barcodeNumber')[0].value,
        dueDate: document.getElementsByName('dueDate')[0].value,
        description: document.getElementsByName('description')[0].value,
        paymentTypes: ["CREDIT_CARD", "BOLETO"],
        paymentAdvance: true,
      })
    })

    const data = await response.json();

    if (!response.ok) {
      console.log(data)

    } else {
      newInvoice.success()
      alert("Deseja cadastrar uma nova?")
      // window.location.assign("/login")
      // window.location.assign("/login")
    }

  },

  loadCompanies: () => {
    fetch("/account/company", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then((data) => {
        const company = data.map(function (item) {
          return item.name;
        });
        company.forEach(item => {
          companyName.innerHTML += `<option>${item}</option>`
        });

      })
      .catch(err => {
        err.message || console.log(err.stack)
      })
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
      title: 'Fatura Cadastrada com Sucesso'
    })
  },
}
window.onload = newInvoice.loadCompanies()
document.addEventListener('DOMContentLoaded', newInvoice.init)
