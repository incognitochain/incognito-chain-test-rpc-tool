const ConstantRPC = require('../constant-rpc/constant_rpc')

  !(async function () {
    const shard = new ConstantRPC();
    const beacon = new ConstantRPC("127.0.0.1", 9337);

    const blockCount1 = await shard.GetBlockCount(0);
    if (shard == undefined || shard == null) {
      return
    }
    const sendTxResult = await shard.CreateAndSendStakingTransaction("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {
      "1Uv2bWvMhSh3SVBsRvcjaoS17sCbQZRnTjP5cRMas94RNRdmUYXEJY1h93Vn4Z4ekSU3um57dLvpBSV7amFSs7NqqzUKuPqRYgjYbSmP8": 1
    }, 100, 0, 64) || {};

    console.log("con co", sendTxResult);
    let {
      TxID = ""
    } = sendTxResult;
    if (TxID == "") return "send Tx failed";

    let ws = async (s) => new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("timeout")
        resolve()
      }, s * 1000)
    })
    // await ws(5);
    while (true) {
      let blockCount2 = await shard.GetBlockCount(0);
      if (blockCount2 > blockCount1) {
        console.log(blockCount2);
        break;
      };
      await ws(1);
    }

    const txResult = await shard.GetTransactionByHash(TxID) || {};
    console.log("con heo", txResult);
    let {
      BlockHash = "", InputCoinPubKey = ""
    } = txResult;
    if (BlockHash == "") return "get transaction detail info failed";
    const generatedBlock = await shard.RetrieveBlock(BlockHash, "1") || {};
    const {
      Hash = "", Height
    } = generatedBlock;
    if (Hash == "") return "get generated block failed";
    console.log("generated block: ", generatedBlock)
    let bestBeacon = {};
    while (true) {
      let bestBeaconState = await beacon.GetBeaconBestState() || {};
      let {
        BestShardHeight = {}
      } = bestBeaconState;
      const shard0Height = BestShardHeight["0"];
      console.log("shard0Height", shard0Height, BestShardHeight);
      if (shard0Height >= Height) {
        console.log(bestBeaconState)
        bestBeacon = bestBeaconState
        break;
      };
      console.log("waiting beacon sync")
      await ws(1);
    }
    let {
      CandidateBeaconWaitingForNextRandom = []
    } = bestBeacon;
    if (CandidateBeaconWaitingForNextRandom.indexOf(InputCoinPubKey) >= 0) {
      console.log("Pass sync Beacon best beacon state candidate");
      console.log("best beacon state cadidate on Beacon", CandidateBeaconWaitingForNextRandom);
    }


    let bestShardBeaconState = {};
    while (true) {
      let bestBeaconShardState = await shard.GetBeaconBestState() || {};
      let {
        BestShardHeight = {}
      } = bestBeaconShardState;
      const shard0Height = BestShardHeight["0"];

      if (shard0Height >= bestBeacon.Height) {
        bestShardBeaconState = bestBeaconShardState
        console.log(bestBeaconShardState)
        break;
      };
      console.log("waiting shard sync")
      await ws(1);
    }

    let shardCandidates = bestShardBeaconState.CandidateBeaconWaitingForNextRandom || [];
    if (shardCandidates.indexOf(InputCoinPubKey) >= 0) {
      console.log("Pass sync Shard best beacon state candidate");
      console.log("best beacon state cadidate on Shard", shardCandidates);
    } else {
      console.log("FLOW FAILED!");
      return;
    }

    console.log("FLOW SUCCESS!");
    // return generatedBlock;

  })()