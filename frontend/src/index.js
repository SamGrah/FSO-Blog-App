import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.render(
  <div className="container">
    <Provider store={store}>
      <App />
    </Provider>
  </div>, 
  document.getElementById('root')

)