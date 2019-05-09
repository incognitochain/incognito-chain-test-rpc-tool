const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard1 = new ConstantRPC("127.0.0.1", 9334);
const shard2 = new ConstantRPC("127.0.0.1", 9338);
const beacon = new ConstantRPC("127.0.0.1", 9337);

setInterval(async function() {
    let beaconBestState_beacon = await shard1.GetBeaconBestState();   
    console.log("Beacon Beststate on Beacon")
    console.log(JSON.stringify(beaconBestState_beacon.Response.Result, null, 4))
},5000)
