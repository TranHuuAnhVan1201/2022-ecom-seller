import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../_actions/custommer/isDisplayForm/DisplayForm'
import './FormNewee.scss'
import Modal from './modal'

function FormNewee(props) {
  let { data } = props
  console.log(data)

  // let TotalCart = 0.00;
  let totalMoneyRecevidSeller = 0.0

  if (data[0].billDetail !== 0) {
    data[0].billDetail.forEach((e) => {
      // console.log(e)        // TotalCart += parseFloat(e.totalPriceDiscount);
      totalMoneyRecevidSeller += parseFloat(e.moneyReceived)
    })
  }
  console.log(totalMoneyRecevidSeller)

  const isDisplayForm = useSelector((state) => state.isDisplayForm)
  const [isModalOpen, toggleModal] = useState(isDisplayForm)
  const dispatch = useDispatch()

  const toggleModal6 = () => {
    toggleModal(false)
    props.onSetLogged()
    dispatch(actions.closeForm())
  }

  const formatVND = (str) => {
    if (typeof str !== 'string') {
      let toStr = String(str)

      if (toStr.split('.')[1] !== undefined) {
        return (
          toStr
            .split('.')[0]
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
              return (index % 3 ? next : next + ',') + prev
            }) +
          '.' +
          toStr.split('.')[1]
        )
      } else {
        return toStr
          .split('')
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ',') + prev
          })
      }
    }
  }

  return (
    <div className="form-container-fluid overlay-scrollbar">
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <form className="sale-container" style={{ minWidth: '1024px' }}>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ paddingRight: '20px' }}
          >
            <h3>
              Chi tiết đơn hàng:{' '}
              <span className={`btn btn-${data[0].status}`}>
                #{data[0] ? data[0].code : data[0].fullName}
                {' - '} {data[0].status}{' '}
              </span>
            </h3>
            <h3>
              Ngày đặt hàng: {data[0].createTime.split('T')[0].split('-').reverse().join('/')}
              {'   '}
            </h3>
          </div>
          <div className="form-sale-container">
            <div className="col-container">
              <div className="row-sale d-flex">
                <div className="col-4">
                  <h3 className="title">ĐỊA CHỈ NGƯỜI NHẬN</h3>
                  <div className="row-sale-content">
                    <h3 className="title">Tên: {data[0].fullName}</h3>
                    <p>
                      Địa chỉ:{' '}
                      {data[0].address + ', ' + data[0].pXa + ', ' + data[0].qh + ', ' + data[0].tp}
                    </p>
                    <p>Số điện thoại: {data[0].phone}</p>
                    {/* <p>Địa chỉ: Nguoi nhan</p> */}
                  </div>
                </div>
                <div className="col-4">
                  <h3 className="title">HÌNH THỨC GIAO HÀNG</h3>
                  <div className="row-sale-content">
                    <p>Giao trước: Đang cập nhập</p>

                    <p>Đơn vị vận chuyển: {data[0].shipName || 'đang cập nhập'}</p>
                  </div>
                </div>
                <div className="col-4">
                  <h3 className="title">HÌNH THỨC THANH TOÁN</h3>
                  <div className="row-sale-content">
                    <span>
                      {data[0].paymentType === 'banks'
                        ? 'Chuyển khoản qua ngân hàng'
                        : 'Thanh toán tiền mặt khi nhận hàng'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h2>Sản phẩm</h2>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Ảnh sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Nhãn hiệu</th>
                        <th>Phân loại</th>
                        {/* <th>Ngày tạo</th> */}
                        <th>Số lượng</th>
                        <th className="th-center">Giá bán</th>
                        <th className="th-center">Hoa hồng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data[0].billDetail
                        ? data[0].billDetail.map((value, index) => {
                            return (
                              <tr key={index}>
                                <td>{index}</td>
                                <td>
                                  <img
                                    src={value.productf.link}
                                    alt="Newee"
                                    width={90}
                                    height={90}
                                    style={{ objectFit: 'contain' }}
                                  ></img>
                                </td>
                                <td>{value.productName}</td>
                                <td>{value.productf.brand}</td>
                                <td>{data[0].billDetail[index].variantName}</td>

                                <td>x{value.count}</td>
                                <td className="td-right">{formatVND(value.price)} ₫</td>
                                <td className="td-right">{formatVND(value.moneyReceived)} ₫</td>
                              </tr>
                            )
                          })
                        : null}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={6} className="td-right">
                          Phí vận chuyển:{' '}
                        </td>
                        <td colSpan={2} className="td-right">
                          {formatVND(data[0].priceShip)} ₫
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={6} className="td-right">
                          Tổng chiết khấu Seller:{' '}
                        </td>

                        <td className="td-right" colSpan={2}>
                          {formatVND(totalMoneyRecevidSeller)}₫
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={6} className="td-right">
                          Tổng:{' '}
                        </td>
                        <td className="td-right" colSpan={2}>
                          {formatVND(data[0].totalPrice + data[0].priceShip)} ₫
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="btn-groups">
                <button type="button" onClick={() => toggleModal6()} className="btn btn-primary">
                  Quay lại danh sách đơn hàng
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default FormNewee
