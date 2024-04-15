import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import * as actions from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
function Product_Item(props) {
    let { value } = props;
    const dispatch = useDispatch();
      const { register } = useForm();
    const onDelete = (id) => {
        props.onDeleteId(id);
    }
    const onEdit = (id) => {
        let value = true;
        props.onEdit(id, value);
        dispatch(actions.openForm());
    }
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
        <td>{value.name}</td>
        <td>
          <img
            src={value.avatar}
            alt="Mountain"
            width="100px"
            height="100px"
          ></img>
        </td>
        <td>
          <button
            type="button"
            onClick={() => onDelete(value.id)}
            className="btn btn-danger"
          >
            xóa
          </button>
          &nbsp;
          <button
            type="button"
            onClick={() => onEdit(value.id)}
            className="btn btn-warning"
          >
            Sửa
          </button>
        </td>
      </tr>
    );
}

export default Product_Item;