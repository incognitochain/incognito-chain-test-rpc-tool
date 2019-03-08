const ConstantRPC = require('../constant-rpc/constant_rpc')
const ConstantValue = require('../common/constant')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const shard1 = new ConstantRPC("127.0.0.1", 9338);
const beacon = new ConstantRPC("127.0.0.1", 9337);
const assert = require('assert');
const waitblock = 5
describe("Test Cross Shard Transaction", async function () {
    it("Should Be Able To Transfer Constant From SHARD 0 to SHARD 1", async function () {
        //========Utils=======
        const waitForResultTx = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    console.log('call result')
                    tx = await shard0.GetTransactionByHash(sendTxResult.Response.Result.TxID)
                    if (tx.Response.Result != null) {
                        resolve(tx.Response.Result)
                    } else {
                        setTimeout(() => {
                            console.log('re-call after 10s')
                            getResult()
                        }, 10000)
                    }
                }
                getResult()
            })
        }
        const waitForResultTx1 = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    console.log('call result')
                    tx = await shard0.GetTransactionByHash(sendTxResult1.Response.Result.TxID)
                    if (tx.Response.Result != null) {
                        resolve(tx.Response.Result)
                    } else {
                        setTimeout(() => {
                            console.log('re-call after 10s')
                            getResult()
                        }, 10000)
                    }
                }
                getResult()
            })
        }
        const waitForResultTx2 = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    console.log('call result')
                    tx = await shard0.GetTransactionByHash(sendTxResult2.Response.Result.TxID)
                    if (tx.Response.Result != null) {
                        resolve(tx.Response.Result)
                    } else {
                        setTimeout(() => {
                            console.log('re-call after 10s')
                            getResult()
                        }, 10000)
                    }
                }
                getResult()
            })
        }
        //==================End UTILS
        var txResult = await shard0.GetBalanceByPrivatekey(ConstantValue.Shard0_1Prk)
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey(ConstantValue.Shard1_0Prk)
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result
        //=====Create Custom Token=====
        randomNumber = ConstantValue.GetRandomInt(10000000000)
        console.log(randomNumber)
        const name = "ABC" + randomNumber
        const sendTxResult2 = await shard0.CreateAndSendCustomTokenTransaction(ConstantValue.Shard0_1Prk, 
                {},
                0,
                -1,
                {
                    "TokenID": "",
                    "TokenName": name, 
                    "TokenSymbol": name,
                    "TokenTxType": 0,
                    "TokenAmount": 1000,
                    "TokenReceivers": {
                        //ConstantValue.Shard0_1PA
                        "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 1000
                    }
                })
        assert.equal(sendTxResult2.Response.Error, null)
        console.log("Transaction Shard 0", sendTxResult2.Response.Result)
        const tokenID = sendTxResult2.Response.Result.TokenID
        console.log(tokenID)
        const resultTx2 = await waitForResultTx2()
        console.log(resultTx2)
        //=====End Create Custom Token=====
        const sendTxResult = await shard0.CreateAndSendTransaction(ConstantValue.Shard0_1Prk, {
            "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1000
        }, 0, 0)
        console.log("Transaction Shard 0 Constant", sendTxResult.Response.Result)
        const sendTxResult1 = await shard0.CreateAndSendCustomTokenTransaction(ConstantValue.Shard0_1Prk, 
                {},
                0,
                -1,
                {
                    "TokenID": tokenID,
                    "TokenName": name, 
                    "TokenSymbol": name,
                    "TokenTxType": 1,
                    "TokenAmount": 1000,
                    "TokenReceivers": {
                        //ConstantValue.Shard1_0PA
                        "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 500
                    }
                })
        assert.equal(sendTxResult1.Response.Error, null)
        console.log("Transaction Shard 0 Custom Token", sendTxResult1.Response.Result)

        const resultTx = await waitForResultTx()
        console.log(resultTx)

        const resultTx1 = await waitForResultTx1()
        console.log(resultTx1)


        const blockResult = await shard1.GetBlockCount(1)
        const currentBlockHeight = blockResult.Response.Result
        const waitForResultBlock = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    console.log('call result')
                    const blockResult = await shard1.GetBlockCount(1)
                    if (blockResult.Response.Result != null && blockResult.Response.Result > currentBlockHeight + waitblock){
                        resolve(blockResult.Response.Result)
                    } else {
                        setTimeout(() => {
                            console.log('re-call after 10s')
                            getResult()
                        }, 10000)
                    }
                }
                getResult()
            })
        }

        const resultBlock = await waitForResultBlock()
        console.log(resultBlock)

        // Check constant value after cross shard
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        assert.equal(acc1BalanceNew, acc1Balance - 1000)
        assert.equal(acc2BalanceNew, acc2Balance + 1000)

        const txResult1 = await shard1.ListUnspentCustomToken(ConstantValue.Shard1_0PA,tokenID)
        console.log("Account Balance Result - Shard1_0PA", txResult1.Response.Result);
        assert.equal(txResult1.Response.Result[0].Value, 500)

        const txResult2 = await shard0.ListUnspentCustomToken(ConstantValue.Shard0_1PA,tokenID)
        console.log("Account Balance Result - Shard0_1PA", txResult2.Response.Result);
        assert.equal(txResult2.Response.Result[0].Value, 500)
    })
})