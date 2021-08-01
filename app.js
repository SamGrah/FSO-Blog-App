const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/note')
const mongoose = require('mongoose')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      logger.info(blogs)
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


module.exports = app