const express = require("express")
const exphbs = require("express-handlebars")
const session = require('express-session')
const passport = require('./config/passport')
const methodOverride = require("method-override")

const routes = require('./routes')

require('./config/mongoose')

const app = express()
const port = 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set('view engine', 'hbs')

// setting express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// setting passport
app.use(passport.initialize())
app.use(passport.session())

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