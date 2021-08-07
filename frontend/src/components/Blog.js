import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogInfo from './BlogInfo'

const Blog = ({ blog }) => { 

  const blogInfoRef = useRef()

  return (
    <div className="blog">
      <Togglable title={`${blog.title} ${blog.author}`} 
                 hideBtnTxt="hide"
                 showBtnTxt="view"  
                 ref={blogInfoRef}>
        <BlogInfo blog={blog} />
      </Togglable>
    </div>  
  )
}

export default Blog