import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as actions from "../../../_actions/custommer/products/product";
import "./HeaderAdmin.scss";

function to_slug(str) {
  // Chuyển hết sang chữ thường
  if (str) {
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, "");

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, "");

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, "");

    // return
    return str;
  }
}
function HeaderAdmin(props) {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.Shop);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    handleSearchs(data.search);
  };

  const [role, setRole] = useState(false);
  const [check, setCheck] = useState(false);
  const [checks, setChecks] = useState(false);
  const [categorys, setCategorys] = useState();

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("tokenSeller")) {
      var decoded = jwtDecode(localStorage.getItem("tokenSeller"));
      setRole(decoded);
      setCheck(true);
    }
    productCategory();
  }, []);

  // đăng xuất
  const onLogout = () => {
    setCheck(false);
    localStorage.removeItem("tokenSeller");
    history.push("/");
    window.setTimeout(window.location.reload.bind(window.location), 10);
  };

  // tìm kiếm
  const handleSearchs = async (inputs) => {
    await axios
      .get(
        `https://api.newee.asia:5001/Newee/ProductSeller/GetByName/${inputs}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("tokenSeller")}`,
          },
        }
      )
      .then(
        (res) => {
          dispatch(actions.getSearchResult(res.data.data));
          history.push("/search");
        },
        (err) => {
          console.log(err);
        }
      );
  };
  const productCategory = async () => {
    await axios
      .get(`https://api.newee.asia:5001/Newee/ProductSeller/GetListCategory`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("tokenSeller")}`,
        },
      })
      .then((res) => {
        setCategorys(res.data.data);
        setChecks(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <header className="admin-seller">
      <section>
        <div className="header">
          <div className="header-top-left">
            <div className="logo-menu">
              <Link to="/" className="logo">
                <img
                  src={
                    "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617724775/newee/newee%200604/ongxfpmk7w8vdmxyfnor.png"
                  }
                  alt="Newee"
                ></img>
              </Link>
              <div className="menu">
                <div className="bars">
                  <i className="fa fa-bars"></i>
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </div>
                <div className="wrap">
                  <span>Danh Mục </span>
                  <span className="text-icon">
                    Sản phẩm <i className="fas fa-caret-down"></i>
                  </span>
                </div>
                <div className="user-dropdown menus menu-dropdown position-absolute top-42 left-120">
                  <div className="container-menu">
                    {checks
                      ? categorys.map((value, key) => {
                          return (
                            <Link
                              to={"/search/" + to_slug(value.name)}
                              key={key}
                            >
                              <p>
                                <span className="span-icon">
                                  <i className="fas fa-gift"></i>
                                </span>
                                <span>{value.name}</span>
                              </p>
                            </Link>
                          );
                        })
                      : null}

                    {/* <Link to="/search/dochoi">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>Đồ chơi</span>
                      </p>
                      <div className="menu-detail">right</div>
                    </Link>
                    <Link to="/search/khautrang">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>Bách hóa</span>
                      </p>
                      <div className="menu-detail">
                        <div className="col menu-detail-brand">
                          <p className="p-col">
                            <span className="title">Thương hiệu</span>
                            <span>3HMASK</span>
                            <span>3HMASK</span>
                            <span>3HMASK</span>
                            <span>3HMASK</span>
                          </p>
                        </div>
                        <div className="col menu-detail-category">
                          <p>
                            <span className="title">Tên sản phẩm</span>
                            <span>
                              Khẩu trang 3HMASK kháng khuẩn 3 lớp quai bản
                            </span>
                            <span>
                              Khẩu trang 3HMASK kháng khuẩn 4 lớp quai bản
                            </span>
                            <span>
                              Khẩu trang 3HMASK kháng khuẩn 4D quai bản
                            </span>
                            <span>
                              Khẩu trang 3HMASK kháng khuẩn 4D quai tròn
                            </span>
                            <span>
                              Khẩu trang 3HMASK kháng khuẩn KN95 quai tròn
                            </span>
                          </p>
                        </div>
                        <div className="col menu-detail-quantity">
                          <p>
                            <span className="title">Số lượng</span>
                            <span>20cái / hộp</span>
                            <span>10cái / hộp</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/search/mebe">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>Mẹ và bé </span>
                      </p>
                    </Link>
                    <Link to="/search/thoitrang">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>Thời trang</span>
                      </p>
                    </Link>
                    <Link to="/search/phukien">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>Phụ kiện thời trang</span>
                      </p>
                    </Link>
                    <Link to="/search/suckhoe">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>Sức khỏe và sắc đẹp</span>
                      </p>
                    </Link>
                    <Link to="/search/nhacua">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>Nhà cửa và đời sống </span>
                      </p>
                    </Link>
                    <Link to="/search/thucung">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>Chăm sóc thú cưng</span>
                      </p>
                    </Link>
                    <Link to="/search/thucung">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>Voucher</span>
                      </p>
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="btn search">
              <form className="search" onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="search"
                  type="text"
                  placeholder="Tìm sản phẩm, danh mục hay thương hiệu bạn mong muốn..."
                  ref={register({
                    required: true,
                    // pattern: {
                    //   value: /[A-Za-z]+/,
                    //   message: "Sai định dạng.",
                    // },
                    maxLength: {
                      value: 30,
                      message: "Nhập quá số lượng tối đa 30 ký tự.",
                    },
                  })}
                />

                <button type="submit">
                  <i className="fas fa-search"></i>Tìm kiếm
                  {/* <Link to="/search"></Link> */}
                </button>
              </form>
            </div>
          </div>
          <div className="header-top-right">
            <div className="header-login">
              <i className="far fa-user"></i>
              <div className="col col-user">
                <div className="login-register">
                  {check ? (
                    <div>
                      <span>Tài khoản</span>
                    </div>
                  ) : (
                    <div className="span-user">
                      <Link to="/login">
                        <span>
                          Đăng nhập<br></br>
                        </span>
                      </Link>
                      <span>/</span>
                      <Link to="/register">
                        <span>
                          Đăng Ký<br></br>
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
                <span className="text-icon">
                  {check ? role.exp : "Tài khoản"}
                  <i className="fas fa-caret-down"></i>
                </span>
                {check ? (
                  <div className="user-dropdown acount position-absolute top-36">
                    <Link to="/admin/sale">
                      <p>
                        <span>Đơn hàng của tôi</span>
                      </p>
                    </Link>
                    <Link to="/">
                      <p>
                        <span>Thông báo của tôi</span>
                      </p>
                    </Link>
                    <Link to="/admin/users">
                      <p>
                        <span>Tài khoản của tôi</span>
                      </p>
                    </Link>
                    <Link to="/order">
                      <p>
                        <span>Nhận xét sản phẩm đã mua</span>
                      </p>
                    </Link>
                    <Link to="/order">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>
                          Mã giảm giá.
                          <br></br>
                          Bạn đang có 0 mã giảm giá
                        </span>
                      </p>
                    </Link>
                    {/* <Link to="/order">
                      <p>
                        <span className="span-icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <span>
                          Đổi trả dễ dàng
                          <br></br>
                          Bạn đang có 0 mã giảm giá
                        </span>
                      </p>
                    </Link> */}
                    <Link to="/">
                      <p onClick={() => onLogout()}>
                        <span>Thoát tài khoản</span>
                      </p>
                    </Link>
                  </div>
                ) : (
                  <div className="user-dropdown menus position-absolute top-36 btn-header ">
                    <Link
                      to="/login"
                      className="Userdropdown-button btns-login-register"
                    >
                      <p>
                        <span className="span-center span-border-none">
                          Đăng nhập
                        </span>
                      </p>
                    </Link>
                    <Link
                      to="/register"
                      className="Userdropdown-button btns-login-register"
                    >
                      <p>
                        <span className="span-center span-border-none">
                          Đăng ký
                        </span>
                      </p>
                    </Link>
                    <Link to="/login" className="Userdropdown-button btns-fb">
                      <p>
                        <img
                          width={32}
                          height={32}
                          src={
                            "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617120617/newee/wjycvjclpa015orqijvd.png"
                          }
                          alt="icon"
                        ></img>
                        <div className="mg-8"></div>
                        <span>Đăng nhập bằng Facebook</span>
                      </p>
                    </Link>
                    <Link
                      to="/login"
                      className="Userdropdown-button btns-google"
                    >
                      <p>
                        <img
                          width={32}
                          height={32}
                          src={
                            "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617120617/newee/nfxna33s6optwoxawhf5.png"
                          }
                          alt="icon"
                        ></img>
                        <div className="mg-8"></div>
                        <span>Đăng nhập bằng Gmail</span>
                      </p>
                    </Link>
                    <Link to="/login" className="Userdropdown-button btns-zalo">
                      <p>
                        <img
                          width={32}
                          height={32}
                          src={
                            "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617120617/newee/piq6k6u4gvzzdkwucfm9.png"
                          }
                          alt="icon"
                        ></img>
                        <div className="mg-8"></div>
                        <span>Đăng nhập bằng Zalo</span>
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="header-cart">
              <Link to="/cart">
                <div className="cart-container">
                  <div>
                    <i className="fas fa-shopping-cart"></i>
                    <div className="cart-roundy">{shop.numberCart}</div>
                  </div>
                </div>
                <span>Giỏ hàng</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default HeaderAdmin;
