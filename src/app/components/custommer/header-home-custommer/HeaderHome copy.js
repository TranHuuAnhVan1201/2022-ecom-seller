import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logo from "../../../../newee/logo/logo.png";
import * as actions from "../../../_actions/custommer/products/product";
import apiLocalhost0 from "../../../_untils/apiLocalhost0";
import "./Header.scss";

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

function HeaderHome({ token, setToken }) {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.Shop);
  const dataLogin = useSelector((state) => state.Login);

  const [totalKM, setTotalKM] = useState(0);
  const FetchProduct = useSelector((state) => state.FetchAllProduct);
  const [active, setActive] = useState(false);

  // 1908
  const [listCategoryPublic, setListCategoryPublic] = useState();

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();
  const onSubmit = (data) => {
    handleSearchs(data.search);
  };

  const [check, setCheck] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setCheck(true);
    }
  }, []);

  useEffect(() => {
    if (
      dataLogin.dataLogin.code &&
      parseInt(dataLogin.dataLogin.code.slice(2)) >= 2021000199
    ) {
      setTotalKM(100000);
    }
  });

  const onLogout = () => {
    setCheck(false);
    localStorage.removeItem("checkToken");
    localStorage.removeItem("token");
    localStorage.removeItem("idCart");
    localStorage.removeItem("idUser");
    localStorage.removeItem("first");
    setToken(null);
    token = null;
    history.push("/");

    // window.location.href = `https://newee.asia/dangnhap.html`;
    // window.setTimeout(window.location.reload.bind(window.location), 10);
  };
  const onRegister = () => {
    window.location.href = `https://newee.asia/dangky.html`;
  };
  const onLogin = () => {
    window.location.href = `https://newee.asia/dangnhap.html`;
  };

  const handleSearchs = async (inputs) => {};

  const category = [
    {
      id: "2637dd6e-d44d-471e-9fac-6475101d710a",
      name: "Nhà Cửa và Đời Sống",
      url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/qhxgsdswvwgdwrpjor12.png",
    },
    {
      id: "49049185-89d9-42d7-9fb7-0e6230a6bc4e",
      name: "Sức Khỏe và Sắc Đẹp",
      url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/k9mj7nidr7bjjkhgxzo0.png",
    },
    {
      id: "a7e1a4cc-d916-48f1-b722-9a7e1c4b2323",
      name: "Chăm Sóc Thú Cưng",
      url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/mmwu2w1rcbzpeyfzgkza.png",
    },
    {
      id: "deed476c-e8ab-4786-8e7e-68f2fb7d70bc",
      name: "Bách Hóa",
      url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/t7qtx1jtkkwja9tfpgtb.png",
    },
    {
      id: "e78901cc-75f6-4e5e-8830-9fd007b681e9",
      name: "Combo độc lạ",
      // url: `${img5}`,
    },
    {
      id: "801d0f4d-8a54-4a7e-8837-804cf42f8729",
      name: "Sách",
      // url: `${img6}`,
    },
    {
      id: "fbd0ba77-e2a0-4710-acea-210c98e06e7a",
      name: "Thời Trang",
      // url: `${img6}`,
    },
  ];
  const onClickCategory = (id) => {
    dispatch(actions.onClickCategory(id));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);
  const [state, setState] = useState({});

  const submit = (e) => {
    e.preventDefault();
  };
  function handleSearchTermChange(e) {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
    setActive(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // moi lan go doi 300ms
    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      handleFilterChange(value);
    }, 300);

    // handleFilterChange(e.target.value);
  }

  function handleFilterChange(newFilter) {
    console.log(FetchProduct);
    if (newFilter !== undefined) {
      const data = FetchProduct.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(newFilter.toString().toLowerCase()) ||
          product.brand
            .toLowerCase()
            .includes(newFilter.toString().toLowerCase())
      );
      setState({ keyword: newFilter, productsFilter: data });
    }
    setVisible(true);
  }
  const getIDPRODUCT = (id) => {
    setActive(false);
    setVisible(false);
    dispatch(actions.ID_PRODUCT(id));
  };

  const [visible, setVisible] = useState(false);
  const node = useRef();

  const handleClick = () => {
    if (!visible) {
      document.addEventListener("click", handleOutsideClick, false);
    } else {
      document.removeEventListener("click", handleOutsideClick, false);
    }
    setVisible((prevState) => ({
      visible: !prevState.visible,
    }));
  };
  const ShowAll = () => {
    setActive(true);
    setVisible(true);
  };

  const handleOutsideClick = (e) => {
    // if (!node.current.contains(e.target)) {
    //   console.log("da chay");
    //   setVisible(false);
    //   return;
    // }

    if (node || node.current === null) {
      setVisible(false);
      return;
    } else if (!node.current.contains(e.target)) {
      setVisible(false);
      return;
    }
  };

  // 1908
  useEffect(() => {
    getCategoryPublic();
    if (dataLogin.dataLogin && dataLogin.dataLogin.length !== 0) {
      getCategory();
    }
  }, []);

  const getCategoryPublic = () => {
    apiLocalhost0(`Newee/ProductSeller/PublicGetListCategory`, "GET", null)
      .then((res) => {
        setListCategoryPublic(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getCategory = () => {
    apiLocalhost0(`Newee/ProductSeller/GetListCategory`, "GET", null)
      .then((res) => {
        setListCategoryPublic(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <header className="seller">
      <section>
        <div className={active === true ? "header search-active" : "header"}>
          <div className="header-top-left">
            <div className="logo-menu">
              <Link to="/" className="logo">
                <img src={logo} width={148} height={60} alt="newee"></img>
              </Link>
              <div className="menu">
                <div className="bars">
                  <i className="fas fa-bars"></i>
                </div>
                <div className="wrap">
                  <span>
                    Danh mục <br />
                    Sản phẩm <i className="fas fa-caret-down"></i>
                  </span>
                </div>
                <div className="user-dropdown menus menu-dropdown position-absolute top-42 left-120">
                  <div className="container-menu">
                    {listCategoryPublic !== undefined
                      ? listCategoryPublic.map((value, key) => (
                          <Link
                            to={
                              "/search/" + to_slug(value.name) + "." + value.id
                            }
                            onClick={() => onClickCategory(value.name)}
                            key={key}
                          >
                            <p>
                              <span className="span-icon">
                                <i className="fas fa-gift"></i>
                              </span>
                              <span>{value.name}</span>
                            </p>
                          </Link>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="search-container" ref={node}>
              <form className="search" onSubmit={handleSearchTermChange}>
                <input
                  // name="search"
                  className="input-search"
                  type="text"
                  placeholder="Tìm sản phẩm, danh mục hay thương hiệu bạn mong muốn..."
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  // readyOnly
                  onClick={() => handleClick()}
                />

                <button type="submit" className="btn-search-desktop ">
                  <Link to={"/search"} onClick={() => setVisible(false)}>
                    <div className="show-all">
                      <i className="fas fa-search"></i>Tìm kiếm
                    </div>
                  </Link>
                </button>
                <button type="submit" className="btn-search-mobile">
                  <i className="fas fa-search"></i>
                </button>
              </form>

              <div>
                <div
                  className={
                    visible ? "container-show active" : "container-show"
                  }
                >
                  <div className="show-title">
                    <Link to={"/search"}>
                      <div className="show-all">
                        <span>Kết quả: </span>
                      </div>
                    </Link>
                  </div>
                  <div className="show-body">
                    <div className="show-body-1" style={{ width: "100%" }}>
                      {state.productsFilter === undefined ||
                        (state.productsFilter.length !== 0 &&
                          state.productsFilter.map((item, key) => {
                            return (
                              <div className="styles-container">
                                <Link
                                  to={
                                    "/product-detail/" +
                                    to_slug(item.name) +
                                    "." +
                                    item.id
                                  }
                                  onClick={() => getIDPRODUCT(item.id)}
                                >
                                  <div className="show-body-item">
                                    <i className="fas fa-search"></i>
                                    <div className="styles-image">
                                      <img
                                        src={item.link}
                                        alt="newee-asia"
                                      ></img>
                                    </div>
                                    <p style={{ fontSize: 12 }}>{item.name}</p>
                                  </div>
                                </Link>
                              </div>
                            );
                          }))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-top-right">
            {/* search */}
            <div className="header-login header-cart d1707" id="d1707-search">
              <div className="cart-container">
                <div>
                  <i
                    className="fas fa-search dropdown-toggle"
                    data-toggle="notification-menu"
                    onClick={() => ShowAll()}
                  />
                </div>
              </div>
            </div>

            {/* notifications */}
            <div className="header-login header-login-menu" id="d1707-bars">
              <i className="fa fa-bars" aria-hidden="true"></i>
              <div className="col col-user">
                <div className="login-register">
                  <p className="span-user">
                    <span>
                      Tài khoản <br />
                      {token && dataLogin.dataLogin.code !== undefined
                        ? dataLogin.dataLogin.code
                        : dataLogin.dataLogin.email}
                    </span>
                    <i className="fas fa-caret-down"></i>
                  </p>
                </div>

                {token ? (
                  <div className="user-dropdown acount position-absolute top-36 header-menus">
                    {category.map((value, key) => {
                      return (
                        <Link
                          to={"/search/" + to_slug(value.name)}
                          onClick={() => onClickCategory(value.name)}
                          key={key}
                        >
                          <p>
                            <span>{value.name}</span>
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>

            {/* user */}
            <div className="header-login">
              <i className="far fa-user"></i>

              <div className="col col-user">
                <div className="login-register">
                  <p className="span-user">
                    <span>
                      Tài khoản <br />
                      {token ? dataLogin.dataLogin.code !== undefined
                        ? dataLogin.dataLogin.code
                        : dataLogin.dataLogin.email : ''}
                    </span>
                    <i className="fas fa-caret-down"></i>
                  </p>
                </div>

                {token ? (
                  <div className="user-dropdown acount position-absolute top-36">
                    <Link to="/admin">
                      <p>
                        <span>Quản lý tài khoản</span>
                      </p>
                    </Link>
                    {/* <Link to="/dashboard">
                      <p>
                        <span>Dashboard</span>
                      </p>
                    </Link> */}
                    <Link to="/admin/sale">
                      <p>
                        <span>Đơn hàng của tôi</span>
                      </p>
                    </Link>

                    <Link to="/">
                      <p onClick={() => onLogout()}>
                        <span>Thoát tài khoản</span>
                      </p>
                    </Link>
                  </div>
                ) : (
                  <div className="user-dropdown menus position-absolute top-36 btn-header ">
                    <Link
                      to="/"
                      className="Userdropdown-button btns-login-register"
                      onClick={() => onLogin()}
                    >
                      <p>
                        <span className="span-center span-border-none">
                          Đăng nhập
                        </span>
                      </p>
                    </Link>
                    <Link
                      to="/"
                      onClick={() => onRegister()}
                      className="Userdropdown-button btns-login-register"
                    >
                      <p>
                        <span className="span-center span-border-none">
                          Đăng ký
                        </span>
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* notifications */}

            <div className="header-login header-cart">
              <div className="cart-container">
                <div>
                  <i
                    className="fas fa-bell dropdown-toggle"
                    data-toggle="notification-menu"
                  />
                  <div className="cart-roundy">{totalKM !== 0 ? "4" : "0"}</div>
                </div>
              </div>

              <div className="col col-user notification">
                <div className="user-dropdown acount position-absolute top-36">
                  <ul
                    id="notification-menu"
                    className="dropdown-menu-2 notification-menu"
                  >
                    <div className="dropdown-menu-header">
                      <p>Thông báo</p>
                    </div>
                    <div className="dropdown-menu-content overlay-scrollbar scrollbar-hover">
                      <li
                        className={
                          totalKM !== 0 ? "dropdown-menu-item" : "d-none"
                        }
                      >
                        <Link to="/admin/users/connect/ConnectFB">
                          <div className="dropdown-menu-link">
                            <div>
                              <i className="fas fa-gift" />
                            </div>
                            <p className="title">
                              Đăng nhập bằng Facebook
                              <br />
                              <span className="time">06/08/2021</span>
                            </p>
                          </div>
                        </Link>
                        <Link to="/admin/users/connect/ConnectGG">
                          <div className="dropdown-menu-link">
                            <div>
                              <i className="fas fa-gift" />
                            </div>
                            <p className="title">
                              Đăng nhập bằng Google
                              <br />
                              <span className="time">06/08/2021</span>
                            </p>
                          </div>
                        </Link>
                        <Link to="/admin/analysis">
                          <div className="dropdown-menu-link">
                            <div>
                              <i className="fas fa-gift" />
                            </div>
                            <p className="title">
                              Khuyến mãi đăng ký mới
                              <br />
                              <span className="time">15/06/2021</span>
                            </p>
                          </div>
                        </Link>
                        <Link to="/admin/analysis">
                          <div className="dropdown-menu-link">
                            <div>
                              <i className="fas fa-gift" />
                            </div>
                            <p className="title">
                              Khuyến mãi kết thúc
                              <br />
                              <span className="time">30/06/2021</span>
                            </p>
                          </div>
                        </Link>
                      </li>
                    </div>
                    <div className="dropdown-menu-footer">
                      <p>View all notifications</p>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            {/* giỏ hàng */}
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

export default HeaderHome;
