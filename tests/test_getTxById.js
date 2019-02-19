const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard = new ConstantRPC("127.0.0.1", 9336);
!(async function () {
    const txResult = await shard.GetTransactionByHash("ecda1414556972d6a0c8b20090100bc22fe7e2fabd86a64aaf708283183953db")
    console.log("Result Staking Transaction", txResult);
})()

