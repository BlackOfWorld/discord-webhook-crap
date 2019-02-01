const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
// START settings
var username = "";
var avatar_url = "";
var tts = true;
var webhook_url = "";
// END settings
process.stdout.write('\033c');
console.log('');
console.log('');
console.log('');
consoleLog("=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-*=-* BlackOfWorld's interactive webhook *-=*-=*-=*-=*-=*-=*-=*-=*-=*-=*-=*-=*-=*-=")

function consoleLog(string) {
    process.stdout.write(`${string}\n`);
}

function doChat() {
    rl.setPrompt('chat> ');
    rl.prompt();
    rl.on('line', function(line) {
        if (line === "exit") rl.close();
        request.post(
            webhook_url, {
                json: {
                    "content": line,
                    "username": username,
                    "avatar_url": avatar_url,
                    "tts": tts
                }
            },
            function(error, response, body) {
                if (!error && response.statusCode == 204) {
					rl.prompt();
				}
                else {
                    consoleLog(`Could not be send the message (${response.statusCode})!`);
					process.exit(0);
				}
            }
        );
    }).on('close', function() {
        process.exit(0);
    });
}
rl.question('Enter webhook URL: ', (answer) => {
    console.log('Your webhook URL is now:', answer);
    webhook_url = answer;
    rl.question('Enter username: ', (answer) => {
        console.log('Your username is now:', answer);
        username = answer;
        rl.question('Enter avatar URL: ', (answer) => {
            console.log('Your avatar URL is now:', answer);
            avatar_url = answer;
            rl.question('Send messages as TTS? ', (answer) => {
                if (answer == "yes") {
                    console.log('Ok, I will be sending TTS messages');
                    tts = true;
                } else {
                    console.log('Ok, I won\'t be sending TTS messages');
                    tts = false;
                }
                doChat();
            });
        });
    });
});