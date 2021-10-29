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
    await fetch("/forgot_password", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: document.getElementsByName('email')[0].value,
      })
    })
    //por questões de segurança não é informado se o usuario existe ou não.  
    alert("Enviamos um email pra você!")
    window.location.assign("/reset_password")
  },

}

// document.addEventListener('DOMContentLoaded', login.init)
window.onload = forgotPassword.init()

