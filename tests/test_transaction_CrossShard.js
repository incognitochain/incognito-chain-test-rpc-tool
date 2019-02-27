const ConstantRPC = require('../constant-rpc/constant_rpc');
var assert = require('assert');
const ConstantValue = require('../common/constant');
!(async function () {
  const shard0 = new ConstantRPC("127.0.0.1", 9334);
  const shard1 = new ConstantRPC("127.0.0.1", 9338);
  var sendTxResults = []
  // Shard 0 
  // for (i = 0; i < 3; i++) {
  //   const sendTxResult = await shard0.CreateAndSendTransaction("112t8rqGc71CqjrDCuReGkphJ4uWHJmiaV7rVczqNhc33pzChmJRvikZNc3Dt5V7quhdzjWW9Z4BrB2BxdK5VtHzsG9JZdZ5M7yYYGidKKZV", {
  //     "1Uv36DEGA9Z91eMhNYHUCFg3dimqVhcVvArrjtS8QSxXQvfb52Hdk8hsQHoX2FPFUXH29uCgkSQkXko8mZ3KdKgbxPm7PKnoEx5p2cAFb": 50
  //   }, 0, 0)
  //   sendTxResults.push(sendTxResult.Response.Result.TxID)
  //   console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)
  // }
  // //Shard 1
  for (i = 0; i < 5; i++) {
    const sendTxResult = await shard1.CreateAndSendTransaction("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd", {
      "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1
    }, 0, 0)
    sendTxResults.push(sendTxResult.Response.Result.TxID)
    console.log("Transaction Shard 1", sendTxResult.Response.Result.TxID)
  }
})()