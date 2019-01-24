var ConstantNodeRPC = require('./constant_rpc')

ConstantNodeRPC.prototype.GetNetworkInfo = async function (params) {
  return new Promise(resolve => {
    this.client.request('getnetworkinfo', params, function (err, response) {
      if (err) throw err
      resolve(response.Result)
    })
  })
}
// GET CONNECTION COUNT
ConstantNodeRPC.prototype.GetConnectionCount = async function (params) {
  return new Promise(resolve => {
    this.client.request('getconnectioncount', params, function (err, response) {
      if (err) throw err
      resolve(response.Result)
    })
  })
}
// GET ALL PEER
ConstantNodeRPC.prototype.GetAllPeers = async function (params) {
  return new Promise(resolve => {
    this.client.request('getallpeers', params, function (err, response) {
      if (err) throw err
      resolve(response.Result)
    })
  })
}
