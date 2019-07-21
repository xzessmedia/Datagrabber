/*
 * @Author: Tim Koepsel 
 * @Date: 2019-07-21 16:55:53 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-07-22 01:37:09
 */

import * as config from "./config.json";
import * as yargs from 'yargs';
import * as rp from "request-promise";
import CoreData from "./dbmysql";
import { Debug } from "./debug";

 export default class Datagrabber {
     private pool: any;
     private argv: any;
     
     constructor() {

        this.argv = yargs
        .command('target', 'Tells which site to grab', {
            site: {
                description: 'the site to clone',
                alias: 't'
            }
        })
        .command('outputall', 'Output all from database', {
            site: {
                description: 'output entries',
                alias: 'outall'
            }
        })
        .command('output', 'Output from database', {
            site: {
                description: 'output entry',
                alias: 'o'
            }
        })
        .option('quiet', {
            alias: 'q',
            description: 'Tells the program to be quiet'
        })
        .option('follow', {
            alias: 'f',
            description: 'Follow the links'
        })
        .help()
        .alias('help', 'h')
        .argv;

     }


     Execute() {
         if (this.argv.target) {
            this.Install();
            this.GrabSite(this.argv.target);
         }
         if(this.argv.outputall) {
            this.OutputAll(this.argv.outputall);
         }
         if(this.argv.output) {
            this.Output(this.argv.output);
         }
     }

    
     async Install() {
        await this.InstallDB();
        await this.InstallTable();
     }

     async InstallDB() {
        return await CoreData.QueryAsync('CREATE DATABASE IF NOT EXISTS `datagrabber`;');
     }

     async InstallTable() {
        return await CoreData.QueryAsync(`
        CREATE TABLE IF NOT EXISTS \`datagrab\` (
            \`Id\` int(11) NOT NULL AUTO_INCREMENT,
            \`CreatedAt\` datetime DEFAULT NULL,
            \`SourceUrl\` varchar(255) DEFAULT NULL,
            \`Sourcecode\` longtext DEFAULT NULL,
            PRIMARY KEY (\`Id\`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`);
     }

     static async SaveSource(site:string,  source:string) {
        console.log('Saving Source: '+JSON.stringify(site));

        var result = await CoreData.QueryAsync(`INSERT INTO datagrab (CreatedAt, SourceUrl, Sourcecode) VALUES ('${new Date().toISOString().slice(0, 19).replace('T', ' ')}','${site}', '${escape(source)}');`);
        if (result) {
            Debug('Object saved...');
            process.exit();
        }
     }

     async Output(id: number) {
         var data = await CoreData.Query(`SELECT * from datagrab where Id=${id}`);
         if (data !== undefined) {
             data.forEach(element => {
                Debug(unescape(element.Sourcecode));
             });
         }
         process.exit();
     }

     async OutputAll(id: number) {
        var data = await CoreData.Query(`SELECT * from datagrab`);
        if (data !== undefined) {
            data.forEach(element => {
               Debug(unescape(element.Sourcecode));
            });
        }
        process.exit();
    }

     GrabSite(site: string) {
         console.log('Grabbing Site: '+site);
        try {
            
    
            var options = {
                method: 'GET',
                uri: site,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
                }
            };
            
            rp.get(options).then(async function (body) {
                //console.log('RECEIVING: '+body)
                await Datagrabber.SaveSource(site, body);
            });
    
            
        } catch (error) {
            console.log('Error: '+JSON.stringify(error));
            process.exit();
        }

       
    }
 }

const app = new Datagrabber();
app.Execute();