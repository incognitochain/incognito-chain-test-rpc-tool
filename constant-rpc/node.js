var ConstantNodeRPC = require('./constant')

ConstantNodeRPC.prototype.GetNetworkInfo = async function (params) {
  return new Promise(resolve => {
    this.client.request('getnetworkinfo', params, function (err, response) {
      if (err) throw err
      resolve(response.Result)
    })
  })
}
