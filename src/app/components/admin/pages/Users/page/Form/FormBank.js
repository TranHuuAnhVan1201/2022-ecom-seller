import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./modal";
import * as actions from "../../../../../../_actions/custommer/isDisplayForm/DisplayForm";

function FormBank(props) {
  const isDisplayForm = useSelector((state) => state.isDisplayForm);
  const [isModalOpen, toggleModal] = useState(isDisplayForm);
  const dispatch = useDispatch();
  const toggleModal6 = () => {
    toggleModal(false);
    props.onSetLogged();
    dispatch(actions.closeForm());
  };

  return (
    <div className="form-container-fluid overlay-scrollbar">
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <h2>FORM ADDD</h2>
        <div className="btn-groups">
          <button
            type="button"
            onClick={() => toggleModal6()}
            className="btns go-back"
          >
            Quay lại
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default FormBank;
