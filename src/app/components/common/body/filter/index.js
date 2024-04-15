import React, { memo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import filter from '../../../../../assets/images/filter/filter.png'
import './Filter.scss'

export const Filters = memo(({ name }) => {
    return (
        <div className="filter">
            <h2>{name}</h2>

            <LazyLoadImage
                className="img-right"
                src={filter}
                layout="fixed"
                width={558}
                height={126}
                alt="newee"
            />
        </div>
    )
})
