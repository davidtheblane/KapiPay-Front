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

    if (!(response.ok)) {
      // console.log('resposta nao veio')
      console.log(data.message)
      alert(data.message)

    } else {
      // console.log(data)
      alert('Bem-vindo!')
      window.location.assign("/index")
    }
  }
}


// SWEET ALERT
// Pré carrega banner LGPD
window.addEventListener('load', () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-sm btn-outline-success',
      cancelButton: 'btn btn-sm btn-outline-success'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Cookies?',
    titleText: 'Cookies?',
    text: "Usamos cookies para total funcionalidade do sistema. Para saber mais acesse nossa política de privacidade.",
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Eu Aceito',
    cancelButtonText: 'Não aceito.',
    backdrop: false,
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Obrigado!',
        '',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Atenção!',
        'A funcionalidade do sistema estará restrita e você não poderá executar todas as ações. Se mudar de idéia recarregue a página e clique em "Eu Aceito".',
        'info'
      )
    }
  })
});

window.onload = login.init()
// document.addEventListener('DOMContentLoaded', login.init)

