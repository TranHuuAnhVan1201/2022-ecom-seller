import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import "./Login.scss";

function Login(props) {
  const { register, errors, handleSubmit } = useForm({
    criteriaMode: "all",
  });
  const history = useHistory();
  const api = axios.create({
    baseURL: `https://api.newee.asia:5001/Newee/Seller/Login/`,
  });
  const header = axios.create({
    baseURL: `https://api.newee.asia:5001/Newee/test2`,
  });
  const LoginUser = async (data, e) => {
    await api
      .post("/", data)
      .then((res) => {
        history.push(
          `/connect/${res.data.data.token}/${res.data.data.cart}/${res.data.data.idUser}`
        );
      })
      .catch((err) => console.log(err));
  };
  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data);
    LoginUser(data);

    author(data);
  };

  const author = async () => {
    await header
      .get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tokenSeller")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section>
      <div className="container-login">
        <div className="left"></div>
        <div className="right">
          <div className="card-body">
            <Link to="/" className="btn-cancel">
              X
            </Link>
            <h2>Đăng nhập</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                name="Username"
                type="text"
                placeholder="Email* newee_seller@gmail.com"
                ref={register({
                  required: "Vui lòng nhập tài khoản 6-30 ký tự.",
                  // pattern: {
                  //   value: /[A-Za-z]+/,
                  //   message: "Sai định dạng.",
                  // },
                  min: {
                    value: 5,
                    message: "Gồm ít nhất 5 ký tự",
                  },
                  minLength: {
                    value: 5,
                    message: "Gồm ít nhất 5 ký tự.",
                  },
                  maxLength: {
                    value: 30,
                    message: "Nhập quá số lượng tối đa 30 ký tự.",
                  },
                })}
              />
              <ErrorMessage errors={errors} name="Username">
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

              <input
                name="Password"
                type="password"
                placeholder="Mật khẩu* ví dụ: Newee_123"
                ref={register({
                  required: "Vui lòng nhập mật khẩu 6-30 ký tự.",
                  // pattern: {
                  //   value: /[A-Za-z]+/,
                  //   message: "Sai định dạng.",
                  // },
                  min: {
                    value: 6,
                    message: "Gồm ít nhất 6 ký tự",
                  },
                  minLength: {
                    value: 6,
                    message: "Gồm ít nhất 6 ký tự.",
                  },
                  maxLength: {
                    value: 30,
                    message: "Nhập quá số lượng tối đa 30 ký tự.",
                  },
                })}
              />
              <ErrorMessage errors={errors} name="Password">
                {({ messages }) => {
                  console.log(messages);
                  return (
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <span key={type}>{message}</span>
                    ))
                  );
                }}
              </ErrorMessage>

              <div className="option">
                <div className="checkbox forgot">
                  <Link to="/forgot">Quên mật khẩu?</Link>
                </div>
              </div>
              <button
                type="submit"
                className="btns larger submit btns-login-register"
              >
                Đăng nhập
              </button>

              <div className="user-dropdown login-register ">
                <Link
                  to="/login"
                  // onClick={(window.location.href = `https://newee.asia`)}
                  className="Userdropdown-button btns-fb"
                >
                  <p>
                    <img
                      width={32}
                      height={32}
                      src={
                        "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617120617/newee/wjycvjclpa015orqijvd.png"
                      }
                      alt="icon"
                    ></img>
                    <div className="mg-8"></div>
                    <span>Đăng nhập bằng Facebook</span>
                  </p>
                </Link>
                <Link to="/login" className="Userdropdown-button btns-google">
                  <p>
                    <img
                      width={32}
                      height={32}
                      src={
                        "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617120617/newee/nfxna33s6optwoxawhf5.png"
                      }
                      alt="icon"
                    ></img>
                    <div className="mg-8"></div>
                    <span>Đăng nhập bằng Gmail</span>
                  </p>
                </Link>
                <Link to="/login" className="Userdropdown-button btns-zalo">
                  <p>
                    <img
                      width={32}
                      height={32}
                      src={
                        "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617120617/newee/piq6k6u4gvzzdkwucfm9.png"
                      }
                      alt="icon"
                    ></img>
                    <div className="mg-8"></div>
                    <span>Đăng nhập bằng Zalo</span>
                  </p>
                </Link>
              </div>
            </form>
            <button className="btns larger btn-create">
              <Link to="/register">Tạo tài khoản mới</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
