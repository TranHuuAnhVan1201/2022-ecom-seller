import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { adminApiPr } from "../../../../../api/private";
import apiLocalhost0 from "../../../../_untils/apiLocalhost0";
import "../scss/pageAdmin.scss";
import FormNewee from "./page/Form/FormNewee";
import "./Sale.scss";
import Sale_Item from "./Sale_Item";

function Sale(props) {
  const [logged, setlogged] = useState(false);
  const [id, setID] = useState("");
  const [activeLinks, setActiveLinks] = useState();
  const [listBill, setListBill] = useState([]);
  const [detail, setDetail] = useState([]);
  const [confirm, setConfirm] = useState(false);

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
        axios.delete(`http://localhost:4333/bill/sale/${id}`).then(
          (data) => {
            setTimeout(function () {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Xóa thành công",
                showConfirmButton: false,
                timer: 1500,
              });
            }, 1000);
            // getUser();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  const onEdit = (id, value) => {
    setlogged(true);
    setID(id);
    var de = listBill.filter((item) => item.idBill === id);
    setDetail(de);
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

  const onCancel = (id) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn không thể khôi phục đơn hàng này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      // confirmButtonText: "Đồng ý!",
    }).then((result) => {
      if (result.isConfirmed) {
        ChangeToCancel(id);
        setConfirm(!confirm);
        Swal.fire(
          "Hủy đơn hàng thành công!",
          "Your file has been deleted.",
          "success"
        );
      }
    });
  };
  const data = {};
  const ChangeToCancel = async (cancel) => {
    apiLocalhost0(`Newee/Bill/SellerCancelBill/${cancel}`, "POST", data)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Hủy đơn hàng thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err.response);
        setConfirm(!confirm);
      });
  };

  useEffect(() => {
    setActiveLinks(0);
    if (confirm) {
      setConfirm(false);
    }
    ListBillAll();
  }, [confirm]);

  const links = [
    {
      id: 0,
      nameVi: "Tất cả",
      nameEn: "All",
      className: "",
    },
    {
      id: 1,
      nameVi: "Đang chờ xử lý",
      nameEn: "Pending",
      className: "active",
    },
    {
      id: 2,
      nameVi: "Hủy bỏ",
      nameEn: "Cancel",
      className: "",
    },
    {
      id: 3,
      nameVi: "Chuẩn bị hàng",
      nameEn: "Accecpt",
      className: "",
    },
    {
      id: 4,
      nameVi: "Hoãn",
      nameEn: "Delay",
      className: "",
    },
    {
      id: 5,
      nameVi: "Chờ giao",
      nameEn: "Preparing",
      className: "",
    },
    {
      id: 6,
      nameVi: "Đang giao",
      nameEn: "Shipping",
      className: "",
    },
    {
      id: 7,
      nameVi: "Hoàn thành",
      nameEn: "Delivered",
      className: "",
    },

    // },
  ];
  const status = {};

  const ListBillAll = () => {
    for (var i = 1; i < links.length; i++) {
      ListBill(`${links[i].nameEn}`);
    }
  };
  const list = [];

  const ListBill = async (status) => {
    try {
      const response = await adminApiPr.getListBill(status);
      console.log(response);

      if (response.data !== null) {
        list.push(response.bills);
        const ab = [].concat(...list);

        let sorted = ab.sort((a, b) =>
          a.createTime
            .split("/")
            .reverse()
            .join()
            .localeCompare(b.createTime.split("/").reverse().join())
        );

        setListBill(sorted.reverse());
      } else {
        setListBill([]);
      }
    } catch (error) {
      console.log(error);
      setListBill([]);
    }
  };

  const onClickStatus = (value, key) => {
    if (value.nameEn === "All") {
      ListBillAll();
      setActiveLinks(key);
    } else {
      ListBill(value.nameEn);
      setActiveLinks(key);
    }
  };

  return (
    <div className="body-cate sales-container">
      <nav>
        {links.map((value, key) => {
          return (
            <li
              onClick={() => onClickStatus(value, key)}
              className={key === activeLinks ? "active" : ""}
              key={key}
            >
              {value.nameVi}
            </li>
          );
        })}
      </nav>
      <div
        className="form-group av d-none d-xl-none"
        style={{ marginBottom: "16px" }}
      >
        <label htmlFor="exampleInputEmail1">Tên sản phẩm</label>
        <input
          type="text"
          name="search"
          className="form-control"
          placeholder="Nhập vào"
        />
        <button className="btn" type="submit">
          Tìm kiếm
        </button>
      </div>

      <h3 className="mt-16"> {listBill ? listBill.length : 0} đơn hàng</h3>
      {logged === true ? (
        <FormNewee
          id={id}
          data={detail}
          onReload={onReloadPage}
          onSetLogged={onSetLogged}
        ></FormNewee>
      ) : null}
      <div className="bd-example">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Mã Đơn Hàng</th>
              <th>Ngày đặt hàng </th>
              <th>Thông tin người nhận</th>
              <th>Ghi chú</th>
              <th>Thanh Toán</th>
              <th>Vận chuyển</th>
              <th className="th-price">Tổng Tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listBill !== []
              ? listBill.map((value, index) => {
                  return (
                    <Sale_Item
                      value={value}
                      links={links}
                      index={index}
                      key={index}
                      onDeleteId={onDeleteId}
                      onEdit={onEdit}
                      onCancel={onCancel}
                    />
                  );
                })
              : "Chưa có đơn hàng"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sale;
