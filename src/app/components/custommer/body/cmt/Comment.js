import { cilFunctionsAlt } from "@coreui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StaticRouter } from "react-router";

function Comment(props) {
  let { ID } = props;
  const { register, handleSubmit, errors } = useForm();
  const [state, setState] = useState();
  const [check, setCheck] = useState(false);
  const onSubmit = (data) => console.log(data);
  useEffect(() => {
    getComment();
  }, []);
  const getAnswer = async (comment_id) => {
    await axios
      .get(`http://localhost:4333/comment/all/answer/${comment_id}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const getComment = async () => {
    await axios
      .get(`http://localhost:4333/comment/all/${ID}`)
      .then((res) => {
        console.log(res);
        setState(res.data);
        setCheck(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickQuestion = (id) => {
    alert(id);
  };
  console.log(state);
  return (
    <div className="body-cmt">
      <div className="cmt-header">
        <h3>{check ? state.count : null} bình luận</h3>
        <h4>Bình luận kỹ thuật viên</h4>
        <h4>Tìm theo nội dung người gửi.</h4>
      </div>
      <div className="cmt-filter">
        <h4>Sắp xếp theo</h4>
      </div>
      <div className="cmd-line"></div>
      <div className="cmt-answer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            name="answer"
            placeholder="Mời bạn để lại bình luận !"
            ref={register}
          />
          <div className="btn btn-group">
            <input type="file" name="file"></input>
            <input type="submit" value="Gửi" />
          </div>
        </form>
      </div>
      <div className="cmt-main">
        {check
          ? state.result.map((value, key) => (
              <div className="cmt" key={key}>
                <div className="cmt-viewer">
                  <div className="cmt-viewer-name">
                    <h3>
                      {value.first_name} {value.last_name}
                    </h3>
                  </div>
                  <div className="cmt-viewer-question">
                    <span>{value.txt_comment}</span>
                  </div>
                  <div className="cmt-viewer-toggle">
                    <button
                      className="btn"
                      onClick={() => {
                        handleClickQuestion(value.id);
                      }}
                    >
                      Trả lời
                    </button>
                    <span style={{ padding: "0 5px 0 0" }}>-</span>
                    <span>
                      <font color="#288ad6">Thời gian:</font> {value.created_at}
                    </span>
                  </div>
                </div>

                <div className="cmt-admin">
                  <div className="cmt-admin-header">
                    <h4>{value.role === 1 ? "Quản trị viên" : null}</h4>
                    <h3>
                      {value.first_name} {value.last_name}
                    </h3>
                  </div>
                  <div className="cmt-admin-reply">
                    Chào Anh/ Chị,
                    <br></br>
                    {value.txt_answer}
                    <br></br>Thông tin đến anh !
                  </div>
                  <button className="btn">Trả lời</button>
                </div>

                <div className="cmt-answer" style={{ display: "none" }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea name="answer" ref={register} />
                    <div className="btn btn-group">
                      <input type="file" name="file"></input>
                      <input type="submit" value="Gửi" />
                    </div>
                  </form>
                </div>
              </div>
            ))
          : null}

        {/* end cmt */}

        {/* end cmt */}
      </div>
    </div>
  );
}

export default Comment;
