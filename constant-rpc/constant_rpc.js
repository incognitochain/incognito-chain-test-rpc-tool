const RPCClient = require('../common/rpcClient')

class ConstantNodeRPC {
  constructor (host, port) {
    this.client = RPCClient(host, port)
  }
  //virtual method 
  //node
  GetNetworkInfo(){}
  GetConnectionCount(){}
  GetAllPeers(){}
  GetRawMempool(){}
  GetMempoolEntry(){}
  EstimateFee(){}
  GetGenerate(){}
  GetMiningInfo(){}

  //block
  //transaction
  ListOutputCoins(privateKey = ""){}
  
}

// Implement virtual method
function rpc(method, client, params){
  return new Promise(resolve => {
    client.request(method, params, function (err, response) {
      if (err) throw err
      resolve(response.Result)
    })
  })
}

for (let f of Object.getOwnPropertyNames( ConstantNodeRPC.prototype )) {
  if (f == "constructor") continue
  ConstantNodeRPC.prototype[f] = function(...params){
    return rpc(f.toLowerCase(), this.client, params)
  }
}

module.exports = ConstantNodeRPC

