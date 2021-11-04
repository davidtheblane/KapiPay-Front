const preencherFormulario = (endereco) => {
  document.getElementById('street').value = endereco.end
  document.getElementById('neighborhood').value = endereco.bairro
  document.getElementById('city').value = endereco.cidade
  document.getElementById('state').value = endereco.uf
}

const pesquisarCep = async () => {
  const postCode = document.getElementById('postCode').value;

  let validate = true;
  const regexCep = /^\d{5}\d{3}$/;
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
    const name = document.getElementsByName('name')[0].value
    const email = document.getElementsByName('email')[0].value
    const cpf = document.getElementsByName('cpf')[0].value
    const birthDate = document.getElementsByName('birthDate')[0].value
    const phone = document.getElementsByName('phone')[0].value

    //REGEX TESTS
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const regexBirthDate = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/g


    let validate = true;
    let message = ''

    if (name.length < 2) {
      message = 'Escreva seu nome corretamente'
      validate = false
    }

    if (!regexEmail.test(email)) {
      message = 'Email inválido'
      validate = false
    }

    if (!cpf.length === 11) {
      message = `CPF Inválido, deve ter 11 caracteres, o seu tem ${cpf.length} caracteres`
      validate = false
    }

    if (!(regexBirthDate.test(birthDate))) {
      message = `Data de nascimento inválida`
      validate = false
    }

    if (!phone.length === 13) {
      message = `Telefone Inválido, deve ter 13 caracteres, o seu tem ${phone.length} caracteres`
      validate = false
    }

    if (!validate) {
      alert(message)
    } else {
      createAccount.send()
    }
  },

  send: () => {
    const data = {
      type: "PAYMENT",
      name: document.getElementsByName('name')[0].value,
      document: document.getElementsByName('cpf')[0].value,
      email: document.getElementsByName('email')[0].value,
      birthDate: document.getElementsByName('birthDate')[0].value,
      phone: document.getElementsByName('phone')[0].value,
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

    fetch("/account/create", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(accountCreated => {
        createAccount.success()
        setTimeout(function () {
          window.location.assign("/index")
        }, 3000)

      }).catch(err => {
        err
      })
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
      title: 'Conta criada com sucesso!'
    })
  },
}

// window.onload = createAccount.init()
document.addEventListener('DOMContentLoaded', createAccount.init())