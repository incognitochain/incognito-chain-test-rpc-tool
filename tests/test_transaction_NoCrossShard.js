const ConstantRPC = require('../constant-rpc/constant_rpc');
var assert = require('assert');
const ConstantValue = require('../common/constant');
!(async function () {
  const shard0 = new ConstantRPC("127.0.0.1", 9334);
  const shard1 = new ConstantRPC("127.0.0.1", 9338);
  var sendTxResults = []
  // Shard 0 
  for (i = 0; i < 10; i++) {
    const sendTxResult = await shard0.CreateAndSendTransaction("112t8rqGc71CqjrDCuReGkphJ4uWHJmiaV7rVczqNhc33pzChmJRvikZNc3Dt5V7quhdzjWW9Z4BrB2BxdK5VtHzsG9JZdZ5M7yYYGidKKZV", {
      "1Uv2MXFL2PmuFa6zkF3sBh425jefEEm5Ed7ajgJVvrEZ2vpzUmUaKxgiuH7cugYbMexLtUcX3BQiXAB3L9ymU12rTj99EadXVxNc5yvHy": 1
    }, 100, 0)
    sendTxResults.push(sendTxResult.Response.Result.TxID)
    console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)
  }
  //Shard 1
  for (i = 0; i < 5; i++) {
    const sendTxResult = await shard1.CreateAndSendTransaction("112t8s2UkZEwS7JtqLHFruRrh4Drj53UzH4A6DrairctKutxVb8Vw2DMzxCReYsAZkXi9ycaSNRHEcB7TJaTwPhyPvqRzu5NnUgTMN9AEKwo", {
      "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1
    }, 100, 0)
    sendTxResults.push(sendTxResult.Response.Result.TxID)
    console.log("Transaction Shard 1", sendTxResult.Response.Result.TxID)
  }
})()