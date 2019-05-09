const ConstantRPC = require('../constant-rpc/constant_rpc')
const ConstantValue = require('../common/constant')
const Util = require('../helpers/utils')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const shard1 = new ConstantRPC("127.0.0.1", 9337);
const beacon = new ConstantRPC("127.0.0.1", 9337);
const assert = require('assert');
const waitblock = 10
const fee = 10
const waitTime = 3000
const transferAmount = 1000
const transferAmount2 = 500
describe("Test Cross Shard Transaction", async function () {
    this.timeout(60000);

    it("Should Be Able To Transfer Constant From SHARD 0 to SHARD 1", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result
        const FeeResult1 = await shard0.EstimateFee(ConstantValue.Shard0_1Prk, {
            "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": transferAmount
        }, 0, 0)
        const sendTxResult = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_1Prk, {
            // ContantValue.Shard1_0PA
            "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": transferAmount
        }, fee, 0)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)
       
        const blockResultShard1 = await shard1.GetBlockCount(1)
        const currentBlockHeightShard1 = blockResultShard1.Response.Result
        
        await Util.WaitForResultTx(shard0,waitTime,sendTxResult.Response.Result.TxID)
        await Util.WaitForCrossShardBlockTransferContantNormal(shard1,waitTime, 1, currentBlockHeightShard1,ConstantValue.shard1_0PB, transferAmount)

        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        console.log("Fee for Transaction: ", FeeResult1.Response.Result.EstimateTxSizeInKb)
        assert.equal(acc1BalanceNew, acc1Balance - 1000 - fee * (FeeResult1.Response.Result.EstimateTxSizeInKb))
        assert.equal(acc2BalanceNew, acc2Balance + 1000)
    })
    it("Should Be Able To Transfer Constant BACK From SHARD 1 to SHARD 0", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result

        const FeeResult2 = await shard1.EstimateFee(ConstantValue.Shard1_0Prk, {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": transferAmount2
        }, 0, 0)
        const sendTxResult = await shard1.CreateAndSendTransaction(ConstantValue.Shard1_0Prk, {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": transferAmount2
        }, fee, 0)
        console.log("Transaction Shard 1", sendTxResult.Response.Result.TxID)
        const blockResultShard0 = await shard0.GetBlockCount(0)
        const currentBlockHeightShard0 = blockResultShard0.Response.Result
        
        await Util.WaitForResultTx(shard1, waitTime, sendTxResult.Response.Result.TxID)

        await Util.WaitForCrossShardBlockTransferContantNormal(shard0, waitTime, 0, currentBlockHeightShard0, ConstantValue.shard0_1PB, transferAmount2)

        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        console.log("Fee for Transaction: ", FeeResult2.Response.Result.EstimateTxSizeInKb)
        assert.equal(acc1BalanceNew, acc1Balance + transferAmount2)
        assert.equal(acc2BalanceNew, acc2Balance - transferAmount2 - fee * (FeeResult2.Response.Result.EstimateTxSizeInKb))
    })
    it("Should Be Able To Transfer Constant From SHARD 0 to SHARD 1 With Privacy Flag", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result
        const FeeResult1 = await shard0.EstimateFee(ConstantValue.Shard0_1Prk, {
            "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": transferAmount
        }, 0, 1)
        const sendTxResult = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_1Prk, {
            // ContantValue.Shard1_0PA
            "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": transferAmount
        }, fee, 1)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)
       
        const blockResultShard1 = await shard1.GetBlockCount(1)
        const currentBlockHeightShard1 = blockResultShard1.Response.Result
        
        await Util.WaitForResultTx(shard0,waitTime,sendTxResult.Response.Result.TxID)

        await Util.WaitForCrossShardBlockTransferContantPrivacy(shard1,waitTime, 1, currentBlockHeightShard1,ConstantValue.shard1_0PB, transferAmount)

        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        console.log("Fee for Transaction: ", FeeResult1.Response.Result.EstimateTxSizeInKb)
        assert.ok(acc1BalanceNew >= acc1Balance - 1000 - fee * (FeeResult1.Response.Result.EstimateTxSizeInKb))
        assert.equal(acc2BalanceNew, acc2Balance + 1000)
    })
    it("Should Be Able To Transfer Constant BACK From SHARD 1 to SHARD 0 With Privacy Flag", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result

        const FeeResult2 = await shard1.EstimateFee(ConstantValue.Shard1_0Prk, {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": transferAmount2
        }, 0, 1)
        const sendTxResult = await shard1.CreateAndSendTransaction(ConstantValue.Shard1_0Prk, {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": transferAmount2
        }, fee, 1)
        console.log("Transaction Shard 1", sendTxResult.Response.Result.TxID)

        const blockResultShard0 = await shard0.GetBlockCount(0)
        const currentBlockHeightShard0 = blockResultShard0.Response.Result
        
        await Util.WaitForResultTx(shard1, waitTime, sendTxResult.Response.Result.TxID)

        await Util.WaitForCrossShardBlockTransferContantPrivacy(shard0, waitTime, 0,currentBlockHeightShard0, ConstantValue.shard0_1PB, transferAmount2)

        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        console.log("Fee for Transaction: ", FeeResult2.Response.Result.EstimateTxSizeInKb)
        assert.equal(acc1BalanceNew, acc1Balance + 500)
        assert.ok(acc2BalanceNew >= acc2Balance - 500 - fee * (FeeResult2.Response.Result.EstimateTxSizeInKb), "Balance Should equal or greater than:`${acc2Balance - 500 - fee * (FeeResult2.Response.Result.EstimateTxSizeInKb}`")
    })
})