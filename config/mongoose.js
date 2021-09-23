const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb://localhost/RestaurantList'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', err => {
  console.log('mongodb connect error!')
})

db.once('open', (err, resp) => {
  console.log('mongodb connected!')
  // console.log(resp)
})

module.exports = db