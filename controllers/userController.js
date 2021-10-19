const User = require('../models/userSchema')

const userController = {
  getLogin: (req, res) => {
    res.render('login')
  },
  postLogin: (req, res) => {
    res.redirect('/')
  },
  getRegister: (req, res) => {
    res.render('register')
  },
  postRegister: (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
      console.log('Password and confirm password are not the same.')
      return res.render('register', {
        name, email, password, confirmPassword
      })
    }

    User.findOne({ email }).then(user => {
      if (user) {
        console.log('Email has already been registered.')
        return res.render('register', {})
      }
    })

    User.create({ name, email, password })
      .then(user => {
        console.log('User registered successfully.')
        res.redirect('/users/login')
      })
      .catch(err => console.log(err))

  }
}

module.exports = userController