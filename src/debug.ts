/*
 * @Author: Tim Koepsel 
 * @Date: 2019-07-21 23:04:24 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-07-21 23:06:55
 */

import * as cfg from  "./config.json";

export function Debug(message: string) {
    if (cfg.debug === true) {
        console.log('[Debug]: '+ message);
    }
}
