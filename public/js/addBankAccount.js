
const bankAccount = {
  init: async () => {
    document.getElementById('btn_save').addEventListener('click', bankAccount.validate)
  },

  validate: async () => {
    // VALIDATE CARD
    // let validate = true;
    // let message = ''

    // if (!regexEmail.test(email)) {
    //   message = 'Email inválido'
    //   validate = false
    // }
    // if (password.length < 5) {
    //   message = 'Senha deve ter mais de 5 caracteres'
    //   validate = false
    // }
    // if (!validate) {
    //   alert(message)
    // } else {
    //   bankAccount.send()
    // }
    bankAccount.send()

  },

  // generateHash: async () => {
  //   let checkout = new DirectCheckout('D452F31332A6148CF37F5825061C0C6F735275A4B6FB9EDBC3B47DE8E220CCE0', false);
  //   /* Em sandbox utilizar o construtor new DirectCheckout('PUBLIC_TOKEN', false); */

  //   let cardData = {
  //     cardNumber: document.getElementsByName('cardNumber')[0].value,
  //     holderName: document.getElementsByName('holderName')[0].value,
  //     securityCode: document.getElementsByName('securityCode')[0].value,
  //     expirationMonth: document.getElementsByName('expirationMonth')[0].value,
  //     expirationYear: document.getElementsByName('expirationYear')[0].value,
  //   };

  //   const hash = await new Promise((resolve, reject) => {
  //     checkout.getCardHash(cardData, function (cardHash) {
  //       resolve(cardHash)
  //     }, function (error) {
  //       reject(error)
  //       SweetAlert.fire({
  //         icon: 'error',
  //         title: 'Ops! Algo deu errado.',
  //         text: 'Revise os campos e tente novamente.',
  //       })
  //     });
  //   })
  //   bankAccount.send(hash)

  // },

  send: async () => {
    const data = {
      bankNumber: document.getElementsByName('bankNumber')[0].value,
      agencyNumber: document.getElementsByName('agencyNumber')[0].value,
      accountNumber: document.getElementsByName('accountNumber')[0].value,
      accountComplementNumber: document.getElementsByName('accountComplementNumber')[0].value,
      accountType: "CHECKING",
    }

    fetch("/account/bank-account", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        bankAccount.success()
        setTimeout(function () {
          window.location.assign("/user/profile")
        }, 1000)

      }).catch(err => {
        console.log(err)
        alert('Algo deu errado verifique os campos.')
        err
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
      title: 'Conta adicionada com sucesso!'
    })
  }

}

document.addEventListener('DOMContentLoaded', bankAccount.init)
