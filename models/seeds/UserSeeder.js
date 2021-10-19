const User = require('../userSchema')
const db = require('../../config/mongoose')
const userSeed = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]

db.once('open', () => {
  User.create(userSeed)
  console.log('Created seed data in mongoDB.')
})