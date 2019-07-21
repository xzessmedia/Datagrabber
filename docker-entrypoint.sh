#!/bin/sh

# Add your crontabs here, copy example line and change target to your own ones
echo "$(echo '* 1 * * * node /datagrabber/index.js --target=https://www.spiegel.de/schlagzeilen/index.rss' ; crontab -l)" | crontab 
