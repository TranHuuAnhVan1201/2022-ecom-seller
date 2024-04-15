import React from "react";

function ReplyComment(props) {
    let { data } = props;
    console.log(data);
  return (
    <div className="cmt-admin">
      <div className="cmt-admin-header">
        <h4>{data.role === 1 ? "Quản trị viên" : null}</h4>
        <h3>
          {data.first_name} {data.last_name}
        </h3>
      </div>
      <div className="cmt-admin-reply">
        Chào Anh/ Chị,
        <br></br>
        {data.txt_comment}
        <br></br>Thông tin đến anh !
      </div>
      <button className="btn">Trả lời</button>
    </div>
  );
}

export default ReplyComment;
