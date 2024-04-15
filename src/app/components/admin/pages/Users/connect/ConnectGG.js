import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "./Connect.scss";

function ConnectGG(props) {
  const dataLogin = useSelector((state) => state.Login.dataLogin);
  // console.log(dataLogin);
  const [check, setCheck] = useState(null);
  const [email, setEmail] = useState(null);
  const [state, setState] = useState({
    isLogined: false,
    accessToken: "",
  });

  // CONNECT GOOGLE
  function ConnectGg(accessTokenGG) {
    console.log(check);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      idSeller: dataLogin.id,
      access_Token: accessTokenGG,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    if (check === true) {
      fetch("https://api.newee.asia:5001/google-linked", requestOptions)
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
              title: "Liên kết tài khoản Google thành công.",
              showConfirmButton: true,
              timer: 1500,
            });
            // alert(result.data);
          }
          // alert(result.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    setCheck(true);
  }

  const Checks = () => {
    console.log("da chay", check);
    setCheck(true);
  };
  const componentClicked = () => {
    console.log("da chay", check);
    setCheck(true);
  };

  const responseGoogle = (response) => {
    ConnectGg(response.accessToken);

    if (response.accessToken) {
      setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken,
      }));
    }
  };
  const logout = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();

    if (auth2 != null) {
      auth2
        .signOut()
        .then(auth2.disconnect().then(console.log("LOGOUT SUCCESSFUL")));
    }
    window.gapi.auth2.getAuthInstance().disconnect();
    //  window.google.accounts.id.disableAutoSelect()
    window.setTimeout(window.location.reload.bind(window.location), 10);
  };

  return (
    <div className="row">
      <div
        className="col-xl-6 col-12 col-xs-12 px-sx-0"
        style={{ padding: "0" }}
      >
        <div className="card">
          <div className="card-header mx-3 mx-xs-0">
            <h4 className="card-title">LIÊN KẾT TÀI KHOẢN GOOGLE</h4>
          </div>
          <div className="card-body px-3 px-xs-0">
            <div className="connect-fb">
              <GoogleLogin
                clientId="1081399284109-egk13p18epsfrcl8l9morcn7lj88rj6g.apps.googleusercontent.com"
                buttonText="Đăng nhập bằng Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={true}
                cookiePolicy={"single_host_origin"}
              />

              {/* <GoogleLogout
                clientId="1081399284109-egk13p18epsfrcl8l9morcn7lj88rj6g.apps.googleusercontent.com"
                buttonText="Đăng xuất Google"
                onLogoutSuccess={logout}
              >
              </GoogleLogout> */}

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

export default ConnectGG;
