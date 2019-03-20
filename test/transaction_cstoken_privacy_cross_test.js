const ConstantRPC = require('../constant-rpc/constant_rpc')
const ConstantValue = require('../common/constant')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const shard1 = new ConstantRPC("127.0.0.1", 9338);
const assert = require('assert');
const waitblock = 5
const totalAmount = 1000
const transferAmount = 300
const waitTime = 3000
const fee = 10
describe("Test Cross Shard Transaction", async function () {
    it("Should Be Able To Transfer Init Custom Token Cross Shard From SHARD 0 to SHARD 1 and Transfer Back", async function () {
        var txResultConstant = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResultConstant.Response.Result);
        acc1Balance = txResultConstant.Response.Result
        var txResultConstant = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResultConstant.Response.Result);
        acc2Balance = txResultConstant.Response.Result

        randomNumber = ConstantValue.GetRandomInt(100000)
        console.log(randomNumber)
        name = "ABC" + randomNumber
        const sendTxResult1 = await shard0.CreateAndSendPrivacyCustomTokenTransaction("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {},
            fee,
            1, 
            {
                "TokenID": "",
                "TokenName": name,
                "TokenSymbol": name,
                "TokenTxType": 0,
                "TokenAmount": totalAmount,
                "TokenReceivers": {
                    //ConstantValue.Shard1_0PA
                    "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": totalAmount
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
                    if (blockResult1.Response.Result != null && blockResult1.Response.Result > currentBlockHeight1 + waitblock) {
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

        const txResult = await shard1.GetListPrivacyCustomTokenBalance(ConstantValue.Shard1_0Prk)
        const customToken = txResult.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0]
        console.log("Account Balance Result 1 - Shard1_1PA", customToken.Amount);
        assert.equal(customToken.Amount, totalAmount)

        const sendTxResult = await shard1.CreateAndSendPrivacyCustomTokenTransaction(ConstantValue.Shard1_0Prk, {},
            fee,
            1, {
                "TokenID": tokenID,
                "TokenName": name,
                "TokenSymbol": name,
                "TokenTxType": 1,
                "TokenAmount": 1000,
                "TokenReceivers": {
                    //ConstantValue.Shard0_1PA
                    "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": transferAmount
                }
            })
        assert.equal(sendTxResult.Response.Error, null)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TokenID)

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
                    if (blockResult2.Response.Result != null && blockResult2.Response.Result > currentBlockHeight2 + waitblock) {
                        resolve(blockResult2.Response.Result)
                    } else {
                        setTimeout(() => {
                            getResult()
                        }, 10000)
                    }
                }
                getResult()
            })
        }

        const resultBlock2 = await waitForResultBlock2()
        console.log(resultBlock2)

        const txResult1 = await shard1.GetListPrivacyCustomTokenBalance(ConstantValue.Shard1_0Prk)
        const customToken1 = txResult1.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0]
        console.log("Account Balance Result 1 - Shard1_0", ConstantValue.Shard1_0Prk, customToken1.Amount);
        assert.equal(customToken1.Amount, totalAmount - transferAmount)

        const txResult2 = await shard0.GetListPrivacyCustomTokenBalance(ConstantValue.Shard0_1Prk)
        const customToken2 = txResult2.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0]
        console.log("Account Balance Result 1 - Shard0_1", ConstantValue.Shard0_1Prk, customToken2.Amount);
        assert.equal(customToken2.Amount, transferAmount)

        var txResultConstant = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result New", txResultConstant.Response.Result);
        acc1BalanceNew = txResultConstant.Response.Result
        var txResultConstant = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result New", txResultConstant.Response.Result);
        acc2BalanceNew = txResultConstant.Response.Result

        assert.ok((acc1BalanceNew < acc1Balance) && (acc2BalanceNew < acc2Balance))
    })
})