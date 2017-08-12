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

    let sql = 'select u.user_id as userId,u.type as userType,s.img as statusURL,s.starttime as startTime,s.endtime as endTime,s.name from users as u inner join `status` as s on s.`user_id`=u.`user_id` where family_idx = ?'
    let insertdata = [fk]
    mysql.Select(sql, fk).then(rs => {
        res.json(rs)
    })

}
module.exports = r