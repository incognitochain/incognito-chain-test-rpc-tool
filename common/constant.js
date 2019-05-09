const Beacon1Prk = "112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ"
const Beacon1PA = "1Uv2MXFL2PmuFa6zkF3sBh425jefEEm5Ed7ajgJVvrEZ2vpzUmUaKxgiuH7cugYbMexLtUcX3BQiXAB3L9ymU12rTj99EadXVxNc5yvHy"
const Beacon1PB = "15NmWBEbc8faj4QxHjBh1ugpkuBC8qaoRAp2mktKiwcKiaQgV8i"
const Beacon2Prk = "112t8rpdxySoXQJStHXoqTEnS9Mxtzibug2TE7dnrcLf4Xtt6MKNXrejqWrPFDvAKz7PigpanC4bh8Q86LgaRhvi6Q89qPSA2VHavT4kpsCq"
const Beacon2PA = "1Uv2WcMMkZTrX6kDebYeL9mYCpxV79aG3wG3BTHKKztTZgpT7KDUcy7m6QfjUC9v6mZEjbLXF2VBKNfbdChFEkcrGAknaGF4bj41kGqiH"
const Beacon2PB = "15cgoPsiZozeGZP2TgjrqgSihEsGBGvNqwvSFkAUQgzLJENhJrC"
const Shard0_0Prk = "112t8rsURTpYQMp3978j2nvYXTbuMa9H7MfLTA4PCJoxyweZNWRR3beMEtsoLBBbc473Bv8NE3uKUXcVA2Jnh6sPhTEnFfmQEpY8opeFytoM"
const Shard0_0PA = "1Uv34F64ktQkX1eyd6YEG8KTENV8W5w48LRsi6oqqxVm65uvcKxEAzL2dp5DDJTqAQA7HANfQ1enKXCh2EvVdvBftko6GtGnjSZ1KqJhi"
const shard0_0PB = "16T8q1ysZitUgSknnYD2WLTyRkr7vntAEmtWV6sXFxyG21sTJ11"
const Shard0_1Prk = "112t8rtTwTgp4QKJ7rP2p5TyqtFjKYxeFHCUumTwuH4NbCAk7g7H1MvH5eDKyy6N5wvT1FVVLoPrUzrAKKzJeHcCrc2BoSJfTvkDobVSmSZe"
const Shard0_1PA = "1Uv4APZadR2kbpm4Uazwng2hwfqb2AtuV6Y6QVcypzQurzwE9YvUzTA8TWVndLJxtuAytWPey57YiU97abmSJ7nnPxnDdsjGcXUAiiE6t"
const shard0_1PB = "189NzoXMQznioWS2tZgxKKPhaiJBag1TcLsMMhBRxFH7Re11c8V"
const Shard1_0Prk = "112t8rsq5Xx45T1ZKH4N45aBztqBJiDAR9Nw5wMb8Fe5PnFCqDiUAgVzoMr3xBznNJTfu2CSW3HC6M9rGHxTyUzUBbZHjv6wCMnucDDKbHT4"
const Shard1_0PA = "1Uv2a28jG2K7FwQHncLqMAmDUp7Ubpg1B6ybxUFnXkeJVxNHC3r9hTxQMmeaYdiDxTQrReBisvQ6Y5VyYxbxPLjmy1RPf2MjFTAvZCj8H"
const shard1_0PB = "15huicDWEWaWu4AiuXVnJZPaqqf5hAj41HVv3NVDwu8PtRHeH8c"
const Shard1_1Prk = "112t8rrEgLjxmpzQTh3i2SFxxV27WntXpAkoe9JbseqFvDBPpaPaudzJWXFctZorJXtivEXv1nPzggnmNfNDyj9d5PKh5S4N3UTs6fHBWgeo"
const Shard1_1PA = "1Uv2EU6NsL8bAhv286ZKQKpxVbbLbYmAAio9RfVUvf7b7pNV8EYxe9GkCQbcNAamYJiYeqxSPMhVUgxwy8R5mxP2PHW8CBTQfLYYEL5tH"
const shard1_1PB = "15BxrZ4ajB57fUxbX5wT8m4CRsPqP5pABDcGGfhh5LH7afoPED7"
const NodePrk = "112t8rtTwTgp4QKJ7rP2p5TyqtFjKYxeFHCUumTwuH4NbCAk7g7H1MvH5eDKyy6N5wvT1FVVLoPrUzrAKKzJeHcCrc2BoSJfTvkDobVSmSZe"
const NodePA = "1Uv4APZadR2kbpm4Uazwng2hwfqb2AtuV6Y6QVcypzQurzwE9YvUzTA8TWVndLJxtuAytWPey57YiU97abmSJ7nnPxnDdsjGcXUAiiE6t"
const NodePB = "189NzoXMQznioWS2tZgxKKPhaiJBag1TcLsMMhBRxFH7Re11c8V"
const BurningPA = "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD"
const BurningPAError = 'Receiver Should be Burning Address'
const StakerPBError = 'Invalid Staker, This pubkey may staked already'
const StakeShardAmountError = 'Invalid Stake Shard Amount'
const StakeBeaconAmountError = 'Invalid Stake Beacon Amount'
const PrivacyError = 'Staking Transaction Is No Privacy Transaction'
const StakingTypeError = 'Invalid staking type'
const DuplicateStakeError = 'Reject Duplicate Stake Error'
module.exports = {
    Beacon1Prk: Beacon1Prk,
    Beacon1PA: Beacon1PA,
    Beacon1PB: Beacon1PB,
    Beacon2Prk: Beacon2Prk,
    Beacon2PA: Beacon2PA,
    Beacon2PB: Beacon2PB,
    Shard0_0Prk: Shard0_0Prk,
    Shard0_0PA: Shard0_0PA,
    shard0_0PB: shard0_0PB,
    Shard0_1Prk: Shard0_1Prk,
    Shard0_1PA: Shard0_1PA,
    shard0_1PB: shard0_1PB,
    Shard1_0Prk: Shard1_0Prk,
    Shard1_0PA: Shard1_0PA,
    shard1_0PB: shard1_0PB,
    Shard1_1Prk: Shard1_1Prk,
    Shard1_1PA: Shard1_1PA,
    shard1_1PB: shard1_1PB,
    BurningPA: BurningPA,
    BurningPAError: BurningPAError,
    StakerPBError: StakerPBError,
    StakeShardAmountError: StakeShardAmountError,
    StakeBeaconAmountError: StakeBeaconAmountError,
    PrivacyError: PrivacyError,
    StakingTypeError: StakingTypeError,
    DuplicateStakeError: DuplicateStakeError,
};

module.exports.GetRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}