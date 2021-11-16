const preencherFormulario = (endereco) => {
  document.getElementById('street').value = endereco.end
  document.getElementById('neighborhood').value = endereco.bairro
  document.getElementById('city').value = endereco.cidade
  document.getElementById('state').value = endereco.uf
}

const pesquisarCep = async () => {
  const postCode = document.getElementById('postCode').value;

  let validate = true;
  const regexCep = /(^[0-9]{5})([0-9]{3}$)/
  if (!regexCep.test(postCode)) {
    alert('Cep Inválido, tente novamente')
    validate = false
  }

  if (validate) {
    try {
      const dados = await fetch(`http://localhost:5050/cep/${postCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      const endereco = await dados.json();
      preencherFormulario(endereco)

    } catch (err) {
      console.log(err.stack || err.message)
    }

  }
}

////
const createAccount = {
  init: () => {
    document.getElementById('btn_cep').addEventListener('click', pesquisarCep);
    document.getElementById('btn_digital_account').addEventListener('click', createAccount.validate)
  },

  validate: () => {
    //Dados pessoais and Account Holder
    const cpf = document.getElementsByName('cpf')[0].value
    const birthDate = document.getElementsByName('birthDate')[0].value
    const phone = document.getElementsByName('phone')[0].value
    const monthlyIncome = document.getElementsByName('monthlyIncome')[0].value

    const street = document.getElementById('street').value
    const number = document.getElementsByName('number')[0].value
    const neighborhood = document.getElementById('neighborhood').value
    const city = document.getElementById('city').value
    const state = document.getElementById('state').value


    //REGEX TESTS
    const regexCPF = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/
    const regexBirthDate = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/g
    // const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // const regexPhone = /(^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$)/

    let validate = true;
    let message = ''

    if (!regexCPF.test(cpf)) {
      message = `CPF Inválido, verifique os campos.`
      validate = false
    }

    if (!(regexBirthDate.test(birthDate))) {
      message = `Data de nascimento inválida`
      validate = false
    }

    if (phone.length != 11) {
      message = `Telefone Inválido, verifique se digitou corretamente.`
      validate = false
    }

    if (street.length == 0 || neighborhood.length == 0 || city.length == 0 || state.length == 0) {
      message = 'Os campos do endereço não podem ficar em branco'
      validate = false
    }

    if (number.length == 0) {
      message = 'Os campo "número" do endereço não pode ficar em branco'
      validate = false
    }

    if (monthlyIncome.length == 0) {
      message = 'O campo Renda Mensal não pode ficar em branco'
      validate = false
    }

    if (!validate) {
      alert(message)
    } else {
      createAccount.send()
    }
  },

  send: async () => {
    const data = {
      type: "PAYMENT",
      name: document.getElementsByName('name')[0].value,
      document: document.getElementsByName('cpf')[0].value,
      email: document.getElementsByName('email')[0].value,
      birthDate: document.getElementsByName('birthDate')[0].value,
      phone: "55" + document.getElementsByName('phone')[0].value,
      //Area de negócio
      businessArea: 2010, //Serviços(Cobranças e Dívidas)
      linesOfBusiness: "Personal Business",
      //Endereço
      address: {
        street: document.getElementsByName('street')[0].value,
        number: document.getElementsByName('number')[0].value,
        complement: document.getElementsByName('complement')[0].value,
        neighborhood: document.getElementsByName('neighborhood')[0].value,
        city: document.getElementsByName('city')[0].value,
        state: document.getElementsByName('state')[0].value,
        postCode: document.getElementsByName('postCode')[0].value,
      },
      //Renda Mensal
      monthlyIncomeOrRevenue: document.getElementsByName('monthlyIncome')[0].value
    }
    console.log(data)

    const response = await fetch("/account/create", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const res = response.json()

    if (!(response.ok)) {
      alert(err.message)
    } else {
      createAccount.success()
      setTimeout(function () {
        window.location.assign("/index")
      }, 3000)
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
      timer: 2500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'Conta criada com sucesso!',
    })
  },


  loadUserData: () => {
    fetch("/user/data", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then((data) => {
        const userDocument = data[0].document
        if (userDocument.length != 0) {
          Swal.fire({
            title: 'Oops...',
            text: 'Você já criou sua conta digital.',
            icon: 'info',
            confirmButtonColor: '#198754',
          })
          setTimeout(function () {
            window.location.assign("/index")
          }, 2500)
        } else {
          console.log(data[0])
          document.getElementById('name').value += `${data[0].name}`;
          document.getElementById('email').value += `${data[0].email}`
        }
      })
      .catch(err => {
        err.message || console.log(err.stack)
      })
  },

}

window.onload = createAccount.loadUserData()
document.addEventListener('DOMContentLoaded', createAccount.init())