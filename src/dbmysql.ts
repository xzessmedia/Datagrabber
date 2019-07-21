/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-21 09:41:27 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-07-21 23:11:18
 */
/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-27 13:43:08 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-27 15:47:07
 */

import * as mysql from 'mysql';
import * as cfg from './config.json'
import { Debug } from './debug';

var Pool = mysql.createPool(cfg.database.mysql);

export interface MysqlResult {
    results: any;
    fields: any;
}

export class Database {

    Connect(): Promise<mysql.Connection> {
        return new Promise((resolve, reject) => {
            try {
                Debug("Creating new Database connection");
                var connection = mysql.createConnection(cfg.database.mysql);

                connection.connect((err: mysql.MysqlError, args: any[]) => {
                    if (err) {
                        reject(err);
                    }else {
                        resolve(connection);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    Disconnect(connection: mysql.Connection) {
        Debug("Closing Database connection");
        return new Promise((resolve, reject) => {
            connection.destroy();
            connection = null;
            
        });
    }

    QueryAsync(sqlquery: string): Promise<MysqlResult> {
        return new Promise(async (resolve, reject) => {
            try {
                var connection = Pool.getConnection((err, connection) => {
                    Debug("Executing Query: "+sqlquery);
                    connection.query(sqlquery, (error, results, fields) => {
                        if (error !== null) {
                            reject(error);
                        }
                        
                        resolve({
                            results: results,
                            fields: fields
                        });
                    });
                });

                

                
            } catch (error) {
                reject(error);
            }
        });
    }

    async Query(sqlquery: string): Promise<any[]> {

        try {
            var result = await this.QueryAsync(sqlquery);
            return result.results;
        } catch (error) {
            console.log(error);
        }
        
    }
}

var CoreData = new Database();

export default CoreData;
