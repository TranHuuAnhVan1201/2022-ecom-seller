import React, { memo } from 'react'
import Loading from './Loading'

export const ButtonLoading = memo(({ loading, text, handleClick }) => {
  return (
    <button
      className="newee-btn btn-flex-row btn-l btn-solid-primary mr-2"
      disabled={loading}
      onClick={handleClick}
    >
      {loading && <Loading name="info small" />}
      {!loading && <span>{text}</span>}
      {loading && <span className="ml-1">{text}</span>}
    </button>
  )
})
