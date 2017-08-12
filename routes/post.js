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
    app.post('/status', Status)
    app.post('/comment', Comment)
    app.post('/profile', Profile)
    app.post('/image/:id', IMG)
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
    let data = req.body
    let insertdata = [data.id, data.password, data.familyCode, data.oldid]
        //id password familyCode  
    mysql.Select('select count(*) as co from `users` where `user_id` = ?', [data.id]).then(rs => {
        if (rs[0].co > 0)
            res.json({ text: '중복된 아이디 입니다.' })
        else {
            mysql.Execute('update `users` set `user_id` = ?, `pw` = ?, `family_idx` = ? where user_id = ?', insertdata).then(rs => {
                if (rs)
                    res.json({ success: true })
                else
                    res.json({ success: false })
            })
        }
    })

}

function Status(req, res) {
    let data = req.body
    let insertdata = [data.id]
    let url = (
        function() {
            return function() {
                switch (data.imagename) {
                    case '공부':
                        return 1
                    case '집':
                        return 2
                    case '카페':
                        return 3
                    case '술':
                        return 4
                    case '이동중':
                        return 5
                    case '노래방':
                        return 6
                    case '쇼핑':
                        return 7
                }
            }
        })()()
    let sql = 'select count(*) as count from `status` where `user_id` = ?'
    mysql.Select(sql, insertdata).then(rs => {
        insertdata = [data.id, data.name, data.starttime, url, data.endtime]

        if (rs[0].count == 0) {
            sql = 'insert into `status` (user_id,name,starttime,endtime,img) values (?,?,?,?,?)'
        } else {
            insertdata = [data.name, data.starttime, data.endtime, url, data.id]
            sql = 'update `status` set `name` = ?, `starttime` = ?, `endtime` = ?, `img` = ? where `user_id` = ?'

        }
        return mysql.Execute(sql, insertdata)

    }).then(rs => {
        if (rs)
            res.json({ success: 'true', text: url })
        else
            res.json({ success: 'false' })
    })

}

function Comment(req, res) {
    let data = req.body
    let insertdata = [data.owner, data.user, data.message]
    let sql = 'insert into `comments`(status_id,user_id,message) values(?,?,?)'
    mysql.Execute(sql, insertdata).then(rs => {
        if (rs[0].insertId)
            res.json({ success: 'true' })
        else
            res.json({ success: 'false' })
    })

}

function IMG(req, res) {
    let photo = req.files.file
    if (photo) {
        let dir = __dirname + '/public/img/profile/' + req.params.id
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        fs.writeFileSync(`${dir}/1.png`, photo.data)
        res.json({ success: 'true' })
    } else
        res.json({ success: 'false' })
}
module.exports = r