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

    if (!(response.ok)) {
      alert("algo deu errado, verifique os campos")
      // console.log(data)

    } else {
      // console.log("tudo certo")
      newInvoice.success()
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

  success: async function () {
    Swal.fire({
      title: 'Fatura criada!',
      text: 'Gostaria de incluir uma nova?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
      customClass: {
        confirmButton: 'btn btn-sm btn-success',
        denyButton: 'btn btn-sm btn-outline-success'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        // do nothing
      } else if (result.isDenied) {
        window.location.assign("/index")
      }
    })
  },
}
window.onload = newInvoice.loadCompanies()
document.addEventListener('DOMContentLoaded', newInvoice.init)
