import React, { useState } from 'react'
import userService from '../services/users'
import blogService from '../services/blogs'

const Log = ({ user, setUser, setMsgInfo }) => {  
  let [userName, setUserName] = useState('')
  let [password, setPassword] = useState('')

  const formSubmission = async (event) => {
    event.preventDefault() 
    try {
      const userDbData = await userService.submitLogin(userName, password)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userDbData)
      )
      blogService.setToken(userDbData.token)
      setUser(userDbData)
      setUserName('')
      setPassword('')
    } catch (exception) {
      setMsgInfo({
        className: 'error', 
        message: `Wrong username or password`
      })
    }
  }

  if (user) return <div></div>
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={formSubmission}>
        <label>username</label>
        <input value={userName}
               onChange={({target}) => setUserName(target.value)}/><br />
        <label>password</label>
        <input value={password}
               onChange={({target}) => setPassword(target.value)} /><br />
        <button id="login_btn" type="submit">Submit</button>
      </form>  
    </div>  
  )
} 

export default Log