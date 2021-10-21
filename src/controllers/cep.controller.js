const cepService = require("../services/cep.service")
const url = `https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl`;

const service = new cepService(url)


module.exports = {

  getCep: async (req, res) => {
    const connection = await service.connection();
    // console.log(connection);

    const response = await service.request(connection, "consultaCEPAsync", { cep: req.body })
    return console.log(response[0]);
    res.send(response[0])
  }
}




// async function getCep(req, res) {
//   const connection = await service.connection();
//   // console.log(connection);

//   const response = await service.request(connection, "consultaCEPAsync", { cep: req.body })
//   return console.log(response[0]);
//   res.send(response[0])
// }

// module.exports = getCep

