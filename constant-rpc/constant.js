const RPCClient = require('../common/rpcClient')

class Client {
  constructor (host, port) {
    this.client = RPCClient(host, port)
  }
}

module.exports = Client
require('./node')
