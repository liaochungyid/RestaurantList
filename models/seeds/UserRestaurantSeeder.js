const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../userSchema')
const Restaurant = require('../restaurantSchema')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const db = require('../../config/mongoose')

const restaurantSeed = require('../../restaurant.json').results
const password = '12345678'

bcrypt.genSalt(10)
  .then(salt => bcrypt.hash(password, salt))
  .then(hash => {
    return [{
      name: 'user1',
      email: 'user1@example.com',
      password: hash
    },
    {
      name: 'user2',
      email: 'user2@example.com',
      password: hash
    }]
  })
  .then(userSeed => {
    db.once('open', () => {
      User
        .create(userSeed)
        .then((user) => {
          const [{ _id: user1_id }, { _id: user2_id }] = user
          return Promise.all(restaurantSeed.map((item, index) => {
            if (index < restaurantSeed.length / 2) {
              return Restaurant.create(Object.assign(item, { userId: user1_id }))
            } else {
              return Restaurant.create(Object.assign(item, { userId: user2_id }))
            }
          }))
        })
        .finally(() => {
          console.log('Has Created users and restaurants seeds in mongoDB.')
          console.log('---------------------------------------------------')
          userSeed.map(item => {
            console.log(`You are able to use: ${item.email} with password ${password} to login.`)
          })
          mongoose.disconnect()
        })
        .catch(err => console.log(err))
    })
  })