const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }

  app.get('/', authenticated, restController.getRestaurants)
  app.get('/search', authenticated, restController.getSearchRestaurants)
  app.get('/search/:field_dir', authenticated, restController.getSortRestaurants)

  app.get('/restaurants/create', authenticated, adminController.createRestaurant)
  app.post('/restaurants/', authenticated, adminController.postRestaurant)
  app.get('/restaurants/:id', adminController.getRestaurant)
  app.get('/restaurants/:id/edit', authenticated, adminController.editRestaurant)
  app.put('/restaurants/:id/', adminController.putRestaurant)
  app.delete('/restaurants/:id', authenticated, adminController.deleteRestaurant)

  app.get('/users/login', userController.getLogin)
  app.post('/users/login', passport.authenticate('local', {
    failureRedirect: '/users/login'
  }), userController.postLogin)
  app.get('/users/logout', userController.getLogout)
  app.get('/users/register', userController.getRegister)
  app.post('/users/register', userController.postRegister)
}