const ConstantRPC = require('../constant-rpc/constant_rpc');
var assert = require('assert');
const ConstantValue = require('../common/constant');
!(async function () {
  const shard0 = new ConstantRPC("127.0.0.1", 9334);
  const shard1 = new ConstantRPC("127.0.0.1", 9338);
  // Shard 0
  block = await shard0.GetBlockCount(0) 
  block1 = await shard1.GetBlockCount(1)
  index = 0
  index1 = 0
  for (i = 0; i < 50; i++) {
    const sendTxResult00 = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_0Prk, {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1,
    }, 0, 0)
    const sendTxResult01 = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_0Prk, {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1,
    }, 0, 0)
    const sendTxResult02 = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_0Prk, {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1,
    }, 0, 0)
    const sendTxResult03 = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_0Prk, {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1,
    }, 0, 0)
    const sendTxResult04 = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_0Prk, {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1,
    }, 0, 0)
    const sendTxResult05 = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_0Prk, {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1,
    }, 0, 0)
    const sendTxResult06 = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_0Prk, {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1,
    }, 0, 0)
    const sendTxResult07 = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_0Prk, {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1,
    }, 0, 0)
    const sendTxResult08 = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_0Prk, {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1,
    }, 0, 0)
    const sendTxResult09 = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_0Prk, {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1,
    }, 0, 0)
    if (sendTxResult00.Response.Result.TxID !== 'undefined' && sendTxResult01.Response.Result.TxID !== 'undefined' && sendTxResult02.Response.Result.TxID !== 'undefined' && sendTxResult03.Response.Result.TxID !== 'undefined' && sendTxResult04.Response.Result.TxID !== 'undefined' && sendTxResult05.Response.Result.TxID !== 'undefined' && sendTxResult06.Response.Result.TxID !== 'undefined' && sendTxResult07.Response.Result.TxID !== 'undefined' && sendTxResult08.Response.Result.TxID !== 'undefined' && sendTxResult09.Response.Result.TxID !== 'undefined'){
      index++
    }
    const sendTxResult10 = await shard1.CreateAndSendTransaction(ConstantValue.Shard1_1Prk, {
      "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1,
      // "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1,
      // "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1,
      // "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1,
      // "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1,
    }, 0, 0)
    // console.log("Transaction Shard 1", sendTxResult.Response.Result.TxID)
    const sendTxResult11 = await shard1.CreateAndSendTransaction(ConstantValue.Shard1_1Prk, {
      "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1,
      // "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1,
      // "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1,
      // "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1,
      // "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1,
    }, 0, 0)
    // console.log("Transaction Shard 1", sendTxResult1.Response.Result.TxID)
    if (sendTxResult10.Response.Result.TxID !== 'undefined' && sendTxResult11.Response.Result.TxID !== 'undefined'){
      index1++
    }
    console.log("INDEX", index)
    console.log("INDEX1", index1)
  }
  afterBlock = await shard0.GetBlockCount(0) 
  afterBlock1 = await shard1.GetBlockCount(1)
  console.log("INDEX", index)
  console.log("INDEX1", index1)

  console.log("Total 0", afterBlock.Response.Result-block.Response.Result)
  console.log("Total 1", afterBlock1.Response.Result-block1.Response.Result)
})()