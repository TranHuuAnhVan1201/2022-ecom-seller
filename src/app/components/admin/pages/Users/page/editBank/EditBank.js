import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import * as actions from '../../../../../../_actions/custommer/isDisplayForm/DisplayForm'
import FormBank from '../Form/FormBank'
import FormBankEdit from '../Form/FormBankEdit'

function EditBank(props) {
  const dispatch = useDispatch()

  const {
    user,
    cart: { cartItems, cartLength },
    userInfo,
  } = useSelector((state) => state.FetchAllProduct)

  const [logged, setlogged] = useState(false)
  const [edit, setEdit] = useState(false)
  const [id, setID] = useState('')

  const onEdit = (id, value) => {
    setEdit(true)
    setID(id)

    dispatch(actions.openForm())
  }
  const onAdd = (id) => {
    setID(id)
    setlogged(true)
    dispatch(actions.openForm())
  }
  const onSetLogged = () => {
    setlogged(false)
    setEdit(false)
  }
  const onReloadPage = (name) => {
    setlogged(false)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: name,
      showConfirmButton: false,
      timer: 1500,
    })
  }
  return (
    <div className="row">
      <div className="col-xl-12" style={{ padding: '0' }}>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Tài khoản ngân hàng</h4>
            <span>Thông tin tài khoản nhận chiết khấu hoa hồng từ Newee</span>
          </div>
          {logged === true ? (
            <FormBank id={id} onReload={onReloadPage} onSetLogged={onSetLogged}></FormBank>
          ) : null}
          {edit === true ? (
            <FormBankEdit id={id} onReload={onReloadPage} onSetLogged={onSetLogged}></FormBankEdit>
          ) : null}
          <div className="card-body">
            <div className="row">
              <div className="col-xl-6">
                <div className="wallet create" onClick={() => onEdit(1)}>
                  <div className="buttons">
                    <i className="fas fa-plus"></i>
                  </div>
                  <div className="desc">Thêm tài khoản ngân hàng</div>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="wallet create created" onClick={() => onEdit(2)}>
                  <div className="card">
                    <div className="bank-name" title="BestBank">
                      {userInfo.bankName !== '-1' ? userInfo.bankName : 'BANK'}
                    </div>
                    <div className="chip">
                      <div className="side left" />
                      <div className="side right" />
                      <div className="vertical top" />
                      <div className="vertical bottom" />
                    </div>
                    <div className="data">
                      <div className="pan" title="4123 4567 8910 1112">
                        {userInfo.accountNumber !== '-1'
                          ? userInfo.accountNumber
                          : '**** **** 8910 1112'}
                      </div>
                      <div className="first-digits">****</div>
                      <div className="exp-date-wrapper">
                        <div className="left-label">EXPIRES END</div>
                        <div className="exp-date">
                          <div className="upper-labels">MONTH/YEAR</div>
                          <div className="date" title="00/00">
                            {userInfo.issueMonth !== undefined && userInfo.issueYear
                              ? userInfo.issueMonth !== undefined && userInfo.issueYear
                              : '00/00'}
                          </div>
                        </div>
                      </div>
                      <div className="name-on-card" title="John Doe">
                        {userInfo.holderName ? userInfo.holderName : 'HO VA TEN '}
                      </div>
                    </div>
                    <div className="lines-down" />
                    <div className="lines-up" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBank
