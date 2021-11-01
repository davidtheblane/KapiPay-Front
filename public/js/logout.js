const logout = {
  init: async () => {
    document.getElementById('btn_logout').addEventListener('click', logout.send)
  },

  send: async () => {
    await fetch("/logout", {
      method: 'GET',
      headers: {
        // "Content-Type": "application/json",
      }
    })
    window.location.assign("/")
  }
}

document.addEventListener('DOMContentLoaded', logout.init)
// window.onload = logout.init()

