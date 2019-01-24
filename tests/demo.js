const ConstantRPC = require("../constant-rpc/constant")

console.log("abc")
!async function(){
    const node1 = new ConstantRPC()
    let res = await node1.GetNetworkInfo()
    console.log(res)
}()