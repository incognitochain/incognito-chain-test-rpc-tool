const ConstantRPC = require('../constant-rpc/constant_rpc')
const ConstantValue = require('../common/constant')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const shard1 = new ConstantRPC("127.0.0.1", 9338);
const assert = require('assert');
const waitblock = 5
const fee = 10
const waitTime = 3000
const totalTokenAmount = 1000
const typeInit = 0
const typeTransfer = 1
describe("Test Cross Shard Transaction", async function () {
    it("Should Be Able To Transfer Init Custom Token Cross Shard From SHARD 0 to SHARD 1 and Transfer Back", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("Account Balance Result 1", txResult.Response.Result);
        acc1Balance = txResult.Response.Result

        randomNumber = ConstantValue.GetRandomInt(100000)
        console.log(randomNumber)
        name = "ABC" + randomNumber
        const sendTxResult1 = await shard0.CreateAndSendCustomTokenTransaction(ConstantValue.Shard0_1Prk, 
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
        const tokenID = sendTxResult1.Response.Result.TokenID
        const waitForResultTx1 = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    tx = await shard0.GetTransactionByHash(sendTxResult1.Response.Result.TxID)
                    if (tx.Response.Result != null) {
                        resolve(tx.Response.Result.BlockHeight)
                    } else {
                        setTimeout(() => {
                            getResult()
                        }, waitTime)
                    }
                }
                getResult()
            })
        }

        const resultTx1 = await waitForResultTx1()
        console.log(resultTx1)

        const blockResult1 = await shard1.GetBlockCount(1)
        const currentBlockHeight1 = blockResult1.Response.Result
        const waitForResultBlock1 = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    const blockResult1 = await shard1.GetBlockCount(1)
                    if (blockResult1.Response.Result != null && blockResult1.Response.Result > currentBlockHeight1 + waitblock){
                        resolve(blockResult1.Response.Result)
                    } else {
                        setTimeout(() => {
                            getResult()
                        }, waitTime)
                    }
                }
                getResult()
            })
        }

        const resultBlock1 = await waitForResultBlock1()
        console.log(resultBlock1)

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
        const sendTxResult = await shard1.CreateAndSendCustomTokenTransaction(ConstantValue.Shard1_0Prk, 
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

        const waitForResultTx2 = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    tx = await shard1.GetTransactionByHash(sendTxResult.Response.Result.TxID)
                    if (tx.Response.Result != null) {
                        resolve(tx.Response.Result.BlockHeight)
                    } else {
                        setTimeout(() => {
                            getResult()
                        }, waitTime)
                    }
                }
                getResult()
            })
        }

        const resultTx2 = await waitForResultTx2()
        console.log(resultTx2)


        const blockResult2 = await shard0.GetBlockCount(0)
        const currentBlockHeight2 = blockResult2.Response.Result
        const waitForResultBlock2 = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    const blockResult2 = await shard0.GetBlockCount(0)
                    if (blockResult2.Response.Result != null && blockResult2.Response.Result > currentBlockHeight2 + waitblock){
                        resolve(blockResult2.Response.Result)
                    } else {
                        setTimeout(() => {
                            getResult()
                        }, waitTime)
                    }
                }
                getResult()
            })
        }

        const resultBlock2 = await waitForResultBlock2()
        console.log(resultBlock2)


        const balanceResult1 = await shard1.GetListCustomTokenBalance(ConstantValue.Shard1_0PA)
        console.log("Account Balance Result 1 - Shard1_1PA", balanceResult1.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0].TokenID);
        assert.equal(balanceResult1.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0].Amount, totalTokenAmount - 500)

        const balanceResult2 = await shard0.GetListCustomTokenBalance(ConstantValue.Shard0_1PA)
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
    //     const sendTxResult1 = await shard0.CreateAndSendCustomTokenTransaction(ConstantValue.Shard0_1Prk, 
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
    //     const tokenID = sendTxResult1.Response.Result.TokenID
    //     const waitForResultTx1 = async () => {
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

    //     const resultTx1 = await waitForResultTx1()
    //     console.log(resultTx1)

    //     const txResult = await shard0.ListUnspentCustomToken(ConstantValue.Shard0_1PA,tokenID)
    //     console.log("Account Balance Result 1 - Shard1_1PA", txResult.Response.Result);
    //     assert.equal(txResult.Response.Result[0].Value, 1000)

    //     const sendTxResult = await shard0.CreateAndSendCustomTokenTransaction(ConstantValue.Shard0_1Prk, 
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

    //     const waitForResultTx2 = async () => {
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

    //     const resultTx2 = await waitForResultTx2()
    //     console.log(resultTx2)


    //     const blockResult1 = await shard1.GetBlockCount(1)
    //     const currentBlockHeight1 = blockResult1.Response.Result
    //     const waitForResultBlock1 = async () => {
    //         return new Promise((resolve) => {
    //             var getResult = async () => {
    //                 console.log('call result')
    //                 const blockResult1 = await shard1.GetBlockCount(1)
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

    //     const resultBlock1 = await waitForResultBlock1()
    //     console.log(resultBlock1)


    //     const txResult1 = await shard1.ListUnspentCustomToken(ConstantValue.Shard1_0PA,tokenID)
    //     console.log("Account Balance Result - Shard1_0PA", txResult1.Response.Result);
    //     assert.equal(txResult1.Response.Result[0].Value, 200)

    //     const txResult2 = await shard0.ListUnspentCustomToken(ConstantValue.Shard0_1PA,tokenID)
    //     console.log("Account Balance Result - Shard0_1PA", txResult2.Response.Result);
    //     assert.equal(txResult2.Response.Result[0].Value, 800)
    // })
})
