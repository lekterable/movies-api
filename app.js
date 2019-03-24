const express = require('express')
const bodyParser = require('body-parser')
const app = express()

if (!process.env.API_KEY) console.error('API_KEY is not provided')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(require('./routes/movies'))
app.use(require('./routes/comments'))

module.exports = app
