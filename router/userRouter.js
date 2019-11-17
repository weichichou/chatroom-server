const {Router} = require('express')
const {User} = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10
const router = new Router()
const auth = require('../authMiddleware')

router.post('/signup', (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password){
        res.status(400).end('some arguments are missing')
    }
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

// For login test
router.get('/secret', auth, (req, res, next) => {
    res.send('My secret is ABC')
})

module.exports = router
