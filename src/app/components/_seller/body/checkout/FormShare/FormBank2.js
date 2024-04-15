import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import { productApiPr } from '../../../../../../api/private'
import * as actions from '../../../../../_actions/custommer/isDisplayForm/DisplayForm'
import * as action from '../../../../../_actions/custommer/products/product'
import { CLEAR_CART } from '../../../../../_constants/ActionType'
import Loading from './../../../../../_pages/loading/Loading'
import './FormBank.scss'
import './FormNewee.scss'
import Modal from './modal'
function FormBank2(props) {
  let { data } = props
  const isDisplayForm = useSelector((state) => state.isDisplayForm)
  const [isModalOpen, toggleModal] = useState(isDisplayForm)
  const [loading, setLoading] = useState(true)
  const [idBill, setIdBill] = useState(null)
  const [bill, setBill] = useState(null)
  console.log('Thanh toán chuyển khoản: ', bill)
  const dispatch = useDispatch()
  const history = useHistory()

  const toggleModal6 = () => {
    toggleModal(false)
    props.onSetLogged()
    dispatch(actions.closeForm())
    dispatch(action.ClearCart())
    history.push('/')
  }

  useEffect(() => {
    createTypeBank()
  }, [])
  const createTypeBank = async () => {
    const response = await productApiPr.createBill(data)
    console.log(response)
    setLoading(false)
    setIdBill(response.code)
    setBill(response.totalPrice + response.priceShip)
  }
  const createBill = async () => {
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: 'CHÚC MỪNG NHÀ BÁN HÀNG ĐÃ CÓ ĐƠN HÀNG THÀNH CÔNG.',
      showConfirmButton: true,
      timer: 10000,
    })
    dispatch({ type: CLEAR_CART })
    console.log('Form bank')
    history.push('/')
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

  const FormBanks = () => {
    return (
      <div className="sp-container-fluid form-bank">
        <div id="policy" className="py-lg-5 py-4">
          <div className="container">
            <div className="col m-auto py-2 text-justify">
              <p className="policy-title">
                NẾU NHÀ BÁN HÀNG MUỐN THANH TOÁN TRƯỚC, VUI LÒNG CHUYỂN KHOẢN THEO THÔNG TIN SAU:
              </p>

              <div className="col-lg-10 col-md-8 col-12 py-2 m-auto">
                <div className="row sp-card py-4 ">
                  <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                    <div className="col-left mr-2">
                      <img
                        src={'https://api.newee.asia:8001/Photos/Product/637644552244427161.svg'}
                        alt="Newee supports"
                      ></img>
                    </div>
                    <div className="col-right">
                      <span style={{ fontWeight: '200' }}>Tên tài khoản: </span> ĐẶNG THỊ PHƯƠNG
                      THẢO
                    </div>
                  </div>
                  <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                    <div className="col-left mr-2">
                      <img
                        src={'https://api.newee.asia:8001/Photos/Product/637644552244427161.svg'}
                        alt="Newee supports"
                      ></img>
                    </div>
                    <div className="col-right">
                      <span style={{ fontWeight: '200' }}>Số tài khoản: </span> 0937 507 485{' '}
                    </div>
                  </div>

                  <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                    <div className="col-left mr-2">
                      <img
                        src={'https://api.newee.asia:8001/Photos/Product/637644552244427161.svg'}
                        alt="Newee supports"
                      ></img>
                    </div>
                    <div className="col-right">
                      <span style={{ fontWeight: '200' }}>Ngân hàng: </span> MB Bank
                    </div>
                  </div>
                  <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                    <div className="col-left mr-2">
                      <img
                        src={'https://api.newee.asia:8001/Photos/Product/637644552244427161.svg'}
                        alt="Newee supports"
                      ></img>
                    </div>
                    <div className="col-right">
                      <span style={{ fontWeight: '200' }}>Nội dung chuyển khoản: </span>
                      <span style={{ color: 'red' }}>
                        NW_
                        {idBill !== null ? idBill : 'Đơn hàng không xác định'}
                      </span>
                    </div>
                    {/* <div className="col-right"><span style={{ fontWeight: '200' }}>Nội dung chuyển khoản: </span>  NW_{data !== null && data.data.data.code !== undefined ? data.data.data.code : null}</div> */}
                  </div>
                  <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                    <div className="col-left mr-2">
                      <img
                        src={'https://api.newee.asia:8001/Photos/Product/637644552244427161.svg'}
                        alt="Newee supports"
                      ></img>
                    </div>
                    <div className="col-right">
                      <span style={{ fontWeight: '200' }}>Tổng số tiền thanh toán: </span>
                      <span style={{ color: 'white' }}>
                        {formatVND(bill !== null ? bill : null)} VND
                      </span>
                    </div>
                    {/* <div className="col-right"><span style={{ fontWeight: '200' }}>Nội dung chuyển khoản: </span>  NW_{data !== null && data.data.data.code !== undefined ? data.data.data.code : null}</div> */}
                  </div>
                  <div className="d-flex justify-content-start align-items-center py-2 ml-4">
                    <div className="col-left mr-2">
                      <img
                        src={'https://api.newee.asia:8001/Photos/Product/637644552244427161.svg'}
                        alt="Newee supports"
                      ></img>
                    </div>
                    <div className="col-right">
                      <span style={{ fontWeight: '200' }}>
                        Đơn hàng sẽ được xử lý sau khi thanh toán được ghi nhận chuyển khoản thành
                        công.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="btn-groups">
                <button type="button" onClick={() => toggleModal6()} className="btn btn-light">
                  HUỶ THANH TOÁN
                </button>
                <button type="button" onClick={() => createBill()} className="btn btn-primary">
                  ĐÃ TIẾN HÀNH THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="form-container-fluid overlay-scrollbar">
      <Modal isOpen={true} toggle={toggleModal}>
        {loading === true ? <Loading /> : <FormBanks />}
      </Modal>
    </div>
  )
}

export default FormBank2
