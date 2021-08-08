import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const NavBar = () => {
  const loggedInUser = useSelector(state => state.login)
  const dispatch = useDispatch()

  const logout = () => dispatch(logoutUser())
  const padding = {
    padding: 7 
  }

  if (!loggedInUser.token) return <div></div> 
  return (
    <Navbar callapseOnSelect expand="lg" bg="dark" variant="dark">
      <Nav className="justify-content-left">
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/">Blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/users">Users</Link>
        </Nav.Link>
        &nbsp;&nbsp;&nbsp;
          {loggedInUser.name} logged in
          <Button onClick={logout}>logout</Button>
      </Nav>  
    </Navbar>
  )
}

export default NavBar