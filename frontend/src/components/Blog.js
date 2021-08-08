import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => { 
  return (
    <div>
      <Link to={`blogs/${blog.id}`}>{blog.title}</Link><em>
        &nbsp;&nbsp;{blog.author}</em>
    </div>    
  )
}

export default Blog