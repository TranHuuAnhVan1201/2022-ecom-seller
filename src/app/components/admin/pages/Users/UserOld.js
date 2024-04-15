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
function Users(props) {
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
      <h2>Thông tin tài khoản</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col">
          <div className="form-controls row">
            <label>Họ tên</label>
            <input
              name="name"
              type="text"
              placeholder="Họ và tên ..."
              // ref={register({
              //   required: true,
              //   minLength: 9,
              //   maxLength: 16,
              // })}
              ref={register()}
            ></input>
          </div>
          <div className="form-controls row">
            <label>Số điện thoại</label>
            <input
              name="phone"
              type="tel"
              placeholder="Số điện thoại"
              // ref={register({
              //   required: true,
              //   minLength: 9,
              //   maxLength: 16,
              // })}
              ref={register()}
            ></input>
          </div>
          <div className="form-controls row">
            <label>Mã xác thực</label>
            <input
              name="token"
              type="text"
              placeholder="Mã xác thực"
              // ref={register({
              //   required: true,
              //   minLength: 9,
              //   maxLength: 16,
              // })}
              ref={register()}
            ></input>
          </div>

          <div className="form-controls row">
            <label>Email</label>
            <input
              name="Email"
              type="text"
              placeholder="Email..."
              // ref={register({
              //   required: true,
              //   minLength: 9,
              //   maxLength: 16,
              // })}
              ref={register()}
            ></input>
          </div>

          <div className="form-controls row">
            <label>Ngày sinh</label>
            <input
              name="birthday"
              type="text"
              placeholder="Ngày sinh"
              // ref={register({
              //   required: true,
              //   minLength: 9,
              //   maxLength: 16,
              // })}
              ref={register()}
            ></input>
          </div>

          <div className="form-controls row">
            <button
              type="submit"
              className="btns-users-update"
              placeholder="Đăng ký"
            >
              Cập nhập
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Users;
