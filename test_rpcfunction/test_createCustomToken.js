const ConstantRPC = require('../constant-rpc/constant_rpc');
var assert = require('assert');
const ConstantValue = require('../common/constant');
!(async function () {
  const shard0 = new ConstantRPC("127.0.0.1", 9334);
  const shard1 = new ConstantRPC("127.0.0.1", 9338);
  var sendTxResults = []
  // Shard 0 
  for (i = 0; i < 1; i++) {
    const sendTxResult = await shard0.CreateAndSendCustomTokenTransaction("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", 
    {},
    0,
    -1,
    {
        "TokenID": "",
        "TokenName": "DEF1", 
        "TokenSymbol": "def1",
        "TokenTxType": 0,
        "TokenAmount": 1000,
        "TokenReceivers": {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1000
        }
    }) 
    sendTxResults.push(sendTxResult.Response.Result)
    console.log("Transaction Shard 0", sendTxResult.Response.Result)
    /**
     * Return Value Example Format
      ShardID: 0,
      TxID:
      '33d2740a78b0c0ef5e11ca5a0815f35f9cec5fa2e215eb67ed8568766bbebcc5',
      TokenID:
      '0b38f2a859244ca02da7e448df18f6866e12717a6d93d8880d6ce187a2180e9d',
      TokenName: 'DEF1',
      TokenAmount: 1000 
     */
  }
})()