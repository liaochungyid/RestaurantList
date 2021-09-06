const express = require("express")
const app = express()
const port = 3000
const exphbs = require("express-handlebars")

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set('view engine', 'hbs')

// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

// setting static file
app.use(express.static('public'))

// require restaurants data
const restaurantList = require("./restaurant.json")

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost://${port}`)
})