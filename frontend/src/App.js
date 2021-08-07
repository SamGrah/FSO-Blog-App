import './App.css'
import React, { useState, useEffect } from 'react'
import DisplayBlogs from './components/DisplayBlogs'
import Log from './components/Log'
import BannerMsg from './components/BannerMsg'
import blogService from './services/blogs'
import { getAllBlogs } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const [msgInfo, setMsgInfo] = useState('')

  const loggedInUserInfo = useSelector(state => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(getAllBlogs(blogs))
    })
  }, [])

  useEffect(() => blogService.setToken(loggedInUserInfo.token), []) 
   
  return (
    <div>
      <BannerMsg msgInfo={msgInfo} setMsgInfo={setMsgInfo} />
      <Log setMsgInfo={setMsgInfo} />
       <DisplayBlogs setMsgInfo={setMsgInfo} />    
    </div>
  )
}

export default App