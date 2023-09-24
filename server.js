if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const passport = require('passport')
const flash = require('express-flash')
const session   = require('express-session')
const methodOverRide = require('method-override')
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false
}))

app.set('view-engine', 'ejs')
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverRide('_method'))


app.use('/auth', authRouter);

app.listen(3000, ()=>{console.log("server listening on port 3000")})