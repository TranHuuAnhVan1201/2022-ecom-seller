import React, { memo } from 'react'
import Loading from '../../../common/loadings/Loading'

export const ButtonOutlineMd = memo(({ loading, text, handleClick }) => {
  return (
    <button className="newee-btn btn-tinted btn-m mr-1" disabled={loading} onClick={handleClick}>
      {loading && <Loading name="info small" />}
      {!loading && <span>{text}</span>}
      {loading && <span className="ml-1">{text}</span>}
    </button>
  )
})
