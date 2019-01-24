const ConstantRPC = require("../constant-rpc/constant")

!async function(){
    const node1 = new ConstantRPC()
    let res = await node1.GetNetworkInfo()
    console.log(res)
}()