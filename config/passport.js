const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userSchema')

// 設定本地登入策略
passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, cb) => {
  User.findOne({ email })
    .then(user => {
      if (!user) return cb(null, false, { message: 'The email is not registered.' })
      if (user.password !== password) return deleteOne(null, false, { message: 'Email or Password incorrect.' })

      return cb(null, user)
    })
    .catch(err => cb(err))
}))

// 設定序列化與反序列化
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .lean()
    .then(user => cb(null, user))
    .catch(err => cb(err))
})

module.exports = passport