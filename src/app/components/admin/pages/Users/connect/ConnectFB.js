import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "./Connect.scss";
function ConnectFB(props) {
  //   const history = useHistory;
  const dataLogin = useSelector((state) => state.Login.dataLogin);
  // console.log(dataLogin);
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState(null);

  const responseFacebook = (response) => {
    console.log("da chay", response);

    if (check === true) {
      ConnectFB(response.userID, response.accessToken);
      setEmail(response.email);
    }

    // history.push("/admin/users/connect/ConnectFB");
  };
  const componentClicked = () => {
    setCheck(true);
  };

  // CONNECT FACEBOOK
  function ConnectFB(userIDFB, accessTokenFB) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      idSeller: dataLogin.id,
      idUser: userIDFB,
      access_Token: accessTokenFB,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    if (check === true) {
      fetch("https://api.newee.asia:5001/facebook-linked", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("result => ", result);
          if (result.errors.length !== 0) {
            console.log(result.errors);
            alert(result.errors);
          } else {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Liên kết tài khoản Facebook thành công.",
              showConfirmButton: true,
              timer: 1500,
            });
          }
        })
        .catch((error) => console.log("error", error));
    }
  }

  return (
    <div className="row">
      <div
        className="col-xl-6 col-12 col-xs-12 px-sx-0"
        style={{ padding: "0" }}
      >
        <div className="card">
          <div className="card-header mx-3 mx-xs-0">
            <h4 className="card-title">LIÊN KẾT TÀI KHOẢN FACEBOOK</h4>
          </div>
          <div className="card-body px-3 px-xs-0">
            <div className="connect-fb">
              <FacebookLogin
                appId="786779932029214"
                autoLoad={true}
                fields="name,email,picture"
                onClick={() => componentClicked()}
                callback={responseFacebook}
                textButton="Đăng nhập bằng Facebook"
              />
              {email !== null ? (
                <h5 className="email" style={{ padding: "10px" }}>
                  Email: {email}
                </h5>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectFB;
