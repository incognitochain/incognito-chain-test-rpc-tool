const ConstantRPC = require('../constant-rpc/constant_rpc')

!(async function () {
    const shard = new ConstantRPC("127.0.0.1", 9334);
    const beacon = new ConstantRPC("127.0.0.1", 9337);
    let beaconBestState_beacon = await beacon.GetBeaconBestState();   
    console.log("Beacon Beststate on Beacon")
    console.log(JSON.stringify(beaconBestState_beacon.Response.Result, null, 4))


    let beaconBestState_shard = await shard.GetBeaconBestState();   
    console.log("Beacon Beststate on Shard")
    console.log(JSON.stringify(beaconBestState_shard.Reponse.Result, null, 4))
})()
  