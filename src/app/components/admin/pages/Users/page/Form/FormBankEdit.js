import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { adminApiPr, dataLoginApiPr } from '../../../../../../../api/private'
import * as actions from '../../../../../../_actions/custommer/isDisplayForm/DisplayForm'
import { USER_INFO } from '../../../../../../_constants/ActionType'
import './FormEditBank.scss'
import Modal from './modal'

function FormBankEdit(props) {
  const history = useHistory()
  const {
    user,
    cart: { cartItems, cartLength },
    userInfo,
  } = useSelector((state) => state.FetchAllProduct)

  const isDisplayForm = useSelector((state) => state.isDisplayForm)
  const [isModalOpen, toggleModal] = useState(isDisplayForm)
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    holderName: userInfo.holderName ? userInfo.holderName : '',
    accountNumber: userInfo.accountNumber ? userInfo.accountNumber : '',
    cardNumber: userInfo.cardNumber ? userInfo.cardNumber : '',
    bankName: userInfo.bankName ? userInfo.bankName : '',
    issueMonth: 0,
    issueYear: 0,
  })
  const toggleModal6 = () => {
    toggleModal(false)
    props.onSetLogged()
    dispatch(actions.closeForm())
  }

  function handleChangeValue(event) {
    event.preventDefault()
    var value = event.target.value
    setInput({
      ...input,
      [event.target.name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setInput({
      ...input,
    })
    console.log(input)

    EditBank(input)
  }

  const EditBank = async (data) => {
    var data2 = {
      ...input,
      issueMonth: parseInt(input.issueMonth),
      issueYear: parseInt(input.issueYear),
    }

    try {
      const response = await adminApiPr.bankEdit(data2)
      console.log('thanh cong')
      document.getElementById('bank-Edit').reset()
      toggleModal(false)
      props.onSetLogged()
      dispatch(actions.closeForm())
      const info = await dataLoginApiPr.getDataLogin()
      dispatch({ type: USER_INFO, info })
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="form-container-fluid overlay-scrollbar">
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <div className="newee-modal-edit">
          <div className="newee-modal-container">
            <div className="newee-edit-bank">
              {/* <div className="title">Tài khoản ngân hàng</div> */}
              <div className="container">
                <div className="newee-content">
                  <div>
                    <div className="newee-content-stage">
                      <h2>Tài khoản ngân hàng </h2>
                      <form onSubmit={handleSubmit} id="bank-Edit">
                        <div className="form-row">
                          <div
                            className="form-group col-xl-12 col-12 col-sm-12"
                            style={{ display: 'none' }}
                          >
                            <label className="mr-sm-2">Tài khoản</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Tài khoản *"
                              name="userName"
                              id="pw-userName"
                              value={userInfo.email}
                              defaultValue={userInfo.email}
                            ></input>
                          </div>
                          <div
                            className="form-group col-xl-12 col-12 col-sm-12"
                            style={{ display: 'none' }}
                          >
                            <label className="mr-sm-2">ID</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ID *"
                              name="id"
                              id="pw-id"
                              value={userInfo.id}
                              defaultValue={userInfo.id}
                            ></input>
                          </div>

                          {/* hiển thị  */}
                          <div
                            className="form-group col-xl-12 col-12 col-sm-12"
                            style={{ marginBottom: '0px' }}
                          >
                            <label className="mr-sm-2">
                              Tên chủ tài khoản * (Viết in hoa, không dấu - NGUYEN VAN A)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Tên chủ tài khoản"
                              name="holderName"
                              id="holderName"
                              value={input.holderName}
                              onChange={handleChangeValue}
                              required
                            ></input>
                          </div>

                          <div
                            className="form-group col-xl-12 col-12 col-sm-12"
                            style={{ marginBottom: '0px' }}
                          >
                            <label className="mr-sm-2">Số tài khoản *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Số tài khoản "
                              name="accountNumber"
                              id="accountNumber"
                              value={input.accountNumber}
                              onChange={handleChangeValue}
                              required
                            ></input>

                            {/* <div
                              className="form-group col-xl-6 col-6 col-sm-12"
                              style={{ marginBottom: "0px", opacity: "0" }}
                            >
                              <label className="mr-sm-2">Số thẻ *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Số thẻ "
                                name="cardNumber"
                                id="cardNumber"
                                value={input.cardNumber}
                                onChange={handleChangeValue}
                                // required
                              ></input>
                            </div> */}
                          </div>
                          {/* <div className="form-row">
                            <div
                              className="form-group col-xl-6 col-6 col-sm-12"
                              style={{ marginBottom: "0px" }}
                            >
                              <label className="mr-sm-2">Tháng *</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Tháng phát hành"
                                name="issueMonth"
                                id="issueMonth"
                                value={input.issueMonth}
                                onChange={handleChangeValue}
                                required
                              ></input>
                            </div>
                            <div
                              className="form-group col-xl-6 col-6 col-sm-12"
                              style={{ marginBottom: "0px" }}
                            >
                              <label className="mr-sm-2">Năm *</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Năm phát hành *"
                                name="issueYear"
                                id="issueYear"
                                value={input.issueYear}
                                onChange={handleChangeValue}
                                required
                              ></input>
                            </div>
                          </div> */}

                          <div
                            className="form-group col-xl-12 col-12 col-sm-12"
                            style={{ marginBottom: '0px' }}
                          >
                            <label className="mr-sm-2">Tên ngân hàng *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Tên ngân hàng"
                              name="bankName"
                              id="bankName"
                              value={input.bankName}
                              onChange={handleChangeValue}
                              required
                            ></input>
                          </div>
                          {/* <div
                            className="form-group col-xl-12 col-12 col-sm-12"
                            style={{ marginBottom: "0px" }}
                          >
                            <label className="mr-sm-2">Khu vực</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Khu vực"
                              name="bankNameArea"
                              id="bankNameArea"
                              value={input.bankNameArea}
                              onChange={handleChangeValue}
                            ></input>
                          </div>
                          <div
                            className="form-group col-xl-12 col-12 col-sm-12"
                            style={{ marginBottom: "0px" }}
                          >
                            <label className="mr-sm-2">
                              Tên chi nhánh ngân hàng (Theo thông tin trên sao
                              kê)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Khu vực *"
                              name="bankNameDetail"
                              id="bankNameDetail"
                              value={input.bankNameDetail}
                              onChange={handleChangeValue}
                            ></input>
                          </div> */}
                          <div className="col-12">
                            <button
                              type="button"
                              onClick={() => toggleModal6()}
                              className="btn btn-back waves-effect "
                            >
                              Quay lại
                            </button>
                            <button type="submit" className="btn btn-success waves-effect">
                              Lưu
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default FormBankEdit
