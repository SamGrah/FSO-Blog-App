import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const BannerMsg = ({ msgInfo, setMsgInfo}) => {
  const message = useSelector(state => state.message)
  if (!message.display) return <div></div>

  return (
    <Alert variant="success">{message.text}</Alert>
  )
}

export default BannerMsg