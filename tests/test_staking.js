const ConstantRPC = require('../constant-rpc/constant_rpc')

!(async function () {
    const node1 = new ConstantRPC();

    const res = await node1.CreateAndSendTransaction("112t8rqGc71CqjrDCuReGkphJ4uWHJmiaV7rVczqNhc33pzChmJRvikZNc3Dt5V7quhdzjWW9Z4BrB2BxdK5VtHzsG9JZdZ5M7yYYGidKKZV",{"1Uv2bWvMhSh3SVBsRvcjaoS17sCbQZRnTjP5cRMas94RNRdmUYXEJY1h93Vn4Z4ekSU3um57dLvpBSV7amFSs7NqqzUKuPqRYgjYbSmP8":1},100,0,63) || {};
    
    console.log(res)
})()
  