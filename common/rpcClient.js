var jayson = require('jayson')

exports = module.exports = function (host, port) {
  // create a client
  var client = jayson.client.http({
    host: host || '127.0.0.1',
    port: port || 9334
  })
  return client
}
