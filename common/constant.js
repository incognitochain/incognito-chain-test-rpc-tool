const Beacon1Prk = "112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ"
const Beacon1PA = "1Uv2MXFL2PmuFa6zkF3sBh425jefEEm5Ed7ajgJVvrEZ2vpzUmUaKxgiuH7cugYbMexLtUcX3BQiXAB3L9ymU12rTj99EadXVxNc5yvHy"
const Beacon1PB = "15NmWBEbc8faj4QxHjBh1ugpkuBC8qaoRAp2mktKiwcKiaQgV8i"
const Beacon2Prk = "112t8rpdxySoXQJStHXoqTEnS9Mxtzibug2TE7dnrcLf4Xtt6MKNXrejqWrPFDvAKz7PigpanC4bh8Q86LgaRhvi6Q89qPSA2VHavT4kpsCq"
const Beacon2PA = "1Uv2WcMMkZTrX6kDebYeL9mYCpxV79aG3wG3BTHKKztTZgpT7KDUcy7m6QfjUC9v6mZEjbLXF2VBKNfbdChFEkcrGAknaGF4bj41kGqiH"
const Beacon2PB = "15cgoPsiZozeGZP2TgjrqgSihEsGBGvNqwvSFkAUQgzLJENhJrC"
const Shard1Prk = "112t8rqGc71CqjrDCuReGkphJ4uWHJmiaV7rVczqNhc33pzChmJRvikZNc3Dt5V7quhdzjWW9Z4BrB2BxdK5VtHzsG9JZdZ5M7yYYGidKKZV"
const Shard1PA = "1Uv3VB24eUszt5xqVfB87ninDu7H43gGxdjAUxs9j9JzisBJcJr7bAJpAhxBNvqe8KNjM5G9ieS1iC944YhPWKs3H2US2qSqTyyDNS4Ba"
const shard1PB = "177KNe6pRhi97hD9LqjUvGxLoNeKh9F5oSeh99V6Td2sQcm7qEu"
const NodePrk = "112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh"
const NodePA = "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ"
const NodePB = "18BRApfoGh91y3WdeK9BCW1utunNLVnRCAUFvsRpSWfmfoPzPqa"
const BurningPA = "1NHp16Y29xjc1PoXb1qwr65BfVVoHZuCbtTkVyucRzbeydgQHs2wPu5PC1hD"
const BurningPAError = 'Receiver Should be Burning Address'
const StakerPBError = 'Invalid Staker, This pubkey may staked already'
const StakeShardAmountError = 'Invalid Stake Shard Amount'
const StakeBeaconAmountError = 'Invalid Stake Beacon Amount'
const PrivacyError = 'Staking Transaction Is No Privacy Transaction'
const StakingTypeError = 'Invalid staking type'
module.exports = {
    Beacon1Prk: Beacon1Prk,
    Beacon1PA: Beacon1PA,
    Beacon1PB: Beacon1PB,
    Beacon2Prk: Beacon2Prk,
    Beacon2PA: Beacon2PA,
    Beacon2PB: Beacon2PB,
    Shard1Prk: Shard1Prk,
    Shard1PA: Shard1PA,
    shard1PB: shard1PB,
    NodePrk: NodePrk,
    NodePA: NodePA,
    NodePB: NodePB,
    BurningPA: BurningPA,
    BurningPAError: BurningPAError,
    StakerPBError: StakerPBError,
    StakeShardAmountError: StakeShardAmountError,
    StakeBeaconAmountError: StakeBeaconAmountError,
    PrivacyError: PrivacyError,
    StakingTypeError: StakingTypeError,
};