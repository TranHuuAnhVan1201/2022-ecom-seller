import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./../../../_pages/admin-page/dashboard/Dashboard.scss";

function HeaderAdmin(props) {
  const [role, setRole] = useState(false);
  const [check, setCheck] = useState(false);
  const history = useHistory();
  const [dropdown, setDropdown] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      var decoded = jwtDecode(localStorage.getItem("token"));
      setRole(decoded);
      setCheck(true);
    }
  }, []);
  const onLogout = () => {
    setCheck(false);
    localStorage.removeItem("token");
    history.push("/");
    window.setTimeout(window.location.reload.bind(window.location), 10);
  };

  return (
    <div className="navbar">
      <ul className="navbar-nav">
        {/* <li className="nav-item">
                <a className="nav-link">
                    <i className="fas fa-bars" onclick="collapseSidebar()"></i>
                </a>
            </li> */}
        <li className="nav-item nav-logo">
          <Link to={"/"}>
            <img
              src={
                "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1618304713/ladipage/1%20logo/luo2uj167jnu0cxe1idl.png"
              }
              id="logo"
              alt={1}
            />
          </Link>

          {/* <img src="assets/logo.png" alt="Newee"></img> */}
        </li>
      </ul>

      <ul className="navbar-nav nav-right">
        <Link to="/">
          <img
            data-toggle="user-menu"
            className="dropdown-toggle"
            src="https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1619627279/ladipage/login/otdewbanat9ymyp4wu37.png"
            alt={1}
            style={{ marginTop: 12, marginRight: 12, height: 36, width: 36 }}
          />
        </Link>
      </ul>
    </div>
  );
}

export default HeaderAdmin;
