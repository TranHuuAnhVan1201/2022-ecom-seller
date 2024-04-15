import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { ToSlug } from '../../../../../../utils/ToSlug'
export const Items = memo(({ value, onClickBrand }) => {
  console.log('đã chạy 123')
  return (
    <Link to={'/search/' + ToSlug(value.name) + '.all'} onClick={() => onClickBrand(value.id * 1)}>
      <img src={value.url} alt={`Newee hợp tác cùng ${value.name}`} />
    </Link>
  )
})
