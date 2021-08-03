const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, blog) => {
  if (!blog.likes) return acc
  return acc + blog.likes 
}, 0) 

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, blog) => {
    let currentBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes 
    }
    return (acc.likes || 0) < currentBlog.likes ? currentBlog : acc 
  }, {})
}

const mostBlogs = (blogs) => {
  let authorBlogs = {}
  blogs.forEach(blog => {
    authorBlogs[blog.author] = authorBlogs[blog.author] || 0
    authorBlogs[blog.author] += 1
  })

  let arrEntries = Object.entries(authorBlogs)
  let [auth, numBlogs]= arrEntries.reduce((acc, [author, numBlogs]) => {
     let [mostAuthor, mostBlogs] = acc
     
     if (mostBlogs < numBlogs) return [author, numBlogs]
     else return acc
  })

  return { author: auth, blogs: numBlogs }
}

const mostLikes = (blogs) => {
  const sumOfLikes = author => blogs.reduce((acc, blog) => {
    return blog.author === author ? acc + blog.likes : acc
  }, 0)

  return blogs.reduce((acc, blog) => {
    let authorLikes = sumOfLikes(blog.author)
    if ((acc.likes || 0) < authorLikes) return {
      author: blog.author,
      likes: authorLikes
    }
    return acc
  }, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}