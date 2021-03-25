function dataCreate(e) {
    return (new Web3).utils.sha3(e).slice(0, 10)
}

function secondsToDhms(e) {
    e = Number(e);
    var t = Math.floor(e / 86400),
        r = Math.floor(e % 86400 / 3600),
        n = Math.floor(e % 3600 / 60),
        a = Math.floor(e % 60);
    return (t > 0 ? t + (1 == t ? " day, " : " days, ") : "") + (r > 0 ? r + (1 == r ? " hour, " : " hours, ") : "") + (n > 0 ? n + (1 == n ? " minute and " : " minutes and ") : "") + (a > 0 ? a + (1 == a ? " second" : " seconds") : "")
}

function toHex(e) {
    var t = e.toString(16);
    return "0".repeat(64 - t.length) + t
}

function myFloor(e, t) {
    let r = 10 ** t,
        n = e * r;
    return ((n = Math.floor(n)) / r).toFixed(t)
}

function toPad(e) {
    return "0".repeat(64 - e.length) + e
}
async function getTokenBalance(e, t, r, n) {
    new e.eth.Contract([{
        constant: !0,
        inputs: [{
            name: "_owner",
            type: "address"
        }],
        name: "balanceOf",
        outputs: [{
            name: "balance",
            type: "uint256"
        }],
        type: "function"
    }], r).methods.balanceOf(t).call().then(function(e) {
        n(e)
    })
}

function getJson(e, t) {
    var r = new XMLHttpRequest;
    r.open("GET", e, !0), r.responseType = "json", r.onload = function() {
        t(r.response)
    }, r.send()
}

function writeValue(e, t) {
    document.getElementById(e).innerHTML = t
}

function newTabLink(e, t) {
    return '<a href="' + t + '" target="_blank">' + e + "</a>"
}

function writeError(e) {
    writeValue(e, "<span style ='color: red;'><a style ='color: red' href=\"https://metamask.io/\" target=\"_blank\">Metamask</a> not detected.</span>")
}

function numberWithCommas(e) {
    return (e = e.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const WETHAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    stakerAddress = "0x4a959a64013a621da85243a4d760783ec6a09320", // staker
    poolAddress = "0xf69ac6702697a4ef6c34c0ef1f6094fcb8a70320", // uni token
    tokenAddress = "0x79a511D08fd49710d92bFb0bF9f3e8cF229Af344", // token
    day = 86400;
var myVars = [],
    myFuncs = [];

function storeVar(e, t) {
    myVars[e] = t, printTVL(), printAPY(), printUniStaked(), printRewardAmount(), printReferralEarned()
}

function someMissing(e, t) {
    if (null != myFuncs[e]) return !0;
    for (i = 0; i < t.length; i++)
        if (null == myVars[t[i]]) return !0;
    return null != myFuncs[e] || (myFuncs[e] = !0, !1)
}
async function loadValues() {
    let e = window.ethereum;
    if (void 0 === e) return void writeError("connectError");
    let t = (await e.enable())[0],
        r = new Web3;
    r.setProvider(e), myVars = [], myFuncs = [];
    let n = "https://apy.house/?r=" + t.substring(2);
    writeValue("referralLink", n = "<a href='" + n + "' target='_blank'>" + n + "</a>"), getJson("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd", function(e) {
        storeVar("ethPrice", e.ethereum.usd)
    }), getTokenBalance(r, poolAddress, WETHAddress, e => {
        storeVar("poolEthAmount", e / Math.pow(10, 18))
    });
    let a = [{
            inputs: [{
                internalType: "uint256",
                name: "ethTime",
                type: "uint256"
            }],
            name: "earnCalc",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function"
        }],
        o = new r.eth.Contract(a, stakerAddress);
    o.methods.earnCalc(315576e10).call().then(function(e) {
        storeVar("APY", e)
    }), a = [{
        inputs: [],
        name: "price",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }], (o = new r.eth.Contract(a, stakerAddress)).methods.price().call().then(function(e) {
        storeVar("hapyPrice", e / Math.pow(10, 18))
    }), a = [{
        inputs: [{
            internalType: "address",
            name: "who",
            type: "address"
        }],
        name: "viewLPTokenAmount",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }], (o = new r.eth.Contract(a, stakerAddress)).methods.viewLPTokenAmount(t).call().then(function(e) {
        storeVar("LPTokenAmount", e / Math.pow(10, 18))
    }), a = [{
        inputs: [{
            internalType: "address",
            name: "who",
            type: "address"
        }],
        name: "viewRewardTokenAmount",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }], (o = new r.eth.Contract(a, stakerAddress)).methods.viewRewardTokenAmount(t).call().then(function(e) {
        storeVar("rewardAmount", e / Math.pow(10, 18))
    }), a = [{
        inputs: [{
            internalType: "address",
            name: "who",
            type: "address"
        }],
        name: "viewPooledEthAmount",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }], (o = new r.eth.Contract(a, stakerAddress)).methods.viewPooledEthAmount(t).call().then(function(e) {
        storeVar("pooledEthAmount", e / Math.pow(10, 18))
    }), a = [{
        inputs: [{
            internalType: "address",
            name: "who",
            type: "address"
        }],
        name: "viewReferralEarned",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }], (o = new r.eth.Contract(a, stakerAddress)).methods.viewReferralEarned(t).call().then(function(e) {
        storeVar("referralEarned", e / Math.pow(10, 18))
    }), a = [{
        inputs: [{
            internalType: "address",
            name: "who",
            type: "address"
        }],
        name: "timePooled",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }], (o = new r.eth.Contract(a, stakerAddress)).methods.timePooled(t).call().then(function(e) {
        storeVar("timePooled", e)
    })
}

function printTVL() {
    if (someMissing("printTVL", ["ethPrice", "poolEthAmount"])) return;
    writeValue("TVL", "$" + numberWithCommas(myVars.ethPrice * (2 * myVars.poolEthAmount)))
}

function printAPY() {
    if (someMissing("printAPY", ["APY", "hapyPrice"])) return;
    let e = (myVars.hapyPrice * myVars.APY + 1e8) / 1e8;
    writeValue("APY", numberWithCommas(e = 100 * (e - 1)) + "%")
}

function printUniStaked() {
    if (someMissing("printUniStaked", ["LPTokenAmount", "pooledEthAmount", "ethPrice"])) return;
    let e = myFloor(myVars.LPTokenAmount, 8) + " ($" + numberWithCommas(2 * myVars.pooledEthAmount * myVars.ethPrice) + ")";
    writeValue("uniStaked", e), writeValue("uniStaked2", e)
}

function printRewardAmount() {
    if (someMissing("printRewardAmount", ["rewardAmount", "hapyPrice", "ethPrice"])) return;
    let e = myFloor(myVars.rewardAmount, 8) + " ($" + numberWithCommas(myVars.rewardAmount * myVars.hapyPrice * myVars.ethPrice) + ")";
    writeValue("rewardAmount", e), writeValue("rewardAmount2", e)
}

function printReferralEarned() {
    if (someMissing("printReferralEarned", ["ethPrice", "referralEarned", "hapyPrice"])) return;
    let e = myFloor(myVars.referralEarned, 8) + " ($" + numberWithCommas(myVars.referralEarned * myVars.ethPrice * myVars.hapyPrice) + ")";
    writeValue("referralEarned", e), writeValue("referralEarned2", e)
}
async function stakeToken() {
    document.getElementById("error").innerHTML = "";
    let e = document.getElementById("stakeInput").value;
    e = e.replace(",", ".");
    let t = parseFloat(e);
    if (t < .01) return void(document.getElementById("error").innerHTML = "Sorry, minimal stake amount is 0.01 ETH");
    if (t.isNaN) return void(document.getElementById("error").innerHTML = "Sorry, stake should not be empty");
    let r = window.ethereum;
    if (void 0 === r) return void writeError("stakeError");
    const n = window.location.search;
    let a = new URLSearchParams(n).get("r");
    null == a ? a = "0" : 40 != a.length && (a = "0");
    let o = (await r.enable())[0],
        i = new Web3;
    i.setProvider(r);
    let s = t,
        d = dataCreate("stake(address)") + toPad(a);
    i.eth.sendTransaction({
        from: o,
        to: stakerAddress,
        data: d,
        value: Math.round(1e18 * s)
    })
}
async function withdrawUni() {
    let e = window.ethereum;
    if (void 0 === e) return void writeError("withdrawError");
    let t = (await e.enable())[0],
        r = new Web3;
    r.setProvider(e);
    let n = document.getElementById("withdrawUni").value;
    if (parseInt(myVars.timePooled) + 3 * day > Math.floor(Date.now() / 1e3)) {
        writeValue("withdrawError", "Your lock period will be lifted in " + secondsToDhms(parseInt(myVars.timePooled) + 3 * day - Math.floor(Date.now() / 1e3)))
    }
    let a = dataCreate("withdrawLPTokens(uint256)") + toHex(Math.floor(1e18 * n));
    r.eth.sendTransaction({
        from: t,
        to: stakerAddress,
        data: a
    })
}
async function withdrawReward() {
    let e = window.ethereum;
    if (void 0 === e) return void writeError("withdrawError");
    let t = (await e.enable())[0],
        r = new Web3;
    r.setProvider(e);
    let n = document.getElementById("withdrawStaking").value;
    if (parseInt(myVars.timePooled) + 3 * day > Math.floor(Date.now() / 1e3)) {
        writeValue("withdrawError", "Your lock period will be lifted in " + secondsToDhms(parseInt(myVars.timePooled) + 3 * day - Math.floor(Date.now() / 1e3)))
    }
    let a = dataCreate("withdrawRewardTokens(uint256)") + toHex(Math.floor(1e18 * n));
    r.eth.sendTransaction({
        from: t,
        to: stakerAddress,
        data: a
    })
}
async function withdrawReferral() {
    let e = window.ethereum;
    if (void 0 === e) return void writeError("withdrawError");
    let t = (await e.enable())[0],
        r = new Web3;
    r.setProvider(e);
    let n = document.getElementById("withdrawReferral").value;
    if (0 == parseInt(myVars.timePooled) && parseFloat(myVars.referralEarned) > 0) return void writeValue("withdrawError", "You need to stake something before you can withdraw referral rewards.");
    if (parseInt(myVars.timePooled) + 3 * day > Math.floor(Date.now() / 1e3)) {
        writeValue("withdrawError", "Your lock period will be lifted in " + secondsToDhms(parseInt(myVars.timePooled) + 3 * day - Math.floor(Date.now() / 1e3)))
    }
    let a = dataCreate("withdrawReferralEarned(uint256)") + toHex(Math.floor(1e18 * n));
    r.eth.sendTransaction({
        from: t,
        to: stakerAddress,
        data: a
    })
}