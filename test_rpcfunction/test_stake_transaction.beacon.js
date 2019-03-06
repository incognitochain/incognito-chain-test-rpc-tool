const ConstantRPC = require('../constant-rpc/constant_rpc');
var assert = require('assert');
const ConstantValue = require('../common/constant');
!(async function () {
  const shard = new ConstantRPC("127.0.0.1", 9334);
  const canStake = await shard.CanPubkeyStake("18BRApfoGh91y3WdeK9BCW1utunNLVnRCAUFvsRpSWfmfoPzPqa")
  console.log("Result canStake", canStake.Response.Result);
  if (canStake.Response.Result.CanStake) {
    const sendTxResult = await shard.CreateAndSendStakingTransaction("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {
      "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 2
    }, 100, 0, 64)
    console.log("Send Staking Transaction", sendTxResult)
    assert.equal(sendTxResult.Response.Result.Error, null, "Can't send transaction")
    intervalId = setInterval(async function() {
      const getTxResult = await shard.GetTransactionByHash(sendTxResult.Response.Result.TxID)
      if (getTxResult.Response.Result.Error == null) {
        const canStake = await shard.CanPubkeyStake("18BRApfoGh91y3WdeK9BCW1utunNLVnRCAUFvsRpSWfmfoPzPqa")
        console.log("Result canStake", canStake.Response.Result);
        assert.equal(canStake.Response.Result.CanStake, false, "Can't Stake Anymore")
        //check in candidate list
        const candidate = await shard.GetCandidateList()
        console.log("Result Candidate", candidate.Response.Result);
        if (candidate.Response.Result.CandidateBeaconWaitingForCurrentRandom.indexOf(ConstantValue.NodePB) > -1) {
          console.log("found in candidate list")
        } else if (candidate.Response.Result.CandidateBeaconWaitingForNextRandom.indexOf(ConstantValue.NodePB) > -1) {
          console.log("found in candidate list")
        } else {
          //fail in candidate list then check in committee list
          const committee = await shard.GetCommitteeList()
          console.log("Result Committee", committee.Response.Result);
          if (committee.Response.Result.BeaconPendingValidator.indexOf(ConstantValue.NodePB) > -1) {
            console.log("found in pending validator list")
          } else {
            if (committee.Response.Result.BeaconCommittee.indexOf(ConstantValue.NodePB) > -1) {
              console.log("found in committee list")
              console.log("SUCESSFULL")
              clearInterval(intervalId)
            }
          }
        }
      }
    }, 2000)
  }

})()