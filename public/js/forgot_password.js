const forgotPassword = {
  init: async () => {
    document.getElementById('btn_forgot_password').addEventListener('click', forgotPassword.validate)
  },

  validate: async () => {
    const email = document.getElementsByName('email')[0].value;

    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let validate = true;
    let message = ''

    if (!regexEmail.test(email)) {
      message = 'Email inválido'
      validate = false
    }
    if (!validate) {
      alert(message)
    } else {
      forgotPassword.send()
    }
  },

  send: async () => {
    try {
      const response = await fetch("/forgot_password", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: document.getElementsByName('email')[0].value,
        })
      })

      //pode ser retirado, não é necessario resposta
      const resetToken = await response.json()
      console.log(resetToken.token)

      window.location.assign("/reset_password")

    } catch (err) {
      console.log(err.message)
      alert('Não foi possivel enviar o email')
    }
    //   // if (data === tokenFromEmail) {
    //   //   //envia pra pagina ou campo de troacr senha.
    //   // }
    //   // console.log(response)
    // forgotPassword.resetPassword()
  },

  // resetPassword: async () => {
  //   const resetToken = await forgotPassword.send(response.json())
  //   const emailToken = document.getElementsByName('email-token').value;
  //   const email = document.getElementsByName('email')[0].value;
  //   const newPassword = document.getElementsByName('new-password')[0].value


  //   if (resetToken === emailToken) {
  //     try {
  //       const response = await fetch("/reset_password", {
  //         method: 'POST',
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Accept": "application/json"
  //         },
  //         body: JSON.stringify({
  //           email: document.getElementsByName('email')[0].value,
  //           token: forgotToken,
  //           password: document.getElementsByName('new-password')[0].value
  //         })
  //       })
  //       if (response.ok) {
  //         window.location.assign("/")
  //       } else {
  //         console.log('Algo deu errado, verifique os dados')
  //       }

  //     } catch (err) {
  //       console.log(err.message)
  //       alert('Não foi possivel resetar a senha')
  //     }
  //   }
  // }



}

// document.addEventListener('DOMContentLoaded', login.init)
window.onload = forgotPassword.init()

