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

// GET RAW MEMPOOL
ConstantNodeRPC.prototype.GetRawMempool = async function (params) {
  return new Promise(resolve => {
    this.client.request('getrawmempool', params, function (err, response) {
      if (err) throw err
      resolve(response.Result)
    })
  })
}

// GET MEMPOOL ENTRY
ConstantNodeRPC.prototype.GetMempoolEntry = async function (params) {
  return new Promise(resolve => {
    this.client.request('getmempoolentry', params, function (err, response) {
      if (err) throw err
      resolve(response.Result)
    })
  })
}
// ESTIMATE FEE
ConstantNodeRPC.prototype.EstimateFee = async function (params) {
  return new Promise(resolve => {
    this.client.request('estimatefee', params, function (err, response) {
      if (err) throw err
      resolve(response.Result)
    })
  })
}
// GET GENERATE
ConstantNodeRPC.prototype.GetGenerate = async function (params) {
  return new Promise(resolve => {
    this.client.request('getgenerate', params, function (err, response) {
      if (err) throw err
      resolve(response.Result)
    })
  })
}
