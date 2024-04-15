import React, { useEffect } from "react";

import "../scss/pageAdmin.scss";
import "./Users.scss";

import { useForm } from "react-hook-form";
function Users(props) {

  const { register, handleSubmit, errors } = useForm({});
  useEffect(() => {}, []);
  const onSubmit = (data2) => {
    alert("Đã chạy");
  };

  return (
    <div className="body-cate users">
      <h2>Cập nhập địa chỉ</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col">
          <div className="form-controls row">
            <label>Số nhà</label>
            <input
              name="address"
              type="text"
              placeholder="Số nhà"
             
              ref={register()}
            ></input>
          </div>
          <div className="form-controls row">
            <label>Tên đường</label>
            <input
              name="street"
              type="text"
              placeholder="Tên đường"
            
              ref={register()}
            ></input>
          </div>
          <div className="form-controls row">
            <label>Xã / Phường</label>
            <input
              name="ward"
              type="text"
              placeholder="Xã / Phường"
             
              ref={register()}
            ></input>
          </div>
          <div className="form-controls row">
            <label>Huyện / Quận</label>
            <input
              name="district"
              type="text"
              placeholder="Huyện / Quận"
           
              ref={register()}
            ></input>
          </div>
          <div className="form-controls row">
            <label>Tỉnh / Thành phố</label>
            <input
              name="city"
              type="text"
              placeholder="Tỉnh / Thành phố"
            
              ref={register()}
            ></input>
          </div>

          <div className="form-controls row">
            <button
              type="submit"
              className="btns-users-update"
              placeholder="Đăng ký"
            >
              Cập nhập địa chỉ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Users;
