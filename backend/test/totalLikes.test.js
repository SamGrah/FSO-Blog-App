const { TestWatcher } = require('jest')
const listHelper = require('../utils/list_helper')
const blogs = require('./initialBlogs.json')

describe('total likes', () => {
  test('total number of likes for multiple blog entries', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('single blog entry likes', () => {
    const result = listHelper.totalLikes([ blogs[0] ])
    expect(result).toBe(7)
  })

  test('single blog entry with no likes', () => {
    const result = listHelper.totalLikes([ { likes: 0 }])
    expect(result).toBe(0)
  })

  test('empty array with no blog entries', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})