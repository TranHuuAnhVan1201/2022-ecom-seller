import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToSlug } from '../../../../../../utils/ToSlug'
import * as actions from '../../../../../../_actions/custommer/products/product'
import img1 from './../../../../../../../newee/category/1.jpg'
import img2 from './../../../../../../../newee/category/2.jpg'
import img3 from './../../../../../../../newee/category/3.jpg'
import img4 from './../../../../../../../newee/category/4.jpg'
import img5 from './../../../../../../../newee/category/5.jpg'
import img6 from './../../../../../../../newee/category/6.jpg'
import img8 from './../../../../../../../newee/category/8.png'

function QuickLink(props) {
  const dispatch = useDispatch()
  const category = [
    {
      id: '2637dd6e-d44d-471e-9fac-6475101d710a',
      name: 'Nhà Cửa và Đời Sống',
      url: `${img1}`,
    },
    {
      id: '49049185-89d9-42d7-9fb7-0e6230a6bc4e',
      name: 'Sức Khỏe và Sắc Đẹp',
      url: `${img2}`,
    },
    {
      id: 'a7e1a4cc-d916-48f1-b722-9a7e1c4b2323',
      name: 'Chăm Sóc Thú Cưng',
      url: `${img3}`,
    },
    {
      id: 'deed476c-e8ab-4786-8e7e-68f2fb7d70bc',
      name: 'Bách Hóa',
      url: `${img4}`,
    },
    {
      id: 'e78901cc-75f6-4e5e-8830-9fd007b681e9',
      name: 'Combo độc lạ',
      url: `${img5}`,
    },
    {
      id: '801d0f4d-8a54-4a7e-8837-804cf42f8729',
      name: 'Sách',
      url: `${img6}`,
    },
    {
      id: 'fbd0ba77-e2a0-4710-acea-210c98e06e7a',
      name: 'Thời Trang',
      url: `${img8}`,
    },
  ]
  const onClickCategory = (id) => {
    console.log(id)
    dispatch(actions.onClickCategory(id))
  }

  return (
    <div className="quicks border-none d-flex justify-content-center align-items-center flex-wrap py-2 m-width">
      {category.map((value, key) => {
        return (
          <div
            className="card py-2 quicks-mw"
            onClick={() => onClickCategory(value.name)}
            key={key}
          >
            <Link to={'/search/' + ToSlug(value.name) + '.' + value.id}>
              <LazyLoadImage
                className="card-img-top m-auto"
                width={48}
                height={48}
                src={value.url}
                alt={'Newee'}
              />
              <div className="card-body ">
                <p className="card-text ">{value.name}</p>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default QuickLink
