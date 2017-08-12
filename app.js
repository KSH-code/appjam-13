/**
 * @author [KSH-Code]
 * @email [tjdgnsqn133@gmail.com]
 * @create date 2017-08-12 02:55:43
 * @modify date 2017-08-12 02:55:43
 * @desc [description]
 */
const express = require('express')
const app = express()

const body_parser = require('body-parser')
const express_fileupload = require('express-fileupload')

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }))

// parse application/json
app.use(body_parser.json())

// default options 
app.use(express_fileupload())

app.use(express.static(`${__dirname}/public`))

require('./routes/main')(app)

app.listen(4000)