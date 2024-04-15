import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import * as actions from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
import * as actions from "../../../../../_actions/custommer/isDisplayForm/DisplayForm";
import "./Sale.scss";

function Request_Item(props) {
  let { value, links } = props;
  // console.log(value);


  const dispatch = useDispatch();
  const { register } = useForm();
  const onDelete = (id) => {
    props.onDeleteId(id);
  };
  const onCancel = (id) =>{
    props.onCancel(id);
    console.log(id);
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
       
          {props.index + 1}
      
      </td>

       <td className="td-id" >
        <button type="button" className="btn btn-outline-primary-2">
          {value.id !== null ? value.id : null}
       </button>
      </td>

      <td className="td-time" style={{ whiteSpace: "nowrap" }}>
        {value.createTime.split("T")[0].split("-").reverse().join("/")}
        {<br />}
        {value.createTime.split("T")[1]}
      </td>
      <td className="td-time" style={{ whiteSpace: "nowrap" }}>
        {value.modifiTime.split("T")[0].split("-").reverse().join("/")}
        {<br />}
        {value.modifiTime.split("T")[1]}
      </td>
      <td className="td-price">{formatVND(value.money)} ₫</td>
      <td>
        <div className={`btn btn-1 ${value.status ==='yêu cầu'? 'btn-success' : value.status === 'đã duyệt' || value.status === 'từ chối' ? 'btn-danger' :  value.status === 'đã chuyển khoản' ? 'btn-primary' : 'btn-secondary'}`}>{value.status}</div>
      </td>
      <td>
        {value.status === 'yêu cầu'
          ?
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onCancel(value.id)}
          >
            Huỷ yêu cầu
          </button>
          : null}
        
      </td>

      

      

      
    </tr>
  );
}

export default Request_Item;
