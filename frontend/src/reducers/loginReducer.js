export const loginUser = (loginData) => {
  return {
    type: 'LOGIN',
    data: loginData
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
}

const loginReducer = (state = {}, action) => {
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