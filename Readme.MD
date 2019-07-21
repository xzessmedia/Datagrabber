## Datagrabber

This is a simple datagrabber container for collecting data for analytic purposes

#### Requirements
You'll need:

-  docker
-  docker-compose
-  git
-  npmjs
-  nodejs

#### Installation
Run `npm install` in root directory

#### How to
After you've installed the repository you need to edit `docker-entrypoint.sh`
Add all your target sites there.
The entrypoint will add all targets as cronjobs

Then you'll need to build the container

Run `docker-compose build` and then `docker-compose up -d`


#### Output Data
When you output data, you'll need to unescape the 'Sourcecode' column.
This section will be continued soon