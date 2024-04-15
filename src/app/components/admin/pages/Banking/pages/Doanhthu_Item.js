import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import * as actions from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
import * as actions from "../../../../../_actions/custommer/isDisplayForm/DisplayForm";
import "./Sale.scss";

function Doanhthu_Item(props) {
  let { value, links } = props;
  // console.log(value);
  const dispatch = useDispatch();
  const { register } = useForm();
  const onDelete = (id) => {
    props.onDeleteId(id);
  };
  const onCancel = (id) => {
    props.onCancel(id);
  };
  const onEdit = (id) => {
    let value = true;
    props.onEdit(id, value);
    dispatch(actions.openForm());
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
    <tr className="order" >
      {/* onClick={() => onEdit(value.idBill)} */}
      <td className="td-id" >
        <button type="button" className="btn btn-outline-primary-2">
          {value.code !== null ? value.code : null}
       </button>
      </td>

      <td className="td-time" style={{ whiteSpace: "nowrap" }}>
        {value.createTime.split("T")[0].split("-").reverse().join("/")}
        {<br />}
        {value.createTime.split("T")[1]}
      </td>
      <td className="td-price" style={{textAlign: 'right'}}>{formatVND(value.moneyReceived)} ₫</td>
      

      {/* <td className="td-id" >
        <button type="button" className="btn btn-outline-primary-2">
          {value.code !== null ? value.code : value.idBill}
       </button>
      </td>
      
      <td>{value.fullName + " - " + value.phone + " - " + value.address}</td>

      {value.note ? (
        <td>{value.note}</td>
      ) : (
        <td>{" - "}</td>
      )}
      <td>{value.paymentType}</td>
      <td className="td-price">{formatVND(value.totalPrice)} ₫</td>
      <td >
        <span className={`badge btn-${value.status}`}>{value.status}</span>
      </td>
      <td className="td-button-group">
        {value.status === "Pending" ? (
          <button
            type="button"
            // onClick={() => onCancel(value.idBill)}
            class={`btn btn-${value.status}`}
          >
            Hủy
          </button>
        ) : (
          <button
            type="button"
            // onClick={() => onEdit(value.idBill)}
            class={`btn btn-${value.status}`}
          >
            Xem
          </button>
        )


        }
      </td> */}
    </tr>
  );
}

export default Doanhthu_Item;
