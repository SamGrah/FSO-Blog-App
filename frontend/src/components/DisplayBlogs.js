import React, { useRef } from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

const DisplayBlogs = (props) => {
  const blogFormRef = useRef()

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const sortedBlogs = [...state.blogs].sort((a, b) => {
    if (a.likes === b.likes) return 0
    else if (a.likes > b.likes) return -1
    return 1
  })

  const logout = () => dispatch(logoutUser())

  const toggleCreateForm = () => blogFormRef.current.toggleVisibility()

  if (!state.login.token) return <div></div>
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {state.login.name} logged in
        <button onClick={logout}>logout</button>
      </div><br />
      <Togglable showBtnTxt='create new blog' 
                 hideBtnTxt='cancel' 
                 ref={blogFormRef}>
        <CreateBlogForm toggleCreateForm={toggleCreateForm} />
      </Togglable>
      <div>
        {sortedBlogs.map(blog =><Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  )
}

export default DisplayBlogs