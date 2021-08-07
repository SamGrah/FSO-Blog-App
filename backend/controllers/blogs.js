const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const userVerification = async (request, response) => {
  const token = getTokenFrom(request) 
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' })
    return false
  }
  return await User.findById(decodedToken.id)
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const validUser = await userVerification(request, response) 
  if (!validUser) return;

  const body = request.body
  const formattedBlog = new Blog({
    title: body.title,
    author: body.author, 
    url: body.url,
    likes: body.likes,
    user: validUser._id 
  })

  const createdBlog = await formattedBlog.save()
  const populatedBlog = await Blog.findById(createdBlog.id).populate('user')
  response.status(201).json(populatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const validUser = userVerification(request, response)
  if (!validUser) return;

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const validUser = await userVerification(request, response)
  if (!validUser) return;

  const opt = { new: true }

  const body = request.body
  const id = request.params.id
  const formattedBlog = {
    title: body.title,
    author: body.author, 
    url: body.url,
    likes: body.likes,
    user: validUser._id 
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, formattedBlog, opt)
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter

