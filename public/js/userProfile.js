const userProfile = {
  init: async () => {
    // document.getElementById('btn_save').addEventListener('click', userProfile.validate)
  },

  validate: async () => {
    // const cnpj = document.getElementsByName('cnpj')[0].value
    // const description = document.getElementsByName('description')[0].value
    // let companyName = document.getElementsByName('companyName')[0].value
    // let typedName = document.getElementsByName('typedName')[0].value

    // let validate = true;
    // let message = ''

    // if (companyName != "" && typedName != "") {
    //   message = 'Verifique se você digitou apenas um dos campos com o nome da empresa.'
    //   validate = false
    // }
    // if (cnpj.length != 14 || typeof cnpj != 'string') {
    //   message = 'CNPJ Inválido'
    //   validate = false
    // }

    // if (description.length > 200) {
    //   message = 'A descrição deve ser menor.'
    //   validate = false
    // }

    // if (!validate) {
    //   alert(message)
    // } else {
    //   newCompany.send()
    // }
    userProfile.send()

  },

  send: async () => {
    // const response = await fetch("/account/company", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify({
    //     companyType: document.getElementsByName('companyType')[0].value,
    //     name: document.getElementsByName('companyName')[0].value || document.getElementsByName('typedName')[0].value,
    //     cnpj: document.getElementsByName('cnpj')[0].value,
    //     description: document.getElementsByName('description')[0].value,
    //   })
    // })
    // const data = await response.json();

    // if (!response.ok) {
    //   alert(data.message)

    // } else {
    //   newCompany.success()
    //   // window.location.assign("/login")
    // }

  },

  // //SWEET ACESS BUTTON
  // success: async function () {
  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: 'top-right',
  //     iconColor: 'white',
  //     customClass: {
  //       popup: 'colored-toast'
  //     },
  //     showConfirmButton: false,
  //     timer: 2500,
  //     timerProgressBar: true
  //   })
  //   await Toast.fire({
  //     icon: 'success',
  //     title: 'Fornecedor Cadastrado com Sucesso'
  //   })
  // },


  loadUserData: () => {
    const result = document.getElementById('output')
    fetch("/account/user/data", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then((data) => {

        const userData = Object.values(data)
        // console.log(userData)

        userData.forEach(item => {
          result.innerHTML += `<li>${item}</li>`
        });

      })
      .catch(err => {
        err.message || console.log(err.stack)
      })
  },

}




window.onload = userProfile.loadUserData()
document.addEventListener('DOMContentLoaded', userProfile.init)

