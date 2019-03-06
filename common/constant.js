const Beacon1Prk = "112t8rxTdWfGCtgWvAMHnnEw9vN3R1D7YgD1SSHjAnVGL82HCrMq9yyXrHv3kB4gr84cejnMZRQ973RyHhq2G3MksoTWejNKdSWoQYDFf4gQ"
const Beacon1PA = "1Uv2MXFL2PmuFa6zkF3sBh425jefEEm5Ed7ajgJVvrEZ2vpzUmUaKxgiuH7cugYbMexLtUcX3BQiXAB3L9ymU12rTj99EadXVxNc5yvHy"
const Beacon1PB = "15NmWBEbc8faj4QxHjBh1ugpkuBC8qaoRAp2mktKiwcKiaQgV8i"
const Beacon2Prk = "112t8rpdxySoXQJStHXoqTEnS9Mxtzibug2TE7dnrcLf4Xtt6MKNXrejqWrPFDvAKz7PigpanC4bh8Q86LgaRhvi6Q89qPSA2VHavT4kpsCq"
const Beacon2PA = "1Uv2WcMMkZTrX6kDebYeL9mYCpxV79aG3wG3BTHKKztTZgpT7KDUcy7m6QfjUC9v6mZEjbLXF2VBKNfbdChFEkcrGAknaGF4bj41kGqiH"
const Beacon2PB = "15cgoPsiZozeGZP2TgjrqgSihEsGBGvNqwvSFkAUQgzLJENhJrC"
const Shard0_1Prk = "112t8rqGc71CqjrDCuReGkphJ4uWHJmiaV7rVczqNhc33pzChmJRvikZNc3Dt5V7quhdzjWW9Z4BrB2BxdK5VtHzsG9JZdZ5M7yYYGidKKZV"
const Shard0_1PA = "1Uv3VB24eUszt5xqVfB87ninDu7H43gGxdjAUxs9j9JzisBJcJr7bAJpAhxBNvqe8KNjM5G9ieS1iC944YhPWKs3H2US2qSqTyyDNS4Ba"
const shard0_1PB = "177KNe6pRhi97hD9LqjUvGxLoNeKh9F5oSeh99V6Td2sQcm7qEu"
const Shard1_0Prk = "112t8roj4ZNc3mjUiAGoCwsrueBRiwYqE1URbUrJpBReRDZ5CDubBDUZtfN3Hxht3KtCFVNie1vsdWTPpTe3ydKHnnCvface41feiEahxJgd"
const Shard1_0PA = "1Uv25dvj8HnfGNYAcY9c1wg5uJ2XoZe3MCUv3MBrbTS15tykLL1i3r1ko7VLv5zhB9acCs5JS7U4X9tKexbneumEje6o9rHZqVeihxZW7"
const shard1_0PB = "14xSSFpFYxm26oq2z8uvcQHZWS8BbnjamoQWnX9Yb3MCDeHsroN"
const Shard1_1Prk = "112t8s2UkZEwS7JtqLHFruRrh4Drj53UzH4A6DrairctKutxVb8Vw2DMzxCReYsAZkXi9ycaSNRHEcB7TJaTwPhyPvqRzu5NnUgTMN9AEKwo"
const Shard1_1PA = "1Uv36DEGA9Z91eMhNYHUCFg3dimqVhcVvArrjtS8QSxXQvfb52Hdk8hsQHoX2FPFUXH29uCgkSQkXko8mZ3KdKgbxPm7PKnoEx5p2cAFb"
const shard1_1PB = "16W9eKEqyJqKKDkzxcSAKu4G2b1HvZh9FDRmM3ZyC4tN3MkVx6z"
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
const DuplicateStakeError = 'Reject Duplicate Stake Error'
module.exports = {
    Beacon1Prk: Beacon1Prk,
    Beacon1PA: Beacon1PA,
    Beacon1PB: Beacon1PB,
    Beacon2Prk: Beacon2Prk,
    Beacon2PA: Beacon2PA,
    Beacon2PB: Beacon2PB,
    Shard0_0Prk: Shard0_1Prk,
    Shard0_0PA: Shard0_1PA,
    shard0_0PB: shard0_1PB,
    Shard0_1Prk: NodePrk,
    Shard0_1PA: NodePA,
    shard0_1PB: NodePB,
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