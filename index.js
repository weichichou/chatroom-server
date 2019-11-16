const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {db} = require('./db')

const app = express()
const corsMiddleware = cors()
const port = 4000

app
    .use(corsMiddleware)
    .use(bodyParser.json())
    .listen(port, () => console.log(`Listengin on port ${port}`))

db
    .sync()
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err))
