const newInvoice = {
  init: async () => {
    document.getElementById('btn_save').addEventListener('click', newInvoice.validate)
  },

  validate: async () => {
    const amount = document.getElementsByName('amount')[0].value

    let validate = true;
    let message = ''

    if (amount > 50) {
      message = 'No momento só podemos registrar valores menos que R$50,00, tente novamente.'
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
        companyName: document.getElementsByName('description')[0].value,
        description: document.getElementsByName('description')[0].value,
        amount: document.getElementsByName('amount')[0].value,
        dueDate: document.getElementsByName('dueDate')[0].value,
        paymentTypes: ["CREDIT_CARD", "BOLETO"],
        paymentAdvance: true,
      })
    })

    const data = await response.json();

    if (!response.ok) {
      console.log(data)

    } else {

      console.log(data)
      alert('Fatura Cadastrada')
      // window.location.assign("/login")
    }

  }
}

window.onload = newInvoice.init()
