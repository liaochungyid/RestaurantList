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
    res.redirect('/users/login')
  }
}

module.exports = userController