import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as action from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
import imgBank from "./../../../../../newee/1108/banking.png";
import imgShip from "./../../../../../newee/1108/ship.png";
import "./Checkout.scss";
import Address from "./components/Address";
import FormBank from "./FormShare/FormBank";
import FormShare from "./FormShare/FormShare";





function Checkout2(props) {
  const listCarts = useSelector((state) => state.Shop);
  console.log('list Cart => ', listCarts);

  const [priceShipping, setPriceShipping] = useState(10000);
  const [priceShipping2, setPriceShipping2] = useState(0);

  // COMBO YEU CAU TP HCM
  const [combo, setCombo] = useState(false);

  let TotalCart = 0;
  let TotalPriceSeller = 0;


  if (listCarts.numberCart !== 0) {
    listCarts.Carts.forEach((e) => {
      // console.log(e)
      if (e.totalPriceDiscount > 0) {
        TotalCart += parseFloat(e.totalPriceDiscount);
        TotalPriceSeller += parseFloat(e.totalMoneyReceived);
      } else {
        TotalCart += parseFloat(e.totalPrice);
        TotalPriceSeller += parseFloat(e.totalMoneyReceived);
      }


    });
  }
  const arr2 = ["", "1", "2", "3", "4"];



  const dispatch = useDispatch();

  // xóa phần tử đầu tiên.

  // react hook form
  const [state, setState] = useState({ data: [] });
  const [array, setArray] = useState([""]);
  const [payment, setPayment] = useState("");

  const [dataTransfer, setDataTransfer] = useState([]);
  const [esc, setEsc] = useState(false);


  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");


  const getInfo = (province, town) => {
    setProvince(province);
    setTown(town);


    if (province === "Thành Phố Hồ Chí Minh"
      && town !== "Huyện Củ Chi"
      && town !== "Huyện Hóc Môn"
      && town !== "Huyện Nhà Bè"
      && town !== "Huyện Cần Giờ")
    {
      setPriceShipping(0);
    } else {
      setPriceShipping(20000);
    }

  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const CreateBill = async (bill) => {

    var data = {
      fullName: bill.FullName,
      address: bill.Address,
      note: bill.Note,
      phone: bill.Phone,
      idCartItem: array,

      tp: province,
      qh: town,
      pXa: bill.Address,

      paymentType: payment,
      priceShip: parseFloat(priceShipping),
    };

    if (province.length !== 0 && town.length !== 0) {
      console.log(data);
      setEsc(true);
      setDataTransfer(data);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin.");
    };
  }
  useEffect(() => {
    if (esc) {
      onEdit(1, dataTransfer);

    }
  }, [esc]);

  useEffect(() => {
    listCarts.Carts.forEach((element) => {
      array.push(`${element.id}`);
    });
    const arr4 = array.shift();
    setState({
      ...state,
    });
  }, []);

  // var a = {};
  const onSubmit = (data, e) => {
    e.preventDefault();
    CreateBill(data);
    setState({
      ...state,
      data,
    });
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

  const pay = (event) => {
    setPayment(`${event.target.value}`);
  };

  // form

  const [logged, setlogged] = useState(false);
  const [typeBank, setTypeBank] = useState(false);
  const [dataBank, setDataBank] = useState(null);
  const [edit, setEdit] = useState(false);
  const [idForm, setIDForm] = useState("");

  const onEdit = (idForm, value) => {
    setEdit(true);
    setIDForm(idForm);
    setlogged(true);
    dispatch(action.openForm());
  };
  const onAdd = (idForm) => {
    setIDForm(idForm);
    setlogged(true);
    dispatch(action.openForm());
  };
  const onSetLogged = () => {
    setlogged(false);
    setEdit(false);
    setEsc(false);
    setTypeBank(false);
  };
  const onReloadPage = (name) => {
    setlogged(false);
    setEsc(false);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: name,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const formBank = (data) => {
    setlogged(false);
    setlogged(false);
    setEdit(false);
    setEsc(false);
    console.log(data);
    setTypeBank(true);
    setDataBank(data);

  }
  const onReloadFormBank = () => {
    setTypeBank(false);
  }

  return (
    <div className="checkout">
      <section id="seller-checkout">
        <div className="checkout-wrap">
          <div className="left">
            <div className="left-header">
              <Link to="/">
                <h2>THÔNG TIN ĐƠN HÀNG CỦA NHÀ BÁN HÀNG</h2>
              </Link>
              {logged === true ? (
                <FormShare
                  id={idForm}
                  data={dataTransfer}
                  totalPrice={TotalCart}
                  totalPriceSeller={TotalPriceSeller}
                  listItems={listCarts.Carts}
                  onReload={onReloadPage}
                  onSetLogged={onSetLogged}
                  formBank = {formBank}
                ></FormShare>
              ) : null}
              {typeBank === true ? (
                <FormBank
                  onReloadFormBank={onReloadFormBank}
                  onSetLogged={onSetLogged}
                  data={dataBank !== null ? dataBank : null}
                ></FormBank>
              ) : null}


            </div>

            <div className="left-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="FullName"
                  type="text"
                  placeholder="Họ tên người nhận *"
                  required
                  ref={register({
                    required: "Vui lòng nhập tài khoản 6-30 ký tự.",
                    min: {
                      value: 2,
                      message: "Gồm ít nhất 5 ký tự",
                    },
                    minLength: {
                      value: 2,
                      message: "Gồm ít nhất 5 ký tự.",
                    },
                    maxLength: {
                      value: 50,
                      message: "Nhập quá số lượng tối đa 50 ký tự.",
                    },
                  })}
                />
                <input
                  name="Phone"
                  type="tel"
                  placeholder="Số điện thoại *"
                  required
                  ref={register({
                    required: "Vui lòng nhập tài khoản 10-11 ký tự số.",
                    min: {
                      value: 10,
                      message: "Gồm ít nhất 10 ký tự số",
                    },
                    minLength: {
                      value: 10,
                      message: "Gồm ít nhất 10 ký tự.",
                    },
                    maxLength: {
                      value: 15,
                      message: "Nhập quá số lượng tối đa 15 ký tự.",
                    },
                  })}
                />
                <input
                  name="Note"
                  type="text"
                  placeholder="Ghi chú về đơn hàng để Newee chăm sóc khách hàng của bạn tốt hơn."
                  ref={register({})}
                />

                <Address getInfo={getInfo} />

                <label>Địa chỉ cụ thể</label>
                <input
                  name="Address"
                  type="text"
                  placeholder="Địa chỉ nhận hàng cụ thể"
                  ref={register({
                    required: "Vui lòng nhập tài khoản 5-200 ký tự.",
                    min: {
                      value: 5,
                      message: "Gồm ít nhất 5 ký tự",
                    },
                    minLength: {
                      value: 5,
                      message: "Gồm ít nhất 5 ký tự.",
                    },
                    maxLength: {
                      value: 200,
                      message: "Nhập quá số lượng tối đa 200 ký tự.",
                    },
                  })}
                />

                <h3>Vận chuyển nhanh</h3>
                <div className="area-trans">
                  <img
                    src={
                      imgShip
                    }
                    alt="Newee"
                  ></img>
                  <p>
                    Newee cung cấp phương thức vận chuyển nhanh Grab/Nowship tới
                    các địa chỉ trong khu vực thành phố Hồ Chí Minh. Quý đối tác
                    muốn chọn vận chuyển nhanh, xin vui lòng liên hệ hotline{" "}
                    <span>0337.456.729</span> để được hỗ trợ.
                  </p>
                </div>
                <h3>Phương thức thanh toán</h3>
                <div className="area-payment">
                   <div className="area-payment-choose child-2">
                    <input
                      type="radio"
                      value="cod"
                      name="payment"
                      onClick={pay}
                      onChange={pay}
                      onTouchStart={pay}
                      title="Vui lòng chọn hình thức thanh toán"
                      required
                    />
                    <span>Thanh toán khi giao hàng (COD)</span>
                  </div>
                   <div className="d-flex-column active">
                    <span>
                      Trong thời gian nâng cấp hệ thống, Newee khuyến khích thanh toán bằng hình thức này.
                    </span>
                  </div>

                  <div className="area-payment-choose">
                    <input
                      type="radio"
                      value="banks"
                      name="payment"
                      onChange={pay}
                      onClick={pay}
                      onTouchStart={pay}
                      required
                      title="Vui lòng chọn hình thức thanh toán"
                    />

                    <span> Chuyển khoản qua ngân hàng</span>
                  </div>
                  <div className="d-flex-column active img">
                    <img src={imgBank} alt="newee checkout"></img>
                    <span>
                      Vui lòng liên hệ Hotline: 0337.456.729 để được hỗ trợ.
                    </span>
                  </div>
                 



                </div>

                <div className="btns-group d-flex-space-between">
                  <button type="button" className="btn btn-light">
                    <Link to="/cart">QUAY LẠI GIỎ HÀNG</Link>{" "}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="submitCheckout"
                  >
                    TIẾP TỤC
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="right">
            <div className="right-area">
              <ul>
                {listCarts
                  ? listCarts.Carts.map((value, key) => {
                    return (
                      <li className="d-flex-space-between" key={key}>
                        <div className="carts-product-left d-flex-center">
                          <div className="carts-product-left-thumbnail">
                            <img src={value.imageProduct} alt="Newee"></img>
                          </div>
                          <div className="item-info">
                            <h3>{value.productName}</h3>
                            <div className="item-desc">
                              <span className="variant-title">
                                {value.variantName}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="carts-product-right">
                          <span>{formatVND(value.totalPriceDiscount ? value.totalPriceDiscount : value.totalPrice)} ₫</span>
                        </div>
                      </li>
                    );
                  })
                  : null}
              </ul>
            </div>

            <div className="right-area">
              <ul>
                <li className="d-flex-space-between">
                  <div className="carts-product-left">
                    <span>Tạm tính</span>
                  </div>
                  <div className="carts-product-right">
                    <span>{formatVND(TotalCart)} ₫</span>
                  </div>
                </li>


                <li className="d-flex-space-between">
                  <div className="carts-product-left">
                    <span>
                      Phí vận chuyển khuyến mãi
                      <br />
                    </span>
                  </div>
                  <div className="carts-product-right">
                    <span>{formatVND(priceShipping)} ₫</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="right-area">
              <ul>
                <li className="d-flex-space-between">
                  <div className="carts-product-left">
                    <span className="content-p">Tổng cộng</span>
                  </div>
                  <div className="carts-product-right">
                    <span className="total">
                      {formatVND(
                        parseFloat(TotalCart) + parseFloat(priceShipping)
                      )}{" "}
                      ₫
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout2;

