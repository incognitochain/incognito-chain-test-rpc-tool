const ConstantRPC = require('../constant-rpc/constant_rpc')
const ConstantValue = require('../common/constant')
const shard = new ConstantRPC("127.0.0.1", 9334);
const beacon = new ConstantRPC("127.0.0.1", 9337);
const assert = require('assert');
mode = "SHARD"
describe("Staking Type", async function () {
    BurningAddress = ConstantValue.BurningPA
    shard1PA = ConstantValue.Shard1PA
    nodePA = ConstantValue.nodePA
    beacon1PA = ConstantValue.Beacon1PA
    beacon2PA = ConstantValue.Beacon2PA
    it("Should Fail to get reponse with invalid MetadataType", async function () {
        const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
            "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 2
        }, 100, 0, 62)
        assert.notEqual(sendTxResult.Error, null, "Error Should Be: No Response From Node")
    })

    it("Should Fail to get reponse with invalid MetadataType", async function () {
        const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
            "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 2
        }, 100, 0, 65)
        assert.notEqual(sendTxResult.Error, null, "Error Should Be: No Response From Node")
    })
})
//NEED COMMITEES/VALIDATOR/CANDIDATE check RPC function to complete testcase
if (mode == "BEACON") {
    describe("Stake Beacon Success", async function () {
        it("Should Allow valid address to stake with right information", async function () {
            const canStake = await shard.CanPubkeyStake(ConstantValue.NodePB)
            if (canStake.Response.Result.CanStake) {
                const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
                    "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 2
                }, 100, 0, 64)
                assert.equal(sendTxResult.Error, null, "Reponse Error should be null")
                assert.equal(sendTxResult.Response.Error, null, "Content Error should be null")
            }
        })
    })
    describe("Staking Beacon Error", async function () {
        BurningAddress = ConstantValue.BurningPA
        shard1PA = ConstantValue.Shard1PA
        nodePA = ConstantValue.nodePA
        beacon1PA = ConstantValue.Beacon1PA
        beacon2PA = ConstantValue.Beacon2PA
        it("Should Fail when public key already in committee/validator/candidate list", async function () {
            const canStake = await shard.CanPubkeyStake(ConstantValue.NodePB)
            if (!canStake.Response.Result.CanStake) {
                const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
                    "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 2
                }, 100, 0, 64)
                assert.notEqual(sendTxResult.Response.Error, null)
                stacktrace = sendTxResult.Response.Error.StackTrace
                result = stacktrace.indexOf(ConstantValue.StakerPBError) > -1
                assert.equal(result, true, "Error should be: " + ConstantValue.StakerPBError)
            }
        })
        it("Should Fail when send transaction not to burning address", async function () {
            const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
                "1Uv3VB24eUszt5xqVfB87ninDu7H43gGxdjAUxs9j9JzisBJcJr7bAJpAhxBNvqe8KNjM5G9ieS1iC944YhPWKs3H2US2qSqTyyDNS4Ba": 2
            }, 100, 0, 64)
            assert.notEqual(sendTxResult.Response.Error, null)
            stacktrace = sendTxResult.Response.Error.StackTrace
            assert.equal((stacktrace.indexOf(ConstantValue.BurningPAError) > -1), true, "Error Should Be: " + ConstantValue.BurningPAError)
        })

        it("Should Fail when send transaction with wrong amount", async function () {
            const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
                "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 1
            }, 100, 0, 64)
            assert.notEqual(sendTxResult.Response.Error, null)
            stacktrace = sendTxResult.Response.Error.StackTrace
            assert.equal((stacktrace.indexOf(ConstantValue.StakeBeaconAmountError) > -1), true, "Error Should Be: " + ConstantValue.StakeBeaconAmountError)
        })

        it("Should Fail when send transaction with privacy flag", async function () {
            const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
                "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 2
            }, 100, 1, 64)
            assert.notEqual(sendTxResult.Error, null, "Error Should Be: No Response From Node")
        })
    })
} else {
    describe("Stake Shard Success", async function () {
        it("Should Allow valid address to stake with right information", async function () {
            const canStake = await shard.CanPubkeyStake(ConstantValue.NodePB)
            if (canStake.Response.Result.CanStake) {
                const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
                    "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 1
                }, 100, 0, 63)
                assert.equal(sendTxResult.Error, null, "Reponse Error should be null" + sendTxResult.Error)
                if (sendTxResult.Response.Error != null) {
                    stacktrace = sendTxResult.Response.Error.StackTrace
                    result = stacktrace.indexOf(ConstantValue.DuplicateStakeError) > -1
                    assert.equal(result, true, "Error should be: " + ConstantValue.DuplicateStakeError + " But Got " + stacktrace)
                } else {
                    assert.equal(sendTxResult.Response.Error, null, "Content Error should be null but got" + sendTxResult.Response.Error)
                }
                
            }
        })
    })
    describe("Staking Shard Error", async function () {
        BurningAddress = ConstantValue.BurningPA
        shard1PA = ConstantValue.Shard1PA
        nodePA = ConstantValue.nodePA
        beacon1PA = ConstantValue.Beacon1PA
        beacon2PA = ConstantValue.Beacon2PA
        it("Should Fail when public key already in committee/validator/candidate list", async function () {
            const canStake = await shard.CanPubkeyStake(ConstantValue.NodePB)
            if (!canStake.Response.Result.CanStake) {
                const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
                    "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 1
                }, 100, 0, 63)
                assert.notEqual(sendTxResult.Response.Error, null)
                stacktrace = sendTxResult.Response.Error.StackTrace
                result = stacktrace.indexOf(ConstantValue.StakerPBError) > -1
                assert.equal(result, true, "Error should be: " + ConstantValue.StakerPBError)
            }
        })

        it("Should Fail when send transaction not to burning address", async function () {
            const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
                "1Uv3VB24eUszt5xqVfB87ninDu7H43gGxdjAUxs9j9JzisBJcJr7bAJpAhxBNvqe8KNjM5G9ieS1iC944YhPWKs3H2US2qSqTyyDNS4Ba": 1
            }, 100, 0, 63)
            assert.notEqual(sendTxResult.Response.Error, null)
            stacktrace = sendTxResult.Response.Error.StackTrace
            assert.equal((stacktrace.indexOf(ConstantValue.BurningPAError) > -1), true, "Error Should Be: " + ConstantValue.BurningPAError + " But Got " + stacktrace)
        })

        it("Should Fail when send transaction with wrong amount", async function () {
            const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
                "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 2
            }, 100, 0, 63)
            assert.notEqual(sendTxResult.Response.Error, null)
            stacktrace = sendTxResult.Response.Error.StackTrace
            assert.equal((stacktrace.indexOf(ConstantValue.StakeShardAmountError) > -1), true, "Error Should Be: " + ConstantValue.StakeShardAmountError)
        })

        it("Should Fail when send transaction with privacy flag", async function () {
            const sendTxResult = await shard.CreateAndSendStakingTransaction(ConstantValue.NodePrk, {
                "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD": 1
            }, 100, 1, 63)
            assert.notEqual(sendTxResult.Error, null, "Error Should Be: No Response From Node")
        })
    })
}