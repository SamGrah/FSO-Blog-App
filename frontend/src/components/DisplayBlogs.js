import React, { useRef } from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Table, Button } from 'react-bootstrap'

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
      <Togglable showBtnTxt='create new blog' 
                 hideBtnTxt='cancel' 
                 ref={blogFormRef}>
        <CreateBlogForm toggleCreateForm={toggleCreateForm} />
      </Togglable>
      <Table striped>
        <tbody>
        {sortedBlogs.map(blog =>{
          return (  
            <tr key={blog.id}>
              <td><Blog blog={blog} /></td>
            </tr>
          ) 
        })}
        </tbody>
      </Table>
    </div>
  )
}

export default DisplayBlogs