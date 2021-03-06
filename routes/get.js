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
    app.get('/status/list/:familykey', statusList)
    app.get('/status/:id', status)
    app.get('/comment/:id', comment)
}

function statusList(req, res) {
    let data = req.body
    let fk = req.params.familykey

    let sql = 'select u.user_id as userID,u.type as userType,s.img as statusURL,s.starttime as startTime,s.endtime as endTime,s.name from users as u inner join `status` as s on s.`user_id`=u.`user_id` where family_idx = ?'
    let insertdata = [fk]
    mysql.Select(sql, fk).then(rs => {
        if (rs.length > 0)
            res.json(rs)
        else
            res.json({ success: 'false' })
    })

}

function status(req, res) {
    let id = req.params.id
    let sql = 'select u.user_id as userID,u.type as userType,s.img as statusURL,s.starttime as startTime,s.endtime as endTime,s.name from users as u inner join `status` as s on s.`user_id`=u.`user_id` where u.user_id = ?'
    let insertdata = [id]
    mysql.Select(sql, insertdata).then(rs => {
        if (rs.length > 0)
            res.json(rs)
        else
            res.json({ success: 'false' })
    }, e => { console.log(e) })
}

function comment(req, res) {
    let data = req.body
    let insertdata = [req.params.id]
    let sql = 'select `u`.`name` as userName, `u`.`user_id` as userID, `c`.`message` from `comments` as `c` inner join `users` as `u` on `u`.`user_id` = `c`.`user_id` where `c`.`status_id` = ?'
    mysql.Select(sql, insertdata).then(rs => {
        if (rs) {
            res.json(rs)
        } else
            res.json({ success: 'false' })
    })
}
module.exports = r