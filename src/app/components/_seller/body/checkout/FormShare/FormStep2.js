import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./modal";

import * as actions from "../../../../../_actions/custommer/isDisplayForm/DisplayForm";
import * as action from "../../../../../_actions/custommer/products/product";
import "./FormNewee.scss";
import apiLocalhost0 from "../../../../../_untils/apiLocalhost0";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./FormBank.scss";
import line from "../../../../../../newee/supports/line.svg";
import logo from "../../../../../../newee/supports/thanhtoan.png";
import logo2 from "../../../../../../newee/supports/vanchuyen.png";
import Loading from "../../../../../_pages/loading/Loading";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "./FormStep.scss";

function FormStep2(props) {
  // let { data } = props;
  var data = "1";

  const isDisplayForm = useSelector((state) => state.isDisplayForm);
  const [isModalOpen, toggleModal] = useState(isDisplayForm);
  const [loading, setLoading] = useState(true);
  const [idBill, setIdBill] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const dataLogin = useSelector((state) => state.Login.dataLogin);
  // console.log(dataLogin);
  const [inputUser, setInputUser] = useState({});

  useEffect(() => {}, []);

  const toggleModal6 = () => {
    toggleModal(false);
    props.onSetLogged();
    dispatch(actions.closeForm());
    dispatch(action.ClearCart());
    history.push("/");
  };

  useEffect(() => {
    createTypeBank();
  }, []);
  const createTypeBank = () => {
    setLoading(false);
    return;
    apiLocalhost0(`Newee/Bill/CreateBill`, "POST", data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setIdBill(res.data.data.code);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        alert(
          "Tạo đơn hàng không thành công! Vui lòng đăng nhập lại! Xin cảm ơn!"
        );
      });
  };
  const editUser = () => {
    var data = {
      id: dataLogin.id,
      lastName: dataLogin.lastName,
      firstName: dataLogin.first,

      email: dataLogin.email,
      password: "",
      passwordConfirm: "",
      urlIDCardBefore: dataLogin.urlIDCardBefore,
      urlIDcCardAffter: dataLogin.urlIDcCardAffter,
      urlAvatar: dataLogin.urlAvatar,
      iDrecommend: dataLogin.iDrecommend,
      commune: dataLogin.commune,
      phone: state.phone,
    };
   

    apiLocalhost0(`Newee/SellerManager/edit`, "POST", data)
      .then((res) => {
        console.log(res);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const EditBank = () => {
    var data2 = {
      holderName: state.bankHolder,
      accountNumber: state.bankNumber,
      cardNumber: dataLogin.cardNumber ? dataLogin.cardNumber : "",
      bankName: state.bankName,
      issueMonth: 0,
      issueYear: 0,
    };
    console.log(data2);

    apiLocalhost0(`Newee/SellerManager/editPayProfile`, "POST", data2)
      .then((res) => {
        console.log(res);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const createBill = async () => {
    window.location.reload();
    history.push("/");
  };

  const Register = useSelector((state) => state.Register);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { Register },
  });

  const [current, setCurrent] = useState(0);

  const [state, setState] = useState({
    phone: dataLogin.phoneNumber,
    bankNumber: dataLogin.accountNumber,
    bankHolder: dataLogin.holderName,
    bankName: dataLogin.bankName,
  });
  const completeFormStep = async () => {
    setCurrent((cur) => cur + 1);
    console.log("data 2", state);
    if (current === 1) {
      await editUser();
      await EditBank();
    }
  };

  const fakeData = [
    { p: "Phone", span: "1" },
    { p: "Bank", span: "2" },
    { p: "Checkout", span: "3" },
  ];

  const onChangeValue = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    var name = e.target.name;
    var value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
    console.log(state);
  };

  return (
    <div className="form-container-fluid overlay-scrollbar">
      <Modal isOpen={true} toggle={toggleModal}>
        {loading === true ? (
          <Loading />
        ) : (
          <div className="sp-container-fluid form-bank form-steps">
            <div id="policy" className="py-lg-5 py-4">
              <div className="container steps">
                <div className="col m-auto py-2 text-justify">
                  <header>Form</header>

                  <div className="progress-bar">
                    {fakeData.map((item, key) => (
                      <div className="step" key={key}>
                        <p className={current > key ? "active" : " "}>
                          {item.p}
                        </p>
                        <div
                          className={current > key ? "bullet active" : "bullet"}
                        >
                          <span>{item.span}</span>
                        </div>
                        <div
                          className={
                            current > key
                              ? "check fas fa-check active"
                              : "check fas fa-check"
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="form-outer">
                    <form>
                      {current === 0 && (
                        <div className="page">
                          <div className="title">Số điện thoại:</div>
                          <div className="field">
                            <div className="label">Phone</div>
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              value={state.phone}
                              onChange={onChangeValue}
                              pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
                              required
                            />
                          </div>

                          <div className="field">
                            <button
                              className="firstNext next"
                              onClick={completeFormStep}
                            >
                              Tiếp theo
                            </button>
                          </div>
                        </div>
                      )}
                      {current === 1 && (
                        <div className="page">
                          <div className="title">Ngân hàng liên kết:</div>
                          <div className="field">
                            <div className="label">Tên chủ sở hữu</div>
                            <input
                              type="text"
                              name="bankHolder"
                              id="bankHolder"
                              value={state.bankHolder}
                              onChange={onChangeValue}
                              required
                            />
                          </div>
                          <div className="field">
                            <div className="label">Số tài khoản</div>
                            <input
                              type="Number"
                              name="bankNumber"
                              id="bankNumber"
                              value={state.bankNumber}
                              onChange={onChangeValue}
                              required
                            />
                          </div>
                          <div className="field">
                            <div className="label">Tên ngân hàng</div>
                            <input
                              type="text"
                              name="bankName"
                              id="bankName"
                              value={state.bankName}
                              onChange={onChangeValue}
                              required
                            />
                          </div>
                          <div className="field ">
                            {/* <button className="prev-1 prev">Previous</button> */}
                            <button
                              className="next-1 next"
                              onClick={completeFormStep}
                            >
                              Tiếp theo
                            </button>
                          </div>
                        </div>
                      )}

                      {current === 2 && (
                        <div className="page">
                          <div className="field">
                            <button
                              className="submit"
                              onClick={() => createBill()}
                            >
                              Tiếp tục Thanh toán
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FormStep2;
