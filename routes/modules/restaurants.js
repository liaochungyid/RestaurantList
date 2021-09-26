const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurantSchema')

// create page
router.get('/create', (req, res) => {
  res.render('create')
})

// create
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

// show page
router.get('/:id', (req, res) => {
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

// edit page
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

// edit
router.put('/:id', (req, res) => {
  const { name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description } = req.body

  Restaurant.findById(req.params.id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${req.params.id}`))
    .catch(err => console.log(err))
})

// delete
router.delete('/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router