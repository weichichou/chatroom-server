const {User} = require('./db')
const {toData} = require('./router/loginRouter')

function auth(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).end('Please provide authroization header')
    }
    const auth = req.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1])
        try {
            const data = toData(auth[1])
            User
                .findByPk(data.userId)
                .then(user => {
                    if (!user) {
                        res.status(404).end()
                    }
                    else {
                        req.user = user
                        next()
                    }
                })
                .catch(next)
        }
        catch(error){
            res.status(400).send(`Error ${error.name}: ${error.message}`)
        }
    else {
        res.status(401).send()
    }
}

module.exports = auth
