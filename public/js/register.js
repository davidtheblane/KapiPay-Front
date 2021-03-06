const register = {


  init: async () => {
    document.getElementById('btn_register').addEventListener('click', register.validate)
  },

  validate: async () => {
    const name = document.getElementsByName('name')[0].value
    const email = document.getElementsByName('email')[0].value
    const password = document.getElementsByName('password')[0].value

    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const regexName = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/s
    let validate = true;
    let message = ''

    if (!regexName.test(name)) {
      message = 'Escreva seu nome e sobrenome corretamente'
      validate = false
    }
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
      register.send()
    }
  },


  send: async () => {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: document.getElementsByName('name')[0].value,
        email: document.getElementsByName('email')[0].value,
        password: document.getElementsByName('password')[0].value
      })
    })

    const data = await response.json();

    if (!response.ok) {
      console.log(data.message)
      alert(data.message)

    } else {
      // console.log(data)
      // alert('Conta criada com sucesso')
      register.success()

      setTimeout(function () {
        window.location.assign("/login")
      }, 2000)
    }
  },

  //SWEET ALERT BUTTON
  success: async function () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'Conta Criada com Sucesso'
    })
  },
}

window.onload = register.init()



