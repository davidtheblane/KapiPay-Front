const newCompany = {
  init: async () => {
    document.getElementById('btn_save').addEventListener('click', newCompany.validate)
  },

  validate: async () => {
    const cnpj = document.getElementsByName('cnpj')[0].value
    const description = document.getElementsByName('description')[0].value
    let companyName = document.getElementsByName('companyName')[0].value
    let typedName = document.getElementsByName('typedName')[0].value

    let validate = true;
    let message = ''

    const regexCNPJ = /^[0-9]+$/gs

    if (companyName != "" && typedName != "") {
      message = 'Verifique se você digitou apenas um dos campos com o nome da empresa.'
      validate = false
    }
    if (cnpj.length != 14 || !regexCNPJ.test(cnpj)) {
      message = 'CNPJ Inválido'
      validate = false
    }

    if (description.length > 200) {
      message = 'A descrição deve ser menor.'
      validate = false
    }

    if (!validate) {
      alert(message)
    } else {
      newCompany.send()
    }

  },

  send: async () => {
    const response = await fetch("/account/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        companyType: document.getElementsByName('companyType')[0].value,
        name: document.getElementsByName('companyName')[0].value || document.getElementsByName('typedName')[0].value,
        cnpj: document.getElementsByName('cnpj')[0].value,
        description: document.getElementsByName('description')[0].value,
      })
    })
    const data = await response.json();

    if (!response.ok) {
      alert(data.message)
      alert("algo deu errado, verifique os campos")

    } else {
      // console.log("tudo certo")
      document.getElementById('form-new-company').reset()
      newCompany.success()
    }

  },

  success: async function () {
    Swal.fire({
      title: 'Fornecedor Cadastrado!',
      text: 'Gostaria de incluir mais um?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
      customClass: {
        confirmButton: 'btn btn-sm btn-success',
        denyButton: 'btn btn-sm btn-outline-success'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        // do nothing
      } else if (result.isDenied) {
        window.location.assign("/index")
      }
    })
  },


  loadCompanies: async () => {
    // LOAD COMPANY TYPES
    const compTypes = await fetch("/account/company-type", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
    const companiesType = await compTypes.json()

    if (!(compTypes.ok)) {
      console.log("não foi possivel carregar os tipos de serviço")
    } else {
      const service = companiesType.map(function (item) {
        return item.name;
      });

      service.forEach(item => {
        companyType.innerHTML += `<option>${item}</option>`
      });
    }


    // LOAD COMPANY NAMES
    const compNames = await fetch("/account/company", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
    const companies = await compNames.json()
    if (!(compNames.ok)) {
      console.log("não foi possivel carregar os nomes das companias")
    } else {
      const company = companies.map(function (item) {
        return item.name;
      });
      company.forEach(item => {
        companyName.innerHTML += `<option>${item}</option>`
      });
    }
  },
}
window.onload = newCompany.loadCompanies()
document.addEventListener('DOMContentLoaded', newCompany.init)
