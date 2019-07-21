#!/bin/sh
echo Launching Datagrabber Instance
cd / && mkdir logs
touch /logs/server.log
node /datagrabber/index.js | tee /logs/server.log