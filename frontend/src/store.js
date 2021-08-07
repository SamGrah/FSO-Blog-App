import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'

const allReducers = combineReducers({
  login: loginReducer,
  blogs: blogReducer,
  message: messageReducer 
})

const store = createStore(
  allReducers, 
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store