import React, { useEffect } from "react";
import "../scss/pageAdmin.scss";
import "./Users.scss";
import { useForm } from "react-hook-form";

function ChangePassword(props) {
  const { register, handleSubmit } = useForm({});
  useEffect(() => {}, []);
  const onSubmit = (data2) => {
  };

  return (
    <div className="body-cate users">
      <h2>Thay đổi mật khẩu</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col">
          <div className="form-controls row">
            <label>Mật khẩu cũ</label>
            <input
              type="password"
              name="Password"
              placeholder="Mật khẩu cũ..."
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            ></input>
          </div>
          <div className="form-controls row">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="PasswordNew"
              placeholder="Mật khẩu mới từ 8 đến 32 ký tự"
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                maxLength: {
                  value: 32
                }
              })}
            ></input>
          </div>
          <div className="form-controls row">
            <label>Nhập lại</label>
            <input
              type="password"
              name="PasswordNewConfirm"
              placeholder="Nhập lại mật khẩu mới..."
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            ></input>
          </div>

          <div className="form-controls row">
            <button
              type="submit"
              className="btns-users-update"
              placeholder="Đăng ký"
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
