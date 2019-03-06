const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard = new ConstantRPC("127.0.0.1", 9334);
!(async function () {
    var txResult = await shard.GetTransactionByHash("2af5cf93be5728e40423a3ac243c893f427157166383ec572854b22398e7990f")
    console.log("Result Staking Transaction", txResult.Response.Result);
})()

