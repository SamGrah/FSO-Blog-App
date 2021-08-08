import React, { useEffect } from 'react'
import DisplayBlogs from './DisplayBlogs'
import Log from './Log'
import BannerMsg from './BannerMsg'
import blogService from '../services/blogs'
import { getAllBlogs } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
  const loggedInUserInfo = useSelector(state => state.login)
  const dispatch = useDispatch()

   
  return (
    <div>
      <BannerMsg />
      <Log />
      <DisplayBlogs />    
    </div>
  )
}

export default Home 