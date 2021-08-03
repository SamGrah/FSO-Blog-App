const listHelper = require('../utils/list_helper')
const blogs = require('./initialBlogs.json')

describe('mostLikes test suite', () => {
  test('multiple blog entries, multiple authors', () => {
    let result = listHelper.mostLikes(blogs)
    expect(result).toMatchObject({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

  test('multiple blog entries, single author', () => {
    let result = listHelper.mostLikes([ blogs[1], blogs[2] ])
    expect(result).toMatchObject({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

  test('single blog entry', () => {
    let result = listHelper.mostLikes([ blogs[2] ])
    expect(result).toMatchObject({
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })


})