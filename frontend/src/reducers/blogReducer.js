import blogService from '../services/blogs'

export const getAllBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data
    })
  }
} 

export const createNew = (newBlog) => {
  return async dispatch => {
    const updatedBlog = await blogService.create(newBlog)
    dispatch({
      type: 'CREATE_NEW',
      data: updatedBlog 
    })
  }
} 

export const incrementLikes = (blog) => {
  return async dispatch => {
    const likedBlog = {...blog, likes: blog.likes + 1} 
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'INCREMENT_LIKES',
      data: updatedBlog 
    })
  }
}

export const remove = (blogToRemove) => {
  return async dispatch => {
    await blogService.remove(blogToRemove)
    dispatch({
      type: 'REMOVE',
      data: blogToRemove
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE':
      return action.data
    case 'CREATE_NEW':
      return [...state, action.data] 
    case 'REMOVE':
      return state.filter(blog => blog.id !== action.data.id) 
    case 'INCREMENT_LIKES':
      return state.map(blog => {
        if (blog.id === action.data.id) {
          return {...blog, likes: blog.likes + 1} 
        } 
        return blog 
      })  
    default:
      return state
  }
}

export default blogReducer 