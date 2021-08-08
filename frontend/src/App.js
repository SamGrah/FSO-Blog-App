import './App.css'
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from './services/blogs'
import { getAllBlogs } from './reducers/blogReducer'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Log from './components/Log'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const loggedInUser = useSelector(state => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(getAllBlogs(blogs))
    })
  }, [])

  useEffect(() => blogService.setToken(loggedInUser.token), []) 

  if (!loggedInUser.token) return <Log />
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/users/:id">
         <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <BlogInfo />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App