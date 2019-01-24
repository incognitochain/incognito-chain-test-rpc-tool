var jayson = require('jayson');
 
// create a client
var client = jayson.client.http({
  port: 9334
});
 

exports = module.exports = client