const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurantSchema')

  // home page
  router.get('/', (req, res) => {
    Restaurant.find()
      .lean()
      .sort({ rating: 'desc' })
      .then(restaurants => {
        if (restaurants.length === 0) {
          return res.render('index', { error_msg: '資料庫沒有餐廳！' })
        }
        res.render('index', { restaurants })
      })
      .catch(err => console.log(err))
  })

// search (home page)
router.get('/search', (req, res) => {
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

module.exports = router