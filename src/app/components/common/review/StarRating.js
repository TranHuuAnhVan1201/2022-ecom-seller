import React, { useState } from 'react'
export const StarRating = ({ rating, setRating, _index }) => {
  const [hover, setHover] = useState(0)
  const handleSetRatings = async (index) => {
    setRating(index, _index)
  }
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            className="star-rating-btn"
            type="button"
            key={index}
            className={index <= (hover || rating.scores) ? 'on' : 'off'}
            onClick={() => handleSetRatings(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="star">&#9733;</span>
          </button>
        )
      })}
    </div>
  )
}
