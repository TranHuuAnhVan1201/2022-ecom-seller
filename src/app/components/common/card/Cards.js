import React, { memo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { FormatVND } from '../../../utils/FormatVND'
import { ToSlug } from '../../../utils/ToSlug'
import { RatingStar } from '../review/RatingStar'
export const Cards = memo(({ className, value }) => {
  function capitalize(s) {
    return s && s.toLowerCase()
  }

  return (
    <div className={className}>
      <Link to={'/product-detail/' + ToSlug(value.name) + '.' + value.id}>
        <LazyLoadImage
          alt={'Newee' + value.name}
          src={value.link} // use normal <img> attributes as props
          height={222}
          width={222}
        />

        <div className="card-body">
          <div className="card-title">{capitalize(value.name)}</div>
          <div className="card-group-price">
            <span className="card-stars">
              <RatingStar rating={value.ratingScores} />
              <span className="ml-1"> {value.amountRating || 0} đánh giá</span>
            </span>

            <p className="card-group wl">
              {value.priceDiscountMin > 0 && (
                <span className="card-price-old">{FormatVND(value.priceDiscountMin)}₫</span>
              )}

              <span className="card-price-black">{FormatVND(value.price1)}₫</span>

              {value.priceDiscountMin > 0 ? (
                <span className="card-sale">-{value.percent.toFixed(0)}%</span>
              ) : null}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
})
