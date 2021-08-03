const Blog = require('../models/blog')
const User = require('../models/user')

const newBlogJSON = {
  id: 1,
  title: "Cannonballs",
  author: "Steve O",
  url: "https://yougotpunkd.com/",
  likes: 100 
}

const nonExistingId = async () => {
  const newBlog = new Blog(newBlogJSON)
  await newBlog.save()
  await newBlog.remove()

  return newBlog._id.toString()
}

const blogsInDb = async () => {
  const newBlog = new Blog(newBlogJSON)
  const blogs = await newBlog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  newBlogJSON, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}