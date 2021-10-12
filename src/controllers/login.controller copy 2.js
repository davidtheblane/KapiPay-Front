import api from '../services/api.service';

api.get('/account/balance', async (req, res) => {

  try {
    const balance = await res.data
    return res.status(200).send(balance)

  } catch (error) {
    res.status(400).send({ message: error.message })
  }

})

export default axiosInstance;