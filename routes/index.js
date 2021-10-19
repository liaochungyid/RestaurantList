const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')

module.exports = (app, passport) => {
  app.get('/', restController.getRestaurants)
  app.get('/search', restController.getSearchRestaurants)
  app.get('/search/:field_dir', restController.getSortRestaurants)

  app.get('/restaurants/create', adminController.createRestaurant)
  app.post('/restaurants/', adminController.postRestaurant)
  app.get('/restaurants/:id', adminController.getRestaurant)
  app.get('/restaurants/:id/edit', adminController.editRestaurant)
  app.put('/restaurants/:id/', adminController.putRestaurant)
  app.delete('/restaurants/:id', adminController.deleteRestaurant)

  app.get('/users/login', userController.getLogin)
  app.post('/users/login', passport.authenticate('local', {
    failureRedirect: '/users/login'
  }), userController.postLogin)
  app.get('/users/register', userController.getRegister)
  app.post('/users/register', userController.postRegister)
}