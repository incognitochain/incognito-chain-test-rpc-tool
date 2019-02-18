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
    // console.log("hahahahaha",senderKey, receiverObjects);
    const node = new ConstantRPC();
    
    if (node == undefined || node == null) {
        return
    }

    if (Object.keys(receiverObjects).length <= 0) {
        return
    }
    let paymentList = {};
    let balance_receivers_before = {};
    let totalPay = 0
    for (let k in receiverObjects) {
        const {paymentAddress, value} = receiverObjects[k];
        paymentList[paymentAddress] = value;
        totalPay+=value;
        balance_receivers_before[k] = await node.GetBalanceByPrivatekey(k); 
    }
    const balance_sender_before = await node.GetBalanceByPrivatekey(senderKey); 

    const blockCount1 = await node.GetBlockCount(0);
    // console.log("hahahahaha", paymentList)
    const sendTxResult = await node.CreateAndSendTransaction(senderKey,paymentList,100,1) || {};

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

    const balance_sender_after = await node.GetBalanceByPrivatekey(senderKey);
    let balance_receivers_after = {};

    for (let k in receiverObjects) {
        balance_receivers_after[k] = await node.GetBalanceByPrivatekey(k); 
    }

    console.log("balance sender before",balance_sender_before)
    console.log("balance receivers before",balance_receivers_before)

    console.log("after transfer ------------ :", totalPay)

    console.log("balance sender after",balance_sender_after)
    console.log("balance receivers after",balance_receivers_after)
    
    let success = true;
    if (balance_sender_before !== balance_sender_after + totalPay) {
        success = false;
    }

    for (let k in receiverObjects) {
        let {value} = receiverObjects[k];
        let receiverBefore = balance_receivers_before[k]
        let receiverAfter = balance_receivers_after[k]

        if (receiverAfter != receiverBefore+value) {
            success = false;
        }
    }
    
    
    if (success) {
        console.log("FLOW SUCCESS!");
        return 1;
    }
    
    console.log("FLOW FAILED!");
    return
    
}


!(async function () {
    // // CASE 1: SEND FROM 1 ACC TO 1  ACC
    // let paymentList1 = {};
    // paymentList1[privateKey2] = {
    //     paymentAddress: paymenAddress2,
    //     value: 5,
    // }
    // await SendBalanceFlow(privateKey1, paymentList1);

    // CASE 2: SEND FROM 1 ACC TO 2  ACC
    let paymentList2 = {};
    paymentList2[privateKey2] = {
        paymentAddress: paymenAddress2,
        value: 10,
    }
    paymentList2[privateKey3] = {
        paymentAddress: paymenAddress3,
        value: 5,
    }
    await SendBalanceFlow(privateKey1, paymentList2);
    console.log("FINISH SEND TO 2 ACCOUNT")
    console.log("START SEND FROM 1 TO 2")
    let paymentList3 = {};
    paymentList3[privateKey3] = {
        paymentAddress: paymenAddress3,
        value: 5,
    }
    await SendBalanceFlow(privateKey2, paymentList3);

    console.log("START SEND FROM 1 TO 2 OUT OF MONEY")
    let paymentList4 = {};
    paymentList4[privateKey3] = {
        paymentAddress: paymenAddress3,
        value: 50,
    }
    await SendBalanceFlow(privateKey2, paymentList4);
    console.log("DONE")
})()