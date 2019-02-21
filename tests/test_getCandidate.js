const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard = new ConstantRPC("127.0.0.1", 9334);
!(async function () {
    const candidate = await shard.GetCandidateList()
    console.log("Result Candidate", candidate.Response.Result);

    const committee = await shard.GetCommitteeList()
    console.log("Result Committee", committee.Response.Result);

    const canStake = await shard.CanPubkeyStake("18BRApfoGh91y3WdeK9BCW1utunNLVnRCAUFvsRpSWfmfoPzPqa")
    console.log("Result canStake", canStake.Response.Result);
})()

