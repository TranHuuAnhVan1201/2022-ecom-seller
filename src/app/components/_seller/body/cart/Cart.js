import debounce from "lodash.debounce";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { dataLoginApiPr, productApiPr } from "../../../../../api/private";
import { FormatVND } from "../../../../utils/FormatVND";
import { ToSlug } from "../../../../utils/ToSlug";
import {
  CART_ADD_ITEM,
  OFF_SPINNERS,
  ON_SPINNERS,
  PRIVATE_CART_LOADING,
  USER,
} from "../../../../_constants/ActionType";
import { EmptySeller } from "../../../common/body/empty/EmptySeller";
import { ButtonLoading } from "../../../common/loadings";
export default function Cart() {
  let successCart = "Cập giỏ hàng Newee thành công!";
  let warningCart =
    "Cập giỏ hàng Newee không thành công! Vui lòng dùng chức năng Xoá!";
  let errorCart = "Cập giỏ hàng Newee không thành công thành công!";
  let successRemoveCart =
    "Xoá sản phẩm trong giỏ hàng Newee thành công thành công!";
  let errorRemoveCart =
    "Xoá sản phẩm trong giỏ hàng Newee không thành công thành công!";

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const {
    user,
    cart: { cartItems },
  } = useSelector((state) => state.FetchAllProduct);
  const dataConnect = JSON.parse(localStorage.getItem("dataConnect"));

  useEffect(() => {
    if (typeof user === "undefined") {
      //const data = JSON.parse(localStorage.getItem('dataConnect'));
      dispatch({ type: USER, dataConnect });
    }
    console.log(user);
  }, [user]);

  const dispatch = useDispatch();

  const [data, setData] = useState(cartItems);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const history = useHistory();
  const Redirect = () => {
    console.log(" Redirect ");
    setIsRedirect(true);

    setTimeout(() => {
      history.push("/");
      setIsRedirect(false);
    }, 1000);
  };

  const debouncedSave = useRef(
    debounce((count, item, key) => saveChangeInput(count, item, key), 1000)
  ).current;

  const handleChangeInput = (event, item, key) => {
    setIsLoading(true);
    const { value: count } = event.target;
    cartItems[key].count = count * 1;
    dispatch({ type: CART_ADD_ITEM, payload: { ...item, count } });
    debouncedSave(count, item, key);
  };
  let isOne = 1;
  const saveChangeInput = (count, item, key) => {
    dispatch({ type: ON_SPINNERS });

    try {
      updateCartHandler(item, count * 1);
      setIsLoading(false);
      dispatch({ type: OFF_SPINNERS });
    } catch (error) {
      dispatch({ type: OFF_SPINNERS });
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const handleQuantityReduced = (item, key) => {
    setIsLoading(true);
    const count = cartItems[key].count * 1 - 1;
    if (count < 1) {
      cartItems[key].count = 1;
      setIsLoading(false);
    } else {
      cartItems[key].count = count;
      dispatch({ type: CART_ADD_ITEM, payload: { ...item, count } });
      debouncedSave(count, cartItems[key]);
    }
  };

  const handleQuantityIncrease = (item, key) => {
    setIsLoading(true);
    const count = cartItems[key].count * 1 + 1;
    cartItems[key].count = count;
    dispatch({ type: CART_ADD_ITEM, payload: { ...item, count } });
    debouncedSave(count, cartItems[key]);
  };

  const updateCartHandler = async (item, count) => {
    closeSnackbar();
    dispatch({ type: ON_SPINNERS });

    try {
      if (count * 1 > 0) {
        const responseChangeCount = await productApiPr.changeQuantityFromCart(
          item.id,
          count
        );
        const cart = await dataLoginApiPr.getDataCart(
          user?.cart || dataConnect?.cart
        );
        dispatch({ type: PRIVATE_CART_LOADING, cart });
        enqueueSnackbar(successCart, {
          variant: "success",
        });
      } else {
        const cart = await dataLoginApiPr.getDataCart(
          user?.cart || dataConnect?.cart
        );
        dispatch({ type: PRIVATE_CART_LOADING, cart });
        enqueueSnackbar(warningCart, {
          variant: "warning",
        });
      }
      dispatch({ type: OFF_SPINNERS });
    } catch (error) {
      dispatch({ type: OFF_SPINNERS });
      enqueueSnackbar(errorCart, {
        variant: "error",
      });
    }
    setIsLoading(false);
  };

  const removeItemHandler = async (item) => {
    closeSnackbar();
    dispatch({ type: ON_SPINNERS });
    try {
      const remove = await productApiPr.removeProductFromCart(item.id);
      const cart = await dataLoginApiPr.getDataCart(
        user?.cart || dataConnect?.cart
      );
      dispatch({ type: PRIVATE_CART_LOADING, cart });
      enqueueSnackbar(successRemoveCart, {
        variant: "success",
      });
      dispatch({ type: OFF_SPINNERS });
    } catch (error) {
      dispatch({ type: OFF_SPINNERS });
      console.log("Failed to fetch product list: ", error);
      enqueueSnackbar(errorRemoveCart, {
        variant: "error",
      });
    }
  };

  const addToCheckout = () => {
    try {
      history.push("/checkout");
    } catch (error) {
      dispatch({ type: OFF_SPINNERS });
    }
  };

  console.log(cartItems);
  return (
    <div className="">
      {cartItems?.length < 1 ? (
        <EmptySeller
          name={"Chưa có sản phẩm"}
          btnTitle="Quay lại trang chủ"
          handleClick={Redirect}
          isLoading={isRedirect}
          title="Giỏ hàng của đối tác"
        />
      ) : (
        <div className="container-cart">
          <div className="cart-header mgb-1 md-display-none">
            <div className="cart-header-col name pl-2">Tên sản phẩm</div>
            <div className="cart-header-col price ">Đơn giá</div>
            <div className="cart-header-col quantity">Số lượng</div>
            <div className="cart-header-col total">Số tiền</div>
            <div className="cart-header-col actions">Thao tác</div>
          </div>
          <div className="cart-body mgb-1">
            {cartItems.map((value, key) => (
              <div className="cart-body-item" key={value.id}>
                <div className="cart__col cart__col--name pl-2 d-flex-left">
                  <Link
                    to={`/product-detail/${ToSlug(value.productName)}.${
                      value.idProduct
                    }`}
                  >
                    <LazyLoadImage
                      src={value.imageProduct}
                      width={100}
                      height={100}
                      alt={`Newee ${value.productName}`}
                    />
                  </Link>
                  <div className="md-d-flex-column-center lg-d-flex-row-center">
                    <div className="cart__item--name px-1">
                      <Link
                        to={`/product-detail/${ToSlug(value.productName)}.${
                          value.idProduct
                        }`}
                      >
                        {value.productName}
                      </Link>
                    </div>
                    <div className="cart__item--options pl-1">
                      <span>Phân loại hàng</span>
                      <br />
                      <span>
                        {value.propertyValue ||
                          value.variantName ||
                          "Hàng đẹp 100%"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="cart__col price d-flex-column-right">
                  <div>
                    {value.priceDiscount !== 0 ? (
                      <>
                        <span className="price-old pr-1">
                          {FormatVND(value.price)}₫
                        </span>
                        <strong>{FormatVND(value.priceDiscount)}₫</strong>
                      </>
                    ) : (
                      <strong>{FormatVND(value.price)}₫</strong>
                    )}
                  </div>
                  <div className="d-flex-left pt-1">
                    {value.priceDiscount !== 0 && (
                      <span className="box-price-percent">
                        {`
                       Giảm giá
                        ${
                          100 -
                          (value.priceDiscount / value.price).toFixed(2) * 100
                        }%`}
                      </span>
                    )}
                  </div>

                  {/*<div className="pt-1">
                                        <span className="price pr-1">Chiết khấu: </span>
                                        <strong id="money-received">
                                            {FormatVND(value.moneyReceived)}₫
                                        </strong>
                                    </div>*/}
                </div>
                <div className="cart__col d-flex-center quantity">
                  <div className="box-options">
                    <div className="box-options-flex box-quantity">
                      <button
                        className="btn-quantity"
                        onClick={() => handleQuantityReduced(value, key)}
                      >
                        -
                      </button>
                      <input
                        className="input-quantity detail"
                        value={value.count}
                        onChange={(e) => handleChangeInput(e, value, key)}
                      ></input>
                      <button
                        className="btn-quantity"
                        onClick={() => handleQuantityIncrease(value, key)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="cart__col total d-flex-column-right">
                  {value.totalPriceDiscount !== 0 ? (
                    <strong className="price total">
                      {FormatVND(value.totalPriceDiscount)}₫
                    </strong>
                  ) : (
                    <strong className="price total">
                      {FormatVND(value.totalPrice)}₫
                    </strong>
                  )}

                  <div className="pt-1">
                    <span className="price pr-1">Chiết khấu: </span>
                    <strong id="money-received" className="red">
                      {FormatVND(value.totalMoneyReceived)}₫
                    </strong>
                  </div>
                </div>
                <div className="cart__col actions d-flex-end">
                  <button
                    className="newee-btn btn-info btn-m"
                    onClick={() => removeItemHandler(value)}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-main mgb-1">
            {cartItems.map((value, key) => (
              <div className="cart-main-item" key={value.id}>
                <div className="cart-main-images">
                  <Link
                    to={`/product-detail/${ToSlug(value.productName)}.${
                      value.idProduct
                    }`}
                  >
                    <LazyLoadImage
                      src={value.imageProduct}
                      width={100}
                      height={100}
                      alt={`Newee ${value.productName}`}
                      className="cart-main-images-img"
                    />
                  </Link>
                </div>
                <div className="cart-main-content">
                  <div className="cart-main-col col-name">
                    <div className="cart__item--name md-px-1">
                      <Link
                        to={`/san-pham/${ToSlug(value.productName)}.${
                          value.idProduct
                        }`}
                      >
                        {value.productName || "Đang cập nhập"}
                      </Link>
                    </div>
                    <div className="cart__item--options md-pl-1 xs-d-flex ">
                      <span>Phân loại hàng:</span>
                      <span className="pl-1">
                        {value.propertyValue ||
                          value.variantName ||
                          "Hàng đẹp 100%"}
                      </span>
                    </div>
                  </div>

                  <div className="cart-main-col price d-flex-column-right xs-d-flex">
                    <div>
                      {value.priceDiscount !== 0 ? (
                        <>
                          <span className="price-old pr-1">
                            {FormatVND(value.price)}₫
                          </span>
                          <strong>{FormatVND(value.priceDiscount)}₫</strong>
                        </>
                      ) : (
                        <strong>{FormatVND(value.price)}₫</strong>
                      )}
                    </div>
                    <div className="d-flex-left">
                      {value.priceDiscount !== 0 && (
                        <span className="box-price-percent">
                          {`Giảm giá${
                            100 -
                            (value.priceDiscount / value.price).toFixed(2) * 100
                          }%`}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="cart-main-col d-flex-center quantity">
                    <div className="box-options">
                      <div className="box-options-flex box-quantity">
                        <button
                          className="btn-quantity"
                          onClick={() => handleQuantityReduced(value, key)}
                        >
                          -
                        </button>
                        <input
                          className="input-quantity detail"
                          value={value.count}
                          onChange={(e) => handleChangeInput(e, value, key)}
                        ></input>
                        <button
                          className="btn-quantity"
                          onClick={() => handleQuantityIncrease(value, key)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="cart-main-col total d-flex-column-right">
                    {value.priceDiscount > 0 ? (
                      <strong className="price totals">
                        {FormatVND(value.totalPriceDiscount)}₫
                      </strong>
                    ) : (
                      <strong className="price totals">
                        {FormatVND(value.totalPrice)}₫
                      </strong>
                    )}

                    <div className="pt-1">
                      <span className="price pr-1">Chiết khấu: </span>
                      <strong id="money-received">
                        {FormatVND(value.totalMoneyReceived)}₫
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="cart-main-col actions d-flex-end">
                  <p className="exit" onClick={() => removeItemHandler(value)}>
                    ✖
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer p-1">
            <div className="cart-footer-col box-price d-flex-end">
              {/*<span className="mr-2">Tổng tiền ({cartLength} Sản phẩm):</span>*/}
              <strong className="price total lg mr-2">
                {FormatVND(
                  cartItems.reduce(
                    (a, c) =>
                      a +
                      c.count *
                        (c.priceDiscount !== 0 ? c.priceDiscount : c.price),
                    0
                  )
                )}
                ₫
              </strong>
            </div>

            <div className="cart-footer-col d-flex-right actions">
              <ButtonLoading
                loading={isLoading}
                text={"Mua hàng"}
                handleClick={addToCheckout}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
