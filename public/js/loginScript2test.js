const login = {
  init: async () => {
    document.getElementById('btn_login').addEventListener('click', login.validate)
  },

  validate: async () => {
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;

    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let validate = true;
    let message = ''

    if (!regexEmail.test(email)) {
      message = 'Email inválido'
      validate = false
    }
    if (password.length < 5) {
      message = 'Senha deve ter mais de 5 caracteres'
      validate = false
    }
    if (!validate) {
      alert(message)
    } else {
      login.send()
    }
  },

  send: async () => {
    const response = await fetch("/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: document.getElementsByName('email')[0].value,
        password: document.getElementsByName('password')[0].value
      })
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(data)
      alert(data.message)

    } else {
      alert('Login efetuado')
      fetch("/main", {
        method: 'GET'
      })
    }
  }
}

// document.addEventListener('DOMContentLoaded', login.init)
window.onload = login.init()


