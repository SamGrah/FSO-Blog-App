import React from 'react'

const BannerMsg = ({ msgInfo, setMsgInfo}) => {
  if (!msgInfo) return <div></div>

  setTimeout(() => setMsgInfo(), 3500)

  return (
    <div className={"baseClass " + msgInfo.className}>
      {msgInfo.message}
    </div>
  )
}

export default BannerMsg