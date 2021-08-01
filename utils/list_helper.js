const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, blog) => {
  if (!blog.likes) return acc
  return acc + blog.likes 
}, 0) 

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

module.exports = {
  dummy,
  totalLikes,
  mostBlogs
}