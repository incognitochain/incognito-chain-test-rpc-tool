const ConstantRPC = require('../constant-rpc/constant_rpc')

// const privateKey1 = "112t8rqGc71CqjrDCuReGkphJ4uWHJmiaV7rVczqNhc33pzChmJRvikZNc3Dt5V7quhdzjWW9Z4BrB2BxdK5VtHzsG9JZdZ5M7yYYGidKKZV";
// const paymenAddress1 = "1Uv3VB24eUszt5xqVfB87ninDu7H43gGxdjAUxs9j9JzisBJcJr7bAJpAhxBNvqe8KNjM5G9ieS1iC944YhPWKs3H2US2qSqTyyDNS4Ba";
const privateKey1 = "112t8rqnMrtPkJ4YWzXfG82pd9vCe2jvWGxqwniPM5y4hnimki6LcVNfXxN911ViJS8arTozjH4rTpfaGo5i1KKcG1ayjiMsa4E3nABGAqQh";
const paymenAddress1 = "1Uv4BiijnksfTmfisTkgdx8762MFunrad2RZvpd3vPnWHYqQbiPthM7psaMzVi35Fmj8z6vtqPYs9avjJF6Zbsq7gdZ2nJBwkRgnT7bFJ";

const privateKey2 = "112t8rnXxR8GDWhm5Shn8GAaCHFNLXyFpz4Ln8wCcDCkmnJLNU4msYvCaXShxcp2mEoUxyVpGcyYtk2JzntZFZ4DNpwAc7QVif6r2oeLj2Qo";
const paymenAddress2 = "1Uv3VL7CE2iE7AFjYmYFSTc3v5oYFwWuVtGtLUvAbxGgxsgVoQVNAX5jt8UA6k87gDP3YyQtLfhr95bBaDG7PRTsyHPk3jqs2bt9UanSV";

const privateKey3 = "112t8rnYBW9trs5rzxrMzLU5AnzngQhbp6X4c3xyamFkWU7PwWRq6gprDkm6mf3ZjxaeYQmSpe3xorpWHo3JLLZFHCHSgqd8u19XkVuMGz1M";
const paymenAddress3 = "1Uv2q736Pjyr3Y37uyHj3qZmHgnnHpcojpez5PE7cMwwBi4w1LpK3ZXdGpgvLgchMLkb3gkZmVyKfKmeMfhWkcHrtzTYcDHRsRLenyDmC";

async function SendBalanceFlow(senderKey, receiverObjects = {}) {
    
    const spentValue = 5;
    const node = new ConstantRPC();
    
    if (node == undefined || node == null) {
        return
    }

    const balance_1_before = await node.GetBalanceByPrivatekey(privateKey1);
    const balance_2_before = await node.GetBalanceByPrivatekey(privateKey2);

    const blockCount1 = await node.GetBlockCount(0);
    const sendTxResult = await node.CreateAndSendTransaction(privateKey1,{"1Uv3VL7CE2iE7AFjYmYFSTc3v5oYFwWuVtGtLUvAbxGgxsgVoQVNAX5jt8UA6k87gDP3YyQtLfhr95bBaDG7PRTsyHPk3jqs2bt9UanSV":spentValue},100,1) || {};

    console.log("con co", sendTxResult);
    let {TxID=""} = sendTxResult;
    if (TxID == "") {
        console.log("send Tx failed");
        return 
    }

    let ws = async (s) => new Promise(function(resolve, reject) {
        setTimeout(function(){
        console.log("timeout")
        resolve()
        }, s*1000)
    })
    // await ws(5);
    while (true) {
        let blockCount2 = await node.GetBlockCount(0);
        if (blockCount2 > blockCount1) {
        console.log(blockCount2);
        break;
        };
        await ws(1);
    }
    
    const txResult = await node.GetTransactionByHash(TxID) || {};
    console.log("con heo", txResult);
    let {BlockHash=""} = txResult;
    if (BlockHash == "") {
        console.log("get transaction detail info failed");
        return;
    }

    const generatedBlock = await node.RetrieveBlock(BlockHash, "1") || {};
    const {Hash="", Height} = generatedBlock;
    if (Hash == "" ){
        console.log( "get generated block failed");
        return
    } 
    console.log("generated block: ",generatedBlock)

    const balance_1_after = await node.GetBalanceByPrivatekey(privateKey1);
    const balance_2_after = await node.GetBalanceByPrivatekey(privateKey2);

    console.log("balance 1 before",balance_1_before)
    console.log("balance 2 before",balance_2_before)

    console.log("after transfer ------------ :", spentValue)

    console.log("balance 1 after",balance_1_after)
    console.log("balance 2 after",balance_2_after)
    
    if (balance_1_after === balance_1_before - spentValue && balance_2_after === balance_2_before+spentValue) {
        console.log("FLOW SUCCESS!");
        return 1;
    }
    
    console.log("FLOW FAILED!");
    return
    
}


!(async function () {
    
    await SendBalanceFlow();
})()