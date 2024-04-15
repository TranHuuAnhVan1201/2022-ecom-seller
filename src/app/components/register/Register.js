import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import './Register.scss'

function Register(props) {
    const api = axios.create({
        baseURL: `https://103.15.50.190:5000/Newee/Seller/Register`,
    })
    const createUser = async (data) => {
        await api
            .post('/', data)
            .then((res) => {})
            .catch((err) => console.log(err))
    }

    const history = useHistory()
    const [check1, setCheck1] = useState(false)

    const [state, setState] = useState({
        imageCMND: [],
        imageAVT: [],
    })
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = (data) => {
        alert('Đăng ký thành công.')

        setState({
            ...state,
            data,
        })

        createUser(data)
		window.location.href = 'https://newee.asia/dangnhap.html'
        //history.push('/login')
    }
    console.log(errors)

    const uploadImage = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'laptop')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/cv-thav-herokuapp-com/image/upload',
            {
                method: 'POST',
                body: data,
            }
        )

        const file = await res.json()
        setCheck1(true)
        setState({
            ...state,
            imageCMND: [...state.imageCMND, `${file.secure_url}`],
        })
    }

    return (
        <section>
            <div className="register">
                <div className="register-container">
                    <Link to="/" className="btn-cancel">
                        X
                    </Link>
                    <div className="group-text">
                        <h2>Đăng Ký</h2>
                        <span>Nhanh chóng và dễ dàng</span>
                        <div className="group-span"></div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="tab-content">
                            <div className={'tab-step step-1'}>
                                <div className="form-controls" style={{ display: 'none' }}>
                                    <input
                                        type="text"
                                        name="Id"
                                        placeholder="Id"
                                        defaultValue="11231"
                                        ref={register({ required: true })}
                                    ></input>
                                </div>

                                <div className="form-controls">
                                    <input
                                        className="w-194"
                                        name="LastName"
                                        type="text"
                                        placeholder="Họ"
                                        ref={register({ required: true })}
                                    ></input>

                                    <input
                                        className="w-194"
                                        name="FirstName"
                                        type="text"
                                        placeholder="Tên"
                                        ref={register({ required: true })}
                                    ></input>
                                </div>
                                <div className="form-controls">
                                    <input
                                        type="tel"
                                        name="Phone"
                                        placeholder="Số điện thoại"
                                        ref={register({
                                            required: true,
                                            minLength: 10,
                                            maxLength: 12,
                                        })}
                                    ></input>
                                </div>
                                <div className="form-controls">
                                    <input
                                        type="text"
                                        name="Email"
                                        placeholder="Tài khoản Email"
                                        ref={register({
                                            required: true,
                                            minLength: 10,
                                            maxLength: 50,
                                            pattern: /^\S+@\S+$/i,
                                        })}
                                    ></input>
                                </div>
                                <div className="form-controls">
                                    <input
                                        type="password"
                                        name="Password"
                                        className="w-170"
                                        placeholder="Mật khẩu bao gồm chữ số, in hoa, ký tự đặt biệt"
                                        ref={register({
                                            required: true,
                                            minLength: 9,
                                            maxLength: 16,
                                        })}
                                    ></input>
                                </div>
                                <div className="form-controls">
                                    <input
                                        type="password"
                                        name="PasswordConfirm"
                                        className="w-170"
                                        placeholder="Mật khẩu mới"
                                        ref={register({
                                            required: true,
                                            minLength: 9,
                                            maxLength: 16,
                                        })}
                                    ></input>
                                </div>
                                <div className="form-controls">
                                    <label className="w-120">Ngày sinh</label>
                                    <input
                                        type="datetime"
                                        placeholder="28/03/2021"
                                        name="date-birthday"
                                        // ref={register({ required: true })}
                                    />
                                </div>
                                {/* <div
                  className="form-controls btn-right"
                  style={{ justifyContent: "flex-end" }}
                >
                  <button
                    type="submit"
                    className="btns-newee"
                    onClick={() => nextStep(2)}
                  >
                    Bước tiếp theo
                  </button>
                  
                </div> */}
                            </div>
                            <div className="tab-step step-2">
                                <div className="form-controls ">
                                    <div className="col-12">
                                        <label>Số chứng minh nhân dân</label>
                                        <input
                                            name="cmnd"
                                            type="text"
                                            placeholder="Nhập số CMND của bạn."
                                            // ref={register({ required: true, minLength: 9, maxLength: 12 })}
                                        ></input>
                                    </div>
                                </div>
                                <div className="form-controls">
                                    <div className="col">
                                        <label>Ngày cấp</label>
                                        <input
                                            className="w-194"
                                            name="DateTime"
                                            type="datetime"
                                            placeholder="28/03/2021"
                                            // ref={register({ required: true })}
                                        ></input>
                                    </div>
                                    <div className="col">
                                        <label>Nơi cấp</label>
                                        <input
                                            className="w-194"
                                            name="adress_CMND"
                                            type="text"
                                            placeholder="Tên"
                                            // ref={register({ required: true })}
                                        ></input>
                                    </div>
                                </div>
                                <div className="form-controls col">
                                    <label>Ảnh CMND - 2 mặt</label>
                                    <div className="register-img">
                                        <input
                                            id="upfile"
                                            name="file"
                                            type="file"
                                            multiple
                                            placeholder="Upload an Image !"
                                            onChange={uploadImage}
                                            // ref={register({ required: true})}
                                        />
                                        <div className="img-cmnd">
                                            {state.imageCMND.map((value, key) => {
                                                return (
                                                    <li key={key}>
                                                        <div className="img-tool">
                                                            <img
                                                                width={430}
                                                                height={200}
                                                                style={{ objectFit: 'contain' }}
                                                                src={check1 ? value : null}
                                                                alt="Newee"
                                                            ></img>
                                                            <div className="group-edit">
                                                                <div className="group-btn btn-delete">
                                                                    Xóa
                                                                </div>
                                                                <div className="btn-mg">|</div>
                                                                <div className="group-btn btn-edit">
                                                                    Sửa
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            {key === 0
                                                                ? 'CMND mặt trước'
                                                                : key === 1
                                                                ? 'CMND mặt sau'
                                                                : 'Ảnh đại diện'}
                                                        </p>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-controls col">
                                    <label className="policy">
                                        Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính
                                        sách dữ liệu và Chính sách cookie của chúng tôi. Bạn có thể
                                        nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ
                                        lúc nào.
                                    </label>
                                </div>
                                <div className="form-controls btn-sm">
                                    {/* <button
                    type="submit"
                    className="btns"
                    onClick={() => nextStep(1)}
                  >
                    Quay lại
                  </button> */}
                                    <input
                                        type="submit"
                                        className="btns-newee"
                                        placeholder="Đăng ký"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register
