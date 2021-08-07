import React, { useState } from 'react'
import userService from '../services/users'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { displayErrorMsg } from '../reducers/messageReducer'

const Log = ({ setMsgInfo }) => {  
  let [userName, setUserName] = useState('')
  let [password, setPassword] = useState('')

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const formSubmission = async (event) => {
    event.preventDefault() 
    try {
      const userDbData = await userService.submitLogin(userName, password)
      blogService.setToken(userDbData.token)
      dispatch(loginUser(userDbData))
      setUserName('')
      setPassword('')
    } catch (exception) {
      dispatch(displayErrorMsg('Wrong username or password'))
    }
  }

  if (state.login.token) return <div></div>
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