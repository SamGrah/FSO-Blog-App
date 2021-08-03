const listHelper = require('../utils/list_helper')
const blogs = require('./initialBlogs.json')

describe('favoriteBlogs test suite', () => {
  test('multiple blog entries', () => {
    let result = listHelper.favoriteBlog(blogs)
    expect(result).toMatchObject({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })

  test('single blog entries', () => {
    let result = listHelper.favoriteBlog([ blogs[0] ])
    expect(result).toMatchObject({
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    })
  })

  test('empty set blog entries', () => {
    let result = listHelper.favoriteBlog([ ])
    expect(result).toMatchObject({})
  })
})