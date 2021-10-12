module.exports = {

  balance: async (req, res) => {
    document.getElementById('balance').addEventListener('click', event => {
      console.log(event.target)
    })
    try {
      const balance = await res.data
      return res.status(200).send(balance)

    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  },
}
