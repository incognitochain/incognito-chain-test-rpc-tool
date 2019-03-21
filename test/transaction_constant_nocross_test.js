const ConstantRPC = require('../constant-rpc/constant_rpc')
const ConstantValue = require('../common/constant')
const Util = require('../helpers/utils')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const beacon = new ConstantRPC("127.0.0.1", 9337);
const assert = require('assert');
const waitblock = 3
const fee = 10
const waitTime = 3000

describe("Test Normal Transaction", async function () {
    it("Should Be Able To Transfer Constant", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result

        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result
        const FeeResult1 = await shard0.EstimateFee("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {
            "1Uv2MXFL2PmuFa6zkF3sBh425jefEEm5Ed7ajgJVvrEZ2vpzUmUaKxgiuH7cugYbMexLtUcX3BQiXAB3L9ymU12rTj99EadXVxNc5yvHy": 1000
        }, 0, 0)
        const sendTxResult = await shard0.CreateAndSendTransaction("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {
            "1Uv2MXFL2PmuFa6zkF3sBh425jefEEm5Ed7ajgJVvrEZ2vpzUmUaKxgiuH7cugYbMexLtUcX3BQiXAB3L9ymU12rTj99EadXVxNc5yvHy": 1000
        }, fee, 0)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)
        
        await Util.WaitForResultTx(shard0, waitTime, sendTxResult.Response.Result.TxID)

        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        console.log("Fee for Transaction: ", FeeResult1.Response.Result.EstimateTxSizeInKb)
        assert.equal(acc1BalanceNew, acc1Balance - 1000 - fee*(FeeResult1.Response.Result.EstimateTxSizeInKb))
        assert.equal(acc2BalanceNew, acc2Balance + 1000)
    })
    it("Should Be Able To Transfer Constant 2", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result
        const FeeResult2 = await shard0.EstimateFee("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ", {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 500
        }, 0, 0)
        const sendTxResult = await shard0.CreateAndSendTransaction("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ", {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 500
        }, fee, 0)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)

        await Util.WaitForResultTx(shard0, waitTime, sendTxResult.Response.Result.TxID)

        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        assert.equal(acc1BalanceNew, acc1Balance - 500 - fee * (FeeResult2.Response.Result.EstimateTxSizeInKb))
        assert.equal(acc2BalanceNew, acc2Balance + 500)
    })
    it("Should Be Able To Transfer Constant with Privacy Flag", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result
        
        const FeeResult1 = await shard0.EstimateFee("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {
            "1Uv2MXFL2PmuFa6zkF3sBh425jefEEm5Ed7ajgJVvrEZ2vpzUmUaKxgiuH7cugYbMexLtUcX3BQiXAB3L9ymU12rTj99EadXVxNc5yvHy": 1000
        }, 0, 1)        
        const sendTxResult = await shard0.CreateAndSendTransaction("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {
            "1Uv2MXFL2PmuFa6zkF3sBh425jefEEm5Ed7ajgJVvrEZ2vpzUmUaKxgiuH7cugYbMexLtUcX3BQiXAB3L9ymU12rTj99EadXVxNc5yvHy": 1000
        }, fee, 1)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)

        await Util.WaitForResultTx(shard0, waitTime, sendTxResult.Response.Result.TxID)

        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        console.log("Fee for Transaction: ", FeeResult1.Response.Result.EstimateTxSizeInKb)
        assert.ok(acc1BalanceNew >= acc1Balance - 1000 - fee * (FeeResult1.Response.Result.EstimateTxSizeInKb))
        assert.equal(acc2BalanceNew, acc2Balance + 1000)
    })
    it("Should Be Able To Transfer Constant With Privacy Flag 2", async function () {
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        acc1Balance = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        acc2Balance = txResult.Response.Result

        const FeeResult2 = await shard0.EstimateFee("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ", {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 500
        }, 0, 1)        
        const sendTxResult = await shard0.CreateAndSendTransaction("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ", {
            "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ": 500
        }, fee, 1)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TxID)

        await Util.WaitForResultTx(shard0, waitTime, sendTxResult.Response.Result.TxID)

        var txResult = await shard0.GetBalanceByPrivatekey("112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ")
        console.log("Account Balance Result", txResult.Response.Result);
        acc1BalanceNew = txResult.Response.Result
        var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("Account Balance Result", txResult.Response.Result);
        acc2BalanceNew = txResult.Response.Result

        console.log("Fee for Transaction: ", FeeResult2.Response.Result.EstimateTxSizeInKb)
        assert.equal(acc2BalanceNew, acc2Balance + 500)
        assert.ok(acc1BalanceNew >= acc1Balance - 500 - fee * (FeeResult2.Response.Result.EstimateTxSizeInKb), "Balance Should equal or greater than:`${acc2Balance - 500 - fee * (FeeResult2.Response.Result.EstimateTxSizeInKb}`")
    })
})