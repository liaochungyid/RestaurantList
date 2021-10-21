const express = require("express")
const exphbs = require("express-handlebars")
const session = require('express-session')
const methodOverride = require("method-override")
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const passport = require('./config/passport')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const port = process.env.PORT

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set('view engine', 'hbs')

// setting express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// setting passport
app.use(passport.initialize())
app.use(passport.session())
// setting flash message
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.email = req.flash('email')
  next()
})

// setting static file
app.use(express.static('public'))

// body-parser
app.use(express.urlencoded({ extended: true }))

// method-override
app.use(methodOverride('_method'))

// routes
require('./routes')(app, passport)

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})