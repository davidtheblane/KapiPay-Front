const userAccountActions = {

  // GET BALANCE
  balance: () => {
    const result = document.getElementById('balance-result')
    result.innerHTML = '...'

    fetch("/account/balance", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((balance) => {
        //Apresenta no front
        let p = document.createElement('p')
        p.setAttribute('class', 'output')
        p.innerHTML = `R$${balance}`
        result.innerHTML = ''
        result.appendChild(p)

      })
      .catch(err => {
        err.message || console.log(err.message)
      })
  },

}

document.addEventListener('DOMContentLoaded', userAccountActions.balance)
