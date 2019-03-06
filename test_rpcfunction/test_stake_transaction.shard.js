const ConstantRPC = require('../constant-rpc/constant_rpc');
var assert = require('assert');
const ConstantValue = require('../common/constant');
const stakerPK = ConstantValue.shard1_1PB
const stakerPRK = ConstantValue.Shard1_1Prk
!(async function () {
  const shard = new ConstantRPC("127.0.0.1", 9336);
  // const shard2 = new ConstantRPC("127.0.0.1", 9336);
  // const beacon = new ConstantRPC("127.0.0.1", 9337);

  const blockCount1 = await shard.GetBlockCount(0);
  if (shard == undefined || shard == null) {
    return
  }
  const canStake = await shard.CanPubkeyStake(stakerPK)
  console.log("Result canStake", canStake.Response.Result);
  if (canStake.Response.Result.CanStake) {
    const sendTxResult = await shard.CreateAndSendStakingTransaction(stakerPRK, {
      "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 1
    }, 100, 0, 63)
    console.log("Send Staking Transaction", sendTxResult)
    assert.equal(sendTxResult.Response.Result.Error, null, "Can't send transaction")
    intervalId = setInterval(async function() {
      const getTxResult = await shard.GetTransactionByHash(sendTxResult.Response.Result.TxID)
      if (getTxResult.Response.Result.Error == null) {
        const canStake = await shard.CanPubkeyStake(stakerPK)
        console.log("Result canStake", canStake.Response.Result);
        assert.equal(canStake.Response.Result.CanStake, false, "Can't Stake Anymore")
        //check in candidate list
        const candidate = await shard.GetCandidateList()
        console.log("Result Candidate", candidate.Response.Result);
        if (candidate.Response.Result.CandidateShardWaitingForCurrentRandom.indexOf(stakerPK) > -1) {
          console.log("found in candidate list")
        } else if (candidate.Response.Result.CandidateShardWaitingForNextRandom.indexOf(stakerPK) > -1) {
          console.log("found in candidate list")
        } else {
          //fail in candidate list then check in committee list
          const committee = await shard.GetCommitteeList()
          console.log("Result Committee", committee.Response.Result);
          if (committee.Response.Result.ShardPendingValidator[0].indexOf(stakerPK) > -1) {
            console.log("found in pending validator list")
          } else {
            if (committee.Response.Result.ShardCommittee[0].indexOf(stakerPK) > -1) {
              console.log("found in committee list")
              console.log("SUCESSFULL")
              clearInterval(intervalId)
            }
          }
        }
      }
    }, 2000)
  }

  // //Create Staking Transaction

  // let {
  //   TxID = ""
  // } = sendTxResult;
  // if (TxID == "") return "send Tx failed";

  // let ws = async (s) => new Promise(function (resolve, reject) {
  //   setTimeout(function () {
  //     console.log("timeout")
  //     resolve()
  //   }, s * 1000)
  // })
  // while (true) {
  //   let blockCount2 = await shard.GetBlockCount(0);
  //   if (blockCount2 > blockCount1) {
  //     console.log(blockCount2);
  //     break;
  //   };
  //   await ws(1);
  // }

  // const txResult = await shard.GetTransactionByHash(TxID) || {};
  // console.log("Result Staking Transaction", txResult);
  // let {
  //   BlockHash = "", InputCoinPubKey = ""
  // } = txResult;
  // if (BlockHash == "") return "Get transaction detail info failed";
  // const generatedBlock = await shard.RetrieveBlock(BlockHash, "1") || {};
  // const {
  //   Hash = "", Height
  // } = generatedBlock;
  // if (Hash == "") return "get generated block failed";
  // console.log("generated block: ", generatedBlock)
  // let bestBeacon = {};
  // while (true) {
  //   let bestBeaconState = await beacon.GetBeaconBestState() || {};
  //   let {
  //     BestShardHeight = {}
  //   } = bestBeaconState;
  //   const shard0Height = BestShardHeight["0"];
  //   console.log("shard0Height", shard0Height, BestShardHeight);
  //   if (shard0Height >= Height) {
  //     console.log(bestBeaconState)
  //     bestBeacon = bestBeaconState
  //     break;
  //   };
  //   console.log("waiting beacon sync")
  //   await ws(1);
  // }
  // let {
  //   CandidateBeaconWaitingForNextRandom = []
  // } = bestBeacon;
  // if (CandidateBeaconWaitingForNextRandom.indexOf(InputCoinPubKey) >= 0) {
  //   console.log("Pass sync Beacon best beacon state candidate");
  //   console.log("best beacon state cadidate on Beacon", CandidateBeaconWaitingForNextRandom);
  // }


  // let bestShardBeaconState = {};
  // while (true) {
  //   let bestBeaconShardState = await shard.GetBeaconBestState() || {};
  //   let {
  //     BestShardHeight = {}
  //   } = bestBeaconShardState;
  //   const shard0Height = BestShardHeight["0"];

  //   if (shard0Height >= bestBeacon.Height) {
  //     bestShardBeaconState = bestBeaconShardState
  //     console.log(bestBeaconShardState)
  //     break;
  //   };
  //   console.log("waiting shard sync")
  //   await ws(1);
  // }

  // let shardCandidates = bestShardBeaconState.CandidateBeaconWaitingForNextRandom || [];
  // if (shardCandidates.indexOf(InputCoinPubKey) >= 0) {
  //   console.log("Pass sync Shard best beacon state candidate");
  //   console.log("best beacon state cadidate on Shard", shardCandidates);
  // } else {
  //   console.log("FLOW FAILED!");
  //   return;
  // }

  // console.log("FLOW SUCCESS!");
  // // return generatedBlock;

})()