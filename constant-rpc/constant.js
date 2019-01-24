const RPCClient = require('../common/rpcClient')

class Client {
  constructor (host, port) {
    this.client = RPCClient(host, port)
  }

  async GetNetworkInfo (params = []) {
    return new Promise(resolve => {
      this.client.request('getnetworkinfo', params, function (err, response) {
        if (err) throw err
        resolve(response.Result)
      })
    })
  }
  
}

module.exports = Client
