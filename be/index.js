const express = require('express')
require('dotenv').config()

const cors = require('cors')
const dbconnect = require('./config/dbconnect')
const app = express()
const port = process.env.PORT || 8080
require('./config/redis.config')

const initRoutes = require('./routes')
const { errorHandler, badRequest } = require('./middlewares/errorHandler')
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
initRoutes(app)
dbconnect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/', badRequest)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
