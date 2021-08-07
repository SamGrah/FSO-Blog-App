const noMsgShown = {
  display: false,
  className: '',
  text: ''
}

const timeout = 3000

export const remove = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_MSG'
    })
  }
}

export const displayBannerMsg = (msg) => {
  return dispatch => {
    setTimeout(() => dispatch(remove()), timeout)
    dispatch({
      type: 'DISPLAY_SUCCESS',
      message: msg
    })
  }
}

export const displayErrorMsg = (msg) => {
  return dispatch => {
    setTimeout(() => dispatch(remove()), timeout)
    dispatch({
      type: 'DISPLAY_ERROR',
      message: msg
    })
  }
}

const messageReducer = (state = noMsgShown, action) => {
  switch(action.type) {
    case 'DISPLAY_SUCCESS':
      return {
        display: true,
        className: 'success',
        text: action.message 
      } 
    case 'DISPLAY_ERROR':
      return {
        display: true,
        className: 'error',
        text: action.message 
      } 
    case 'CLEAR_MSG':
      return noMsgShown 
    default:
      return state 
  } 
}

export default messageReducer 