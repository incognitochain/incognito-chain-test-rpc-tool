const ConstantRPC = require('../constant-rpc/constant_rpc')
const ConstantValue = require('../common/constant')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const beacon = new ConstantRPC("127.0.0.1", 9337);
const assert = require('assert');

describe("Test Normal Transaction", async function () {
    it("Should Be Able To Transfer Constant", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        // assert.equal(txResult.Response.Result, 1000000)
        acc1Balance = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        // assert.equal(txResult.Response.Result, 1000000)
        acc2Balance = txResult.Response.Result
        const sendTxResult = await shard0.CreateAndSendTransaction("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {
            "1Uv2MXFL2PmuFa6zkF3sBh425jefEEm5Ed7ajgJVvrEZ2vpzUmUaKxgiuH7cugYbMexLtUcX3BQiXAB3L9ymU12rTj99EadXVxNc5yvHy": 1000
        }, 0, 0)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)
        const waitForResult = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    console.log('call result')
                    tx = await shard0.GetTransactionByHash(sendTxResult.Response.Result.TxID)
                    if (tx.Response.Result != null) {
                        resolve(tx.Response.Result)
                    } else {
                        setTimeout(() => {
                            console.log('re-call after 5s')
                            getResult()
                        }, 3000)
                    }
                }
                getResult()
            })
        }

        const result = await waitForResult()
        console.log(result)
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        assert.equal(acc1BalanceNew, acc1Balance - 1000)
        assert.equal(acc2BalanceNew, acc2Balance + 1000)
    })
    it("Should Be Able To Transfer Constant 2", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        // assert.equal(txResult.Response.Result, 1000000)
        acc1Balance = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        // assert.equal(txResult.Response.Result, 1000000)
        acc2Balance = txResult.Response.Result
        const sendTxResult = await shard0.CreateAndSendTransaction("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ", {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 500
        }, 0, 0)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)
        const waitForResult = async () => {
            return new Promise((resolve) => {
                var getResult = async () => {
                    console.log('call result')
                    tx = await shard0.GetTransactionByHash(sendTxResult.Response.Result.TxID)
                    if (tx.Response.Result != null) {
                        resolve(tx.Response.Result)
                    } else {
                        setTimeout(() => {
                            console.log('re-call after 3s')
                            getResult()
                        }, 3000)
                    }
                }
                getResult()
            })
        }

        const result = await waitForResult()
        console.log(result)
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        assert.equal(acc1BalanceNew, acc1Balance - 500)
        assert.equal(acc2BalanceNew, acc2Balance + 500)
    })
})