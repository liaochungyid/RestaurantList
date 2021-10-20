const passport = require('passport')
const User = require('../models/userSchema')

const userController = {
  getLogin: (req, res) => {
    res.render('login')
  },
  postLogin: (req, res) => {
    res.redirect('/')
  },
  getLogout: (req, res) => {
    req.logout()
    req.flash('success_msg', '你已成功登出。')
    res.redirect('/users/login')
  },
  getRegister: (req, res) => {
    res.render('register')
  },
  postRegister: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []

    if (!name || !email || !password || !confirmPassword) errors.push({ message: '所有欄位都是必填。' })

    if (password !== confirmPassword) errors.push({ message: '密碼與確認密碼不相符。' })

    User.findOne({ email })
      .then(user => {
        if (user) errors.push({ message: '這個Email已經註冊過了' })
        if (errors.length) {
          return res.render('register', { name, email, password, confirmPassword, errors })
        }
        return User.create({ name, email, password })
      })
      .then(() => {
        if (!errors.length) {
          req.flash('success_msg', '成功完成註冊。')
          req.flash('email', email)
          res.redirect('/users/login')
        }
      })
      .catch(err => console.log(err))
  }
}

module.exports = userController