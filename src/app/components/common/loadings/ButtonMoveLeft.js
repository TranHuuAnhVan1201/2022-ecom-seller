import React, { memo } from 'react'

export const ButtonMoveLeft = memo(({ text }) => {
  return (
    <div className="container-btn">
      <button className="learn-more">
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">{text}</span>
      </button>
    </div>
  )
})
