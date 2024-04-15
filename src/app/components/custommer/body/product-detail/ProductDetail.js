import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as actions from "../../../../_actions/custommer/products/product";
import * as action from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
import Swal from "sweetalert2";
import NoSSR from "react-no-ssr";
import MetaDecorator from "../../../Util/MetaDecorator";

import "./productDetail.scss";
import ProductSale from "../products/ProductSale";
import FormShare from "./FormShare/FormShare";
import apiLocalhost0 from "../../../../_untils/apiLocalhost0";
// import Carousel from "./components/Carousel";

const formatVND = (str) => {
  if (typeof str !== "string") {
    let toStr = String(str);

    if (toStr.split(".")[1] !== undefined) {
      return (
        toStr
          .split(".")[0]
          .split("")
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ",") + prev;
          }) +
        "." +
        toStr.split(".")[1]
      );
    } else {
      return toStr
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ",") + prev;
        });
    }
  }
};

function ProductDetail(props) {
  let { id } = useParams();
  const dataLogin = useSelector((state) => state.Login.dataLogin);

  const IDPRODUCT = useSelector((state) => state.IDName);
  const [item, setItem] = useState({});
  const [variant, setVariant] = useState([]);
  const [activeVariant, setActiveVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [image, setImage] = useState(null);
  const [imgShare, setImgShare] = useState("");

  const [metaImage, setMetaImage] = useState(null);

  const [dataPublic, setDataPublic] = useState(null);
  const [dataPrivate, setDataPrivate] = useState(null);

  // console.log("id Product detail => ", id);

  const getProduct = async () => {
    // console.log("da chay get product 11 =>", id);
    apiLocalhost0(`Newee/ProductSeller/GetById/${id}`, "GET", null)
      .then((res) => {
        // console.log("get Product 1 =>", res);
        setItem(res.data.data);
        // setDataPrivate(res.data.data);
        setDataPublic(null);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const getVariantProduct = async () => {
    apiLocalhost0(`Newee/ProductSeller/GetListVariant/${id}`, "GET", null)
      .then((res) => {
        let ascending = res.data.data.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        setVariant(ascending);
        setActiveVariant(res.data.data[0].id);
        setMax(res.data.data[0].count);

        console.log("get Ascending => ", ascending);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductPublic = async () => {
    console.log("da chay get product 11 =>", id);
    apiLocalhost0(`Newee/ProductPublic/GetById/${id}`, "GET", null)
      .then((res) => {
        console.log("get Product Public 1 =>", res);
        // setItem(res.data.data);
        setDataPublic(res.data.data);
      })
      .catch((error) => {
        console.log("error 11", error.response);
      });
  };
  const getVariantProductPublic = async (id) => {
    apiLocalhost0(`Newee/ProductSeller/GetListVariant/${id}`, "GET", null)
      .then((res) => {
        let ascending = res.data.data.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        setVariant(ascending);
        setActiveVariant(res.data.data[0].id);
        setMax(res.data.data[0].count);

        console.log("get Ascending => ", ascending);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // set active gia
  const clickVariant = (id, link) => {
    setActiveVariant(id);
    setImage(link);
    setImgShare(link);
  };

  useEffect(() => {
    // if (dataLogin.length === 0) {
    //   alert("Vui lòng đăng nhập Newee để xem đầy đủ thông tin sản phẩm!");
    // }

    if (item && item.link) {
      setImgShare(item.link);
    }
  }, []);

  // const data = {
  // };
  const addProductToCart = async (idCart, idProd, idVariant, count) => {
    // apiLocalhost0(
    apiLocalhost0(
      `Newee/Cart/Additem/${idCart}/${idProd}/${idVariant}/${count}`,
      "POST",
      null
    )
      .then((res) => {
        Swal.fire({
          position: "top-end",
          zIndex: 10000,
          icon: "success",
          title: "Thêm vào giỏ hàng thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (dataLogin.length === 0) {
      getProductPublic();
      //  getVariantProduct(id);
    } else {
      getProduct();
      getVariantProduct();
    }
  }, [id]);

  const AddToCart = (item, quantity) => {
    if (dataLogin.length === 0) {
      alert("Vui lòng đăng nhập Newee để sử dụng chức năng này!");
      return;
    }
    if (localStorage.getItem("idCart")) {
      var idCartStorage = localStorage.getItem("idCart");
      if (parseInt(quantity) > parseInt(max)) {
        alert("Nhập quá số lượng");
        setQuantity(1);
      } else if (parseInt(quantity) < parseInt(min)) {
        alert("Số lượng tối thiểu là 1.");
        setQuantity(1);
      } else {
        dispatch(actions.AddCartSHOP(item, parseInt(quantity)));
        IDPRODUCT
          ? addProductToCart(idCartStorage, IDPRODUCT, activeVariant, quantity)
          : addProductToCart(idCartStorage, id, activeVariant, quantity);
        setMax(parseInt(max) - parseInt(quantity));
        setQuantity(1);
      }
    }
  };

  const Increase_Quantity = (increase, id) => {
    setQuantity(quantity + 1);
  };
  const Decrease_Quantity = (decrease, id) => {
    setQuantity(quantity - 1);
  };

  const handleChangeQuantity = (event) => {
    event.preventDefault();
    setQuantity(event.target.value);
  };

  // form

  const [logged, setlogged] = useState(false);

  const [idForm, setIDForm] = useState("");

  const onEdit = (idForm, value) => {
    if (dataLogin.length === 0) {
      alert("Vui lòng đăng nhập Newee để sử dụng chức năng này!");
      return;
    }
    setIDForm(idForm);
    setlogged(true);
    dispatch(action.openForm());
  };

  const onSetLogged = () => {
    setlogged(false);
  };
  const onReloadPage = (name) => {
    // getUser();
    setlogged(false);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: name,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // const links = [
  //   {
  //     id: 0,
  //     name: "facebook",
  //     url: "https://www.facebook.com/newee.asia",
  //     links:
  //       "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617739064/newee/newee%200604/s9fiy6660kbyd4sywwg7.png",
  //   },
  //   {
  //     id: 1,
  //     name: "youtube",
  //     url: "https://www.youtube.com/channel/UCBXO3aEBAhRZJucrNikEZ3w",
  //     links:
  //       "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617739064/newee/newee%200604/si0yxjqcf5pw8glnzonh.png",
  //   },
  //   {
  //     id: 2,
  //     name: "zalo",
  //     url: "https://www.facebook.com/newee.asia",
  //     links:
  //       "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617739064/newee/newee%200604/jgescdp8kmp87tw6svio.png",
  //   },
  //   {
  //     id: 3,
  //     name: "tiktok",
  //     url: "https://www.tiktok.com/@newee_social",
  //     links:
  //       "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1618908876/newee/seller/vcvflpptnucczu8vwiy0.png",
  //   },
  // ];

  const contentDownload = (url) => {
    window.open(`${url}`);
  };
  const uiPublic = (
    <div className="sp-detail">
      <div className="breadcrumb">
        {logged === true ? (
          <FormShare
            id={idForm}
            data={item.description}
            listContent={item}
            listImage={item.link}
            onReload={onReloadPage}
            onSetLogged={onSetLogged}
            imgShare={imgShare ? imgShare : item.link}
          ></FormShare>
        ) : null}

        <Link to="/" className="breadcrumb-item">
          Trang chủ
        </Link>
        <span className="mg-16">›</span>

        <Link to="/" className="breadcrumb-item">
          {dataPublic ? dataPublic.categoryName : "Đang cập nhập"}
          {/* {item.companyBeadcrumb ? item.companyBeadcrumb : "Danh mục"} */}
        </Link>
        <span className="mg-16">›</span>
        <Link to="/" className="breadcrumb-item">
          {dataPublic ? dataPublic.name : "Đang cập nhập"}
          {/* {item.companyBeadcrumb ? item.companyBeadcrumb : "Danh mục"} */}
        </Link>
      </div>

      <div className="index-wrap">
        <div className="container-left">
          <div className="larger-img">
            {/* <img width={444} height={444} src={item.url} alt="pictures" /> */}
            <img
              src={dataPublic ? dataPublic.link : "Đang cập nhập"}
              alt="pictures"
            />
            <div className="list-img">
              {variant !== [] || variant !== null || variant !== undefined
                ? variant.map((value, key) => {
                    return (
                      <div
                        onClick={() => clickVariant(value.id, value.imageLink)}
                        key={key}
                        className={value.imageLink ? " " : "d-none"}
                      >
                        <img src={value.imageLink} alt="pictures" />
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        <div className="container-right">
          <div className="header">
            <div className="header-left">
              <div className="brand">
                <span>
                  Thương hiệu:{" "}
                  <font color="rgb(13, 92, 182)"> {dataPublic?.brand}</font>
                </span>
                <span>|</span>
                <span>
                  Đứng thứ{" "}
                  <font color="rgb(13, 92, 182)">
                    {Math.floor(Math.random() * 100)} trong Top 100 Hàng bán
                    chạy tháng này
                  </font>
                </span>
              </div>
              <h2>{dataPublic?.name || "Đang cập nhập"}</h2>
            </div>
          </div>
          <div className="body">
            <div className="body-left">
              <div>
                <div>Giá</div>
                <div>Chiết khấu</div>
                <div>Phân loại</div>
                <div>(Vui lòng đăng nhập Newee để xem chi tiết!)</div>
                {variant !== [] || variant !== null || variant !== undefined
                  ? variant.map((value, key) => {
                      // setSku(value.sku);
                      return (
                        <div key={key}>
                          <div
                            className={
                              value.id === activeVariant
                                ? "area-price active"
                                : "area-price none"
                            }
                          >
                            <span className="current-price">
                              {formatVND(
                                value.priceDiscount > 0
                                  ? value.priceDiscount
                                  : value.price
                              )}{" "}
                              ₫
                            </span>

                            <span className="list-price">
                              {formatVND(value.price)} ₫
                            </span>

                            <span className="discount-price">
                              {value.discount !== 0 ? (
                                <span className="item-sale">
                                  -{value.discount} %
                                </span>
                              ) : (
                                <span className="item-sale">0 %</span>
                              )}
                            </span>
                          </div>
                          <div
                            className={
                              value.id === activeVariant
                                ? "area-discount"
                                : "area-discount none"
                            }
                            key={key}
                          >
                            <div className="discount-tags">
                              <button className="btn btn-outline-primary">
                                Chiết khấu{" "}
                                {
                                  // (100 - (value.priceSeller / value.price * 100)).toFixed(2)

                                  value.percent +
                                    "%" +
                                    " (" +
                                    formatVND(value.moneyReceived) +
                                    "₫" +
                                    ")"
                                }
                                {/* {value.discount > 0 ?
                                  (
                                    value.priceSeller / (value.price - (value.price * value.discount / 100)) * 100
                                  ).toFixed(2) : (100 - (value.priceSeller / value.price * 100)).toFixed(2)} */}
                              </button>
                              <button
                                className="btn btn-danger-1"
                                onClick={() =>
                                  contentDownload(item.productAsset)
                                }
                              >
                                Thư viện
                              </button>
                            </div>
                          </div>

                          <div
                            className={
                              value.id === activeVariant
                                ? "option-name active"
                                : "option-name none"
                            }
                            key={key}
                          >
                            <span>OPTION: </span>
                            {value.propertyValue}
                          </div>
                        </div>
                      );
                    })
                  : null}

                <div className="area-option">
                  <div className="option color">
                    <div className="choose-option">
                      {variant.map((value, key) => {
                        return (
                          <div
                            key={key}
                            className={
                              value.id === activeVariant
                                ? "list active"
                                : "list"
                            }
                            onClick={() =>
                              clickVariant(value.id, value.imageLink)
                            }
                          >
                            <span>{value.propertyValue}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="option size"></div>
                </div>

                <div className="area-pay">
                  <div className="pay-text">Số lượng</div>

                  <div className="item-quanlity">
                    <button onClick={() => Decrease_Quantity()}>-</button>
                    <form>
                      <input
                        type="text"
                        value={quantity}
                        onChange={handleChangeQuantity}
                      />
                    </form>

                    <button onClick={() => Increase_Quantity()}>+</button>
                    <span>Chỉ còn {max} sản phẩm</span>
                  </div>
                </div>
                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                  <button
                    className="btn btn-danger"
                    onClick={() => AddToCart(item, quantity)}
                    style={{ marginRight: "6px" }}
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button className="btn btn-primary" onClick={() => onEdit(1)}>
                    <i
                      className="fab fa-facebook"
                      style={{
                        marginRight: "6px",
                      }}
                    ></i>
                    <span>Chia sẻ mẫu bán hàng</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="related">
        <div className="header">
          <h2>Sản phẩm tương tự</h2>
        </div>
        <div className="body">
          <ProductSale />
        </div>
      </div>

      <div className="clr" />

      <div className="description">
        <div className="left">
          <div className="area-details">
            <div className="header">
              <h2>Thông tin chi tiết</h2>
            </div>
            <div className="body">
              <div className="body-items">
                <div className="left">Thương hiệu</div>
                <div>{dataPublic?.brand}</div>
              </div>

              {variant.map((value, key) => {
                return (
                  <div
                    key={key}
                    className={
                      value.id === activeVariant
                        ? "body-items "
                        : "body-items show"
                    }
                  >
                    <div className="left">SKU</div>
                    <div>{value.sku}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="area-description">
            <div className="header">
              <h2>Mô tả sản phẩm</h2>
            </div>
            <div className="body">
              <div className="content">
                <pre>{dataPublic?.description}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const uiPrivate = (
    <div className="sp-detail">
      <div className="breadcrumb">
        {logged === true ? (
          <FormShare
            id={idForm}
            data={item.description}
            listContent={item}
            listImage={item.link}
            onReload={onReloadPage}
            onSetLogged={onSetLogged}
            imgShare={imgShare ? imgShare : item.link}
          ></FormShare>
        ) : null}

        <Link to="/" className="breadcrumb-item">
          {/* {item.categoryBeadcrumb ? item.categoryBeadcrumb : "Hãng"} */}
          Trang chủ
        </Link>
        <span className="mg-16">›</span>

        <Link to="/" className="breadcrumb-item">
          {item.categoryName}
          {/* {item.companyBeadcrumb ? item.companyBeadcrumb : "Danh mục"} */}
        </Link>
        <span className="mg-16">›</span>
        <Link to="/" className="breadcrumb-item">
          {item.name}
          {/* {item.companyBeadcrumb ? item.companyBeadcrumb : "Danh mục"} */}
        </Link>
      </div>

      <div className="index-wrap">
        <div className="container-left">
          <div className="larger-img">
            {/* <img width={444} height={444} src={item.url} alt="pictures" /> */}
            <img src={image ? image : item.link} alt="pictures" />
            <div className="list-img">
              {variant !== [] || variant !== null || variant !== undefined
                ? variant.map((value, key) => {
                    return (
                      <div
                        onClick={() => clickVariant(value.id, value.imageLink)}
                        key={key}
                        className={value.imageLink ? " " : "d-none"}
                      >
                        <img src={value.imageLink} alt="pictures" />
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        <div className="container-right">
          <div className="header">
            <div className="header-left">
              <div className="brand">
                <span>
                  Thương hiệu:{" "}
                  <font color="rgb(13, 92, 182)"> {item.brand}</font>
                </span>
                <span>|</span>
                <span>
                  Đứng thứ{" "}
                  <font color="rgb(13, 92, 182)">
                    {Math.floor(Math.random() * 100)} trong Top 100 Hàng bán
                    chạy tháng này
                  </font>
                </span>
              </div>
              <h2>{item ? item.name : null}</h2>
            </div>
          </div>
          <div className="body">
            <div className="body-left">
              <div>
                {variant !== [] || variant !== null || variant !== undefined
                  ? variant.map((value, key) => {
                      // setSku(value.sku);
                      return (
                        <div key={key}>
                          <div
                            className={
                              value.id === activeVariant
                                ? "area-price active"
                                : "area-price none"
                            }
                          >
                            <span className="current-price">
                              {formatVND(
                                value.priceDiscount > 0
                                  ? value.priceDiscount
                                  : value.price
                              )}{" "}
                              ₫
                            </span>

                            <span className="list-price">
                              {formatVND(value.price)} ₫
                            </span>

                            <span className="discount-price">
                              {value.discount !== 0 ? (
                                <span className="item-sale">
                                  -{value.discount} %
                                </span>
                              ) : (
                                <span className="item-sale">0 %</span>
                              )}
                            </span>
                          </div>
                          <div
                            className={
                              value.id === activeVariant
                                ? "area-discount"
                                : "area-discount none"
                            }
                            key={key}
                          >
                            <div className="discount-tags">
                              <button className="btn btn-outline-primary">
                                Chiết khấu{" "}
                                {
                                  // (100 - (value.priceSeller / value.price * 100)).toFixed(2)

                                  value.percent +
                                    "%" +
                                    " (" +
                                    formatVND(value.moneyReceived) +
                                    "₫" +
                                    ")"
                                }
                                {/* {value.discount > 0 ?
                                  (
                                    value.priceSeller / (value.price - (value.price * value.discount / 100)) * 100
                                  ).toFixed(2) : (100 - (value.priceSeller / value.price * 100)).toFixed(2)} */}
                              </button>
                              <button
                                className="btn btn-danger-1"
                                onClick={() =>
                                  contentDownload(item.productAsset)
                                }
                              >
                                Thư viện
                              </button>
                            </div>
                          </div>

                          <div
                            className={
                              value.id === activeVariant
                                ? "option-name active"
                                : "option-name none"
                            }
                            key={key}
                          >
                            <span>OPTION: </span>
                            {value.propertyValue}
                          </div>
                        </div>
                      );
                    })
                  : null}
                <div className={"option-name"}>
                  <span>PHÂN LOẠI HÀNG: </span>
                  {item.categoryName}
                </div>

                <div className="area-option">
                  <div className="option color">
                    <div className="choose-option">
                      {variant.map((value, key) => {
                        return (
                          <div
                            key={key}
                            className={
                              value.id === activeVariant
                                ? "list active"
                                : "list"
                            }
                            onClick={() =>
                              clickVariant(value.id, value.imageLink)
                            }
                          >
                            <span>{value.propertyValue}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="option size"></div>
                </div>

                <div className="area-pay">
                  <div className="pay-text">Số lượng</div>

                  <div className="item-quanlity">
                    <button onClick={() => Decrease_Quantity()}>-</button>
                    <form>
                      <input
                        type="text"
                        value={quantity}
                        onChange={handleChangeQuantity}
                      />
                    </form>

                    <button onClick={() => Increase_Quantity()}>+</button>
                    <span>Chỉ còn {max} sản phẩm</span>
                  </div>
                </div>
                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                  <button
                    className="btn btn-danger"
                    onClick={() => AddToCart(item, quantity)}
                    style={{ marginRight: "6px" }}
                  >
                    Thêm vào giỏ hàng
                  </button>

                  <button className="btn btn-primary" onClick={() => onEdit(1)}>
                    <i
                      className="fab fa-facebook"
                      style={{
                        marginRight: "6px",
                      }}
                    ></i>
                    <span>Chia sẻ mẫu bán hàng</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="related">
        <div className="header">
          <h2>Sản phẩm tương tự</h2>
        </div>
        <div className="body">
          <ProductSale />
        </div>
      </div>

      <div className="clr" />

      <div className="description">
        <div className="left">
          <div className="area-details">
            <div className="header">
              <h2>Thông tin chi tiết</h2>
            </div>
            <div className="body">
              <div className="body-items">
                <div className="left">Thương hiệu</div>
                <div>{item.brand}</div>
              </div>

              {variant.map((value, key) => {
                return (
                  <div
                    key={key}
                    className={
                      value.id === activeVariant
                        ? "body-items "
                        : "body-items show"
                    }
                  >
                    <div className="left">SKU</div>
                    <div>{value.sku}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="area-description">
            <div className="header">
              <h2>Mô tả sản phẩm</h2>
            </div>
            <div className="body">
              <div className="content">
                <pre>{item.description}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const content = (
    <section className="type0">
      <MetaDecorator
        description={
          dataPublic?.description?.substr(0, 150) ||
          item?.description?.substr(0, 150)
        }
        title={dataPublic?.name || item?.name}
        imageUrl={dataPublic?.link || item?.link}
        imageAlt={"Newee asia - Happy Seller"}
      />
      {dataLogin.length === 0 ? uiPublic : uiPrivate}

      {/* <Carousel /> */}
    </section>
  );

  return <NoSSR>{content}</NoSSR>;
}

export default ProductDetail;
