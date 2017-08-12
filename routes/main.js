/**
 * @author [KSH-Code]
 * @email [tjdgnsqn133@gmail.com]
 * @create date 2017-08-12 03:01:40
 * @modify date 2017-08-12 03:01:40
 * @desc [description]
 */
module.exports = (app) => {
    let mysql = require('../db/mysql')()
    mysql.query('select * from `users`', (e, rs) => {
        if (e)
            console.log(e)
        console.log(rs)
    })
    require('./get')(app, mysql)
    require('./post')(app, mysql)
}