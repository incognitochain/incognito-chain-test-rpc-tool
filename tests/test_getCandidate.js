const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard = new ConstantRPC("127.0.0.1", 9334);
!(async function () {
    const candidate = await shard.GetCandidate()
    console.log("Result Candidate", candidate.Response.Result);

    const committee = await shard.GetCommittee()
    console.log("Result Committee", committee.Response.Result);
})()

