## Rust monitor script for linux server

Checks if server respond to game port, else kill the process and send msg to discord

## Install:

npm install

## Edit monitor.js

Edit variables:
server (ip or domain),
port (server port),
discordwebhook (discord webhook url),
discordbotname
killserverscript (Path to the killserver script)

## Edit killserver.sh
serverport and discordurl

chmod 700 killserver.sh

## Start:

npm start

## crontab

Run script every 10 min
```
*/10 * * * * /usr/bin/env node /home/rust/rustmonitor/monitor.js > /dev/null 2>&1
```