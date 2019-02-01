const request = require('request');
const fs = require('fs');
const readline = require('readline');
const random = require('./random');
const rl = readline.createInterface(process.stdin, process.stdout);
// START settings
var username = "";
var avatar_url = "";
var tts = true;
const interval = 1500;
// END settings
var webhooks = [];
var quotes = [];
var attackNumber = 0;
consoleLog("=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-* BlackOfWorld's raid bot *-=*-=*-=*-=*-=*-=*-=*-=*-=*-=*-=*-=*-=*-=*-=")
rl.question("Start webhook raid bot? [Y/N]\n", function(answer) {
    var answerLower = answer.toLowerCase();
    if (answer === "no" || answer === "n") {
        consoleLog("Ok! Exiting....");
        process.exit()
    } else {
        consoleLog("Raid bot starting....");
        RaidMain();
    }
});

function LoadQuotes() {
    consoleLog("Loading quotes.txt .....");
    quotes = fs.readFileSync("quotes.txt", "utf8").toString().split("\r\n");
    consoleLog("Finished loading quotes.txt!")
}

function LoadCannons() {
    consoleLog("Loading webhooks.txt .....");
    webhooks = fs.readFileSync("webhooks.txt", "utf8").toString().split("\r\n");
    consoleLog("Finished loading webhooks.txt!")
}

function consoleLog(string) {
    process.stdout.write(`${string}\n`);
}

function FireCannon(cannonUrl, content) {
    ++attackNumber;
    consoleLog(`[${attackNumber}]Sending '${content}'...`);
    request.post(
        cannonUrl, {
            json: {
                "content": content,
                "username": username,
                "avatar_url": avatar_url,
                "tts": tts
            }
        },
        function(error, response, body) {
            // if (error == undefined && response.statusCode == 204)
                // consoleLog(`[${attackNumber}]Message sent!`);
            // else
                // consoleLog(`[${attackNumber}]Could not be send the message (${response.statusCode})!`);
        }
    );
}

function FireCannonThread(cannonStr, webhookId) {
    consoleLog(`Cannon ${webhookId + 1} ready.`)
    setInterval(() => {
        var webhook = cannonStr;
        var content = quotes.random();
        FireCannon(webhook, content)
    }, interval);
}

function FireCannons() {
    for (var i = 0; i < webhooks.length; i++)
        FireCannonThread(webhooks[i], i);
}

function RaidMain() {
    LoadQuotes();
    LoadCannons();
    FireCannons();
    consoleLog("Raid bot started!");
}