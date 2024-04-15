import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { productApiPr } from "../../../../../../api/private";
import * as actions from "../../../../../_actions/custommer/isDisplayForm/DisplayForm";
import { CLEAR_CART } from "../../../../../_constants/ActionType";
import Loading from "./../../../../../_pages/loading/Loading";
import "./FormNewee.scss";
import Modal from "./modal";

function FormShare2(props) {
  let { data, totalPrice, listItems, totalPriceSeller, formBank } = props;

  const isDisplayForm = useSelector((state) => state.isDisplayForm);
  const [isModalOpen, toggleModal] = useState(isDisplayForm);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [backup2, setBackup2] = useState(data);

  const toggleModal6 = () => {
    toggleModal(false);
    props.onSetLogged();
    dispatch(actions.closeForm());
  };

  const createBill = async () => {
    console.log(data);

    setLoading(true);
    if (
      data.paymentType === "banks" ||
      data.paymentType === "bank-web-seller"
    ) {
      formBank(true);
    } else {
      try {
        const response = await productApiPr.createBillSeller(data);
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "CHÚC MỪNG NHÀ BÁN HÀNG ĐÃ CÓ ĐƠN HÀNG THÀNH CÔNG.",
          showConfirmButton: true,
          timer: 10000,
        });
        setLoading(false);
        dispatch({ type: CLEAR_CART });
        history.push("/");
      } catch (error) {
        console.log(error);
        alert(
          "Tạo đơn hàng không thành công! Vui lòng đăng nhập lại! Xin cảm ơn!"
        );
      }
    }
  };

  const formatVND = (str) => {
    if (typeof str !== "string") {
      let toStr = String(str);

      if (toStr.split(".")[1] !== undefined) {
        return (
          toStr
            .split(".")[0]
            .split("")
            .reverse()
            .reduce((prev, next, index) => {
              return (index % 3 ? next : next + ",") + prev;
            }) +
          "." +
          toStr.split(".")[1]
        );
      } else {
        return toStr
          .split("")
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ",") + prev;
          });
      }
    }
  };
  const FormShare2 = () => {
    return (
      <form className="sale-container">
        <div className="form-sale-container">
          <div className="col-container">
            <div className="row-sale">
              <div className="col-6">
                <h3 className="title">ĐỊA CHỈ NGƯỜI NHẬN</h3>
                <div className="row-sale-content">
                  <h3 className="title">Tên: {data.fullName}</h3>
                  <p>
                    Địa chỉ:{" "}
                    {data.address +
                      ", " +
                      data.pXa +
                      ", " +
                      data.qh +
                      ", " +
                      data.tp}
                  </p>
                  <p>Số điện thoại: {data.phone}</p>
                  <p>{data.note ? `Ghi chú: ` + `${data.note}` : null}</p>
                  {/* <p>Địa chỉ: Nguoi nhan</p> */}
                </div>
              </div>

              <div className="col-6">
                <h3 className="title">HÌNH THỨC THANH TOÁN</h3>
                <div className="row-sale-content">
                  <span>
                    {data.paymentType === "banks" ? (
                      <p>
                        Chuyển khoản qua ngân hàng.
                        <br />
                        Vui lòng liên hệ Hotline: 0375.456.729 để được hỗ trợ.
                      </p>
                    ) : (
                      "Thanh toán tiền mặt khi nhận hàng"
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h2>Sản phẩm</h2>
                <div className="bd-example">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Ảnh sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Phân loại</th>
                        <th>Số lượng</th>
                        <th className="th-center"> Đơn Giá</th>
                        <th className="th-center"> Thành tiền</th>
                        <th className="th-center">Số tiền nhận được</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listItems
                        ? listItems.map((value, index) => {
                            console.log(value);
                            return (
                              <tr key={index}>
                                <td>{index}</td>
                                <td>
                                  <img
                                    src={value.imageProduct}
                                    alt="Newee"
                                    width={95}
                                    height={95}
                                    style={{ objectFit: "contain" }}
                                  ></img>
                                </td>
                                <td>{value.productName}</td>
                                <td>{value.variantName}</td>

                                <td>x{value.count}</td>
                                <td className="td-right">
                                  {formatVND(
                                    value.priceDiscount > 0
                                      ? value.priceDiscount
                                      : value.price
                                  )}{" "}
                                  ₫
                                </td>
                                <td className="td-right">
                                  {formatVND(
                                    value.priceDiscount > 0
                                      ? value.totalPriceDiscount
                                      : value.totalPrice
                                  )}{" "}
                                  ₫
                                </td>
                                <td className="td-right">
                                  {formatVND(value.moneyReceived)} ₫
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={6} className="td-right">
                          Phí vận chuyển:{" "}
                        </td>
                        <td colSpan={2} className="td-right">
                          {data.priceShip || data.priceShip === 0
                            ? formatVND(data.priceShip)
                            : "cập nhập"}{" "}
                          ₫
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={6} className="td-right">
                          Tổng chiết khấu Seller:{" "}
                        </td>

                        <td colSpan={2} className="td-right">
                          {totalPriceSeller
                            ? formatVND(totalPriceSeller)
                            : "cập nhập"}{" "}
                          ₫
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={6} className="td-right">
                          Tổng:{" "}
                        </td>
                        <td
                          colSpan={2}
                          className="td-right"
                          style={{ fontWeight: "600" }}
                        >
                          {formatVND(
                            parseFloat(totalPrice) + parseFloat(data.priceShip)
                          )}{" "}
                          ₫
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="btn-groups">
              <button
                type="button"
                onClick={() => toggleModal6()}
                className="btn btn-light"
              >
                QUAY LẠI
              </button>
              <button
                type="button"
                onClick={() => createBill()}
                className="btn btn-primary"
              >
                HOÀN TẤT ĐƠN HÀNG
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="form-container-fluid overlay-scrollbar">
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        {loading ? <Loading /> : <FormShare2 />}
      </Modal>
    </div>
  );
}

export default FormShare2;
