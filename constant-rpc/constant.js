module.exports = { GetNetworkInfo }
const client = require('../common/rpcClient')

async function GetNetworkInfo (params = []) {
  return new Promise(resolve => {
    client.request('getnetworkinfo', params, function (err, response) {
      if (err) throw err
      resolve(response.Result)
    })
  })
}
