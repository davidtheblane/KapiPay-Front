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

  loadUserData: () => {
    const result = document.getElementById('output')
    fetch("/user/data", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data)

        const userData = data.map(item => {
          return item
        })

        let div = document.createElement('div');
        div.innerHTML = `<ul>
          <h3>Dados Pessoais</h3>
          <li><strong>Nome:</strong> ${userData[0].name}</li>
          <li><strong>Email:</strong> ${userData[0].email}</li>
          <li><strong>CPF:</strong> ${userData[0].document}</li>
          <li><strong>Data de Nascimento:</strong> ${userData[0].birthDate}</li>
          <li><strong>Telefone:</strong> ${userData[0].phone}</li>
          <li><strong>Renda Mensal:</strong> R$ ${userData[0].monthlyIncomeOrRevenue},00</li>
          <hr>
          <h3>Endereço</h3>
          <li><strong>Logradouro:</strong> ${userData[1].street}</li >
          <li><strong>Numero:</strong> ${userData[1].number}</li>
          <li><strong>Complemento:</strong> ${userData[1].complement}</li>
          <li><strong>Bairro:</strong> ${userData[1].neighborhood}</li>
          <li><strong>Cidade:</strong> ${userData[1].city}</li>
          <li><strong>Estado:</strong> ${userData[1].state}</li>
          <li><strong>CEP:</strong> ${userData[1].postCode}</li>
          <hr>
          <h3>Conta Bancaria</h3>
          <li><strong>Banco Nº:</strong> ${userData[2].bankNumber}</li>
          <li><strong>Agencia Nº:</strong> ${userData[2].agencyNumber} </li>
          <li><strong>Conta Nº:</strong> ${userData[2].accountNumber} - ${userData[2].accountComplementNumber}</li>
          <hr>
          <h3>Cartão de Crédito</h3>
          <li><strong>Digitos finais:</strong> ${userData[3].last4CardNumber}</li>
          <li><strong>Mês de Vencto:</strong> ${userData[3].expirationMonth}</li>
          <li><strong>Ano de Vencto:</strong> ${userData[3].expirationYear}</li>
          </ul>`

        document.getElementById('result').appendChild(div);
        // console.log(userData)

      })
      .catch(err => {
        err.message || console.log(err.stack)
      })
  },

}




window.onload = userProfile.loadUserData()
document.addEventListener('DOMContentLoaded', userProfile.init)

