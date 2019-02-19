const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard = new ConstantRPC("127.0.0.1", 9336);
!(async function () {
    const generatedBlock = await shard.RetrieveBlock("3229c949daa326b1e99916d9c407e177dc783c72d561c7ec053be5477e7d4216", "1") || {};
    console.log("Result Block", generatedBlock);
})()

