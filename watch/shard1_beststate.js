const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const shard1 = new ConstantRPC("127.0.0.1", 9338);
const beacon = new ConstantRPC("127.0.0.1", 9337);
const constant = require('./constant')
setInterval(async function() {
    let beaconBestState_beacon = await shard1.GetBeaconBestState();   
    console.log("LastCrossShardState on shard 1")
    lastCrossShardState = beaconBestState_beacon.Response.Result.LastCrossShardState
    console.log(JSON.stringify(lastCrossShardState,null,4))
},constant.WaitTime)
