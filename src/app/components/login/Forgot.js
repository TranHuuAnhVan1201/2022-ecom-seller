import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import '../register/Register.scss'
import './Forgot.scss'

/**
 * A "leaf" node in the sourcemap tree, representing an original, unmodified
 * source file. Recursive segment tracing ends at the `OriginalSource`.
 */

/// A "leaf" node in the sourcemap tree, representing an original, unmodified

/** My function doing something...
    @param param1 first parameter
    @param param2 second parameter
    @return value return value
*/

/*!
 * Language
 * Declare the root class
 * \Class Language
 */

/*!
 * definitions is a property in the Language class
 * \property Definitions definitions
 */

/*!
 * Document the Definitions static class that used as property in the Language class
 * \Class Definitions
 */

/*!
 * Replaces strings
 * Document the static method for the Definitions class
 * \fn string replaceStrings(translation, parameters)
 * \memberof Definitions
 * \param string translation Translation string
 * \param array parameters (optional) List of parameters
 * \return string replaced string
 */

function Forgot(props) {
  const [role, setRole] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {
    alert('Email đã được gửi !')
  }
  console.log(errors)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setRole(true)

      // var decoded = jwt_decode(token);
      // setRole(decoded.role);
      // if (role === "admin") {
      //   console.log("đúng");
      // }
    }
  }, [])

  return (
    <section>
      <div className="register">
        <div className="register-container forgot">
          <Link to={role ? '/admin/users' : '/'} className="btn-cancel">
            X
          </Link>
          <div className="group-text">
            <h2>Tìm tài khoản của bạn</h2>
            <span>Nhanh chóng và dễ dàng</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4>Vui lòng nhập email để tìm kiếm tài khoản.</h4>
            <div className="form-controls ip-forgot">
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

            <div className="form-controls btn-sm forgot">
              <Link to="/" className="btns larger">
                Hủy
              </Link>
              <input
                type="submit"
                className="btns-newee"
                placeholder="Đăng ký"
                style={{ width: '200px' }}
                defaultValue="Quên mật khẩu"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Forgot
