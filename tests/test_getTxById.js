const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard = new ConstantRPC("127.0.0.1", 9334);
!(async function () {
    var txResult = await shard.GetTransactionByHash("cf995e0496bf882db82ce67334b3cc7877faf282f5662eabb4746afe46f24357")
    console.log("Result Staking Transaction", txResult.Response.Result);
    // var txResult = await shard.GetTransactionByHash("1aa55ec28b2dfdc9c5312c73fd5a1c65a971b63178d937117e754ceae8b34d6b")
    // console.log("Result Staking Transaction", txResult.Response.Result);
    // var txResult = await shard.GetTransactionByHash("653d4cf819e6a5819e573b3c44a4de688354fa4ee62d3432d7817d7562516cfc")
    // console.log("Result Staking Transaction", txResult.Response.Result);
    // var txResult = await shard.GetTransactionByHash("e286f1619217d84ff51e0c76ad2f9139cd44e07bbf974478ee818599276d9dc7")
    // console.log("Result Staking Transaction", txResult.Response.Result);
    // var txResult = await shard.GetTransactionByHash("c51cc2bf97aeee054dc8b9d9c25e4ed6f89b6b065645d2967dca073f043c9ef6")
    // console.log("Result Staking Transaction", txResult.Response.Result);
})()

