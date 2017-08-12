/**
 * @author [KSH-Code]
 * @email [tjdgnsqn133@gmail.com]
 * @create date 2017-08-12 04:51:00
 * @modify date 2017-08-12 06:08:00
 * @desc [post method]
 */
var mysql
const fs = require('fs')
const r = function(app, _mysql) {
    mysql = _mysql
    app.post('/register', Register)
    app.post('/login', Login)
    app.post('/status/:id', Status)
    app.post('/comment/:idx', Comment)
}

function Register(req, res) {
    let data = req.body
    mysql.Select('select count(*) as co from `users` where `user_id` = ?', [data.id]).then(rs => {
        if (rs[0].co > 0)
            res.json({ text: '중복된 아이디 입니다.' })
        else {
            let insertdata = [data.id, data.password, data.name, data.type]
            let sql = 'insert into `users` (user_id,pw,name,type,family_idx) values(?,?,?,?,?)'
            let key = data.familykey
            if (key.length) {
                insertdata.push(key)
                return mysql.Execute(sql, insertdata)
            } else {
                return mysql.Execute('insert into `families` (idx) values (NULL)').then(rs => {
                    insertdata.push(rs.insertId)
                    return mysql.Execute(sql, insertdata)
                })
            }

        }
    }).then(rs => {
        if (rs)
            res.json({ text: 'true' })
        else
            res.json({ text: '알 수 없는 오류입니다.' })
    }, (e) => { console.log(e) })
}

function Login(req, res) {
    let data = req.body
    let insertdata = [data.id, data.password]
    mysql.Select('select user_id as id,name,pw as password, family_idx as familyKey from `users` where `user_id` = ? and `pw` = ?', insertdata).then(rs => {
        if (rs && rs.length) {
            let jsonData = rs[0]
            jsonData.success = true
            res.json(jsonData)
        } else
            res.json({ success: false })
    })
}

function Profile(req, res) {
    let data = req.files
    if (data.length && data.img) {
        let dir = '../public/profile/' + req.body.id
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        fs.writeFileSync(`${dir}/1.jpg`, data.img)
        res.json({ success: true })
    } else
        res.json({ success: false })
}

function Status(req, res) {
    let data = req.data
    console.log(data)
    let insertdata = [data.user_id]
    let sql = 'select count(*) as count from `status` where `user_id` = ?'
    mysql.Select(sql, insertdata).then(rs => {
        insertdata = [insertdata, data.name, data.starttime, data.url, data.endtime]

        if (rs.count == 0) {
            sql = 'insert into `status` (user_id,name,starttime,endtime,url) values (?,?,?,?,?)'
        } else {
            insertdata = [data.name, data.starttime, data.endtime, data.url, insertdata]
            sql = 'update `status` set `name` = ?, `starttime` = ?, `endtime` = ?, `url` = ? where `user_id` = ?'

        }
        return mysql.Execute(sql, insertdata)

    }).then(rs => {
        if (rs)
            res.json({ success: true })
        else
            res.json({ success: false })
    })

}

function Comment(req, res) {
    let data = req.data


}
module.exports = r