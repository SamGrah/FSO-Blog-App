import './App.css'
import React, { useState, useEffect } from 'react'
import DisplayBlogs from './components/DisplayBlogs'
import Log from './components/Log'
import BannerMsg from './components/BannerMsg'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [msgInfo, setMsgInfo] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) 
   
  return (
    <div>
      <BannerMsg msgInfo={msgInfo} setMsgInfo={setMsgInfo} />
      <Log user={user} 
           setUser={setUser} 
           setMsgInfo={setMsgInfo}
           setBlogs={setBlogs} />
       <DisplayBlogs user={user} 
                     setUser={setUser} 
                     blogs={blogs} 
                     setBlogs={setBlogs}
                     setMsgInfo={setMsgInfo} />    
    </div>
  )
}

export default App