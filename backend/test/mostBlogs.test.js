const { TestWatcher } = require('jest')
const listHelper = require('../utils/list_helper')
const blogs = require('./initialBlogs.json')

describe('mostBlogs test suite', () => {
  test('most blogs of multiple entries', () => {
    let result = listHelper.mostBlogs(blogs)
    expect(result).toMatchObject({
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test('most blogs of single entry', () => {
    let result = listHelper.mostBlogs([ blogs[0]])
    expect(result).toMatchObject({
      author: "Michael Chan",
      blogs: 1
    })
  })
})