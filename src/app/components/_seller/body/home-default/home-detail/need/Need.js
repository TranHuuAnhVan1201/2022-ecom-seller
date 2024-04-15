import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import nameBrand from '../../../../../../../data/nameBrand'
import { ToSlug } from '../../../../../../utils/ToSlug'
import * as actions from '../../../../../../_actions/custommer/products/product'
import './Need.scss'
function Need(props) {
  const dispatch = useDispatch()
  const brand = [
    'Nano Vietnam Tech',
    'Đức Thiện',
    '3Hmask',
    'Mr.Oh',
    'Dạ Lan',
    'INO',
    'ROHTO',
    'AlcoFREE',
    'Blossomy',
    'Hatika',
    'DrHelens',
    'Sunhee',
    'Corset Chuẩn',
    'CHUNG KIM',
    'Vipep',
    'NOVA CONSUMER',
    'Torriden',
    `Pete's Luxury Wholefoods`,
    'Tuyết Hà',
    'No brand',
  ]
  const onClickBrand = (number) => {
    dispatch(actions.searchBrand(number))
  }
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,

    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 488,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 356,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }

  return (
    <div className="need col-12">
      <div className="item">
        <Slider {...settings}>
          {nameBrand
            .filter((item) => item.isShow === true)
            .map((value) => (
              <Link
                to={'/search/' + ToSlug(value.name) + '.all'}
                onClick={() => onClickBrand(value.id * 1)}
                key={value.id}
              >
                <LazyLoadImage
                  src={value.url}
                  alt={`Newee hợp tác cùng ${value.name}`}
                  height={120}
                  width={120}
                  className="need-img"
                  layout="fixed"
                />

                <img />
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  )
}

export default Need
