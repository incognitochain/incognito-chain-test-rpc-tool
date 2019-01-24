const ConstantRPC = require("../constant-rpc/constant")

!async function(){
    let res = await ConstantRPC.GetNetworkInfo()
    console.log(res)
}()