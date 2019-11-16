const jwt = require('jsonwebtoken')
const {User} = require('../db')
const bcrypt = require('bcrypt')
const {Router} = require('express')
const loginRouter = new Router()

const secret = process.env.JWT_SECRET || '5k4g4au4au41j4ul4t;6g4'

function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: '1h' })
}

function toData(token) {
  return jwt.verify(token, secret)
}

loginRouter.post('/login', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if(!email || ! password){
    res.status(400).end('Please provide valid email and password')
  }
  User
    .findOne({
    where: {
      email: email
    }
  })
    .then(entity => {
      if (!entity){
        res.status(400).end('The combination of this email and passwsord is incorrect')
      }else if(bcrypt.compareSync(password, entity.password)){
        res.send({
          jwt: toJWT({ userId: entity.id})
        })
      }else{
        res.status(400).end('The combination of this email and passwsord is incorrect')
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).end('Something went wrong')
    })
})

module.exports = { toJWT, toData, loginRouter }