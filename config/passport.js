const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userSchema')

// 設定本地登入策略
passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, (req, email, password, cb) => {
  User.findOne({ email })
    .then(user => {
      if (!user) return cb(null, false, req.flash('warning_msg', '此 email 沒有註冊。'))

      return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return cb(null, false, req.flash('warning_msg', 'Email 或 Password 錯誤。'))

          return cb(null, user)
        })
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