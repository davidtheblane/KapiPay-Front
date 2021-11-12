
const newCard = {
  init: async () => {
    document.getElementById('btn_save').addEventListener('click', newCard.validate)
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
    //   newCard.send()
    // }
    newCard.send()

  },

  send: async () => {
    let checkout = new DirectCheckout('D452F31332A6148CF37F5825061C0C6F735275A4B6FB9EDBC3B47DE8E220CCE0', false);
    /* Em sandbox utilizar o construtor new DirectCheckout('PUBLIC_TOKEN', false); */

    let cardData = {
      cardNumber: document.getElementsByName('cardNumber')[0].value,
      holderName: document.getElementsByName('holderName')[0].value,
      securityCode: document.getElementsByName('securityCode')[0].value,
      expirationMonth: document.getElementsByName('expirationMonth')[0].value,
      expirationYear: document.getElementsByName('expirationYear')[0].value,
    };
    console.log(cardData)

    checkout.getCardHash(cardData, cardHash => {
      /* Sucesso - A variável cardHash conterá o hash do cartão de crédito */
      document.getElementById("hash").innerHTML += cardHash
      console.log(cardHash)
    }, function (error) {
      /* Erro - A variável error conterá o erro ocorrido ao obter o hash */
      document.getElementById("hash").innerHTML += error
    });
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
      title: 'Bem Vindo!'
    })
  }




}

document.addEventListener('DOMContentLoaded', newCard.init)
