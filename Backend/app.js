const express = require('express')

const app = express()

app.use(express.json())
/* ROUTE IMPORTS */
const product = require('./routes/productRoute')
const errorMiddleware = require('./middleware/error')

app.use('/api/v1',product)

/* MIDDLEWARE FOR ERRORS */
app.use(errorMiddleware)

module.exports = app