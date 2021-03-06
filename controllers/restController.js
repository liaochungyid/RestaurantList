const Restaurant = require('../models/restaurantSchema')

const restController = {
  getRestaurants: (req, res) => {
    Restaurant.find({ userId: req.user._id })
      .lean()
      .sort({ rating: 'desc' })
      .then(restaurants => {
        if (restaurants.length === 0) {
          return res.render('index', { error_msg: '資料庫沒有餐廳！' })
        }
        res.render('index', { restaurants })
      })
      .catch(err => console.log(err))
  },

  getSortRestaurants: (req, res) => {
    const [field, dir] = req.params.field_dir.split('_')

    Restaurant.find({ userId: req.user._id })
      .lean()
      .sort({ [field]: dir })
      .then(restaurants => {
        if (!restaurants.length) {
          return res.render('index', { error_msg: '資料庫沒有餐廳！' })
        }
        res.render('index', { restaurants })
      })
      .catch(err => console.log(err))
  },

  getSearchRestaurants: (req, res) => {
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
      }], userId: req.user._id
    })
      .lean()
      .then(restaurants => {
        if (!restaurants.length) {
          return res.render('index', { error_msg: '關鍵字搜尋不到關聯餐廳', keyword })
        }
        res.render('index', { restaurants, keyword })
      })
      .catch(err => console.log(err))
  }
}

module.exports = restController