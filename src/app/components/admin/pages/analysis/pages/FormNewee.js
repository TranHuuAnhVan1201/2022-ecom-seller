import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../_actions/custommer/isDisplayForm/DisplayForm";
import "./FormNewee.scss";
import Modal from "./modal";


function FormNewee(props) {
  let { info, list } = props;

  console.log('info',info);
  console.log('product',list);



  const isDisplayForm = useSelector((state) => state.isDisplayForm);
  const [isModalOpen, toggleModal] = useState(isDisplayForm);
  const dispatch = useDispatch();

  const toggleModal6 = () => {
    toggleModal(false);
    props.onSetLogged();
    dispatch(actions.closeForm());
  };

  const formatVND = (str) => {
    if (typeof str !== "string") {
      let toStr = String(str);
      

      
      if (toStr.split(".")[1] !== undefined) {
        return toStr.split(".")[0]
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ",") + prev;
        }) + "." + toStr.split(".")[1];
      } else {
        return toStr
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ",") + prev;
        })
      }
    }
  };

  return (
    <div className="form-container-fluid overlay-scrollbar">
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        {info !== null ?  <form className="sale-container" style={{ minWidth: '1024px' }}>
          <div className="d-flex justify-content-between align-items-center" style={{ paddingRight: "20px"}}>
            <h3>
              Chi tiết đơn hàng: <span className={`btn btn-${info !== null ? info.status : null}`}>#{info !== null ? info.code : info.fullName}{" - "} {info !== null ? info.status : null} </span>
            </h3>
            <h3>
              
              Ngày đặt hàng:{" "}
              {info.createTime.split("T")[0].split("-").reverse().join("/")}{"   "}
            </h3>
          </div>
          <div className="form-sale-container">
            <div className="col-container">
              <div className="row-sale d-flex">
                <div className="col-4">
                  <h3 className="title">ĐỊA CHỈ NGƯỜI NHẬN</h3>
                  <div className="row-sale-content">
                    <h3 className="title">Tên: {info !== null ? info.fullName : null}</h3>
                    <p>
                      Địa chỉ:{" "}
                      {info.address +
                        ", " +
                        info.pXa +
                        ", " +
                        info.qh +
                        ", " +
                        info.tp}
                    </p>
                    <p>Số điện thoại: {info.phone}</p>
                    
                  </div>
                </div>
                <div className="col-4">
                  <h3 className="title">HÌNH THỨC GIAO HÀNG</h3>
                  <div className="row-sale-content">
                    <p>Giao trước: Cập nhập</p>

                    <p>
                      Phí vận chuyển: {info.priceShip ? info.priceShip : 0} ₫
                    </p>
                  </div>
                </div>
                <div className="col-4">
                  <h3 className="title">HÌNH THỨC THANH TOÁN</h3>
                  <div className="row-sale-content">
                    <span>
                      {info.paymentType === "banks"
                        ? "Chuyển khoản qua ngân hàng"
                        : "Thanh toán tiền mặt khi nhận hàng"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h2>Sản phẩm</h2>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Ảnh sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Nhãn hiệu</th>
                        <th>Phân loại</th>
      
                        <th >Số lượng</th>
                        <th className="th-center">
                          Giá bán
                        </th>
                        <th className="th-center">
                          Hoa hồng
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      {list !== null
                        ? list.data.map((value, index) => {

                          return (
                            <tr key={index}>
                              <td>{index}</td>
                              <td >
                                <img
                                  src={value.link ? value.link : null}
                                  alt="Newee"
                                  width={90}
                                  height={90}
                                  style={{ objectFit: "contain" }}
                                ></img>
                              </td>
                              <td>{value.productName}</td>
                              <td>

                                {value.brand}
                              </td>
                              <td>

                                {value.variantName}
                              </td>

                              <td>
                                x{value.count}
                              </td>
                              <td className="td-right">
                                {formatVND(value.price)} ₫
                              </td>
                              <td className="td-right">
                                {formatVND(value.moneyReceived )} ₫
                              </td>

                            </tr>
                          );
                        })
                        : null}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={6} className="td-right">Phí vận chuyển: </td>
                        <td colSpan={2} className="td-right">{formatVND(info.priceShip)} ₫</td>

                      </tr>
                      <tr>
                        <td colSpan={6} className="td-right">Tổng chiết khấu Seller: </td>

                        <td className="td-right" colSpan={2}>
                          {formatVND(info.totalMoneyReceived)}
                          ₫
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={6} className="td-right">Tổng: </td>
                        <td className="td-right" colSpan={2}>{formatVND(info.totalPrice + info.priceShip)} ₫</td>
                      </tr>

                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="btn-groups">
                <button
                  type="button"
                  onClick={() => toggleModal6()}
                  className="btn btn-primary"
                >
                  Quay lại danh sách đơn hàng
                </button>
              </div>
            </div>
          </div>
        </form>
          : null
        }
       
      </Modal>
    </div>
  );
}

export default FormNewee;
