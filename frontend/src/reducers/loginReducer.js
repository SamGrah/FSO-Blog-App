const initializeLogin = () => { 
  const currentUser = window.localStorage.getItem('loginSessionData')
  return currentUser ? JSON.parse(currentUser) : {}
}

export const loginUser = (loginData) => {
  window.localStorage.setItem('loginSessionData', JSON.stringify(loginData))
  return {
    type: 'LOGIN',
    data: loginData
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loginSessionData')
  return {
    type: 'LOGOUT'
  }
}

const loginReducer = (state = initializeLogin(), action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return {} 
    default:
      return state  
  }
}

export default loginReducer