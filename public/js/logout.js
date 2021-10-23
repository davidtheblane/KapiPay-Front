const logout = {
  init: async () => {
    document.getElementById('btn_logout').addEventListener('click', logout.send)
  },

  send: async () => {
    await fetch("/logout", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }
    })
    const token = null
    // document.cookie = token
    console.log(token)
    // window.location.assign("/")
  }
}

document.addEventListener('DOMContentLoaded', logout.init)
// window.onload = logout.init()

