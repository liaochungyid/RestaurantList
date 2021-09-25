const express = require("express")
const exphbs = require("express-handlebars")


require('./config/mongoose')

const app = express()
const port = 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set('view engine', 'hbs')

// setting static file
app.use(express.static('public'))

// body-parser
app.use(express.urlencoded({ extended: true }))

// require restaurants data
const Restaurant = require('./models/restaurantSchema')

// routes setting
// home page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: 'desc' })
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(err => console.log(err))
})

// search (home page)
app.get('/search', (req, res) => {
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
  Restaurant.findById(req.params.id)
    .lean()
    .then(restaurant => {
      if (!restaurant) {
        return res.render('index', { error_msg: "OOPS! Something wrong..." })
      }
      res.render('show', { restaurant })
    })
    .catch(err => console.log(err))
})

// create page
app.get('/create', (req, res) => {
  res.render('create')
})

// create
app.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

// delete
app.post('/delete/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost://${port}`)
})