import React, { memo } from 'react'
import Loading from './Loading'

export const ButtonActive = memo(({ active, loading, text, handleClick }) => {
  return (
    <button
      className={
        active ? 'newee-btn btn-tinted btn-m mr-2 selected' : 'newee-btn btn-tinted btn-m mr-2'
      }
      disabled={loading}
      onClick={handleClick}
      onMouseEnter={handleClick}
    >
      {loading && <Loading name="info small" />}
      {!loading && <span>{text}</span>}
      {loading && <span className="ml-1">{text}</span>}
    </button>
  )
})
