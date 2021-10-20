const Restaurant = require('../models/restaurantSchema')

const adminController = {
  createRestaurant: (req, res) => {
    res.render('create')
  },

  postRestaurant: (req, res) => {
    Restaurant.create(Object.assign(req.body, { userId: req.user._id }))
      .then(res.redirect('/'))
      .catch(err => console.log(err))
  },

  getRestaurant: (req, res) => {
    Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
      .lean()
      .then(restaurant => {
        if (!restaurant) {
          return res.render('index', { error_msg: "OOPS! Something wrong..." })
        }
        res.render('show', { restaurant })
      })
      .catch(err => console.log(err))
  },

  editRestaurant: (req, res) => {
    Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
      .lean()
      .then(restaurant => res.render('edit', { restaurant }))
      .catch(err => console.log(err))
  },

  putRestaurant: (req, res) => {
    Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
      .then(restaurant => {
        restaurant = Object.assign(restaurant, req.body)
        return restaurant.save()
      })
      .then(() => res.redirect(`/restaurants/${req.params.id}`))
      .catch(err => console.log(err))
  },

  deleteRestaurant: (req, res) => {
    Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
      .then(restaurant => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  },
}

module.exports = adminController