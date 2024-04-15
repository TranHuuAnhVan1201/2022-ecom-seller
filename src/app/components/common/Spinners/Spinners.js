import React, { memo } from 'react'

export const Spinners = memo(() => {
  return (
    <div className="newee-wrapper-sniper">
      <div className="full-width">
        <div id="newee-bars">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h4 className="pt-2">Đang tải...</h4>
      </div>
    </div>
  )
})
