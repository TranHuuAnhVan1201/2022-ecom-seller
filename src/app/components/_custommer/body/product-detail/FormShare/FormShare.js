import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./modal";
// import * as actions from "../../../../../../_actions/custommer/isDisplayForm/DisplayForm";
import * as actions from "../../../../../_actions/custommer/isDisplayForm/DisplayForm";

function FormShare(props) {
  let { listImage, listContent } = props;
  const [tab, setTab] = useState(1);
  const isDisplayForm = useSelector((state) => state.isDisplayForm);
  const [isModalOpen, toggleModal] = useState(isDisplayForm);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const toggleModal6 = () => {
    toggleModal(false);
    props.onSetLogged();
    dispatch(actions.closeForm());
  };

  const CopyShare = () => {
    alert("Copy nội dung thành công!")
    shareFB();
  };

  // FB
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: "786779932029214",
      cookie: true,
      xfbml: true,
      version: "v10.0",
    });

    window.FB.AppEvents.logPageView();
  };
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  const shareFB = () => {
    window.FB.ui(
      {
        display: "popup",
        method: "share",
        // media: [
        //   `https://res.cloudinary.com/ngheconn/image/upload/v1621407394/test/bvfingnshnthmd2wh9ed.jpg`,
        //   `https://res.cloudinary.com/ngheconn/image/upload/v1621417538/test/cz6kojuz0pfcee7vfozu.jpg`,
        //   `https://res.cloudinary.com/ngheconn/image/upload/v1621996656/test/rldsxhgb0dc7ropbjj22.jpg`,
        // ],
        media: [`${listImage}`],
      },
      function (response) {
        if (!response) {
          console.log(response);
          console.log("User did not share the page.");
        } else {
          console.log(response);
          console.log("User shared the page!");
        }
      }
    );
  };


  const copyTextareaBtn = (tab) => {

    if (tab === 1) {
      var copyTextarea = document.querySelector(".copy-1");
      copyTextarea.select();
      console.log(copyTextarea);
    } else if (tab === 2) {
      var copyTextarea2 = document.querySelector(".copy-2");
      copyTextarea2.select();
      console.log(copyTextarea);
    } else if (tab === 3) {
      var copyTextarea3 = document.querySelector(".copy-3");
      copyTextarea3.select();
      console.log(copyTextarea);
    }

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Copying text command was " + msg);
    } catch (err) {
      console.log("Oops, unable to copy");
    }
  };


  const handleTab = (tab, content) => {
    setTab(tab);
    setContent(content);
    copyTextareaBtn(tab);
  };

  useEffect(() => {
    handleTab(1);
    setContent(`${listContent.content1}`);
  }, [])

  return (
    <div className="form-container-fluid overlay-scrollbar">
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <div className="form-share-header">
          <h3>Chọn nội dung chia sẻ</h3>
          <button
            type="button"
            onClick={() => toggleModal6()}
            className="btns go-back"
            style={{ border: "none" }}
          >
            X
          </button>
        </div>

        <div className="form-share-body">
          <div className="form-share-content d-flex">
            <button
              className={tab === 1 ? "btn btn-danger-2 " : "btn btn-light"}
              onClick={() => handleTab(1, `${listContent.content1}`)}
              onChange={() => handleTab(1, `${listContent.content1}`)}
            >
              Nội dung 1
            </button>
            <button
              className={tab === 2 ? "btn btn-danger-2 " : "btn btn-light"}
              onClick={() => handleTab(2, `${listContent.content2}`)}
              onChange={() => handleTab(2, `${listContent.content2}`)}

            >
              Nội dung 2
            </button>
            <button
              className={tab === 3 ? "btn btn-danger-2" : "btn btn-light"}
              onClick={() => handleTab(3, `${listContent.content3}`)}
              onChange={() => handleTab(3, `${listContent.content3}`)}

            >
              Nội dung 3
            </button>
          </div>
          <textarea className="js-copytextarea copy-1" >{listContent.content1}</textarea>
          <textarea className="js-copytextarea copy-2">{listContent.content2}</textarea>
          <textarea className="js-copytextarea copy-3">{listContent.content3}</textarea>
          <pre>{content ? content : "Nội dung đang cập nhập"}</pre>

        </div>

        <div className="btn-groups form-share-btn">
          <button
            type="button"
            onClick={() => toggleModal6()}
            className="btn btn-light "
          >
            Quay lại
          </button>
          <button
            type="button"
            onClick={() => CopyShare()}
            className="btn btn-primary"
          >
            Chia sẻ nội dung
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default FormShare;
