/**
 * @author [KSH-Code]
 * @email [tjdgnsqn133@gmail.com]
 * @create date 2017-08-12 03:36:05
 * @modify date 2017-08-12 03:36:05
 * @desc [description]
 */
const mysql = require('mysql')

module.exports = () => {
    const con = mysql.createConnection(require('./config'))
    return {
        Select: (sql, data = []) => {
            return new Promise((resolve, reject) => {
                con.query(sql, data, (e, rs) => {
                    if (e)
                        console.log(e)
                    resolve(rs)
                })
            })
        },
        Execute: (sql, data = []) => {
            return new Promise((resolve, reject) => {
                con.query(sql, data, (e, rs) => {
                    if (e)
                        console.log(e)
                    resolve(rs)
                })
            })
        },
        con: con
    }
}