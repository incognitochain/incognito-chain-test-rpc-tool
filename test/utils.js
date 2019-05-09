var utils = {}

utils.transfer = async function(noderpc, from, to, value, {fee = 10, privacy = 0} = {} ){    
    let res = await noderpc.CreateAndSendTransaction(
      from,
      createSendParam({}, to, value),
      fee ,
      privacy
    )
    return res
}

exports = module.exports = utils