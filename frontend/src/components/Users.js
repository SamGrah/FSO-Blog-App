import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const allBlogs = useSelector(state => state.blogs)
  
  const numBlogs = (name) => {
    return allBlogs.reduce((acc, blog) => {
    if (blog.user.name === name) return acc + 1
      return acc
    }, 0)
  }

  const userData = allBlogs.reduce((acc, blog) => {
    if (acc.every(userObj => userObj.id !== blog.user.id)) {
      acc.push({
        name: blog.user.name,
        id: blog.user.id,
        numBlogs: numBlogs(blog.user.name)
      })
    } 
    return acc
  }, [])  

  const userDisplay = (username, id) => {
    if (!numBlogs(username)) return <td>{username}</td>
    return <Link key={id} to={`/users/${id}`}>{username}</Link>
  }

  console.log(userData)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <td></td>
          <td><strong>blogs created</strong></td>
        </thead>
        <tbody>
          {userData.map(user => {
            return (
              <tr>
                {userDisplay(user.name, user.id)}
                <td>{user.numBlogs}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users