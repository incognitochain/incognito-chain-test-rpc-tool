const ConstantRPC = require('../constant-rpc/constant_rpc')
const ConstantValue = require('../common/constant')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const shard1 = new ConstantRPC("127.0.0.1", 9338);
const beacon = new ConstantRPC("127.0.0.1", 9337);
const assert = require('assert');
const waitblock = 5
describe("Test Cross Shard Transaction", async function () {
    it("Should Be Able To Transfer Constant From SHARD 0 to SHARD 1", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result
        const blockResult = await shard1.GetBlockCount(1)
        const currentBlockHeight = blockResult.Response.Result
        const sendTxResult = await shard0.CreateAndSendTransaction("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {
            "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1000
        }, 0, 0)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)
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

        const resultTx = await waitForResultTx()
        console.log(resultTx)

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

        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        assert.equal(acc1BalanceNew, acc1Balance - 1000)
        assert.equal(acc2BalanceNew, acc2Balance + 1000)
    })
    it("Should Be Able To Transfer Constant BACK From SHARD 1 to SHARD 0", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result

        const blockResult = await shard0.GetBlockCount(0)
        const currentBlockHeight = blockResult.Response.Result

        const sendTxResult = await shard1.CreateAndSendTransaction("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd", {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 500
        }, 0, 0)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)

        const waitForResultTx = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    console.log('call result')
                    tx = await shard1.GetTransactionByHash(sendTxResult.Response.Result.TxID)
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

        const resultTx = await waitForResultTx()
        console.log(resultTx)

        const waitForResultBlock = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    console.log('call result')
                    const blockResult = await shard0.GetBlockCount(0)
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

        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        assert.equal(acc1BalanceNew, acc1Balance + 500)
        assert.equal(acc2BalanceNew, acc2Balance - 500)
    })
    it("Should Be Able To Transfer Constant From SHARD 0 to SHARD 1 With Privacy Flag", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result
        const blockResult = await shard1.GetBlockCount(1)
        const currentBlockHeight = blockResult.Response.Result
        const sendTxResult = await shard0.CreateAndSendTransaction("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {
            "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7": 1000
        }, 0, 1)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)
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

        const resultTx = await waitForResultTx()
        console.log(resultTx)

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

        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        assert.equal(acc1BalanceNew, acc1Balance - 1000)
        assert.equal(acc2BalanceNew, acc2Balance + 1000)
    })
    it("Should Be Able To Transfer Constant BACK From SHARD 1 to SHARD 0 With Privacy Flag", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result

        const blockResult = await shard0.GetBlockCount(0)
        const currentBlockHeight = blockResult.Response.Result

        const sendTxResult = await shard1.CreateAndSendTransaction("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd", {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 500
        }, 0, 1)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)

        const waitForResultTx = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    console.log('call result')
                    tx = await shard1.GetTransactionByHash(sendTxResult.Response.Result.TxID)
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

        const resultTx = await waitForResultTx()
        console.log(resultTx)

        const waitForResultBlock = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    console.log('call result')
                    const blockResult = await shard0.GetBlockCount(0)
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

        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        assert.equal(acc1BalanceNew, acc1Balance + 500)
        assert.equal(acc2BalanceNew, acc2Balance - 500)
    })
})