const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')

module.exports = (app) => {
  app.get('/', restController.getRestaurants)
  app.get('/search', restController.getSearchRestaurants)
  app.get('/search/:field_dir', restController.getSortRestaurants)

  app.get('/restaurants/create', adminController.createRestaurant)
  app.post('/restaurants/', adminController.postRestaurant)
  app.get('/restaurants/:id', adminController.getRestaurant)
  app.get('/restaurants/:id/edit', adminController.editRestaurant)
  app.put('/restaurants/:id/', adminController.putRestaurant)
  app.delete('/restaurants/:id', adminController.deleteRestaurant)
}