if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index.js')
const registerRouter = require('./routes/register.js')
const loginRouter = require('./routes/login.js')

app.set('view-engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout.ejs')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose epic gamer moment'))

app.use('/', indexRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)

app.listen(process.env.PORT || 3000)