const createAccount = {
  init: async () => {
    document.getElementById('btn_digital_account').addEventListener('click', createAccount.validate)
  },

  validate: async () => {
    //Dados pessoais and Account Holder
    const name = document.getElementsByName('name')[0].value
    const email = document.getElementsByName('email')[0].value
    const cpf = document.getElementsByName('cpf')[0].value
    const birthDate = document.getElementsByName('birthDate')[0].value
    const phone = document.getElementsByName('phone')[0].value
    // //Area de negócio
    // const businessArea = document.getElementsByName('businessArea')[0].value
    // const linesOfBusiness = document.getElementsByName('linesOfBusiness')[0].value
    //Endereço
    const postCode = document.getElementsByName('postCode')[0].value
    const street = document.getElementsByName('street')[0].value
    const number = document.getElementsByName('number')[0].value
    const complement = document.getElementsByName('complement')[0].value
    const neighborhood = document.getElementsByName('neighborhood')[0].value
    const city = document.getElementsByName('city')[0].value
    const state = document.getElementsByName('state')[0].value
    //Renda Mensal
    const monthlyIncome = document.getElementsByName('monthlyIncome')[0].value


    //Dados Bancários
    // const bankNumber = document.getElementsByName('bankNumber')[0].value
    // const agencyNumber = document.getElementsByName('agencyNumber')[0].value
    // const accountNumber = document.getElementsByName('accountNumber')[0].value
    // //Account Holder
    // const holderName = document.getElementsByName('holderName')[0].value
    // const holderDocument = document.getElementsByName('holderDocument')[0].value

    //REGEX TESTS
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const regexBirthDate = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/g
    let validate = true;
    let message = ''

    if (name.length < 3) {
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

    if (!regexBirthDate.test(birthDate)) {
      message = `Data de nascimento inválida`
      validate = false
    }

    if (!phone.length === 13) {
      message = `Telefone Inválido, deve ter 13 caracteres, o seu tem ${cpf.length} caracteres`
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
      name: document.getElementsByName('name')[0].value,
      email: document.getElementsByName('email')[0].value,
      cpf: document.getElementsByName('cpf')[0].value,
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
      // holderDocument: document.getElementsByName('cpf')[0].value,
    }

    const response = await fetch("account/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })

    console.log(data)

    if (!response.ok) {
      console.log(data)
      alert("Não foi possível criar sua conta")
    } else {

      alert('Conta criada com sucesso')
    }

    console.log(response)
  }
}

// window.onload = createAccount.init()
document.addEventListener('DOMContentLoaded', createAccount.init())