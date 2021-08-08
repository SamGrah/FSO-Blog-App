import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const User = () => {
  const allBlogs = useSelector(state => state.blogs)
  const id = useParams().id
  const usersBlogs = allBlogs.filter(blog => blog.user.id === id)
  if (!usersBlogs[0]) return null
  const username = usersBlogs[0].user.name

  return (
    <div>
      <h2>{username}</h2>
      <h3>added blogs</h3>
      <ul>
        {usersBlogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
