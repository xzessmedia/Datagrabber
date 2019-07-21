## Datagrabber

This is a simple datagrabber container for collecting data for analytic purposes

#### Requirements
You'll need:

-  docker
-  docker-compose
-  git
-  npmjs
-  nodejs

### Installation
Run `npm install` in root directory

### How to
After you've installed the repository you need to edit `docker-entrypoint.sh`
Add all your target sites there.
The entrypoint will add all targets as cronjobs

Then you'll need to build the container

Run `docker-compose build` and then `docker-compose up -d`

If you do any code changes you have to rebuild with
`npm run-script build`
and after that rebuild the container
`docker-compose build`

If you want to add more Targets later, you have to exec into the container..
`docker exec -it <containername> bash`
and then add more crons with
`crontab -e`

You can also see help file for the Datagrabber with
`node /datagrabber/index.js -h`

### Output Data
When you output data, you'll need to unescape the 'Sourcecode' column.
This section will be continued soon and a Data Extractor Script will be added
which generates Data to the Docker Volume (coming soon)