const ConstantRPC = require('../constant-rpc/constant_rpc')

!(async function () {
    const shard = new ConstantRPC("127.0.0.1", 9338);
    let shardPool = await shard.GetShardPoolState(0);  
    console.log(shardPool)
    // console.log(JSON.stringify(shardPool.Response.Result, null, 4))
})()
  