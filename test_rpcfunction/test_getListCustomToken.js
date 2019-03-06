const ConstantRPC = require('../constant-rpc/constant_rpc');
!(async function () {
    const shard0 = new ConstantRPC("127.0.0.1", 9334);
    const shard1 = new ConstantRPC("127.0.0.1", 9338);
    const listCustomToken0 = await shard1.ListCustomToken()
    const listCustomToken1 = await shard0.ListCustomToken()
    newResult0 = listCustomToken0.Response.Result.ListCustomToken.map(x=> {
        return {ID: x.ID, Name: x.Name, Symbol: x.Symbol}
    })
    newResult1 = listCustomToken1.Response.Result.ListCustomToken.map(x=> {
        return {ID: x.ID, Name: x.Name, Symbol: x.Symbol}
    })
    console.log("List Custom Token Of Shard 0", newResult0)
    console.log("List Custom Token Of Shard 1", newResult1)
})()