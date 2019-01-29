const ConstantRPC = require('../constant-rpc/constant_rpc')

async function TestTransferTransactionFlow(node={}) {
  const blockCount1 = await node.GetBlockCount(0);
  if (node == undefined || node == null) {
    return
  }
  const sendTxResult = await node.CreateAndSendTransaction("112t8rqGc71CqjrDCuReGkphJ4uWHJmiaV7rVczqNhc33pzChmJRvikZNc3Dt5V7quhdzjWW9Z4BrB2BxdK5VtHzsG9JZdZ5M7yYYGidKKZV",{"1Uv2bWvMhSh3SVBsRvcjaoS17sCbQZRnTjP5cRMas94RNRdmUYXEJY1h93Vn4Z4ekSU3um57dLvpBSV7amFSs7NqqzUKuPqRYgjYbSmP8":1},100,1) || {};
  console.log("con co", sendTxResult);
  let {TxID=""} = sendTxResult;
  if (TxID == "") return "send Tx failed";

  let ws = async (s) => new Promise(function(resolve, reject) {
    setTimeout(function(){
      console.log("timeout")
      resolve()
    }, s*1000)
  })
  // await ws(5);
  while (true) {
    let blockCount2 = await node.GetBlockCount(0);
    if (blockCount2 > blockCount1) {
      console.log(blockCount2);
      break;
    };
    await ws(1);
  }
  
  const txResult = await node.GetTransactionByHash(TxID) || {};
  console.log("con heo", txResult);
  let {BlockHash=""} = txResult;
  if (BlockHash == "") return "get transaction detail info failed";
  const generatedBlock = await node.RetrieveBlock(BlockHash, "1") || {};
  const {Hash=""} = generatedBlock;
  if (Hash == "" ) return "get generated block failed";
  console.log("FLOW SUCCESS!");
  return generatedBlock;
}

!(async function () {
  const node1 = new ConstantRPC();
  // let res = await node1.RetrieveBlock("d0a6b8b8207583be2363abd4b84898f27103ed2fdda4237e79436878b674a620", "1")
//   let res = await node1.ListOutputCoins(
//     '112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh'
//   )
  // res = await TestTransferTransactionFlow(node1)
  // res = await node1.GetBeaconBestState()
  res = await node1.GetShardBestState(1)
  console.log(res)
})()
