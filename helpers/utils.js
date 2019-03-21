module.exports.WaitForCrossShardBlock = async (shard, waitTime, shardID, blockHeight) => {
    return new Promise((resolve) => {
        var getResult = async (blockHeight) => {
            const crossShardResult = await shard.GetCrossShardBlock(shardID, blockHeight)
            if (crossShardResult.Response.Result.HasCrossShard){
                resolve(crossShardResult.Response.Result)
            }
            else {
                setTimeout(() => {
                    blockHeight++
                    getResult(blockHeight)
                }, waitTime)
            }
        }
        getResult(blockHeight)
    })
}

module.exports.WaitForCrossShardBlockTransferContantNormal = async (shard, waitTime, shardID, blockHeight, publicKey, value) => {
    
    return new Promise((resolve) => {
        var getResult = async (blockHeight) => {
            const crossShardResult = await shard.GetCrossShardBlock(shardID,blockHeight)
            if (crossShardResult.Error != null || crossShardResult.Response.Error != null) {
                setTimeout(() => {
                    getResult(blockHeight)
                }, waitTime)
            } else if (crossShardResult.Response.Result.HasCrossShard && crossShardResult.Response.Result.CrossShardConstantResult != null){
                let result = crossShardResult.Response.Result.CrossShardConstantResult.filter(x => x.PublicKey === publicKey && x.Value === value)
                if (result.length == 0){
                    setTimeout(() => {
                        blockHeight++
                        getResult(blockHeight)
                    }, waitTime)
                } else {
                    resolve(result.length)
                }
            } else {
                setTimeout(() => {
                    blockHeight++
                    getResult(blockHeight)
                }, waitTime)
            }
        }
        getResult(blockHeight)
    })
}

module.exports.WaitForCrossShardBlockTransferContantPrivacy = async (shard, waitTime, shardID, blockHeight, publicKey) => {
    return new Promise((resolve) => {
        var getResult = async (blockHeight) => {
            const crossShardResult = await shard.GetCrossShardBlock(shardID,blockHeight)
            if (crossShardResult.Error != null || crossShardResult.Response.Error != null) {
                setTimeout(() => {
                    getResult(blockHeight)
                }, waitTime)
            } else if (crossShardResult.Response.Result.HasCrossShard && crossShardResult.Response.Result.CrossShardConstantPrivacyResult != null){
                let result = crossShardResult.Response.Result.CrossShardConstantPrivacyResult.filter(x => x.PublicKey === publicKey)
                if (result.length == 0){
                    setTimeout(() => {
                        blockHeight++
                        getResult(blockHeight)
                    }, waitTime)
                } else {
                    resolve(result.length)
                }
            } else {
                setTimeout(() => {
                    blockHeight++
                    getResult(blockHeight)
                }, waitTime)
            }
        }
        getResult(blockHeight)
    })
}

module.exports.WaitForCrossShardBlockTransferCSToken = async (shard, waitTime,shardID, blockHeight, tokenID, paymentAddress, value)=> {
    return new Promise((resolve) => {
        var getResult = async (blockHeight) => {
            const crossShardResult = await shard.GetCrossShardBlock(shardID,blockHeight)
            if (crossShardResult.Error != null || crossShardResult.Response.Error != null) {
                setTimeout(() => {
                    getResult(blockHeight)
                }, waitTime)
            } else if (crossShardResult.Response.Result.HasCrossShard && crossShardResult.Response.Result.CrossShardCSTokenResult != null){
                let result = crossShardResult.Response.Result.CrossShardCSTokenResult.filter(x => x.TokenID === tokenID && x.IsPrivacy === false)[0]
                // console.log(result)
                newResult = result.CrossShardCSTokenBalanceResultList.filter(x => x.PaymentAddress === paymentAddress && x.Value === value)
                // console.log(newResult)
                if (newResult.length == 0){
                    setTimeout(() => {
                        blockHeight++
                        getResult(blockHeight)
                    }, waitTime)
                } else {
                    resolve(result.length)
                }
            }
            else {
                setTimeout(() => {
                    blockHeight++
                    getResult(blockHeight)
                }, waitTime)
            }
        }
        getResult(blockHeight)
    })
}

module.exports.WaitForCrossShardBlockTransferCSTokenPrivacy = (shard, waitTime, shardID,blockHeight, tokenID, publicKey) => {
    return new Promise((resolve) => {
        var getResult = async (blockHeight) => {
            const crossShardResult = await shard.GetCrossShardBlock(shardID,blockHeight)
            if (crossShardResult.Error != null || crossShardResult.Response.Error != null) {
                setTimeout(() => {
                    getResult(blockHeight)
                }, waitTime)
            } else if (crossShardResult.Response.Result.HasCrossShard && crossShardResult.Response.Result.CrossShardCSTokenResult != null){
                let result = crossShardResult.Response.Result.CrossShardCSTokenResult.filter(x => x.TokenID === tokenID && x.IsPrivacy === true)[0]
                result = result.CrossShardPrivacyCSTokenResultList.filter(x => x.PublicKey === publicKey)
                if (result.length == 0){
                    setTimeout(() => {
                        blockHeight++
                        getResult(blockHeight)
                    }, waitTime)
                } else {
                    resolve(result.length)
                }
            }
            else {
                setTimeout(() => {
                    blockHeight++
                    getResult(blockHeight)
                }, waitTime)
            }
        }
        getResult(blockHeight)
    })
}

module.exports.WaitForResultTx = (shard, waitTime, txID) => {
    return new Promise((resolve) => {
        var getResult = async () => {
            tx = await shard.GetTransactionByHash(txID)
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
