import React, { memo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import isEmpty from '../../../../../assets/images/empty/newee-empty.jpg'
export const EmptySeller = memo(({ name, btnTitle, handleClick, isLoading, title }) => {
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
      <h2 className="mgb-1">{title && title}</h2>
      <LazyLoadImage src={isEmpty} width={450} height={290} alt="Newee empty" className="mb-1" />
      <div className="mb-1">{(name && name) || 'Chưa có thông tin...'}</div>
      <div
        className={
          !isLoading
            ? 'long-operation-btn load-more'
            : 'long-operation-btn load-more long-operation-started'
        }
        onClick={!isLoading ? () => handleClick(true) : undefined}
      >
        <span>{btnTitle || 'Xem thêm'}</span>
      </div>
    </div>
  )
})
