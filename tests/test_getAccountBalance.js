const ConstantRPC = require('../constant-rpc/constant_rpc')
const shard1 = new ConstantRPC("127.0.0.1", 9338);
const shard0 = new ConstantRPC("127.0.0.1", 9334);
!(async function () {
    var txResult = await shard1.GetBalanceByPrivatekey("112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd")
    console.log("Account Balance Result 1 - Shard1_0PA", txResult.Response.Result);
})()
!(async function () {
    var txResult = await shard1.GetBalanceByPrivatekey("112t8s2UkZEwS7JtqLHFruRrh4Drj53UzH4A6DrairctKutxVb8Vw2DMzxCReYsAZkXi9ycaSNRHEcB7TJaTwPhyPvqRzu5NnUgTMN9AEKwo")
    console.log("Account Balance Result 1 - Shard1_1PA", txResult.Response.Result);
})()
!(async function () {
    var txResult = await shard0.GetBalanceByPrivatekey("112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh")
    console.log("Account Balance Result 0", txResult.Response.Result);
})()

