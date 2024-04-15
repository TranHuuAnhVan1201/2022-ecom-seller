import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as actions from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
import apiLocalhost0 from "../../../../_untils/apiLocalhost0";
import "./Analysis.scss";
import FormNewee from "./pages/FormNewee";

function AnalysisBank(props) {
  const dispatch = useDispatch();

  const {
    user,
    cart: { cartItems, cartLength },
    userInfo,
  } = useSelector((state) => state.FetchAllProduct);

  console.log(user);
  console.log(userInfo);
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

  const [dataPerson, setDataPerson] = useState(null);
  const [moneyPerson, setMoneyPerson] = useState({
    total: 0,
    promotion: 0,
  });
  const [dataPersonAll, setDataPersonAll] = useState(null);
  const [dataGroup, setDataGroup] = useState(null);
  const [dataGroupAll, setDataGroupAll] = useState(null);
  const [route, setRoute] = useState("Person");

  const [info, setInfo] = useState(null);
  const [listProduct, setListProduct] = useState(null);

  // TIME
  const [timeFilter, setTimeFilter] = useState(null);
  const [monthFilter, setMonthFilter] = useState(null);

  useEffect(() => {
    ListBill("SettlementPending");
    if (
      user.codeSeller &&
      parseInt(user.codeSeller.slice(2)) >= 2021000199 &&
      parseInt(user.codeSeller.slice(2)) <= 2021000219
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
      nameVi: "Doanh thu Cá nhân",
      nameEn: "SettlementPending",
      className: "",
      route: "Person",
    },
    {
      id: 2,
      nameVi: "Doanh thu Nhóm",
      nameEn: "DoneSettlement",
      className: "",
      route: "Group",
    },
  ];
  const onClickTime = (name, id, route) => {
    // ListBill(name);
    setActiveLinks(id);
    setChecked(false);
    setRoute(route);

    console.log(route);
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
    return str.toLocaleString("IT-it", { style: "currency", currency: "VND" });
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
      .get(`http:/localhost:5000/Newee/RevenueUser/MonthOfYear/${year}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("tokenSeller")}`,
        },
      })
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
    console.log("ngay", e.target.value);
    setTimeFilter(e.target.value);
    setMonthFilter(e.target.value.split("-")[1]);

    setInput(e.target.value);
    filterList(e.target.value);
    setTimeDay(e.target.value);
  };

  const handleSubmitted = (e) => {
    e.preventDefault();
    // console.log('da chay ngay => ', timeFilter);
    // console.log(input);
    // console.log('data person',dataPerson);
    var array = dataPerson.data;

    var filter = array.filter(
      (item) => item.createTime.split("-")[1] === monthFilter
    );
    // console.log(filter);

    setDataPerson({
      ...dataPerson,
      data: filter,
    });
    // console.log(dataPerson.data.length);

    // console.log(monthFilter);
    // console.log(typeof monthFilter);
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

    GetDetails(id);
    GetDetailProduct(id);

    dispatch(actions.openForm());
  };

  useEffect(() => {
    GetListBillMONEY();
    GetListBillMONEYGroup();
  }, []);

  const [moneyGroups, setMoneyGroups] = useState(0);

  // 1 - doanh thu ca nhan
  const GetListBillMONEY = async (codeSeller) => {
    apiLocalhost0(
      `newee/bill-plus/getlist-billby-codeseller?codeSeller=${user.codeSeller}`,
      "GET",
      null
    )
      .then((res) => {
        console.log("1.1 - Doanh thu ca nhan => ", res);

        console.log("1.1 => ", res.data.data[0].revenue);

        // res.data.data.forEach(e=> {
        //   console.log(e.revenue);
        // });
        var total = 0;
        var promotion = 0;
        res.data.data.forEach((element) => {
          total += element.revenue;
          promotion += element.moneyReceived;
        });

        setMoneyPerson({
          total: total,
          promotion: promotion,
        });

        setDataPerson(res.data);
        setDataPersonAll(res.data);
      })
      .catch((err) => console.log(err.response));
  };
  const GetListBillMONEYGroup = (codeSeller) => {
    apiLocalhost0(
      `newee/bill-plus/getlist-billby-codereferal?codeReferal=${user.codeSeller}`,
      "GET",
      null
    )
      .then((res) => {
        console.log(" 2 - Doanh thu Group => ", res);
        var a = 0;
        res.data.data.forEach((element) => {
          a += element.moneyReceived;
        });
        setMoneyGroups((a * 5) / 100);
        setDataGroup(res.data);
        setDataGroupAll(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  // 2 - DANH SÁCH CÁ NHÂN
  const Person = () => {
    // console.log('2 - Person =>', dataPerson);

    return (
      <div className="bd-example">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Mã Đơn Hàng</th>
              <th> Ngày đặt hàng</th>

              <th>Trạng thái</th>
              <th className="th-center">Tổng tiền</th>
              <th className="th-center">Hoa hồng</th>
            </tr>
          </thead>
          <tbody>
            {dataPerson !== null ? (
              dataPerson.data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td className="td-id" onClick={() => onEdit(value.idBill)}>
                      {value.code ? value.code : value.idBill}
                    </td>

                    <td>
                      {" "}
                      {value.createTime
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/") +
                        " - " +
                        value.createTime.split("T")[1]}
                    </td>

                    <td>{value.status}</td>
                    <td className="td-right">{formatVND(value.revenue)}</td>
                    <td className="td-right">
                      {formatVND(value.moneyReceived)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="3" className="td-right">
                Đối tác nhận được:{" "}
              </td>
              <td colSpan="1" className="td-right">
                {moneyPerson.total.toLocaleString("IT-it", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>

              <td className="td-right">
                {moneyPerson.promotion.toLocaleString("IT-it", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
            <tr className={totalKM !== 0 ? "" : "d-none"}>
              <td colSpan="3" className="td-right">
                Khuyến mãi đăng ký mới:{" "}
              </td>
              <td colSpan="2" className="td-right">
                {totalKM.toLocaleString("IT-it", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="td-right">
                Tổng cộng:
              </td>
              <td colSpan="2" className="td-right font-weight-600">
                {(moneyPerson.promotion + totalKM).toLocaleString("IT-it", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  // 3 - DANH SÁCH NHÓM
  const Group = () => {
    console.log("3 - Group =>", dataGroup);

    return (
      <div className="bd-example">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Mã Đơn Hàng</th>
              <th> Ngày đặt hàng</th>
              <th>Tên Seller cấp dưới</th>
              <th>Mã Seller cấp dưới</th>
              <th>Doanh thu</th>
              <th className="th-center">Hoa hồng</th>
              <th>Thưởng nhóm</th>
            </tr>
          </thead>
          <tbody>
            {dataGroup !== null ? (
              dataGroup.data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td className="td-id" onClick={() => onEdit(value.idBill)}>
                      {value.code ? value.code : value.idBill}
                    </td>

                    <td>
                      {" "}
                      {value.createTime
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/") +
                        " - " +
                        value.createTime.split("T")[1]}
                    </td>
                    <td>{value.fullNameSeller}</td>
                    <td>{value.codeSeller}</td>
                    <td className="td-right">{formatVND(value.revenue)}</td>
                    <td className="td-right">
                      {formatVND(value.moneyReceived)}
                    </td>
                    <td className="td-right">
                      {formatVND((value.moneyReceived * 5) / 100)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <td>Chưa có dữ liệu</td>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="6" className="td-right">
                Tổng đối tác nhận được:
              </td>
              <td colSpan="1" className="td-right font-weight-600">
                {formatVND(moneyGroups)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  // 4 - CHI TIẾT
  const GetDetails = (idBill) => {
    apiLocalhost0(`Newee/Bill/GetBillById/${idBill}`, "GET", null)
      .then((res) => {
        console.log("4.1- CHI TIẾT => ", res);

        setInfo(res.data);
      })
      .catch((err) => console.log(err.response));
  };
  const GetDetailProduct = (idBill) => {
    apiLocalhost0(`Newee/Bill/GetBillDetailByIdBill/${idBill}`, "GET", null)
      .then((res) => {
        console.log("4.2- CHI TIẾT PRODUCT => ", res);

        setListProduct(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  const handleChange = (e) => {
    setMonthFilter(e.target.value);

    if (route === "Person") {
      if (e.target.value === "13") {
        setDataPerson({
          ...dataPerson,
          data: dataPersonAll.data,
        });
      } else {
        var filter = dataPersonAll.data.filter(
          (item) => item.createTime.split("-")[1] === e.target.value
        );
        console.log(dataPerson.data.length);
        console.log(filter);

        var total = 0;
        var promotion = 0;
        filter.forEach((element) => {
          total += element.revenue;
          promotion += element.moneyReceived;
        });

        setMoneyPerson({
          total: total,
          promotion: promotion,
        });

        setDataPerson({
          ...dataPerson,
          data: filter,
        });
      }
    } else if (route === "Group") {
      var a = 0;
      if (e.target.value === "13") {
        setDataGroup({
          ...dataGroup,
          data: dataGroupAll.data,
        });

        dataGroupAll.data.forEach((element) => {
          a += element.moneyReceived;
        });
        setMoneyGroups((a * 5) / 100);
      } else {
        var filterGroup = dataGroupAll.data.filter(
          (item) => item.createTime.split("-")[1] === e.target.value
        );
        setDataGroup({
          ...dataGroup,
          data: filterGroup,
        });

        filterGroup.forEach((element) => {
          a += element.moneyReceived;
        });
        setMoneyGroups((a * 5) / 100);
      }
    }
  };

  return (
    <div className="body-cate analysis">
      <h2>Tổng Quan</h2>
      {logged === true ? (
        <FormNewee
          // id={id}
          // data={detail}
          onReload={onReloadPage}
          onSetLogged={onSetLogged}
          info={info !== null ? info : null}
          list={listProduct !== null ? listProduct : null}
        ></FormNewee>
      ) : null}
      <div className="body-container analysis-container">
        <div className="left">
          <div className="left-col">
            <div className="row">
              <div className="col-xl-3 col-12">
                <h3 className="title">Doanh thu hôm nay</h3>

                <h3 className="title">{formatVND(revenueDay)}</h3>
              </div>

              <div className={totalKM !== 0 ? "col-xl-3 col-12" : "d-none"}>
                <h3
                  className="title"
                  style={{ textTransform: "uppercase", color: "red" }}
                >
                  Khuyến mãi đăng ký mới
                </h3>

                <h3 className="title">{formatVND(totalKM)} </h3>
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
                    onClick={() => onClickTime(value.nameEn, key, value.route)}
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
                    <select
                      onChange={handleChange}
                      ng-model="date.month"
                      id="multi-select-date-1-month"
                      className="form-control ng-pristine ng-valid search-select"
                      ng-disabled="DisableControl"
                    >
                      <option value>Chọn tháng</option>
                      <option value="01">Tháng 1</option>
                      <option value="02">Tháng 2</option>
                      <option value="03">Tháng 3</option>
                      <option value="04">Tháng 4</option>
                      <option value="05">Tháng 5</option>
                      <option value="06">Tháng 6</option>
                      <option value="07">Tháng 7</option>
                      <option value="08">Tháng 8</option>
                      <option value="09">Tháng 9</option>
                      <option value="10">Tháng 10</option>
                      <option value="11">Tháng 11</option>
                      <option value="12">Tháng 12</option>
                      <option value="13">Tất cả</option>
                    </select>
                    <span className="caret">2022</span>

                    <button
                      type="submit"
                      className="btns btns-larger h40"
                      onClick={handleSubmitted}
                    >
                      Tìm kiếm
                    </button>
                  </form>
                </div>
              </div>

              {/* CA NHAN */}
              {route === "Person" ? (
                <Person />
              ) : route === "Group" ? (
                <Group />
              ) : null}
            </div>

            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisBank;
