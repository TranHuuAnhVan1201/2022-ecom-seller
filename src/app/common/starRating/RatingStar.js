import React, { memo } from 'react'
import Rating from 'react-rating'
export const RatingStar = memo(({ rating }) => {
  return (
    <Rating
      initialRating={rating}
      emptySymbol={<span className="star of">&#9734;</span>}
      fullSymbol={<span className="star on">&#9733;</span>}
      readonly
    />
  )
})
