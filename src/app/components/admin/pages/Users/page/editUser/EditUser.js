import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import Address from '../components/Address'
import { adminApiPr } from '../../../../../../../api/private'

function EditUser(props) {
  const {
    user,
    cart: { cartItems, cartLength },
    userInfo,
  } = useSelector((state) => state.FetchAllProduct)

  const history = useHistory()
  const [input, setInput] = useState({
    id: '',
    userName: '',
    passOld: '',
    passNew: '',
    passNewConfirm: '',
  })
  const [inputUser, setInputUser] = useState({
    id: userInfo.id,
    lastName: userInfo.lastName,
    firstName: userInfo.first,
    phone: userInfo.phoneNumber,
    email: userInfo.email,
    password: '',
    passwordConfirm: '',
    urlIDCardBefore: '',
    urlIDcCardAffter: '',
    urlAvatar: '',
    iDrecommend: userInfo.iDrecommend,
    commune: userInfo.commune,
  })
  const [checkInputUser, setCheckInputUser] = useState(false)
  const [inputCMND, setInputCMND] = useState({
    urlIDCardBefore: userInfo.urlIDCardBefore !== undefined ? userInfo.urlIDCardBefore : '',
    urlIDCardAffter: userInfo.urlIDcCardAffter !== undefined ? userInfo.urlIDcCardAffter : '',
    urlAvatar: userInfo.urlAvatar ? userInfo.urlAvatar : '',
    cmndNgayCap: userInfo.cmndNgayCap !== undefined ? userInfo.cmndNgayCap : '',
    cmndSo: userInfo.cmndSo !== undefined ? userInfo.cmndSo : '',
    cmndNoiCap: userInfo.cmndNoiCap !== undefined ? userInfo.cmndNoiCap : '',
  })
  const [checkInputCMND, setCheckInputCMND] = useState(false)
  const [checkAddress, setCheckAddress] = useState(false)

  const [province, setProvince] = useState('')
  const [town, setTown] = useState('')
  const [address, setAddress] = useState(userInfo.commune)

  const [showSelect, setShowSelect] = useState(false)

  function handleChangeValue(event) {
    event.preventDefault()
    var value = event.target.value
    setInput({
      ...input,
      [event.target.name]: value,
    })
    // setValue('');
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setInput({
      ...input,
      id: userInfo.id,
      userName: userInfo.email,
    })

    PasswordEdit(input)
  }

  const PasswordEdit = async (data) => {
    var data2 = {
      ...input,
      id: userInfo.id,
      userName: userInfo.email,
    }
    try {
      const responsePwdEdit = await adminApiPr.passwordEdit(data2)
      document.getElementById('pw-Edit').reset()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đổi mật khẩu thành công.',
        showConfirmButton: false,
        timer: 1500,
      })
      // console.log(res);
      setInput({
        id: '',
        userName: '',
        passOld: '',
        passNew: '',
        passNewConfirm: '',
      })
    } catch (error) {
      alert('Xác nhận mật khẩu sai, vui lòng nhập lại xác nhận mật khẩu.')
    }
  }

  // edit user
  function handleChangeValueUser(event) {
    event.preventDefault()
    var value = event.target.value
    setInputUser({
      ...inputUser,
      [event.target.name]: value,
    })

    setCheckInputUser(true)
  }

  function handleChangeValueAddress(event) {
    event.preventDefault()
    var value = event.target.value

    setAddress(value)
    setCheckAddress(true)
  }

  // ADDRESS
  // HANDLE CHANGE VALUE ADDRESS ACTION
  const handleChangeValueAddressAction = async () => {
    // console.log('da chay123');
    var data2 = {
      district: town,
      city: province,
      commune: address,
      addressDetail: '',
    }

    try {
      const response = await adminApiPr.addressEdit(userInfo.id, data2)
      console.log('123', response)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sửa thông tin cá nhân thành công!',
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleSubmitUser = (event) => {
    event.preventDefault()

    if (checkAddress) {
      handleChangeValueAddressAction()

      setInputUser({
        ...inputUser,
      })

      EditUser(inputUser)
    }

    // console.log(inputUser);
    if (checkAddress || checkInputUser) {
      setInputUser({
        ...inputUser,
      })

      EditUser(inputUser)
    } else {
      alert('Chỉnh sửa thông tin 1 trong các trường sau: Họ, Tên, Số điện thoại, Email, Tên đường')
    }
  }

  const EditUser = async (data) => {
    var data2 = {
      ...inputUser,
    }
    try {
      const response = await adminApiPr.userEdit(data2)
      console.log('editUser', response)
      document.getElementById('edit-user').reset()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sửa thông tin cá nhân thành công.',
        showConfirmButton: true,
        timer: 1500,
      })
      history.push('/')
    } catch (error) {
      console.log('Edit - user', error)
    }
  }

  function handleChangeValueCMND(event) {
    event.preventDefault()
    var value = event.target.value
    setInputCMND({
      ...inputCMND,
      [event.target.name]: value,
    })

    setCheckInputCMND(true)
  }

  const handleSubmitCMND = (event) => {
    event.preventDefault()

    if (checkInputUser) {
      // console.log('inputUser => ', inputUser);
      EditUser()
    }

    if (checkInputCMND) {
      setInputCMND({
        ...inputCMND,
      })

      EditCMND(inputCMND)
    } else {
      alert(
        'Chỉnh sửa thông tin 1 trong các trường sau: CMND mặt trước, mặt sau, số CMND, nơi cấp, ngày cấp'
      )
    }
  }

  const EditCMND = async (data) => {
    var data2 = {
      ...inputCMND,
    }

    try {
      await adminApiPr.imagesEdit(data2)
      document.getElementById('edit-user').reset()

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sửa thông tin thành công.',
        showConfirmButton: true,
        timer: 5500,
      })
    } catch (error) {
      console.log('EditCMND', error)
    }
  }

  var file = new FormData()

  const uploadImageAfter = async (e) => {
    var fileValue = e.target.files[0]
    console.log(fileValue)
    file.append('File', fileValue, fileValue.name)
    file.append('Type', 'IdCard')

    console.log(file)

    axios({
      url: 'https://api.newee.asia:8001/upload-image',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: file,
    }).then(function (response) {
      alert(response.data)
      console.log(response.data)

      setInputCMND({
        ...inputCMND,

        urlIDCardAffter: `${response.data}`,
      })
      setCheckInputCMND(true)
    })
  }

  const uploadImageBefore = async (e) => {
    var fileValue = e.target.files[0]
    console.log(fileValue)
    file.append('File', fileValue, fileValue.name)
    file.append('Type', 'IdCard')

    console.log(file)

    axios({
      url: 'https://api.newee.asia:8001/upload-image',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: file,
    }).then(function (response) {
      alert(response.data)

      setInputCMND({
        ...inputCMND,
        urlIDCardBefore: `${response.data}`,
      })
      setCheckInputCMND(true)
    })
  }

  const EditImageUser = async (e) => {
    e.preventDefault()
    // alert('da chay 123  ')

    var fileValue = e.target.files[0]
    console.log(fileValue)
    file.append('File', fileValue, fileValue.name)
    file.append('Type', 'Avatar')

    console.log(file)

    axios({
      url: 'https://api.newee.asia:8001/upload-image',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: file,
    }).then(function (response) {
      alert(response.data)

      setInputCMND({
        ...inputCMND,

        urlAvatar: `${response.data}`,
      })

      setCheckInputCMND(true)
    })
  }

  // DIA CHI
  const getInfo = (province, town) => {
    setProvince(province)
    setTown(town)
  }

  return (
    <div className="row">
      <div className="col-xl-6 col-12 col-xs-12 px-sx-0" style={{ padding: '0' }}>
        <div className="card">
          <div className="card-header mx-3 mx-xs-0">
            <h4 className="card-title">THÔNG TIN NHÀ BÁN HÀNG</h4>
          </div>
          <div className="card-body px-3 px-xs-0">
            <form onSubmit={handleSubmitCMND}>
              <div className="form-row">
                <div className="form-group col-xl-12 col-12 col-sm-12">
                  <label className="mr-sm-2">MÃ NHÀ BÁN HÀNG</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={userInfo.code}
                    disabled
                  ></input>
                  <label className="mr-sm-2" style={{ paddingTop: 10 }}>
                    Mã giới thiệu
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mã giới thiệu"
                    name="iDrecommend"
                    value={inputUser.iDrecommend}
                    onChange={handleChangeValueUser}
                    required
                  />
                </div>
                <div className="form-group col-xl-12 col-12 col-sm-12">
                  <div className="media align-items-center mb-3">
                    <div
                      style={{
                        width: '55px',
                        height: '55px',
                        marginRight: '16px',
                      }}
                    >
                      <img
                        className="mr-3 rounded-circle mr-0 mr-sm-3"
                        width={55}
                        height={55}
                        alt="Newee"
                        src={
                          userInfo.urlAvatar === '00' || userInfo.urlAvatar === undefined
                            ? 'https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1621012975/emcjektthqyl33ptb4oa.png'
                            : userInfo.urlAvatar
                        }
                      ></img>
                    </div>
                    <div className="media-body">
                      <h4 className="mb-0"> {userInfo.lastName + ' ' + userInfo.first}</h4>
                      <p className="mb-0">Ảnh đại diện</p>
                    </div>
                  </div>
                  <div className="file-upload-wrapper" data-text="Chọn ảnh đại diện ...">
                    <input
                      name="file-upload-field"
                      type="file"
                      className="file-upload-field"
                      // value=""
                      onChange={EditImageUser}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-success waves-effect"

                    // onClick={EditCMND}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-12 area-password" style={{ padding: '0' }}>
        <div className="card">
          <div className="card-header px-xs-0 mx-3 mx-xs-0 ">
            <h4 className="card-title">Đổi mật khẩu</h4>
          </div>
          <div className="card-body px-3 px-xs-0 mx-xs-0 ">
            <form onSubmit={handleSubmit} id="pw-Edit">
              <div className="form-row">
                <div className="form-group col-xl-12 col-12 col-sm-12" style={{ display: 'none' }}>
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
                <div className="form-group col-xl-12 col-12 col-sm-12" style={{ display: 'none' }}>
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

                <div className="form-group col-xl-12 col-12 col-sm-12">
                  <label className="mr-sm-2">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu hiện tại *"
                    name="passOld"
                    id="pw-passOld"
                    value={input.passOld}
                    onChange={handleChangeValue}
                    required
                  ></input>
                </div>
                <div className="form-group col-xl-12 col-12 col-sm-12">
                  <label className="mr-sm-2">Mật khẩu mới *</label>
                  <input
                    type="password"
                    className="form-control"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$"
                    title="Mật khẩu gồm chữ in hoa, chữ thường, số (0-9), ký tự đặc biệt (@$!%*?&amp;_) (ví dụ: Seller@123)"
                    placeholder="Mật khẩu mới *"
                    name="passNew"
                    id="pw-passNew"
                    value={input.passNew}
                    onChange={handleChangeValue}
                    required
                  ></input>
                </div>
                <div className="form-group col-xl-12 col-12 col-sm-12">
                  <label className="mr-sm-2">Xác nhận Mật khẩu mới *</label>
                  <input
                    type="password"
                    className="form-control"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$"
                    title="Mật khẩu gồm chữ in hoa, chữ thường, số (0-9), ký tự đặc biệt (@$!%*?&amp;_) (ví dụ: Seller@123)"
                    placeholder="Xác nhận mật khẩu mới *"
                    name="passNewConfirm"
                    id="pw-passNewConfirm"
                    value={input.passNewConfirm}
                    onChange={handleChangeValue}
                    required
                  ></input>
                </div>

                <div className="col-12">
                  <button className="btn btn-success waves-effect">Lưu</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-xl-6"></div>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header px-xs-0 mx-3 mx-xs-0">
            <h4 className="card-title">
              <font style={{ verticalAlign: 'inherit' }}>
                <font style={{ verticalAlign: 'inherit' }}>Thông tin cá nhân</font>
              </font>
            </h4>
          </div>
          <div className="card-body px-xs-0 mx-xs-0">
            <form
              onSubmit={handleSubmitUser}
              method="post"
              name="myform2"
              className="personal_validate"
              noValidate="novalidate"
              id="edit-user"
            >
              <div className="form-row">
                <div className="form-group col-xl-6 col-6 col-sm-12">
                  <label className="mr-sm-2">Họ *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ"
                    value={inputUser.firstName}
                    name="firstName"
                    onChange={handleChangeValueUser}
                    required
                  />
                </div>
                <div className="form-group col-xl-6 col-6 col-sm-12">
                  <label className="mr-sm-2">Tên *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên"
                    name="lastName"
                    value={inputUser.lastName}
                    onChange={handleChangeValueUser}
                    required
                  />
                </div>
                <div className="form-group col-xl-6 col-6 col-sm-12">
                  <label className="mr-sm-2">Phone *</label>
                  <input
                    type="phone"
                    className="form-control"
                    placeholder="0972 197 029"
                    name="phone"
                    value={inputUser.phone}
                    onChange={handleChangeValueUser}
                    required
                  />
                </div>
                <div className="form-group col-xl-6 col-6 col-sm-12">
                  <label className="mr-sm-2">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="admin_seller@gmai.com"
                    name="email"
                    value={inputUser.email}
                    onChange={handleChangeValueUser}
                    required
                  />
                </div>

                {showSelect === true ? (
                  <div style={{ width: '100%' }}>
                    <Address getInfo={getInfo} />
                  </div>
                ) : (
                  <>
                    <div className="form-group col-xl-6 col-6 col-sm-12">
                      <label className="mr-sm-2">Tỉnh / Thành Phố</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Hồ Chí Minh"
                        name="City"
                        value={userInfo.city}
                        // disabled
                        onClick={() => setShowSelect(true)}
                      />
                    </div>
                    <div className="form-group col-xl-6 col-6 col-sm-12">
                      <label className="mr-sm-2">Quận / Huyện</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Bình Thạnh"
                        name="District"
                        value={userInfo.district}
                        // disabled
                        onClick={() => setShowSelect(true)}
                      />
                    </div>
                  </>
                )}

                <div className="form-group col-xl-6 col-6 col-sm-12">
                  <label className="mr-sm-2">Đường</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="438 Nơ Trang Long"
                    name="commune"
                    value={address}
                    onChange={handleChangeValueAddress}
                    // required
                    // disabled
                  />
                </div>

                <div className="form-group col-12 col-sm-12">
                  <button type="submit" className="btn btn-success pl-5 pr-5 waves-effect">
                    Lưu
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-xl-12">
        <div className="card">
          <div className="card-header px-xs-0 mx-3 mx-xs-0">
            <h4 className="card-title">
              <font style={{ verticalAlign: 'inherit' }}>
                <font style={{ verticalAlign: 'inherit' }}>Chứng minh nhân dân</font>
              </font>
            </h4>
          </div>
          <div className="card-body px-xs-0 mx-xs-0">
            <form
              method="post"
              name="myform"
              className="personal_validate"
              noValidate="novalidate"
              onSubmit={handleSubmitCMND}
            >
              <div className="form-row">
                <div className="form-group col-xl-6 col-6 col-sm-12">
                  <label className="mr-sm-2">Số chứng minh nhân dân</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số CMND"
                    name="cmndSo"
                    value={inputCMND.cmndSo}
                    onChange={handleChangeValueCMND}
                    required
                  />
                </div>

                <div className="form-group col-xl-6 col-6 col-sm-12">
                  <label className="mr-sm-2">Nơi cấp</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nơi cấp"
                    name="cmndNoiCap"
                    value={inputCMND.cmndNoiCap}
                    onChange={handleChangeValueCMND}
                    required
                  />
                </div>
                <div className="form-group col-xl-6 col-6 col-sm-12">
                  <label className="mr-sm-2">Ngày cấp</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ngày cấp"
                    name="cmndNgayCap"
                    value={inputCMND.cmndNgayCap}
                    onChange={handleChangeValueCMND}
                    required
                  />
                </div>

                <div
                  className="form-group col-xl-6 col-6 col-sm-12 d-none d-md-none d-xl-none"
                  style={{ opacity: '0' }}
                >
                  <label className="mr-sm-2">Ngày cấp</label>
                  <input type="text" className="form-control" />
                </div>

                {/* test o day */}
                <div className="form-group col-xl-6 col-12 col-sm-12">
                  <label className="mr-sm-2">Ảnh CMND mặt sau</label>
                  <div className="value" id="value-after">
                    <div className="input-group js-input-file">
                      <input
                        id="image-after"
                        name="file"
                        type="file"
                        multiple
                        placeholder="Upload an Image !"
                        onChange={uploadImageAfter}
                      />

                      <div
                        id="img-after"
                        className={
                          inputCMND.urlIDCardAffter !== 'undefined' ||
                          inputCMND.urlIDCardAffter !== undefined
                            ? 'label--file edit'
                            : 'label--file'
                        }
                        for="file"
                        onClick="document.getElementById('image-after').click()"
                      >
                        <div className="layout-1">
                          <img
                            src="https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1621137479/iqszd6ide3fsanldyeui.png"
                            width={24}
                            height={24}
                            alt="Newee"
                          ></img>
                          <span>CMND mặt trước</span>
                        </div>
                        <div className="layout-2">
                          <div className="group-edit">
                            <div>CMND mặt trước</div>
                          </div>
                        </div>
                        {userInfo.urlIDcCardAffter !== 'undefined' ||
                        userInfo.urlIDcCardAffter !== undefined ? (
                          <div className id="container-after">
                            <div className="image_container image-cmnd d-flex justify-content-center position-relative">
                              <img
                                src={
                                  inputCMND.urlIDCardAffter === undefined
                                    ? 'http://placehold.jp/440x150.png'
                                    : inputCMND.urlIDCardAffter
                                }
                                alt="Newee"
                              />
                              <span className="position-absolute" onclick="delete_image(1)"></span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group col-xl-6 col-12 col-sm-12">
                  <label className="mr-sm-2">Ảnh CMND mặt sau</label>
                  <div className="value" id="value-before">
                    <div className="input-group js-input-file">
                      <input
                        id="image-before"
                        name="file"
                        type="file"
                        multiple
                        placeholder="Upload an Image !"
                        onChange={uploadImageBefore}
                      />

                      <div
                        id="img-before"
                        className={
                          userInfo.urlIDCardBefore !== 'undefined' ||
                          userInfo.urlIDCardBefore !== undefined
                            ? 'label--file edit'
                            : 'label--file'
                        }
                        for="file"
                        onClick="document.getElementById('image-before').click()"
                      >
                        <div className="layout-1">
                          <img
                            src="https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1621137479/iqszd6ide3fsanldyeui.png"
                            width={24}
                            height={24}
                            alt="Newee"
                          ></img>
                          <span>CMND mặt sau</span>
                        </div>
                        <div className="layout-2">
                          <div className="group-edit">
                            <div>CMND mặt sau</div>
                          </div>
                        </div>
                        {userInfo.urlIDCardBefore !== 'undefined' ||
                        userInfo.urlIDCardBefore !== undefined ? (
                          <div className id="container-after">
                            <div className="image_container image-cmnd d-flex justify-content-center position-relative">
                              <img
                                src={
                                  inputCMND.urlIDCardBefore === undefined ||
                                  inputCMND.urlIDCardBefore === 'undefined'
                                    ? 'http://placehold.jp/440x150.png'
                                    : inputCMND.urlIDCardBefore
                                }
                                alt="Newee"
                              />
                              <span className="position-absolute" onclick="delete_image(1)"></span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12 col-sm-12">
                  <button type="submit" className="btn btn-success pl-5 pr-5 waves-effect">
                    Lưu
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
