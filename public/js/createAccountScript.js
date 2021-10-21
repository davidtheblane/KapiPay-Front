// const body = {
//   body: '11050300'
// }

// const postCode = document.getElementById('postCode').value
// const postCode = '11050300'
// const url = `/account/cep`;
// const dados = await fetch(url)

const preencherFormulario = (endereco) => {
  document.getElementById('street').value = endereco.logradouro
  document.getElementById('neighborhood').value = endereco.bairro
  document.getElementById('city').value = endereco.localidade
  document.getElementById('state').value = endereco.uf

  console.log(endereco)
}

const pesquisarCep = async () => {
  const postCode = ""

  const dados = await fetch(`http://localhost:5050/cep/${postCode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  const endereco = await dados.json();
  if (endereco) {
    preencherFormulario(JSON.stringify(endereco))
  }

  // if (endereco.hasOwnProperty('erro')) {
  //   document.getElementById('street').value = `CEP não encontrado, tente novamente...`
  // } else {
  //   preencherFormulario(endereco)
  //   console.log(endereco)
  // }
}

// const pesquisarCep = () => {
//   const postCode = "11050300"

//   fetch(`http://localhost:5050/cep/${postCode}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//     },
//   })
//     .then((response => response.json()))
//     .then((endereco) => {
//       console.log('chegou na resposta', endereco)
//       preencherFormulario(endereco)
//     }).catch(err => {
//       console.log({ err: err.message })
//     })
// }
// if (endereco.hasOwnProperty('erro')) {
//   document.getElementById('street').value = `CEP não encontrado, tente novamente...`
// } else {
//   preencherFormulario(endereco)
//   console.log(endereco)
// }

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
    //Area de negócio
    // const businessArea = document.getElementsByName('businessArea')[0].value
    // const linesOfBusiness = document.getElementsByName('linesOfBusiness')[0].value
    //Endereço
    // const postCode = document.getElementsByName('postCode')[0].value
    // const street = document.getElementsByName('street')[0].value
    // const number = document.getElementsByName('number')[0].value
    // const complement = document.getElementsByName('complement')[0].value
    // const neighborhood = document.getElementsByName('neighborhood')[0].value
    // const city = document.getElementsByName('city')[0].value
    // const state = document.getElementsByName('state')[0].value
    //Renda Mensal
    // const monthlyIncome = document.getElementsByName('monthlyIncome')[0].value
    //Dados Bancários
    // const bankNumber = document.getElementsByName('bankNumber')[0].value
    // const agencyNumber = document.getElementsByName('agencyNumber')[0].value
    // const accountNumber = document.getElementsByName('accountNumber')[0].value
    //Account Holder
    // const holderName = document.getElementsByName('holderName')[0].value
    // const holderDocument = document.getElementsByName('holderDocument')[0].value

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
    const token = document.cookie.split("=")[1]
    const data = {
      name: document.getElementsByName('name')[0].value,
      email: document.getElementsByName('email')[0].value,
      document: document.getElementsByName('cpf')[0].value,
      birthDate: document.getElementsByName('birthDate')[0].value,
      phone: document.getElementsByName('phone')[0].value,
      //Area de negócio
      businessArea: 2010, //Serviços(Cobranças e Dívidas)
      linesOfBusiness: "Personal Business",
      //Endereço
      postCode: document.getElementsByName('postCode')[0].value,
      street: document.getElementsByName('street')[0].value,
      number: document.getElementsByName('number')[0].value,
      complement: document.getElementsByName('complement')[0].value,
      neighborhood: document.getElementsByName('neighborhood')[0].value,
      city: document.getElementsByName('city')[0].value,
      state: document.getElementsByName('state')[0].value,
      //Renda Mensal
      monthlyIncome: document.getElementsByName('monthlyIncome')[0].value
      //Dados Bancários
      // bankNumber: document.getElementsByName('bankNumber')[0].value,
      // agencyNumber: document.getElementsByName('agencyNumber')[0].value,
      // accountNumber: document.getElementsByName('accountNumber')[0].value,
      // //Account Holder
      // accountHolderName: document.getElementsByName('name')[0].value,
      // holderDocument: document.getElementsByName('document')[0].value,
    }
    fetch("/account/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((response) => {
        console.log(`Chegou na resposta ${JSON.stringify(response)}`)
      }).catch(err => {
        console.log({ err: err.message })
      })
  }
}

// window.onload = createAccount.init()
document.addEventListener('DOMContentLoaded', createAccount.init())