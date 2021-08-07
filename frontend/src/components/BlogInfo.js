import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementLikes, remove } from '../reducers/blogReducer'
import { displayBannerMsg } from '../reducers/messageReducer'

const BlogInfo = ({ blog }) => {
  const loggedInUser = useSelector(state => state.login)
  const dispatch = useDispatch() 

  const removeBlog = (blog) => async () => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) return;
    dispatch(remove(blog))
    dispatch(displayBannerMsg(`Deleted blog "${blog.title}"`))
  }

  const likeBlog = (blog) => () =>  {
    dispatch(incrementLikes(blog))
  }

  const blogRemovalBtn = (blog) => {
    if (blog.user.id === loggedInUser.id) {
      return (
        <button className="removeBtn" onClick={removeBlog(blog)}>
          remove
        </button>
      ) 
    }
    return;
  }

  return (
    <div>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button className="likeBtn" onClick={likeBlog(blog)}>
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      {blogRemovalBtn(blog)}
    </div>
  ) 
}

export default BlogInfo