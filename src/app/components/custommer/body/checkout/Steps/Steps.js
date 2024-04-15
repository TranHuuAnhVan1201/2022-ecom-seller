import React, { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./Steps.scss";

function Steps(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const Register = useSelector((state) => state.Register);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { Register },
  });

  const [state, setState] = useState({
    imageCMND: [],
    imageAVT: [],
  });

  const onSubmit = (data) => {
    alert("Cập nhập thông tin địa chỉ...");

    setState({
      ...state,
      data,
    });
    // history.push("/register/step-2");
  };
  console.log(errors);

  return (
    <section>
      <div className="register">
        <div className="register-container">
          <Link to="/" className="btn-cancel">
            X
          </Link>
          <div className="group-text">
            <h2>Đăng Ký Bước 1</h2>
            <span>Nhanh chóng và dễ dàng</span>
            <div className="group-span"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="tab-content">
              <div className={"tab-step step-1"}>
                <input
                  style={{ display: "none" }}
                  type="text"
                  name="Id"
                  placeholder="Id"
                  value="123"
                  defaultValue="11231"
                  ref={register({
                    required: true,
                  })}
                ></input>
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="District"
                  placeholder="District"
                  defaultValue="11231"
                  value="123"
                  ref={register({
                    required: true,
                  })}
                ></input>
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="Id"
                  placeholder="City"
                  defaultValue="11231"
                  value="123"
                  ref={register({
                    required: true,
                  })}
                ></input>
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="Commune"
                  placeholder="Commune"
                  value="123"
                  defaultValue="11231"
                  ref={register({
                    required: true,
                  })}
                ></input>
                {/* 2 */}
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="UrlIDCardBefore"
                  placeholder="UrlIDCardBefore"
                  value="123"
                  defaultValue="11231"
                  ref={register({
                    required: true,
                  })}
                ></input>
                {/* 3 */}
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="UrlIDCardAffter"
                  value="123"
                  placeholder="UrlIDCardAffter"
                  defaultValue="11231"
                  ref={register({
                    required: true,
                  })}
                ></input>
                {/* 4 */}
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="UrlAvatar"
                  placeholder="UrlAvatar"
                  value="123"
                  defaultValue="11231"
                  ref={register({
                    required: true,
                  })}
                ></input>
                {/* 5 */}
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="HolderName"
                  placeholder="HolderName"
                  value="123"
                  defaultValue="11231"
                  ref={register({
                    required: true,
                  })}
                ></input>
                {/* 6 */}
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="AccountNumber"
                  placeholder="AccountNumber"
                  value="123"
                  defaultValue="11231"
                  ref={register({
                    required: true,
                  })}
                ></input>
                {/* 7 */}
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="CardNumber"
                  placeholder="CardNumber"
                  value="123"
                  defaultValue="11231"
                  ref={register({
                    required: true,
                  })}
                ></input>
                {/* 8 */}
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="BankName"
                  placeholder="BankName"
                  value="123"
                  defaultValue="11231"
                  ref={register({
                    required: true,
                  })}
                ></input>
                {/* 9 */}
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="IssueMonth"
                  placeholder="IssueMonth"
                  value="11"
                  defaultValue="11"
                  ref={register({
                    required: true,
                  })}
                ></input>
                {/* 10 */}
                <input
                  style={{ display: "none" }}
                  // disabled
                  type="text"
                  name="IssueYear"
                  placeholder="IssueYear"
                  value="2021"
                  defaultValue="2021"
                  ref={register({
                    required: true,
                  })}
                ></input>
                {/* 11 */}
                <input
                  name="LastName"
                  type="text"
                  placeholder="Họ"
                  ref={register({
                    required: "Vui lòng nhập Họ từ 2 ký tự.",
                    // pattern: {
                    //   value: /[A-Za-z]+/,
                    //   message: "Sai định dạng.",
                    // },
                    min: {
                      value: 2,
                      message: "Gồm ít nhất 2 ký tự",
                    },
                    minLength: {
                      value: 2,
                      message: "Gồm ít nhất 2 ký tự.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Nhập quá số lượng tối đa 20 ký tự.",
                    },
                  })}
                ></input>
                <ErrorMessage errors={errors} name="LastName">
                  {({ messages }) => {
                    console.log(messages);
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                </ErrorMessage>
                {/* 12 */}
                <input
                  name="FirstName"
                  type="text"
                  placeholder="Tên"
                  ref={register({
                    required: "Vui lòng nhập Tên từ 2 ký tự.",
                    // pattern: {
                    //   value: /[A-Za-z]+/,
                    //   message: "Sai định dạng.",
                    // },
                    min: {
                      value: 2,
                      message: "Gồm ít nhất 2 ký tự",
                    },
                    minLength: {
                      value: 2,
                      message: "Gồm ít nhất 2 ký tự.",
                    },
                    maxLength: {
                      value: 30,
                      message: "Nhập quá số lượng tối đa 30 ký tự.",
                    },
                  })}
                ></input>
                <ErrorMessage errors={errors} name="FirstName">
                  {({ messages }) => {
                    console.log(messages);
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                </ErrorMessage>
                {/* 13 */}
                <input
                  type="tel"
                  name="Phone"
                  placeholder="Số điện thoại"
                  ref={register({
                    required: "Vui lòng nhập Số điện thoại từ 10 ký tự.",
                    pattern: {
                      value: /\d+/,
                      message: "Sai định dạng, chỉ gồm số...",
                    },
                    min: {
                      value: 10,
                      message: "Gồm ít nhất 10 ký tự",
                    },
                    minLength: {
                      value: 10,
                      message: "Gồm ít nhất 10 ký tự.",
                    },
                    maxLength: {
                      value: 12,
                      message: "Nhập quá số lượng tối đa 12 ký tự.",
                    },
                  })}
                ></input>

                <ErrorMessage errors={errors} name="Phone">
                  {({ messages }) => {
                    console.log(messages);
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                </ErrorMessage>
                {/* 14 */}
                <input
                  type="text"
                  name="Email"
                  placeholder="Tài khoản Email"
                  ref={register({
                    required: "Vui lòng nhập Email từ 10 ký tự.",
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: `Sai định dạng Email /^+@+$/`,
                    },
                    min: {
                      value: 10,
                      message: "Gồm ít nhất 10 ký tự",
                    },
                    minLength: {
                      value: 10,
                      message: "Gồm ít nhất 10 ký tự.",
                    },
                    maxLength: {
                      value: 50,
                      message: "Nhập quá số lượng tối đa 50 ký tự.",
                    },
                  })}
                ></input>
                <ErrorMessage errors={errors} name="Email">
                  {({ messages }) => {
                    console.log(messages);
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                </ErrorMessage>
                {/* 15 */}
                <input
                  type="password"
                  name="Password"
                  className="w-170"
                  placeholder="Mật khẩu bao gồm chữ số, in hoa, ký tự đặt biệt"
                  ref={register({
                    required: "Vui lòng nhập Password từ 10 ký tự.",
                    // pattern: {
                    //   value: /^\S+@\S+$/,
                    //   message: "Sai định dạng, chỉ gồm số...",
                    // },
                    min: {
                      value: 8,
                      message: "Gồm ít nhất 8 ký tự",
                    },
                    minLength: {
                      value: 8,
                      message: "Gồm ít nhất 8 ký tự.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Nhập quá số lượng tối đa 20 ký tự.",
                    },
                  })}
                ></input>

                <ErrorMessage errors={errors} name="Password">
                  {({ messages }) => {
                    console.log(messages);
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                </ErrorMessage>
                {/* 16 */}
                <input
                  type="password"
                  name="PasswordConfirm"
                  className="w-170"
                  placeholder="Mật khẩu mới"
                  ref={register({
                    required: "Vui lòng nhập PasswordConFirm từ 10 ký tự.",
                    // pattern: {
                    //   value: /^\S+@\S+$/,
                    //   message: "Sai định dạng, chỉ gồm số...",
                    // },
                    min: {
                      value: 8,
                      message: "Gồm ít nhất 8 ký tự",
                    },
                    minLength: {
                      value: 8,
                      message: "Gồm ít nhất 8 ký tự.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Nhập quá số lượng tối đa 20 ký tự.",
                    },
                  })}
                ></input>
                <ErrorMessage errors={errors} name="PasswordConfirm">
                  {({ messages }) => {
                    console.log(messages);
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                </ErrorMessage>
                {/* 17 */}
                <input
                  type="datetime"
                  name="DateBirthday"
                  className="w-170"
                  placeholder="Ngày sinh: 28/03/2021"
                  ref={register({
                    required: "Vui lòng nhập Ngày sinh: 28/03/2021.",
                    // pattern: {
                    //   value: /d+/,
                    //   message: "Sai định dạng, chỉ gồm số...",
                    // },
                    min: {
                      value: 10,
                      message: "Gồm ít nhất 10 ký tự",
                    },
                    minLength: {
                      value: 10,
                      message: "Gồm ít nhất 10 ký tự.",
                    },
                    maxLength: {
                      value: 12,
                      message: "Nhập quá số lượng tối đa 12 ký tự.",
                    },
                  })}
                ></input>
                <ErrorMessage errors={errors} name="DateBirthday">
                  {({ messages }) => {
                    console.log(messages);
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                </ErrorMessage>

                <div className="form-controls btn-sm">
                  <button
                    type="submit"
                    className="btns-newee"
                    placeholder="Đăng ký"
                  >
                    {" "}
                    Tiếp theo
                  </button>

                  {/* <input
                    type="submit"
                    className="btns-newee"
                    placeholder="Đăng ký"
                  /> */}
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
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Steps;
