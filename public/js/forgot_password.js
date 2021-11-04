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
    // alert("Enviamos um email pra você!")
    forgotPassword.success()
    setTimeout(function () {
      window.location.assign("/reset_password")
    }, 3000)
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
      timer: 2500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'Enviamos um email pra você, corre lá!'
    })
  },

}

// document.addEventListener('DOMContentLoaded', login.init)
window.onload = forgotPassword.init()

