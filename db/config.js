/**
 * @author [KSH-Code]
 * @email [tjdgnsqn133@gmail.com]
 * @create date 2017-08-12 03:23:02
 * @modify date 2017-08-12 03:23:02
 * @desc [mysql db config]
 */
const test = false
module.exports = {
    host: test ? 'localhost' : '127.0.0.1',
    user: 'root',
    database: 'appjam',
    password: test ? 'root' : 'okok7882',
    port: 3306,
    socketPath: test ? '' : '/var/run/mysqld/mysqld.sock'
}