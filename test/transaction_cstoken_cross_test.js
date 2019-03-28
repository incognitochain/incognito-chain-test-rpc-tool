const ConstantRPC = require('../constant-rpc/constant_rpc')
const Util = require('../helpers/utils')
const ConstantValue = require('../common/constant')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const shard1 = new ConstantRPC("127.0.0.1", 9337);
const assert = require('assert');
const waitblock = 5
const fee = 10
const waitTime = 3000
const totalTokenAmount = 1000
const typeInit = 0
const typeTransfer = 1
const transferAmount = 1000
describe("Test Cross Shard Transaction", async function () {
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
    it("Should Be Able To Transfer Init Custom Token Cross Shard From SHARD 0 to SHARD 1 and Transfer Back", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("Account Balance Result 1", txResult.Response.Result);
        acc1Balance = txResult.Response.Result

        randomNumber = ConstantValue.GetRandomInt(100000)
        console.log(randomNumber)
        name = "ABC" + randomNumber
        let sendTxResult1 = await shard0.CreateAndSendCustomTokenTransaction(ConstantValue.Shard0_1Prk, 
                {},
                fee,
                0,
                {
                    "TokenID": "",
                    "TokenName": name, 
                    "TokenSymbol": name,
                    "TokenTxType": typeInit,
                    "TokenAmount": totalTokenAmount,
                    "TokenReceivers": {
                        //ConstantValue.Shard1_0PA
                        "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": totalTokenAmount
                    }
                })
        assert.equal(sendTxResult1.Response.Error, null)
        console.log("Transaction Shard 0", sendTxResult1.Response.Result.TokenID)
        let tokenID = sendTxResult1.Response.Result.TokenID

        let blockResultShard1 = await shard1.GetBlockCount(1)
        let currentBlockHeightShard1 = blockResultShard1.Response.Result

        await Util.WaitForResultTx(shard0, waitTime, sendTxResult1.Response.Result.TxID)
        await Util.WaitForCrossShardBlockTransferCSToken(shard1,waitTime,1,currentBlockHeightShard1,tokenID, ConstantValue.Shard1_0PA, totalTokenAmount)

        var balanceResult = await shard1.GetListCustomTokenBalance(ConstantValue.Shard1_0PA)
        console.log("Account Balance Result 1 - Shard1_1PA", balanceResult.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0].TokenID);
        assert.equal(balanceResult.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0].Amount, totalTokenAmount)

        var txResultNew = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("Account Balance Result 1 New", txResultNew.Response.Result);
        acc1BalanceNew = txResultNew.Response.Result
        assert.ok(acc1BalanceNew < acc1Balance)

        //=============S1 -> S0===========
        var txResult2 = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("Account Balance Result 0", txResult2.Response.Result);
        acc2Balance = txResult2.Response.Result
        let sendTxResult = await shard1.CreateAndSendCustomTokenTransaction(ConstantValue.Shard1_0Prk, 
                {},
                fee,
                0,
                {
                    "TokenID": tokenID,
                    "TokenName": name, 
                    "TokenSymbol": name,
                    "TokenTxType": typeTransfer,
                    "TokenAmount": totalTokenAmount,
                    "TokenReceivers": {
                        //ConstantValue.Shard0_1PA
                       "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ" : 500
                    }
                })
        assert.equal(sendTxResult.Response.Error, null)
        console.log("Transaction Shard 1", sendTxResult.Response.Result.TokenID)

        let blockResultShard0 = await shard0.GetBlockCount(0)
        let currentBlockHeightShard0 = blockResultShard0.Response.Result
        await Util.WaitForResultTx(shard1, waitTime, sendTxResult.Response.Result.TxID)
        await Util.WaitForCrossShardBlockTransferCSToken(shard0, waitTime, 0,currentBlockHeightShard0, tokenID, ConstantValue.Shard0_1PA, 500)

        let balanceResult1 = await shard1.GetListCustomTokenBalance(ConstantValue.Shard1_0PA)
        console.log("Account Balance Result 1 - Shard1_1PA", balanceResult1.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0].TokenID);
        assert.equal(balanceResult1.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0].Amount, totalTokenAmount - 500)

        let balanceResult2 = await shard0.GetListCustomTokenBalance(ConstantValue.Shard0_1PA)
        console.log("Account Balance Result 1 - Shard1_1PA", balanceResult2.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0].TokenID);
        assert.equal(balanceResult2.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0].Amount, 500)

        var txResult2New = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("Account Balance Result 2 New", txResult2New.Response.Result);
        acc2BalanceNew = txResult2New.Response.Result
        assert.ok(acc2BalanceNew < acc2Balance)
    })
    // it("Should Be Able To Transfer Init Custom Token Cross Shard From SHARD 0 to SHARD 1 and Transfer Back", async function () {
    //     randomNumber = ConstantValue.GetRandomInt(100000)
    //     console.log(randomNumber)
    //     name = "ABC" + randomNumber
    //     let sendTxResult1 = await shard0.CreateAndSendCustomTokenTransaction(ConstantValue.Shard0_1Prk, 
    //             {},
    //             0,
    //             -1,
    //             {
    //                 "TokenID": "",
    //                 "TokenName": name, 
    //                 "TokenSymbol": name,
    //                 "TokenTxType": 0,
    //                 "TokenAmount": 1000,
    //                 "TokenReceivers": {
    //                     //ConstantValue.Shard1_0PA
    //                     "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1000
    //                 }
    //             })
    //     assert.equal(sendTxResult1.Response.Error, null)
    //     console.log("Transaction Shard 0", sendTxResult1.Response.Result)
    //     let tokenID = sendTxResult1.Response.Result.TokenID
    //     let waitForResultTx1 = async () => {
    //         return new Promise((resolve) => {
    //             var getResult = async () => {
    //                 console.log('call result')
    //                 tx = await shard0.GetTransactionByHash(sendTxResult1.Response.Result.TxID)
    //                 if (tx.Response.Result != null) {
    //                     resolve(tx.Response.Result)
    //                 } else {
    //                     setTimeout(() => {
    //                         console.log('re-call after 10s')
    //                         getResult()
    //                     }, 10000)
    //                 }
    //             }
    //             getResult()
    //         })
    //     }

    //     let resultTx1 = await waitForResultTx1()
    //     console.log(resultTx1)

    //     let txResult = await shard0.ListUnspentCustomToken(ConstantValue.Shard0_1PA,tokenID)
    //     console.log("Account Balance Result 1 - Shard1_1PA", txResult.Response.Result);
    //     assert.equal(txResult.Response.Result[0].Value, 1000)

    //     let sendTxResult = await shard0.CreateAndSendCustomTokenTransaction(ConstantValue.Shard0_1Prk, 
    //             {},
    //             0,
    //             -1,
    //             {
    //                 "TokenID": tokenID,
    //                 "TokenName": name, 
    //                 "TokenSymbol": name,
    //                 "TokenTxType": 1,
    //                 "TokenAmount": 1000,
    //                 "TokenReceivers": {
    //                     //ConstantValue.Shard1_0PA
    //                    "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7" : 200
    //                 }
    //             })
    //     assert.equal(sendTxResult.Response.Error, null)
    //     console.log("Transaction Shard 0", sendTxResult.Response.Result)

    //     let waitForResultTx2 = async () => {
    //         return new Promise((resolve) => {
    //             var getResult = async () => {
    //                 console.log('call result')
    //                 tx = await shard0.GetTransactionByHash(sendTxResult.Response.Result.TxID)
    //                 if (tx.Response.Result != null) {
    //                     resolve(tx.Response.Result)
    //                 } else {
    //                     setTimeout(() => {
    //                         console.log('re-call after 10s')
    //                         getResult()
    //                     }, 10000)
    //                 }
    //             }
    //             getResult()
    //         })
    //     }

    //     let resultTx2 = await waitForResultTx2()
    //     console.log(resultTx2)


    //     let blockResult1 = await shard1.GetBlockCount(1)
    //     let currentBlockHeight1 = blockResult1.Response.Result
    //     let waitForResultBlock1 = async () => {
    //         return new Promise((resolve) => {
    //             var getResult = async () => {
    //                 console.log('call result')
    //                 let blockResult1 = await shard1.GetBlockCount(1)
    //                 if (blockResult1.Response.Result != null && blockResult1.Response.Result > currentBlockHeight1 + waitblock){
    //                     resolve(blockResult1.Response.Result)
    //                 } else {
    //                     setTimeout(() => {
    //                         console.log('re-call after 10s')
    //                         getResult()
    //                     }, 10000)
    //                 }
    //             }
    //             getResult()
    //         })
    //     }

    //     let resultBlock1 = await waitForResultBlock1()
    //     console.log(resultBlock1)


    //     let txResult1 = await shard1.ListUnspentCustomToken(ConstantValue.Shard1_0PA,tokenID)
    //     console.log("Account Balance Result - Shard1_0PA", txResult1.Response.Result);
    //     assert.equal(txResult1.Response.Result[0].Value, 200)

    //     let txResult2 = await shard0.ListUnspentCustomToken(ConstantValue.Shard0_1PA,tokenID)
    //     console.log("Account Balance Result - Shard0_1PA", txResult2.Response.Result);
    //     assert.equal(txResult2.Response.Result[0].Value, 800)
    // })
})
