import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Empty } from '../../../common/body/empty/Empty'

export default function Cart() {
  const [isRedirect, setIsRedirect] = useState(false)
  const history = useHistory()
  const Redirect = () => {
    console.log(' Redirect ')
    setIsRedirect(true)

    setTimeout(() => {
    //  history.push('/login')
	  window.location.href = 'https://newee.asia/dangnhap.html'
      setIsRedirect(false)
    }, 1000)
  }
  return (
    <div className="container-cart-empty">
      <Empty
        name={'Đăng nhập Newee để sử dụng chức năng này...'}
        btnTitle="Đăng nhập Newee..."
        handleClick={Redirect}
        isLoading={isRedirect}
        title="Giỏ hàng của đối tác"
      />
    </div>
  )
}
