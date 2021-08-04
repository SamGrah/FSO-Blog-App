import React from 'react'
import blogService from '../services/blogs'

const BlogInfo = ({ blog, setMsgInfo, setBlogs }) => {

  const removeBlog = (blog) => async () => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) return;
    await blogService.remove(blog)
    const updatedBlogList = await blogService.getAll()
    console.log(updatedBlogList)
    setBlogs(updatedBlogList)
    setMsgInfo({
      className: 'success',
      message: `Deleted blog "${blog.title}"`
    })
  }

  const incrementLikes = (blog) => async () => {
    let currentBlog = {...blog, likes: blog.likes + 1}
    await blogService.update(blog.id, currentBlog)
    let updatedBlogList = await blogService.getAll()
    setBlogs(updatedBlogList)
  }

  const blogRemovalBtn = (blog) => {
    const currentUser = window.localStorage.getItem('loggedBlogappUser')
    if (blog.user.id === JSON.parse(currentUser).id) {
      return (
        <button className="removeBtn" onClick={removeBlog(blog)}>remove</button>
      ) 
    }
    return;
  }

  return (
    <div>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button className="likeBtn" onClick={incrementLikes(blog)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {blogRemovalBtn(blog)}
    </div>
  ) 
}

export default BlogInfo