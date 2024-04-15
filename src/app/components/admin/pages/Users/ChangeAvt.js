import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../scss/pageAdmin.scss";
import "./Users.scss";
// import Product_Item from "./Users_Item";
// import Form from "./page/Form/Form";
import * as actions from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function ChangeAvt(props) {
  const dispatch = useDispatch();
  // hiển thị khi true
  const [logged, setlogged] = useState(false);
  const [id, setID] = useState("");
  const { register, handleSubmit, errors } = useForm({});

  //useEffect
  useEffect(() => {}, []);

  //// user
  const onSubmit = (data2) => {
    alert("Đã chạy");
  };

  /// user

  // xóa
  async function onDeleteId(id) {
    Swal.fire({
      title: "Bạn có muốn xóa không?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4333/product/av/${id}`).then(
          (data) => {
            // getUser();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Xóa thành công",
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (err) => {
            console.log("lỗi");
          }
        );
      }
    });
  }
  // sửa
  const onEdit = (id, value) => {
    setlogged(true);
    setID(id);
  };
  const onSetLogged = () => {
    setlogged(false);
  };
  const onReloadPage = (name) => {
    // getUser();
    setlogged(false);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: name,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  //viets một hàm onAdd
  const onAdd = (id) => {
    setID(id);
    setlogged(true);
    dispatch(actions.openForm());
  };

  return (
    <div className="body-cate users">
      <h2>Thay đổi ảnh đại diện</h2>

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
                  value: 32,
                },
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

export default ChangeAvt;
