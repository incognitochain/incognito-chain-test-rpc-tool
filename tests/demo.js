const ConstantRPC = require('../constant-rpc/constant_rpc')

!(async function () {
  const node1 = new ConstantRPC()
  let res = await node1.EstimateFee()
//   let res = await node1.ListOutputCoins(
//     '112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh'
//   )
  console.log(res)
  
})()
