import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogInfo from './BlogInfo'

const Blog = ({ blog, setMsgInfo, setBlogs}) => { 

  const blogInfoRef = useRef()

  return (
    <div className="blog">
      <Togglable title={`${blog.title} ${blog.author}`} 
                 hideBtnTxt="hide"
                 showBtnTxt="view"  
                 ref={blogInfoRef}>
        <BlogInfo blog={blog}
                  setMsgInfo={setMsgInfo}
                  setBlogs={setBlogs} />
      </Togglable>
    </div>  
  )
}

export default Blog