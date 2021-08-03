const mongoose = require('mongoose')
const supertest = require('supertest')
const defaults = require('superagent-defaults')
const app = require('../app')
const Blog = require('../models/blog')
const initialBlogs = require('./initialBlogs.json')
const testHelper = require('./test_helper')

const api = defaults(supertest(app))

beforeAll(async () => {
  await api.post("/api/users").send({
    username: "test",
    name: "test name",
    password: "test"
  })


  const loginRequestBody = {
    "username": "test",
    "password": "test"
  }

  const response = await api.post("/api/login").send(loginRequestBody)  
  const createdUser = response.body

  api.set({"Authorization": `Bearer ${createdUser.token}`})
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blogObj => blogObj.save())
  await Promise.all(promiseArray)
})

describe('api suite tests', () => {
  test('blogs are assign a unique identifier', async () => {
    const newBlog = {...testHelper.newBlogJSON}
    const response = await api.post('/api/blogs').send(newBlog)
    const newBlogEntry = response.body
    expect(newBlogEntry.id).toBeDefined()
  })

  test('new blog added', async () => {
    let newBlog = {...testHelper.newBlogJSON}
    const testResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1) 
  }) 

  test('submitted blogs w/o likes prop have likes of 0 in db', async () => {
    let newBlog = {...testHelper.newBlogJSON}
    delete newBlog.likes

    expect(newBlog.likes).toBeUndefined()
    const response = await api.post('/api/blogs').send(newBlog)
    const newBlogEntry = response.body
    expect(newBlogEntry.likes).toBe(0)
  })

  test('requests w/o title or url props result in 400 status', async () => {
    let newBlog = {...testHelper.newBlogJSON}
    delete newBlog.url

    let response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(400)

    delete newBlog.title
    response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(400)
  })

  test('delete request removes post from db', async () => {
    const id = initialBlogs[0]._id
    let response = await api.delete(`/api/blogs/${id}`).send()
    expect(response.status).toBe(204)

    response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length - 1)
  })

  test('update existing blog in db', async () => {
    const allBlogs = await api.get('/api/blogs')

    const firstBlog = allBlogs.body[0]
    const id = firstBlog.id 
    const modifiedBlog = {...firstBlog, title: "new value"}
    delete modifiedBlog.id

    let response = await api.put(`/api/blogs/${id}`).send(modifiedBlog)

    expect(response.body.title).toBe("new value")
  })

})

afterAll(() => {
  mongoose.connection.close()
})