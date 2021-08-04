import React from 'react'

const CreateBlogForm = (props) => {

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={props.createNewBlog}>
        <label>title:</label>
        <input id="title_input" value={props.title} 
              onChange={({target}) => props.setTitle(target.value)} />
        <br /><label>author:</label>
        <input id="author_input" value={props.author} 
               onChange={({target}) => props.setAuthor(target.value)} />
        <br /><label>url:</label>
        <input id="url_input"
               value={props.url} 
               onChange={({target}) => props.setUrl(target.value)} />
        <br /><button id='blog_submit_btn' type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm