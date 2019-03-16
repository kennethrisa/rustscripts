#!/usr/bin/env node
const shell = require('shelljs');
var SourceQuery = require('sourcequery');
const Webhook = require("webhook-discord")
var sq = new SourceQuery(1000); // 1000ms timeout

// Variables:
const server = "x.x.x.x";
const port = "28015";
const discordwebhook = "https://discordapp.com/api/webhooks/";
const discordbotname = "Rust-Monitor";
const killserverscript = '/home/rust/serverfiles/rustmonitor/killserver.sh';

const Hook = new Webhook.Webhook(discordwebhook)

function close() {
sq.close(function(){
        console.log('Socket closed.');
});
}

function exitNode() {
    process.exit()
}

function sendWar() {
    Hook.err(discordbotname,"Over 200 timeouts, waiting a few minutes before a forced restart")
}

function sendErr() {
    Hook.err(discordbotname,"Cannot connect to server")
}


var counter = 1;
var myFunction = function() {
    counter += 1;
    sq.getInfo(function(err, info){
    if (!err) {
        console.log("Connection success!");
        return setTimeout(exitNode, 1000);
    }
    else {
        console.log(err);
    }
    });
    if (counter == 200){
        console.log("Too Many timeouts - sending to discord");
        sendWar();
    }
    if (counter > 10){
        shell.exec(killserverscript)
        console.log("Stopping - max time exeeded - killing process");
        setTimeout(exitNode, 1000);
    }
    setTimeout(myFunction, 1000);
}

sq.open(server, port);
setTimeout(myFunction, 2000);
