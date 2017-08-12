/**
 * @author [KSH-Code]
 * @email [tjdgnsqn133@gmail.com]
 * @create date 2017-08-12 03:53:36
 * @modify date 2017-08-12 03:53:36
 * @desc [get method]
 */
var mysql
const r = function(app, _mysql) {
    mysql = _mysql
    app.get('/status/:familykey', statusList)
}

function statusList(req, res) {
    let data = req.body
    let fk = req.params.familykey


}
module.exports = r