import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementLikes } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { Table, Button } from 'react-bootstrap'

const BlogInfo = () => {
  // const loggedInUser = useSelector(state => state.login)
  const allBlogs = useSelector(state => state.blogs)
  const dispatch = useDispatch() 
  const id = useParams().id
  
  const blog = allBlogs.filter(blog => blog.id === id)[0]
  console.log(blog)
  
  const likeBlog = (blog) => () =>  {
    dispatch(incrementLikes(blog))
  }

  // const removeBlog = (blog) => async () => {
  //   if (!window.confirm(`Remove blog ${blog.title}?`)) return;
  //   dispatch(remove(blog))
  //   dispatch(displayBannerMsg(`Deleted blog "${blog.title}"`))
  // }

  // const blogRemovalBtn = (blog) => {
  //   if (blog.user.id === loggedInUser.id) {
  //     return (
  //       <button className="removeBtn" onClick={removeBlog(blog)}>
  //         remove
  //       </button>
  //     ) 
  //   }
  //   return;
  // }
  
  if (!blog) return null
  return (
    <div>
      <h2>{blog.title}</h2>
      <Table borderless>
        <tbody>
          <tr><td><a href={blog.url}>{blog.url}</a></td></tr>
          <tr><td>
            likes: {blog.likes}
            <Button className="likeBtn" onClick={likeBlog(blog)}>
              like
            </Button>
          </td></tr>   
          <tr><td>added by {blog.user.name}</td></tr>   
        </tbody>
      </Table>
      {/* {blogRemovalBtn(blog)} */}
    </div>
  ) 
}

export default BlogInfo