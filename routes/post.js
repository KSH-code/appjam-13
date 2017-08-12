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
}

function Register(req, res) {
    let data = req.body
    console.log(data)
    mysql.Select('select count(*) as co from `users` where `user_id` = ?', [data.id]).then(rs => {
        console.log(rs)
        if (rs.co > 0)
            res.json({ text: '중복된 아이디 입니다.' })
        else {
            let insertdata = [data.id, data.password, data.name, data.type]
            let sql = 'insert into `users` (user_id,pw,name,type,family_idx) values(?,?,?,?,?)'
            let key = data.familykey
            if (key) {
                insertdata.push(data.familykey)
                return mysql.Execute(sql, insertdata)
            } else {
                return mysql.Execute('insert into `families` (idx) values (NULL)').then(rs => {
                    insertdata.push(rs.insertedId)
                    return mysql.Execute(sql, insertdata)
                })
            }

        }
    }).then(rs => {
        if (rs && rs.length)
            res.json({ text: 'true' })
        else
            res.json({ text: '알 수 없는 오류입니다.' })
    }, (e) => { console.log(e) })
}

function Login(req, res) {
    let data = req.body
    let insertdata = [data.id, data.password]
    mysql.Select('select * from `users` where `user_id` = ?', insertdata).then(rs => {
        if (rs && rs.length)
            res.json({ success: true })
        else
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
module.exports = r