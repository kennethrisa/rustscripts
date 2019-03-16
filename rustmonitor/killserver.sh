# Script to kill rust process
SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
serverport=28015
discordurl="https://discordapp.com/api/webhooks/"

PID=`ps -eaf | grep $serverport | grep -v grep | awk '{print $2}'`

if [ "$PID" ]; then
  echo "killing $PID"
  kill -9 $PID
  curl -X POST --data '{ "embeds": [{"title": "Rust-Monitor", "color": "3406737", "description": "Server script restarting server - please do not try to restart server, it can take up to 5-6 min from now before server is up."}] }' -H "Content-Type: application/json" ${discordurl}
else
  echo "Proccess not running"
  curl -X POST --data '{ "embeds": [{"title": "Rust-Monitor", "color": "10027008", "description": "Server rust process is not running - Check ASAP!"}] }' -H "Content-Type: application/json" ${discordurl}
fi
