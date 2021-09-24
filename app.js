const express = require("express")
const exphbs = require("express-handlebars")

require('./config/mongoose')

// utilities file
const LCandRS = require("./models/utilities")

const app = express()
const port = 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set('view engine', 'hbs')

// setting static file
app.use(express.static('public'))

// require restaurants data
const Restaurant = require('./models/restaurantSchema')

// routes setting
// home page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

// search (home page)
app.get('/search', (req, res) => {
  // const keyword = LCandRS(req.query.keyword)
  const keyword = req.query.keyword
  Restaurant.find({
    $or: [{
      name: {
        $regex: keyword, $options: 'ix'
      }
    }, {
      category: {
        $regex: keyword, $options: 'ix'
      }
    }]
  })
    .lean()
    .then(restaurants => {
      if (!restaurants.length) {
        return res.render('index', { error_msg: '關鍵字搜尋不到關聯餐廳', keyword })
      }
      res.render('index', { restaurants, keyword })
    })
    .catch(err => console.log(err))
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