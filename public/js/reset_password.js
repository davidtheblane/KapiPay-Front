const resetPassword = {
  init: async () => {
    document.getElementById('btn_reset_password').addEventListener('click', resetPassword.validate)
  },

  validate: async () => {
    const token = document.getElementsByName('token')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;

    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let validate = true;
    let message = ''

    if (token.length != 40) {
      message = 'Token inválido'
      validate = false
    }
    if (!regexEmail.test(email)) {
      message = 'Email inválido'
      validate = false
    }
    if (password.length < 4) {
      message = 'Senha deve ter mais de 5 caracteres'
      validate = false
    }
    if (!validate) {
      alert(message)
    } else {
      resetPassword.send()
    }
  },

  send: async () => {
    const data = {
      token: document.getElementsByName('token')[0].value,
      email: document.getElementsByName('email')[0].value,
      password: document.getElementsByName('password')[0].value,
    }
    try {
      const response = await fetch("/reset_password", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: (data.token, data.email, data.password)
      })
      console.log(response.json())


      alert('Senha alterada com sucesso, faça login novamente!')
      // window.location.assign("/login")



    } catch (err) {
      console.log(err.message)
      alert('Não foi alterar sua senha.')
    }

  }
}

// document.addEventListener('DOMContentLoaded', login.init)
window.onload = resetPassword.init()

