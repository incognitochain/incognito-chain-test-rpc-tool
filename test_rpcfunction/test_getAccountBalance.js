const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard1 = new ConstantRPC("127.0.0.1", 9338);
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const ConstantValue = require('../common/constant');
const stakerPRK = ConstantValue.Shard1_1Prk
!(async function () {
    var txResult = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
    console.log("Account Balance Result 1 - Shard1_0", txResult.Response.Result);
})()
!(async function () {
    var txResult = await shard1.GetBalanceByPrivatekey(stakerPRK)
    console.log("Account Balance Result 1 - Shard1_1", txResult.Response.Result);
})()
!(async function () {
    var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
    console.log("Account Balance Result 0 - Shard0_1", txResult.Response.Result);
})()

!(async function () {
    var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_0Prk)
    console.log("Account Balance Result 0 - Shard0_0", txResult.Response.Result);
})()

