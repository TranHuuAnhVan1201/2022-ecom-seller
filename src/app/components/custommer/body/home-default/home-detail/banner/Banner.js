import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Newee_1801_Alcofree from '../../../../../../../newee/banner/1801/Alcofree_web.png'
import Newee_1801_Blossomy from '../../../../../../../newee/banner/1801/Blossomy_web_2.png'
import Newee_1801_MrOh from '../../../../../../../newee/banner/1801/MrOh_Web_2.png'
import Newee_1801_Oxy from '../../../../../../../newee/banner/1801/Oxy_web.png'
import Newee_1801_Torrident from '../../../../../../../newee/banner/1801/Torrident_web.png'
import bannerDucthien from '../../../../../../../newee/banner/banner-ducthien.jpg'
import bannerMrO from '../../../../../../../newee/banner/banner-mro.jpg'
import bannerNano from '../../../../../../../newee/banner/banner-nano.jpg'
// import bannerRight from "../../../../../../../newee/1908/banner_right.jpg";
import bannerRight from '../../../../../../../newee/banner/banner-right/Cover_nho.png'
import * as actions from '../../../../../../_actions/custommer/products/product'
import './Banner.scss'

// import bannerRight2 from "../../../../../../../newee/banner/banner-right/banner-right2.jpg";

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
function Banner(props) {
  const dispatch = useDispatch()
  const brand = [
    'Nano Vietnam Tech', //0
    'Đức Thiện', //1
    '3Hmask', //2
    'Mr.Oh', //3
    'Dạ Lan', //4
    'INO', //5
    'ROHTO', //6
    'AlcoFREE', //7
    'Blossomy', //8
    'Hatika', //9
    'DrHelens', //10
    'Sunhee',
    'Corset Chuẩn', //12
    'CHUNG KIM',
    'Vipep', //14
    'NOVA CONSUMER',
    'Torriden', //16
    "'Pete's Luxury Wholefoods",
    'Oxy', //18
    'No brand',
  ]
  const dataBrand = [
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
    "'Pete's Luxury Wholefoods",
    'Oxy',
    'No brand',
  ]
  const onClickBrand = (number) => {
    dispatch(actions.searchBrand(number))
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  }

  return (
    <div className="banners">
      <div className="banners-left owl-home ">
        <Slider {...settings}>
          <Link to={'/search/' + to_slug(brand[7]) + '.all'} onClick={() => onClickBrand(7)}>
            <div className="banner-left-img b2">
              <img src={Newee_1801_Alcofree} width={824} height={274} alt="newee"></img>
            </div>
          </Link>

          <Link to={'/search/' + to_slug(brand[8]) + '.all'} onClick={() => onClickBrand(8)}>
            <div className="banner-left-img b2">
              <img src={Newee_1801_Blossomy} width={824} height={274} alt="newee"></img>
            </div>
          </Link>

          <Link to={'/search/' + to_slug(brand[3]) + '.all'} onClick={() => onClickBrand(3)}>
            <div className="banner-left-img b2">
              <img src={Newee_1801_MrOh} width={824} height={274} alt="newee"></img>
            </div>
          </Link>
          <Link to={'/search/' + to_slug(brand[18]) + '.all'} onClick={() => onClickBrand(18)}>
            <div className="banner-left-img b2">
              <img src={Newee_1801_Oxy} width={824} height={274} alt="newee"></img>
            </div>
          </Link>
          <Link to={'/search/' + to_slug(brand[3]) + '.all'} onClick={() => onClickBrand(3)}>
            <div className="banner-left-img b2">
              <img src={Newee_1801_MrOh} width={824} height={274} alt="newee"></img>
            </div>
          </Link>
          <Link to={'/search/' + to_slug(brand[16]) + '.all'} onClick={() => onClickBrand(16)}>
            <div className="banner-left-img b2">
              <img src={Newee_1801_Torrident} width={824} height={274} alt="newee"></img>
            </div>
          </Link>
          {/* <Link
            to={"/search/" + to_slug(brand[10]) + ".all"}
            onClick={() => onClickBrand(100)}
          >
            <div className="banner-left-img b2">
              <img
                src={bannerDrhelens3}
                width={824}
                height={274}
                alt="newee"
              ></img>
            </div>
          </Link> */}

          <Link to={'/search/' + to_slug(brand[0]) + '.all'} onClick={() => onClickBrand(0)}>
            <div className="banner-left-img" onClick={() => onClickBrand(0)}>
              <img src={bannerNano} width={824} height={274} alt="newee"></img>
            </div>
          </Link>

          <Link to={'/search/' + to_slug(brand[1]) + '.all'} onClick={() => onClickBrand(1)}>
            <div className="banner-left-img">
              <img src={bannerDucthien} width={824} height={274} alt="newee"></img>
            </div>
          </Link>

          <Link to={'/search/' + to_slug(brand[3]) + '.all'} onClick={() => onClickBrand(3)}>
            <div className="banner-left-img">
              <img src={bannerMrO} width={824} height={274} alt="newee"></img>
            </div>
          </Link>

          {/* <Link
            to={"/search/" + to_slug(brand[7]) + ".all"}
            onClick={() => onClickBrand(7)}
          >
            <div className="banner-left-img">
              <img
                src={bannerAlcofree}
                width={824}
                height={274}
                alt="newee"
              ></img>
            </div>
          </Link> */}

          {/* <Link
            to={"/search/" + to_slug(brand[8]) + ".all"}
            onClick={() => onClickBrand(8)}
          >
            <div className="banner-left-img">
              <img
                src={bannerBlossomy}
                width={824}
                height={274}
                alt="newee"
              ></img>
            </div>
          </Link> */}
        </Slider>
      </div>
      <div className="banners-right">
        <img src={bannerRight} width={409} height={274} alt="newee"></img>
      </div>
    </div>
  )
}

export default Banner
