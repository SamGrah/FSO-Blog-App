import React from 'react'
import { useSelector } from 'react-redux'

const BannerMsg = ({ msgInfo, setMsgInfo}) => {
  const message = useSelector(state => state.message)
  if (!message.display) return <div></div>

  return (
    <div className={"baseClass " + message.className}>
      {message.text}
    </div>
  )
}

export default BannerMsg