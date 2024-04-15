import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from "./../../../../_actions/custommer/isDisplayForm/DisplayForm";
function Product_Item(props) {
  let { value } = props;
  console.log(value);
  const dispatch = useDispatch();
  const { register } = useForm();
  const onDelete = (id) => {
    props.onDeleteId(id);
  };
  const onEdit = (id) => {
    let value = true;
    props.onEdit(id, value);
    dispatch(actions.openForm());
  };
  return (
    <tr>
      <td style={{ textAlign: "center" }}>
        <input
          type="checkbox"
          placeholder="Deleted"
          name="Deleted"
          ref={register}
        />
      </td>
      <td className="name">
        <img
          src={value.url}
          alt="Mountain"
          width="80px"
          height="80px"
          style={{ objectFit: "contain" }}
        ></img>
        <div className="product-name">
          <p>{value.name}</p>
        </div>
    
      </td>
      
      <td>x{value.quantity_in_stock}</td>
      <td>{value.price}</td>
      
      <td>
        <button
          type="button"
          onClick={() => onDelete(value.id)}
          className="btn btn-danger"
          style={{ padding: "5px 10px" }}
        >
          Xóa
        </button>
        <button
          type="button"
          onClick={() => onEdit(value.id)}
          className="btn btn-primary"
          style={{ padding: "5px 10px" }}
        >
          Sửa
        </button>
      </td>
    </tr>
  );
}

export default Product_Item;
