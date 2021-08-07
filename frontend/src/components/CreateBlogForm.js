import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/blogReducer'
import { displayBannerMsg } from '../reducers/messageReducer'

const CreateBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const submitNewBlog = async (event) => {
    event.preventDefault() 

    const newBlog = {
      title, 
      author, 
      url
    }
 
    dispatch(createNew(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    const msg = `a new blog ${newBlog.title} by ${newBlog.author} added`
    dispatch(displayBannerMsg(msg))
    props.toggleCreateForm()
  } 

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitNewBlog}>
        <label>title:</label>
        <input id="title_input" value={title} 
              onChange={({target}) => setTitle(target.value)} />
        <br /><label>author:</label>
        <input id="author_input" value={author} 
               onChange={({target}) => setAuthor(target.value)} />
        <br /><label>url:</label>
        <input id="url_input"
               value={url} 
               onChange={({target}) => setUrl(target.value)} />
        <br /><button id='blog_submit_btn' type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm