const Restaurant = require('../restaurantSchema')
const db = require('../../config/mongoose')
const restaurantSeed = require('../../restaurant.json').results

db.once('open', () => {
  Restaurant.create(restaurantSeed)
  console.log('Created seed data in mongoDB.')
})