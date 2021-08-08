import React, { useState } from 'react'
import userService from '../services/users'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { displayErrorMsg } from '../reducers/messageReducer'
import { Form, Button } from 'react-bootstrap'

const Log = () => {  
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
      <Form onSubmit={formSubmission}>
        <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control 
          value={userName}
          onChange={({target}) => setUserName(target.value)}/><br />
        <Form.Label>password</Form.Label>
        <Form.Control
          value={password}
          onChange={({target}) => setPassword(target.value)} /><br />
        <Button id="login_btn" type="submit">Submit</Button>
        </Form.Group>
      </Form>  
    </div>  
  )
} 

export default Log