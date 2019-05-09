const ConstantRPC = require('../constant-rpc/constant_rpc')
const ConstantValue = require('../common/constant')
const Util = require('../helpers/utils')
const shard0 = new ConstantRPC("127.0.0.1", 9334);
const shard1 = new ConstantRPC("127.0.0.1", 9337);
const assert = require('assert');
const waitblock = 5
const totalAmount = 1000
const transferAmount = 300
const waitTime = 3000
const fee = 10
describe("Test Cross Shard Transaction", async function () {
    it("Should Be Able To Transfer Init Custom Token Cross Shard From SHARD 0 to SHARD 1 and Transfer Back", async function () {
        let txResultConstant = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result", txResultConstant.Response.Result);
        acc1Balance = txResultConstant.Response.Result
        txResultConstant = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result", txResultConstant.Response.Result);
        acc2Balance = txResultConstant.Response.Result

        randomNumber = ConstantValue.GetRandomInt(100000)
        console.log(randomNumber)
        name = "ABC" + randomNumber
        let sendTxResult = await shard0.CreateAndSendPrivacyCustomTokenTransaction("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh", {},
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
        assert.equal(sendTxResult.Response.Error, null)
        console.log("Transaction Shard 0", sendTxResult.Response.Result.TokenID)
        let tokenID = sendTxResult.Response.Result.TokenID

        let blockResultShard1 = await shard1.GetBlockCount(1)
        let currentBlockHeightShard1 = blockResultShard1.Response.Result
        
        await Util.WaitForResultTx(shard0, waitTime, sendTxResult.Response.Result.TxID)
        await Util.WaitForCrossShardBlockTransferCSTokenPrivacy(shard1,waitTime, 1, currentBlockHeightShard1, tokenID, ConstantValue.shard1_0PB)

        let txResult = await shard1.GetListPrivacyCustomTokenBalance(ConstantValue.Shard1_0Prk)
        let customToken = txResult.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0]
        console.log("Account Balance Result 1 - Shard1_1PA", customToken.Amount);
        assert.equal(customToken.Amount, totalAmount)

        sendTxResult = await shard1.CreateAndSendPrivacyCustomTokenTransaction(ConstantValue.Shard1_0Prk, {},
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

        let blockResultShard0 = await shard0.GetBlockCount(0)
        let currentBlockHeightShard0 = blockResultShard0.Response.Result
        await Util.WaitForResultTx(shard1, waitTime, sendTxResult.Response.Result.TxID)
        await Util.WaitForCrossShardBlockTransferCSTokenPrivacy(shard0,waitTime, 0, currentBlockHeightShard0, tokenID, ConstantValue.shard0_1PB)

        let txResult1 = await shard1.GetListPrivacyCustomTokenBalance(ConstantValue.Shard1_0Prk)
        let customToken1 = txResult1.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0]
        console.log("Account Balance Result 1 - Shard1_0", ConstantValue.Shard1_0Prk, customToken1.Amount);
        assert.equal(customToken1.Amount, totalAmount - transferAmount)

        let txResult2 = await shard0.GetListPrivacyCustomTokenBalance(ConstantValue.Shard0_1Prk)
        let customToken2 = txResult2.Response.Result.ListCustomTokenBalance.filter(x => x.TokenID === tokenID)[0]
        console.log("Account Balance Result 1 - Shard0_1", ConstantValue.Shard0_1Prk, customToken2.Amount);
        assert.equal(customToken2.Amount, transferAmount)

        txResultConstant = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
        console.log("SHARD 0: Account Balance Result New", txResultConstant.Response.Result);
        acc1BalanceNew = txResultConstant.Response.Result
        txResultConstant = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
        console.log("SHARD 1: Account Balance Result New", txResultConstant.Response.Result);
        acc2BalanceNew = txResultConstant.Response.Result

        assert.ok((acc1BalanceNew < acc1Balance) && (acc2BalanceNew < acc2Balance))
    })
})