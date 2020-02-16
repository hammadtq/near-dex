import "regenerator-runtime/runtime";

import * as nearlib from "nearlib"
import getConfig from "./config"

let nearConfig = getConfig(process.env.NODE_ENV || "development");
window.nearConfig = nearConfig;

// Initializing contract
async function InitContract() {
    console.log('nearConfig', nearConfig);

    // Initializing connection to the NEAR DevNet.
    window.near = await nearlib.connect(Object.assign({ deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

    // Initializing Wallet based Account. It can work with NEAR DevNet wallet that
    // is hosted at https://wallet.nearprotocol.com
    window.walletAccount = new nearlib.WalletAccount(window.near);

    // Getting the Account ID. If unauthorized yet, it's just empty string.
    window.accountId = window.walletAccount.getAccountId();

    window.funTokenAccountId = "fun_token"

    // Initializing our contract APIs by contract name and configuration.
    window.contract = await near.loadContract(nearConfig.contractName, { // eslint-disable-line require-atomic-updates
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ['welcome'],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ['transfer_money'],
        // Sender is the account ID to initialize transactions.
        sender: window.accountId,
    });

    window.funTokencontract = await near.loadContract("fun_token2", { // eslint-disable-line require-atomic-updates
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ['welcome', 'get_total_supply', 'get_total_balance'],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ['new', "transfer_from"],
        // Sender is the account ID to initialize transactions.
        sender: window.accountId,
    });

    window.ethBTokencontract = await near.loadContract("ethb", { // eslint-disable-line require-atomic-updates
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ['welcome', 'get_total_supply', 'get_total_balance'],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ['new', "transfer_from"],
        // Sender is the account ID to initialize transactions.
        sender: window.accountId,
    });

    window.exchangecontract = await near.loadContract("exchange1", { // eslint-disable-line require-atomic-updates
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ['welcome', 'GetTrades'],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ['DepositEthB', "SetTrade"],
        // Sender is the account ID to initialize transactions.
        sender: window.accountId,
    });
}

// Using initialized contract
async function doWork() {
    // Based on whether you've authorized, checking which flow we should go.
    if (!window.walletAccount.isSignedIn()) {
        signedOutFlow();
    } else {
        signedInFlow();
    }
}

// Function that initializes the signIn button using WalletAccount
function signedOutFlow() {
    // Displaying the signed out flow container.
    document.getElementById('signed-out-flow').classList.remove('d-none');
    // Adding an event to a sing-in button.
    document.getElementById('sign-in-button').addEventListener('click', () => {
        window.walletAccount.requestSignIn(
            // The contract name that would be authorized to be called by the user's account.
            "",
            // This is the app name. It can be anything.
            'Welcome to NEAR'
        );
    });
}

// Main function for the signed-in flow (already authorized by the wallet).
function signedInFlow() {
    // Displaying the signed in flow container.
    document.getElementById('signed-in-flow').classList.remove('d-none');
    
    //window.contract.welcome({account_id:window.accountId}).then(response => document.getElementById('speech').innerText = response.text);
    //window.contract.transfer_money({account_id:"status_message",amount: 2000000000000000000}).then(response => document.getElementById('speech').innerText = "Done");
    
    //window.funTokencontract.new({owner_id:window.accountId,total_supply: "2000000000000"}).then(response => document.getElementById('speech').innerText = "Created new token");

    //window.ethBTokencontract.new({owner_id:window.accountId,total_supply: "2000000000000"}).then(response => document.getElementById('speech').innerText = "Created ETHB token");

    //window.funTokencontract.transfer_from({owner_id:window.accountId, new_owner_id:"cross_contract",amount:"2000"}).then(response => document.getElementById('speech').innerText = "Transferred token to new owner");
    
    //window.funTokencontract.get_total_balance({owner_id:window.accountId}).then(response => document.getElementById('speech').innerText = response);
    //window.exchangecontract.SetTrade({owner_id:window.accountId, price:1212, token_name:"FUN"}).then(response => document.getElementById('speech').innerText = "Sell order is set");
    // Adding an event to a sign-out button.
    document.getElementById('sign-out-button').addEventListener('click', () => {
        walletAccount.signOut();
        // Forcing redirect.
        window.location.replace(window.location.origin + window.location.pathname);
    });
}

window.getNearOrderBookBalance = function(){
    console.log('got balance')
    window.funTokencontract.get_total_balance({owner_id:window.accountId}).then(response => document.getElementById('token-balance').innerHTML = "Your FUN Balance:" +response);
}

window.getETHBBookBalance = function(){
    window.ethBTokencontract.get_total_balance({owner_id:window.accountId}).then(response => document.getElementById('ethb-balance').innerHTML = "Your ETHB Balance:" +response);
}

window.depositFunTokenBalance = function(amt){
    console.log("depositing fun Token"+amt);
   window.funTokencontract.transfer_from({owner_id:window.accountId, new_owner_id:"exchange1",amount:amt}).then(response => document.getElementById('speech').innerText = "Status: Transferred Fun token to Exchange");
}

window.depositETHBTokenBalance = function(amt){
    console.log("depositing ETHB");
   window.ethBTokencontract.transfer_from({owner_id:window.accountId, new_owner_id:"exchange1",amount:amt}).then(response => document.getElementById('speech').innerText = "Status: Transferred ETHB to Exchange");
}

window.setTrade = function(amt, tokenName){
    console.log("setting trade");
   window.exchangecontract.SetTrade({owner_id:window.accountId, price:parseInt(amt), token_name:tokenName+amt}).then(response => document.getElementById('speech').innerText = "Status: Trade order is set");
}

window.getTrades = function(){
    console.log("getting trades");
   window.exchangecontract.GetTrades({owner_id:window.accountId}).then(response => document.getElementById('orders').innerText = response);
}

// Loads nearlib and this contract into window scope.
window.nearInitPromise = InitContract()
    .then(doWork)
    .catch(console.error);