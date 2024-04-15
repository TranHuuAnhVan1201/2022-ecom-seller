import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "../scss/pageAdmin.scss";
import "./Users.scss";

const EditUser = React.lazy(() => import("./page/editUser/EditUser.js"));
const EditBank = React.lazy(() => import("./page/editBank/EditBank.js"));
const RankBasic = React.lazy(() => import("./rank/RankBasic"));
const RankKey = React.lazy(() => import("./rank/RankKey"));

// CONNECT
const ConnectFB = React.lazy(() => import("./connect/ConnectFB"));
const ConnectGG = React.lazy(() => import("./connect/ConnectGG"));

function Users(props) {
  const {
    user,
    cart: { cartItems, cartLength },
    userInfo,
  } = useSelector((state) => state.FetchAllProduct);

  return (
    <BrowserRouter>
      <React.Suspense>
        <div className="body-cate users px-xs-0">
          {/* page_title */}
          <div className="page_title">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12">
                  <div className="page_title-content">
                    <p>
                      Xin chào Nhà bán hàng Online{" "}
                      <span>{userInfo.lastName + " " + userInfo.first}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-3 col-m-4 col-xs-12">
                  <div className="card settings_menu">
                    <div className="card-header px-xs-0 py-xs-3 mx-3 mx-xs-0">
                      <h4 className="card-title">Cài đặt</h4>
                    </div>
                    <div className="card-body px-3 px-xs-0 py-xs-3 ">
                      <ul>
                        <li className="nav-item">
                          <Link to="/admin/users" className="nav-link active">
                            <i className="far fa-user"></i>
                            <span>Chỉnh sửa hồ sơ</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/admin/users/connect/ConnectFB"
                            className="nav-link"
                          >
                            <i
                              className="fab fa-facebook"
                              style={{ color: "#4267B2" }}
                            ></i>
                            <span>Liên kết Facebook</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/admin/users/connect/ConnectGG"
                            className="nav-link"
                          >
                            <i
                              className="fab fa-google"
                              style={{ color: "#DB4437" }}
                            ></i>
                            <span>Liên kết Google</span>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            to="/admin/users/editBank"
                            className="nav-link "
                          >
                            <i className="fas fa-university"></i>
                            <span>Tài khoản được liên kết</span>
                          </Link>
                        </li>

                        {/*<li className="nav-item">
                          <Link to="/admin/users/rank/rank-basic" className="nav-link ">
                            <i className="fas fa-medal"></i>
                            <span>Cấp bậc nhà bán hàng cơ bản</span>
                          </Link>
                        </li>*/}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-m-8 col-xs-12">
                  <Switch>
                    <Route
                      path={"/admin/users/editBank"}
                      component={EditBank}
                    />
                    <Route
                      path={"/admin/users/connect/ConnectFB"}
                      component={ConnectFB}
                    />
                    <Route
                      path={"/admin/users/connect/ConnectGG"}
                      component={ConnectGG}
                    />
                    <Route
                      path={"/admin/users/rank/rank-basic"}
                      component={RankBasic}
                    />
                    <Route
                      path={"/admin/users/rank/rank-key"}
                      component={RankKey}
                    />
                    <Route path={"/"} component={EditUser} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default Users;
