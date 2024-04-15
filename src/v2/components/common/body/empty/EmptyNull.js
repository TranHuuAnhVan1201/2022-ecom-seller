import React, { memo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import isEmpty from '../../../../../assets/images/empty/newee-empty.jpg'
export const EmptyNull = memo(({ name }) => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <LazyLoadImage src={isEmpty} width={500} height={320} alt="Newee empty" />
      <div className="mgb-1">{(name && name) || 'Chưa có thông tin...'}</div>
    </div>
  )
})
