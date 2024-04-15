import React from 'react'
import { useDispatch } from 'react-redux'
import Slider from 'react-slick'
import nameBrand from '../../../../../../../data/nameBrand'
import * as actions from '../../../../../../_actions/custommer/products/product'
import './Need.scss'

function to_slug(str) {
  // Chuyển hết sang chữ thường
  if (str) {
    str = str.toLowerCase()

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
    str = str.replace(/(đ)/g, 'd')

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '')

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-')

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '')

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '')

    // return
    return str
  }
}

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
              <Items value={value} onClickBrand={onClickBrand} key={value.id}/>
            ))}
        </Slider>
      </div>
    </div>
  )
}

export default Need
