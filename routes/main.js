/**
 * @author [KSH-Code]
 * @email [tjdgnsqn133@gmail.com]
 * @create date 2017-08-12 03:01:40
 * @modify date 2017-08-12 03:01:40
 * @desc [description]
 */
module.exports = (app) => {
    let mysql = require('../db/mysql')()
    require('./get')(app, mysql)
    require('./post')(app, mysql)
    let data = {
        id: 'test1',
        password: 'test1',
        name: 'test1',
        familykey: ''
    }
}