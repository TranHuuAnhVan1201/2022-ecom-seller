import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import Popups from "../../../../../../../newee/1908/banner_HTX.jpg"
// import Popups from "../../../../../../../newee/1908/banner_right.jpg"
import btnClose from '../../../../../../../newee/button/times-solid.svg'
import Popups from '../../../../../../../newee/popup/popup.png'
import * as actions from '../../../../../../_actions/custommer/products/product'
import './Popup.scss'
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
function Popup(props) {
  const [check, setCheck] = useState(true)

  const handleClick = () => {
    localStorage.setItem('first', false)
    setCheck(false)
  }
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
    'HTX Tây Ninh',
    'No brand',
  ]
  const onClickBrand = (number) => {
    dispatch(actions.searchBrand(number))
  }

  return (
    <div className="popup">
      <div
        className={
          check === true && localStorage.getItem('first') === 'true'
            ? 'video-popup open'
            : 'video-popup'
        }
      >
        <div className="video-popup-inner">
          <div className="video-popup-close" onClick={() => handleClick()}>
            <img
              className="video-popup-img"
              width="24px"
              height="24px"
              src={btnClose}
              alt="Newee btn-cancel-video"
            />
          </div>
          <div className="iframe-box">
            <Link to={'/search/' + to_slug(brand[13])} onClick={() => onClickBrand(13)}>
              <img id="player-1" src={Popups} alt="newee asia"></img>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
