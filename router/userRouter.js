const {Router} = require('express')
const {User} = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10
const router = new Router()

router.post('/signup', (req, res, next) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds)
    }
    User
        .create(user)
        .then(_ => res.status(201).send())
        .catch((err) => {
            res.status(409).send()
            next(err)
        })
})

module.exports = router
