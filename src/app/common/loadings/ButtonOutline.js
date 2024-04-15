import React, { memo } from 'react'
import Loading from './Loading'

export const ButtonOutline = memo(({ loading, text, handleClick }) => {
  return (
    <button className="btn btn-tinted btn-l mr-2" disabled={loading} onClick={handleClick}>
      {loading && <Loading name="info small" />}
      {!loading && <span>{text}</span>}
      {loading && <span className="ml-1">{text}</span>}
    </button>
  )
})
