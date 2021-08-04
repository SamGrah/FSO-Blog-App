import React, { useState, useRef } from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'
import blogService from '../services/blogs'

const DisplayBlogs = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  const sortedBlogs = props.blogs.sort((a, b) => {
    if (a.likes === b.likes) return 0
    else if (a.likes > b.likes) return -1
    return 1
  })

  const logoutUser = () => {
    props.setUser(null)
    window.localStorage.removeItem('loggedBlogappUser') 
  }  

  const submitNewBlog = async (event) => {
    event.preventDefault() 

    const newBlog = {
      title, 
      author, 
      url
    }

    try { 
      let updatedBlog = await blogService.create(newBlog)
      const updatedBlogList = await blogService.getAll()
      props.setBlogs(updatedBlogList)
      setTitle('')
      setAuthor('')
      setUrl('')
      props.setMsgInfo({
        className: 'success',
        message: `a new blog ${updatedBlog.title} by ${updatedBlog.author} added`
      })
      blogFormRef.current.toggleVisibility()
    } catch (execption) {
      console.log(execption)
      props.setMsgInfo({
        className: 'error',
        message: `${execption.response.data.error}`
      }) 
    } 
  }  

  if (!props.user) return <div></div>
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {props.user.name} logged in
        <button onClick={logoutUser}>logout</button>
      </div><br />
      <Togglable showBtnTxt='create new blog' 
                 hideBtnTxt='cancel' 
                 ref={blogFormRef}>
        <CreateBlogForm createNewBlog={submitNewBlog}
                        title={title} 
                        author={author}
                        url={url}
                        setTitle={setTitle}
                        setAuthor={setAuthor}
                        setUrl={setUrl} />
      </Togglable>
      <div>
        {sortedBlogs.map(blog =><Blog key={blog.id} 
                                     blog={blog} 
                                     setMsgInfo={props.setMsgInfo}
                                     setBlogs={props.setBlogs} />)}
      </div>
    </div>
  )
}

export default DisplayBlogs