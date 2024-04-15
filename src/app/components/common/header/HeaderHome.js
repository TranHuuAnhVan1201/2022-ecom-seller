import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
	HiChevronDown,
	HiOutlineMenu,
	HiOutlineUser,
	HiSearch,
	HiShoppingCart
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logo from "../../../../newee/logo/logo.png";
import { ToSlug } from "../../../utils/ToSlug";
import * as actions from "../../../_actions/custommer/products/product";
import { USER_LOGOUT } from "../../../_constants/ActionType";
import "./Header.scss";

function HeaderHome({ token }) {
  const dispatch = useDispatch();

  const {
    userInfo,
    cart: { cartLength },
    categories,
    products,
  } = useSelector((state) => state.FetchAllProduct);

  const [totalKM, setTotalKM] = useState(0);
  const [active, setActive] = useState(false);

  // 1908

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();

  const [check, setCheck] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("tokenSeller")) {
      setCheck(true);
    }
  }, []);

  const onLogout = async () => {
    setCheck(false);
    await localStorage.removeItem("cartItems");
    await localStorage.removeItem("idCartSeller");
    await localStorage.removeItem("idUserSeller");
    await localStorage.removeItem("shop");
    await localStorage.removeItem("tokenSeller");
    await localStorage.removeItem("user");
    dispatch({ type: USER_LOGOUT });
    history.push("/");
    window.location.reload();
  };
  const onRegister = () => {
    window.location.href = "https://newee.asia/dangky.html";
  };
  const onLogin = () => {
    window.location.href = "https://newee.asia/dangnhap.html";
  };

  const onClickCategory = (id) => {
    dispatch(actions.onClickCategory(id));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);
  const [state, setState] = useState({});

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
  }

  function handleFilterChange(newFilter) {
    // console.log(products)
    if (newFilter !== undefined) {
      const data = products.filter(
        (product) =>
          product.name
            ?.toLowerCase()
            .includes(newFilter.toString().toLowerCase()) ||
          product.brand
            ?.toLowerCase()
            .includes(newFilter.toString().toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(newFilter.toString().toLowerCase()) ||
          product.content1
            ?.toLowerCase()
            .includes(newFilter.toString().toLowerCase()) ||
          product.categoryName
            ?.toLowerCase()
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
    if (node || node.current === null) {
      setVisible(false);
      return;
    } else if (!node.current.contains(e.target)) {
      setVisible(false);
      return;
    }
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
                  <span className="size-20">
                    <HiOutlineMenu />
                  </span>
                </div>
                <div className="wrap">
                  <span>
                    Danh mục <br />
                    Sản phẩm 
                  </span>
                </div>
                <div className="user-dropdown menus menu-dropdown position-absolute top-42 left-120">
                  <div className="container-menu">
                    {categories &&
                      categories.map((value, key) => (
                        <Link
                          to={"/search/" + ToSlug(value.name) + "." + value.id}
                          onClick={() => onClickCategory(value.name)}
                          key={key}
                        >
                          <p>
                            <span>{value.name}</span>
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="search-container" ref={node}>
              <form className="search" onSubmit={handleSearchTermChange}>
                <input
                  className="input-search"
                  type="text"
                  placeholder="Tìm sản phẩm, danh mục hay thương hiệu bạn mong muốn..."
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  onClick={() => handleClick()}
                />

                <button type="submit" className="btn-search-desktop ">
                  <Link to={"/search"} onClick={() => setVisible(false)}>
                    <div className="show-all text-center">
                      <HiSearch />
                    </div>
                  </Link>
                </button>
                <button type="submit" className="btn-search-mobile">
                  <HiSearch />
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
                              <div className="styles-container" key={item.id}>
                                <Link
                                  to={
                                    "/product-detail/" +
                                    ToSlug(item.name) +
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

            <div className="header-login header-login-menu" id="d1707-bars">
              <HiOutlineUser />
              <div className="col col-user">
                <div className="login-register">
                  <p className="span-user">
                    <span>
                      Tài khoản <br />
                      {userInfo && userInfo.email}
                    </span>
                    <HiChevronDown />
                  </p>
                </div>

                {check ? (
                  <div className="user-dropdown acount position-absolute top-36 header-menus">
                    {categories?.map((value, key) => {
                      return (
                        <Link
                          to={"/search/" + ToSlug(value.name)}
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

            <div className="header-login">
              <HiOutlineUser />

              <div className="col col-user">
                <div className="login-register">
                  <p className="span-user">
                    <span>
                      Tài khoản <br />
                      {token !== undefined ? userInfo.code : userInfo.email}
                    </span>
                    <HiChevronDown />
                  </p>
                </div>

                {token && token.length > 0 ? (
                  <div className="user-dropdown acount position-absolute top-36">
                    <Link to="/admin">
                      <p>
                        <span>Quản lý tài khoản</span>
                      </p>
                    </Link>
                    <Link to="/admin/sale">
                      <p>
                        <span>Đơn hàng của tôi</span>
                      </p>
                    </Link>
                    <Link to="/admin/banking">
                      <p>
                        <span>Ví Newee</span>
                      </p>
                    </Link>
                    <Link to="/admin/analysis-bank">
                      <p>
                        <span>Doanh thu</span>
                      </p>
                    </Link>
                    <Link to="/create-page">
                      <p>
                        <span>Tạo trang bán hàng</span>
                      </p>
                    </Link>
                    <Link to="/checking">
                      <p>
                        <span>Buyer - Kiểm tra đơn</span>
                      </p>
                    </Link>
                    <Link to="/wish-list">
                      <p>
                        <span>Danh sách Yêu thích </span>
                      </p>
                    </Link>

                    <p
                      onClick={onLogout}
                      className="py-2 px-2"
                      style={{ cursor: "pointer" }}
                    >
                      <span>Thoát tài khoản</span>
                    </p>
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
                          Đăng nhập Newee
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
                          Đăng ký Newee
                        </span>
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
                    <HiShoppingCart />
                    <div className="cart-roundy">{cartLength || 0}</div>
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
