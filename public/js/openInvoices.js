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

        data.forEach(invoice => {
          const item = invoice.invoiceInfo

          let div = document.createElement('div');
          div.className = 'invoice'

          if (!(item.status == "PAID")) {
            div.innerHTML = `<ul>
            <li><strong> Status </strong>: ${item.status = "ATIVO"}</li>
            <li><strong> Fornecedor </strong>: ${item.companyName}</li>
            <li><strong> Valor: </strong> R$ ${item.amount},00</li>
            <li><strong> Vencimento: </strong> ${item.dueDate}</li>
            <li><strong> Linha Digitável: </strong> ${item.barcodeNumber}</li>
            <li><strong> Descrição: </strong> ${item.description}</li>
            <a href="#" id="${item.id}" onclick="openInvoices.confirmation(${item.id})" class="btn btn-warning">Pagar Agora</a>
          </ul>`
            document.getElementById('result').appendChild(div);
          } else {
            div.innerHTML = `<ul>
            <li><strong> Status </strong>: ${item.status = "PAGO"}</li>
            <li><strong> Fornecedor </strong>: ${item.companyName}</li>
            <li><strong> Valor: </strong> R$ ${item.amount},00</li>
            <li><strong> Vencimento: </strong> ${item.dueDate}</li>
            <li><strong> Linha Digitável: </strong> ${item.barcodeNumber}</li>
            <li><strong> Descrição: </strong> ${item.description}</li>
          </ul>`
            document.getElementById('result').appendChild(div);
          }
        })


      })
      .catch(err => {
        err.message || console.log(err)
      })
  },

  confirmation: async (item) => {
    await Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá desfazer essa ação.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#ffc107',
      confirmButtonText: 'Sim, pode mandar ver!',

    })
      .then((result) => {
        const chargeId = {
          chargeId: item.id
        }

        if (result.isConfirmed) {
          fetch("/account/payment_card", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(chargeId)
          })
            .then(response => response.json())
            .then(() => {
              console.log("conta paga")
              Swal.fire(
                'Tá Pago!',
                'Vamos recarregar a página pra você.'
              )
            })
            .then(() => {
              setTimeout(function () {
                document.location.reload(true);
              }, 2500)
            })
        }
      })
  },

}




window.onload = openInvoices.loadOpenInvoices()
document.addEventListener('DOMContentLoaded', openInvoices.init)

