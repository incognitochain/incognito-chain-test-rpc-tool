const constant = require('./constant')
const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const shard1 = new ConstantRPC("127.0.0.1", 9338);
const beacon = new ConstantRPC("127.0.0.1", 9337);
setInterval(async function() {
    let beaconBestState_beacon = await shard0.GetBeaconBestState();   
    console.log("LastCrossShardState on Shard 0")
    lastCrossShardState = beaconBestState_beacon.Response.Result.LastCrossShardState
    console.log(JSON.stringify(lastCrossShardState,null,4))
},constant.WaitTime)
