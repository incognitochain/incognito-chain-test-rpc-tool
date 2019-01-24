const RPCClient = require('../common/rpcClient')

class ConstantNodeRPC {
  constructor (host, port) {
    this.client = RPCClient(host, port)
  }
}

module.exports = ConstantNodeRPC
require('./node')
