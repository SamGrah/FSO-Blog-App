import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const buttonText = () => {
    return visible ? props.hideBtnTxt : props.showBtnTxt
  }

  const toggleVisibility = () => {
    setVisible(!visible) 
  }  

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    } 
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        {props.title}
        <Button onClick={toggleVisibility}>
          {buttonText()}   
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.title}
        <Button onClick={toggleVisibility}>
          {buttonText()}
        </Button>
        {props.children}
      </div>
    </div>
  )
})

Togglable.propTypes = {
  hideBtnTxt: PropTypes.string.isRequired,
  showBtnTxt: PropTypes.string.isRequired
}

export default Togglable