import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as actions from "../../../../_actions/custommer/products/product";
import "./Cart.scss";

function Carts(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const listCarts = useSelector((state) => state.Shop);
  const dataLogin = useSelector((state) => state.Login.dataLogin);
  console.log("listCart => ", listCarts);
  let TotalCart = 0;
  if (listCarts.numberCart !== 0) {
    listCarts.Carts.forEach((element) => {
      element.priceDiscount > 0
        ? (TotalCart += element.totalPriceDiscount)
        : (TotalCart += element.totalPrice);
    });
  }

  const [quan, setQuan] = useState(1);

  const [quantity, setQuantity] = useState(1);

  var idCart = localStorage.getItem("idCart");
  useEffect(() => {
    if (dataLogin.length === 0) {
      alert("Vui lòng đăng nhập Newee để xem đầy đủ thông tin sản phẩm!");
    }

    if (localStorage.getItem("idCart")) {
      dispatch(actions.actLoadCartListRequest(idCart));
    }
  }, []);

  useEffect(() => {
    dispatch(actions.actLoadCartListRequest(idCart));
  }, [listCarts.numberCart]);
  const deleteProductInCart = (item) => {
    dispatch(actions.DeleteCartSHOP(item));
  };
  const Increase_Quantity = (increase, id) => {
    console.log(increase, id);
    dispatch(actions.IncreaseQuantitySHOP(increase, id));
  };
  const Decrease_Quantity = (decrease, id) => {
    dispatch(actions.DecreaseQuantitySHOP(decrease, id));
  };
  const Update_Quantity = (update, id) => {
    dispatch(actions.UpdateQuantitySHOP(update, id));
  };
  const handleChangeQuantity = (event, id) => {
    event.preventDefault();
    setQuan(event.target.value);
    setQuantity(event.target.value);
    Update_Quantity(parseInt(event.target.value), id);
  };

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

  useEffect(() => {
    // formatVND(1234124124.);
  }, []);

  const onBuy = () => {
    history.push("/checkout");
  };

  localStorage.setItem("shop", JSON.stringify(listCarts));

  const Carts = () => {
    return (
      <div>
        <p> {listCarts.Carts !== 0 ? listCarts.numberCart : 0} sản phẩm</p>

        <div className="wrap-carts">
          <div className="carts-left">
            {listCarts.Carts || quantity !== {}
              ? listCarts.Carts.map((value, key) => {
                  return (
                    <div className="carts-product-group" key={key}>
                      <ul className="carts-left-product">
                        <li className="d-flex">
                          <div className="carts-product-left">
                            <img src={value.imageProduct} alt="carts"></img>
                          </div>
                          <div className="carts-product-right">
                            <div className="carts-product-right-content">
                              <Link to="/" className="header-title">
                                {value.productName}
                              </Link>
                              <div className="item-info">
                                <Link to="/">
                                  <h3> {value.variantName}</h3>
                                  <div className="item-desc">
                                    <span className="variant-title"></span>
                                  </div>
                                </Link>
                              </div>
                              <div className="item-prices">
                                <div className="item-prices-row">
                                  <span className="item-price">
                                    Giá Niêm Yết:
                                  </span>
                                  <span className="item-priceSeller">
                                    {formatVND(value.totalPrice)} ₫
                                  </span>
                                </div>
                                <div className="item-prices-row"></div>
                              </div>

                              <div className="item-prices">
                                <div className="item-prices-row">
                                  <span className="item-price">
                                    Giá Khuyến Mãi:
                                  </span>
                                  <span className="item-priceSeller">
                                    {formatVND(
                                      value.totalPriceDiscount > 0
                                        ? value.totalPriceDiscount
                                        : value.totalPrice
                                    )}{" "}
                                    ₫
                                  </span>
                                </div>
                                <div className="item-prices-row"></div>
                              </div>

                              <div className="item-prices">
                                <div className="item-prices-row">
                                  <span className="item-price">
                                    Hoa hồng đối tác nhận được:
                                  </span>
                                  <span className="item-priceSeller">
                                    {formatVND(value.moneyReceived)} ₫
                                  </span>
                                </div>
                                <div className="item-prices-row"></div>
                              </div>

                              <div className="item-prices">
                                <p>
                                  {/* <span className="item-price">
                                      {value.totalPriceSeller} ₫
                                    </span> */}
                                  {/* <del>({value.totalPriceSeller}) ₫</del> */}
                                </p>
                              </div>

                              <div className="item-quanlity">
                                <button
                                  onClick={() =>
                                    Decrease_Quantity(key, value.id)
                                  }
                                >
                                  -
                                </button>

                                <form>
                                  <input
                                    type="text"
                                    value={value.count}
                                    onChange={(event) =>
                                      handleChangeQuantity(event, value.id)
                                    }
                                  />
                                </form>

                                <button
                                  onClick={() =>
                                    Increase_Quantity(key, value.id)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="carts-product-right-actions">
                              <div className="carts-product-content-desc-button">
                                <button
                                  className="btn btn-light"
                                  onClick={() => deleteProductInCart(value.id)}
                                >
                                  <img
                                    src={
                                      "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1618040558/newee/seller/lwo7nvrnnenpsqku0vya.png"
                                    }
                                    alt="Newee"
                                  ></img>
                                  Xóa
                                </button>
                              </div>

                              <div className="carts-total-price">
                                <span className="span-price">
                                  {value.priceDiscount
                                    ? formatVND(value.totalPriceDiscount)
                                    : formatVND(value.totalPrice)}{" "}
                                  ₫
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        {/* <div className="carts-product-gift-item">
                            <div className="gift-description">
                              Mã khuyến mãi
                            </div>
                            <div className="gift-small-coupon-list"></div>
                          </div> */}
                      </ul>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="carts-right">
            <div className="carts-right-total-cart-price">
              <div className="d-flex-space-between">
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  Tổng tiền
                </span>
                <span className="span-total-price">
                  {listCarts ? formatVND(TotalCart) : 0} ₫
                </span>
              </div>
              <div className="d-flex-space-between">
                <p style={{ textAlign: "justify", fontSize: "13px" }}>
                  Phí vận chuyển sẽ được tính ở trang thanh toán.
                  <br></br>
                  Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                </p>
              </div>
            </div>
            <div className="mg-bottom"></div>
            <button
              type="button"
              className="btn btn-danger btn-block"
              onClick={() => onBuy()}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <section id="seller-cart">
      <div className="carts-container">
        <h2 className="carts-h2">Giỏ hàng của đối tác</h2>
        {dataLogin.length === 0 ? (
          <p>Vui lòng đăng nhập Newee để sử dụng chức năng này</p>
        ) : (
          <Carts />
        )}
      </div>
    </section>
  );
}

export default Carts;
