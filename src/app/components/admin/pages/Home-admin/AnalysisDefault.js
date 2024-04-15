import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import "../analysis/Analysis.scss";

function AnalysisDefault(props) {
  const [activeLinks, setActiveLinks] = useState();
  const [input, setInput] = useState("");
  const [revenueDay, setRevenueDay] = useState(0);
  const [revenueMonth, setRevenueMonth] = useState(0);

  useEffect(() => {
    setActiveLinks(0);
    // RevenueDay();
    // RevenueMonth();
    // RevenueYear();
  }, []);
  const links = [
    {
      id: 1,
      name: "Tất cả",
      className: "active",
    },
    {
      id: 2,
      name: "Sẽ thanh toán",
      className: "",
    },
    {
      id: 3,
      name: "Đã thanh toán",
      className: "",
    },
  ];

  console.log(links);
  const onClickTime = (name, id) => {
    setActiveLinks(id);
  };

  // const onChange = (e) => {
  //   var target = e.target;
  //   var name = target.name;
  //   var value = target.value;
  //   setState([name] = value);
  // }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(errors);

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

  const status = {
    // id: "1",
    // increase: "10"
  };
  const RevenueDay = async (status) => {
    await axios
      .get(`https://api.newee.asia:5001/Newee/RevenueUser/Day`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("tokenSeller")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setRevenueDay(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };
  console.log(revenueDay);
  const RevenueMonth = async (status) => {
    await axios
      .get(`https://api.newee.asia:5001/Newee/RevenueUser/DayOfMonth/04/2021`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("tokenSeller")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setRevenueMonth(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };
  console.log(revenueMonth);
  const RevenueYear = async (status) => {
    await axios
      .get(`https://api.newee.asia:5001/Newee/RevenueUser/MonthOfYear/2021`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("tokenSeller")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    console.log(input);

    var split = input.split("-");
    console.log(split[2]);
  };
  const handleSubmitted = (e) => {
    e.preventDefault();
    const formValue = {
      date: input,
    };
    onSubmit(formValue);
  };

  return (
    <div className="body-cate analysis">
      <h2>Tổng Quan</h2>
      <div className="body-container analysis-container">
        <div className="left">
          <div className="left-col">
            <div className="row">
              <div className="col-3">
                <h3 className="title">Hôm nay test</h3>
                <p>Tổng cộng</p>
                <h3 className="title">Cập nhập</h3>
                {/* <h3 className="title">{formatVND(revenueDay)} đ</h3> */}
              </div>
              <div className="col-3">
                <h3 className="title">Đã thanh toán</h3>
                <p>Tuần này</p>
                <h3 className="title">Cập nhập</h3>
              </div>
              {/* {revenueMonth
                ? revenueMonth.map((value, key) => {
                    return (
                      <div className="col-3" key={key}>
                        <p>Tháng này</p>
                        <h3 className="title">{formatVND(value.revenue)} đ</h3>
                      </div>
                    );
                  })
                : null} */}
              {/* {revenueMonth
                ? revenueMonth.map((value, key) => {
                    return (
                      <div className="col-3" key={key}>
                        <p>Tổng cộng</p>
                        <h3 className="title">{formatVND(value.revenue)} đ</h3>
                      </div>
                    );
                  })
                : null} */}
              <div className="col-3">
                <p>Tổng cộng</p>
                <h3 className="title">Đang cập nhập</h3>
              </div>
              <div className="col-3">
                <p>Tổng cộng</p>
                <h3 className="title">Đang cập nhập</h3>
              </div>
            </div>
            <div className="row d-flex-space-between">
              <p>Tài khoản Ngân hàng của tôi: **** 8268</p>
              <button className="btns">Ví Newee</button>
            </div>
          </div>

          <div className="left-col">
            <div className="left-col-group d-flex-space-between">
              <h3 className="title">Chi tiết</h3>
              <h3>Tìm kiếm đơn hàng</h3>
            </div>
            <nav>
              {links.map((value, key) => {
                return (
                  <li
                    onClick={() => onClickTime(value, key)}
                    className={key === activeLinks ? "active" : ""}
                  >
                    {value.name}
                  </li>
                );
              })}
              {/* <Link to={"/admin/analysis/willpay"} className="active">
                Sẽ thanh toán
              </Link>
              <Link to={"/admin/analysis/paid"}>Đã thanh toán</Link> */}
            </nav>

            <div className="analysis-search ">
              <div className="analysis-search-header">
                <div className="complex-date-picker">
                  <form onSubmit={handleSubmitted}>
                    <label>Thời gian</label>
                    <input
                      id="today"
                      type="date"
                      name="datetime"
                      value={input}
                      onChange={handleInputChange}
                    ></input>
                    <button type="submit" className="btns btns-larger">
                      Tìm kiếm
                    </button>
                  </form>

                  {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      name="time"
                      type="datetime-local"
                      ref={register({
                        required: "true",
                      })}
                    />

                    <button type="submit" className="btns btns-larger">
                      Tìm kiếm
                    </button>
                  </form> */}
                </div>

                <div className="search-actions">
                  <div className="latest">
                    <button type="button" className="btns">
                      Xuất
                    </button>
                    <button type="button" className="btns">
                      <i className="fas fa-bars"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="transaction-table">
                <table className="analysis-table">
                  <thead>
                    <tr>
                      <th>Đơn hàng</th>
                      <th>Người mua</th>
                      <th>Thanh toán đã chuyển vào</th>
                      <th>Trạng thái</th>
                      <th>Số tiền</th>
                    </tr>
                  </thead>
                </table>
                <div>Không có dữ liệu</div>
              </div>
            </div>

            <div className=""></div>
          </div>
        </div>
        <div className="right">
          <div className="d-flex-column">
            <div className="d-flex-space-between">
              <h3>Báo cáo thu nhập</h3>
              <button className="btns"> Xem thêm</button>
            </div>
            <ul>
              <li>
                <Link className="d-flex-space-between">
                  <span>1 Th03 - 31 Th03 2021</span>
                  <img
                    src={
                      "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617529141/newee/x9x5y94eyhachfsts69x.png"
                    }
                    alt="Newee"
                  ></img>
                </Link>
              </li>
              <li>
                <Link className="d-flex-space-between">
                  <span>1 Th03 - 31 Th03 2021</span>
                  <img
                    src={
                      "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617529141/newee/x9x5y94eyhachfsts69x.png"
                    }
                    alt="Newee"
                  ></img>
                </Link>
              </li>
              <li>
                <Link className="d-flex-space-between">
                  <span>1 Th03 - 31 Th03 2021</span>
                  <img
                    src={
                      "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617529141/newee/x9x5y94eyhachfsts69x.png"
                    }
                    alt="Newee"
                  ></img>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisDefault;
