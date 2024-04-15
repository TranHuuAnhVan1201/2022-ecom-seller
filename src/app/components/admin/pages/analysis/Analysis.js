import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as actions from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
import FormNewee from "../Sale/page/Form/FormNewee";
import "./Analysis.scss";

function Analysis(props) {
  const dispatch = useDispatch();
  const dataLogin = useSelector((state) => state.Login.dataLogin);
  const [active, setActie] = useState(false);
  const [activeLinks, setActiveLinks] = useState();
  const [revenueDay, setRevenueDay] = useState(0);
  const [revenueMonth, setRevenueMonth] = useState(0);
  const [revenueYear, setRevenueYear] = useState(0);
  const [time, setTime] = useState([]);
  const [totalMonth, setTotalMonth] = useState(0);
  const [listBill, setListBill] = useState([]);
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [check, setCheck] = useState(false);
  const [checked, setChecked] = useState(false);

  const [total, setTotal] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [totalKM, setTotalKM] = useState(0);

  //time
  const [timeDay, setTimeDay] = useState([]);

  // form
  const [logged, setlogged] = useState(false);
  const [id, setID] = useState("");
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    ListBill("SettlementPending");
    if (
      dataLogin.code &&
      parseInt(dataLogin.code.slice(2)) >= 2021000199 &&
      parseInt(dataLogin.code.slice(2)) <= 2021000219
    ) {
      setTotalKM(100000);
    }
  }, []);

  useEffect(() => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    setActiveLinks(0);
    RevenueDay();
    RevenueMonth(month, year);
    RevenueYear(year);

    setTime({
      day: day,
      month: month,
      year: year,
    });

    // ListBill("Delivered");
    var dateFormat = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    var dateUse = dateFormat.split("/").reverse().join("-");
    setTimeDay(dateUse);
    setTimeout(function () {
      filterList(dateUse);
    }, 200);
  }, [check]);

  const links = [
    {
      id: 1,
      nameVi: "Sẽ thanh toán",
      nameEn: "SettlementPending",
      className: "",
    },
    {
      id: 2,
      nameVi: "Đã thanh toán",
      nameEn: "DoneSettlement",
      className: "",
    },
  ];
  const onClickTime = (name, id) => {
    ListBill(name);
    setActiveLinks(id);
    setChecked(false);
  };
  const ListBill = async (status) => {
    await axios
      .get(
        `https://api.newee.asia:5001/Newee/Bill/GetListBillSeller/1000/1/${status}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("tokenSeller")}`,
          },
        }
      )
      .then((res) => {
        console.log("ress", res.data.data);
        if (res.data.data !== null) {
          setListBill(res.data.data.bills);
          var a = 0;
          var b = 0;
          res.data.data.bills.forEach((e) => {
            a += e.totalPrice;
            b += e.totalMoneyReceived;
            setTotal(a);
            setTotal2(b);
          });
        } else {
          setListBill([]);

          setTotal(0);
          setTotal2(0);
        }
      })
      .catch((err) => console.log(err.response));
  };
  const {
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {};

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
  const status = {};
  const RevenueDay = async () => {
    await axios
      .get(`https://api.newee.asia:5001/Newee/RevenueUser/Day`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("tokenSeller")}`,
        },
      })
      .then((res) => {
        setRevenueDay(res.data.data);
      })
      .catch((err) => console.log("Doanh thu lỗi => ", err.response));
  };

  const RevenueMonth = async (month, year) => {
    await axios
      .get(
        `https://api.newee.asia:5001/Newee/RevenueUser/DayOfMonth/${month}/${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("tokenSeller")}`,
          },
        }
      )
      .then((res) => {
        setRevenueMonth(res.data.data);
      })
      .catch((err) => console.log("RevenueMonth", err.response));
  };

  const RevenueYear = async (year) => {
    await axios
      .get(
        `https://api.newee.asia:5001/Newee/RevenueUser/MonthOfYear/${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("tokenSeller")}`,
          },
        }
      )
      .then((res) => {
        setRevenueYear(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  const filterList = (time) => {
    var array = listBill.filter(
      (item) => time === item.createTime.split("T")[0]
    );
    setList(array);
    setCheck(true);
    setChecked(true);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    filterList(e.target.value);
    setTimeDay(e.target.value);
  };

  const handleSubmitted = (e) => {
    e.preventDefault();
    const formValue = {
      date: input,
    };
    onSubmit(formValue);
    var split = input.split("-");
    RevenueDay();
    RevenueMonth(split[1], split[0]);
    RevenueYear(split[0]);
    setTime({
      day: split[2],
      month: split[1],
      year: split[0],
    });
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
  const onEdit = (id, value) => {
    setlogged(true);
    setID(id);
    var de = listBill.filter((item) => item.idBill === id);
    setDetail(de);
    dispatch(actions.openForm());
  };

  return (
    <div className="body-cate analysis">
      <h2>Tổng Quan</h2>
      {logged === true ? (
        <FormNewee
          id={id}
          data={detail}
          onReload={onReloadPage}
          onSetLogged={onSetLogged}
        ></FormNewee>
      ) : null}
      <div className="body-container analysis-container">
        <div className="left">
          <div className="left-col">
            <div className="row">
              <div className="col-xl-3 col-12">
                <h3 className="title">Doanh thu hôm nay</h3>

                <h3 className="title">{formatVND(revenueDay)} đ</h3>
              </div>

              <div className={totalKM !== 0 ? "col-xl-3 col-12" : "d-none"}>
                <h3
                  className="title"
                  style={{ textTransform: "uppercase", color: "red" }}
                >
                  Khuyến mãi đăng ký mới
                </h3>

                <h3 className="title">{formatVND(totalKM)} đ</h3>
              </div>
            </div>
          </div>

          <div className="left-col">
            <div className="left-col-group d-flex-space-between">
              <h3 className="title">Chi tiết</h3>
              <h3 className="d-none d-xl-none">Tìm kiếm đơn hàng</h3>
            </div>
            <nav>
              {links.map((value, key) => {
                return (
                  <li
                    onClick={() => onClickTime(value.nameEn, key)}
                    className={key === activeLinks ? "active" : ""}
                    key={key}
                  >
                    {value.nameVi}
                  </li>
                );
              })}
            </nav>

            <div className="analysis-search ">
              <div className="analysis-search-header">
                <div className="complex-date-picker">
                  <form id="search-time" onSubmit={handleSubmitted}>
                    <label>Thời gian: </label>
                    <input
                      id="today"
                      type="date"
                      name="datetime"
                      onChange={handleInputChange}
                    ></input>
                    <button type="submit" className="btns btns-larger">
                      Tìm kiếm
                    </button>
                  </form>
                </div>

                <div className="search-actions"></div>
              </div>

              <div className="bd-example">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Mã Đơn Hàng</th>
                      <th> Ngày đặt hàng</th>
                      <th> Địa chỉ người nhận</th>
                      <th>Trạng thái</th>
                      <th className="th-center">Tổng tiền</th>
                      <th className="th-center">Số tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listBill !== [] ? (
                      checked ? (
                        list.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td
                                className="td-id"
                                onClick={() => onEdit(value.idBill)}
                              >
                                {value.code ? value.code : value.idBill}
                              </td>
                              <td>{value.fullName}</td>
                              <td>
                                {" "}
                                {value.createTime
                                  .split("T")[0]
                                  .split("-")
                                  .reverse()
                                  .join("/")}
                              </td>

                              <td>
                                {value.status === "Delivered"
                                  ? "Hoàn thành"
                                  : "Đã thanh toán"}
                              </td>
                              <td>{formatVND(value.totalPrice)} ₫</td>
                              <td>{formatVND(value.totalMoneyReceived)} ₫</td>
                            </tr>
                          );
                        })
                      ) : (
                        listBill.map((value, index) => {
                          return (
                            <tr
                              key={index}
                              onClick={() => onEdit(value.idBill)}
                            >
                              <td className="td-id">
                                {value.code ? value.code : value.idBill}
                              </td>

                              <td>
                                {" "}
                                {value.createTime
                                  .split("T")[0]
                                  .split("-")
                                  .reverse()
                                  .join("/")}
                                {<br />}
                                {value.createTime.split("T")[1]}
                              </td>
                              <td>
                                {value.fullName +
                                  " - " +
                                  value.phone +
                                  " - " +
                                  value.address}
                              </td>
                              <td>
                                {value.status === "Delivered"
                                  ? "Hoàn thành"
                                  : "Đã thanh toán"}
                              </td>
                              <td className="td-right">
                                {formatVND(value.totalPrice)} ₫
                              </td>
                              <td className="td-right">
                                {formatVND(value.totalMoneyReceived)} ₫
                              </td>
                            </tr>
                          );
                        })
                      )
                    ) : (
                      <div>Không có dữ liệu</div>
                    )}
                  </tbody>

                  <tfoot>
                    <tr>
                      <td colSpan="4" className="td-right">
                        Tổng cộng:{" "}
                      </td>
                      <td colSpan="1" className="td-right">
                        {total !== 0 ? formatVND(total) : 0} ₫
                      </td>
                      <td className="td-right">
                        {total2 !== 0 ? formatVND(total2) : 0} ₫
                      </td>
                    </tr>
                    <tr className={totalKM !== 0 ? "" : "d-none"}>
                      <td colSpan="4" className="td-right">
                        Khuyến mãi đăng ký mới:{" "}
                      </td>
                      <td colSpan="2" className="td-right">
                        {total2 !== 0 ? formatVND(totalKM) : formatVND(totalKM)}{" "}
                        ₫
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4" className="td-right">
                        Đối tác nhận được:
                      </td>
                      <td colSpan="2" className="td-right font-weight-600">
                        {total2 !== 0
                          ? formatVND(total2 + totalKM)
                          : formatVND(0 + totalKM)}{" "}
                        ₫
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
