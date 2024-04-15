import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ReplaceStatus } from "../../../../utils";
import * as actions from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
import "./Sale.scss";

function Product_Item(props) {
  let { value, links } = props;
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
    props.onEdit(id);
    dispatch(actions.openForm());
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

  return (
    <tr className="order">
      <td className="td-id" onClick={() => onEdit(value.idBill)}>
        <button type="button" className="btn btn-outline-primary-2">
          {value.code !== null ? value.code : value.idBill}
        </button>
      </td>
      <td className="td-time" style={{ whiteSpace: "nowrap" }}>
        {value.createTime.split("T")[0].split("-").reverse().join("/")}
        {<br />}
        {value.createTime.split("T")[1]}
      </td>
      <td>{value.fullName + " - " + value.phone + " - " + value.address}</td>

      {value.note ? <td>{value.note}</td> : <td>{" - "}</td>}
      <td style={{ textTransform: "lowercase" }}>
        {ReplaceStatus(value.paymentType)}
      </td>
      <td>{value.shipName}</td>
      <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
        {formatVND(value.totalPrice + value.priceShip)}₫
      </td>

      <td>
        <span className={`badge btn-${value.status}`}>
          {value.shipStatusText ? value.shipStatusText : value.status}
        </span>
      </td>
      <td className="td-button-group">
        {value.status === "Pending" ? (
          <button
            type="button"
            onClick={() => onCancel(value.idBill)}
            className={`btn btn-${value.status}`}
          >
            Hủy
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onEdit(value.idBill)}
            className={`btn btn-${value.status}`}
          >
            Xem
          </button>
        )}
      </td>
    </tr>
  );
}

export default Product_Item;
