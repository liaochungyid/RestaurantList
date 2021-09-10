const express = require("express")
const app = express()
const port = 3000
const exphbs = require("express-handlebars")

// my models file
const LCandRS = require("./models/utilities")

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set('view engine', 'hbs')

// setting static file
app.use(express.static('public'))

// require restaurants data
const restaurantList = require("./restaurant.json")

// routes setting
// index page
app.get('/', (req, res) => {
  res.render('index', { item: restaurantList.results })
})

// search (index page)
app.get('/search', (req, res) => {
  const keyword = LCandRS(req.query.keyword)
  const restaurants = restaurantList.results.filter(restaurant => LCandRS(restaurant.name).includes(keyword) || LCandRS(restaurant.category).includes(keyword))
  res.render('index', { item: restaurants, keyword })
})

// show page
app.get('/restaurants/:id', (req, res) => {
  const restaurants = restaurantList.results.filter(restaurant => restaurant.id === Number(req.params.id))
  if (Array.isArray(restaurants) && restaurants.length === 1) {
    res.render('show', { item: restaurants[0] })
  } else {
    res.render('error', { error: "OOPS! Something wrong..." })
  }

})

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost://${port}`)
})