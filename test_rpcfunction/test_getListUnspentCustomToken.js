const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard1 = new ConstantRPC("127.0.0.1", 9338);
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const ConstantValue = require('../common/constant');
const stakerPRK = ConstantValue.Shard1_1Prk
const tokenID = "3eac1ccdece35d517dfeff0fbfe9aecd70dc91726ad16ec13727a1342072e6c6"
!(async function () {
    var txResult = await shard1.ListUnspentCustomToken(ConstantValue.Shard1_0PA, tokenID)
    console.log("Account Balance Result 1 - Shard1_0PA", txResult.Response.Result);
})()
!(async function () {
    var txResult = await shard1.ListUnspentCustomToken(ConstantValue.Shard1_1PA,tokenID)
    console.log("Account Balance Result 1 - Shard1_1PA", txResult.Response.Result);
})()
!(async function () {
    var txResult = await shard0.ListUnspentCustomToken(ConstantValue.Shard0_1PA, tokenID)
    console.log("Account Balance Result 0", txResult.Response.Result);
})()

