const ConstantRPC = require('../constant-rpc/constant_rpc')

const { BeaconPrivKey, MinerS0Priv, MinerS1Priv, PrivKey_1, PrivKey_2 } = {
  BeaconPrivKey:
    '112t8ruLZgaV3ze37GRikKn8QVnrJDJ5C9Dhtou66vyeBfBDSJ6ZGRSg3k4qTwTjm14kgvwuFX3aAqeU64cGiixDh1ip4nvnmW7xHbSuXpwB',
  MinerS0Priv:
    '112t8rqJHgJp2TPpNpLNx34aWHB5VH5Pys3hVjjhhf9tctVeCNmX2zQLBqzHau6LpUbSV52kXtG2hRZsuYWkXWF5kw2v24RJq791fWmQxVqy',
  MinerS1Priv:
    '112t8rrEEcDQBMnUM5J17qniHZZmckmr8LGCv9nBjP9x5wmGFGUryKTNvEAf1jh2wwW69rxwtANq4m8JmzowfKVPayUHPmAKdwQw5718GKuH',

  PrivKey_1:
    '112t8rtTwTgp4QKJ7rP2p5TyqtFjKYxeFHCUumTwuH4NbCAk7g7H1MvH5eDKyy6N5wvT1FVVLoPrUzrAKKzJeHcCrc2BoSJfTvkDobVSmSZe',
  PrivKey_2:
    '112t8rsURTpYQMp3978j2nvYXTbuMa9H7MfLTA4PCJoxyweZNWRR3beMEtsoLBBbc473Bv8NE3uKUXcVA2Jnh6sPhTEnFfmQEpY8opeFytoM'
}

const { Address_1, MinerS0Pub,MinerS1Pub } = {
  MinerS0Pub:
    '1Uv46Pu4pqBvxCcPw7MXhHfiAD5Rmi2xgEE7XB6eQurFAt4vSYvfyGn3uMMB1xnXDq9nRTPeiAZv5gRFCBDroRNsXJF1sxPSjNQtivuHk',
  MinerS1Pub:
    '1Uv2Y7UHWdnJUiDzzkHiAL3Bb5xYYSwConh2dcH7qmPrYGu567Pojnpz4ehfcJEZ5hgFYAhbnZNq4MXJxTwTp6eCx9rHVicU54AfDkg5x',
  Address_1:
    '1Uv34F64ktQkX1eyd6YEG8KTENV8W5w48LRsi6oqqxVm65uvcKxEAzL2dp5DDJTqAQA7HANfQ1enKXCh2EvVdvBftko6GtGnjSZ1KqJhi'
}

const shard = new ConstantRPC('127.0.0.1', 10337)

function createSendParam (sendParams, address, amount) {
  let tmp = {}
  tmp[address] = amount
  return Object.assign(sendParams || {}, tmp)
}

!(async function () {
  try {
    async function print () {
      let res = await shard.GetBalanceByPrivatekey(MinerS0Priv)
      console.log('shard 0 balance', res)
      res = await shard.GetBalanceByPrivatekey(MinerS1Priv)
      console.log('shard 1 balance', res)
      res = await shard.GetBalanceByPrivatekey(PrivKey_1)
      console.log('acc 1  balance', res)
      res = await shard.GetBeaconBestState()
      console.log('Committee', res.ShardCommittee)
      
    }

    print()
    // let res = await shard.CreateAndSendTransaction(
    //   PrivKey_1,
    //   createSendParam({}, MinerS0Pub, 1000),
    //   10,
    //   0
    // )
    // console.log(res)
    
    // res = await shard.CreateAndSendTransaction(
    //   PrivKey_1,
    //   createSendParam({}, MinerS1Pub, 1000),
    //   10,
    //   0
    // )
    // console.log(res)



    // let res = await shard.CreateAndSendStakingTransaction(PrivKey_1,{"1NHp2EKw7ALdXUzBfoRJvKrBBM9nkejyDcHVPvUjDcWRyG22dHHyiBKQGL1c":100}, 10,0, 63)
    // console.log(res)

    // let res = await shard.CreateAndSendStakingTransaction(MinerS1Priv,{"1NHp2EKw7ALdXUzBfoRJvKrBBM9nkejyDcHVPvUjDcWRyG22dHHyiBKQGL1c":100}, 10,0, 63)
    // console.log(res)

    // let res = await shard.CreateAndSendStakingTransaction(MinerS0Priv,{"1NHp2EKw7ALdXUzBfoRJvKrBBM9nkejyDcHVPvUjDcWRyG22dHHyiBKQGL1c":100}, 10,0, 63)
    // console.log(res)

  } catch (err) {
    console.log(err.stack)
  }
})()
