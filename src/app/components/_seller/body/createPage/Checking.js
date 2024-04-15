import debounce from "lodash.debounce";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { createSiteSellerApi } from "../../../../../api/private/createSiteSellerApi";
import { CART_ADD_ITEM } from "../../../../_constants/ActionType";
import { ButtonLoadings } from "../../../common/button/ButtonLoadings";
export default function Checking() {
  let success = "Gửi yêu cầu tạo Domain thành công!";
  let error = "Gửi yêu cầu tạo Domain thất bại!";
  let warning = "Vui lòng chọn tên Domain";

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const {
    cart: { cartItems },
  } = useSelector((state) => state.FetchAllProduct);

  const dispatch = useDispatch();

  const [data, setData] = useState(cartItems);
  const [dataSite, setDataSite] = useState({
    url: "",
    shopName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const history = useHistory();
  const Redirect = () => {
    console.log(" Redirect ");
    setIsRedirect(true);

    setTimeout(() => {
      //  history.push('/login')
      window.location.href = "https://newee.asia/dangnhap.html";
      setIsRedirect(false);
    }, 1000);
  };

  const debouncedSave = useRef(
    debounce((name, value) => saveChangeInput(name, value), 1000)
  ).current;

  const handleChangeInput = (event) => {
    setIsLoading(true);
    const { value: value, name: name } = event.target;
    dataSite[name] = value;

    debouncedSave(name, value);
  };
  const saveChangeInput = (name, value) => {
    try {
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  const handleQuantityReduced = (item, key) => {
    setIsLoading(true);
    const count = cartItems[key].count * 1 - 1;
    cartItems[key].count = count;

    dispatch({ type: CART_ADD_ITEM, payload: { ...item, count } });
    debouncedSave(count, cartItems[key]);
  };

  const handleQuantityIncrease = (item, key) => {
    setIsLoading(true);
    const count = cartItems[key].count * 1 + 1;
    cartItems[key].count = count;
    dispatch({ type: CART_ADD_ITEM, payload: { ...item, count } });
    debouncedSave(count, cartItems[key]);
  };

  const handleCreatePage = async () => {
    setIsLoading(true);
    closeSnackbar();
    console.log(dataSite);

    if (dataSite.shopName.length === 0 || dataSite.url.length === 0) {
      enqueueSnackbar(warning, {
        variant: "warning",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      console.log(dataSite);
      const response = await createSiteSellerApi.checking(
        dataSite.url,
        dataSite.shopName
      );
      console.log("response create site", response);
      enqueueSnackbar(success, {
        variant: "success",
      });
    } catch (error) {
      const err = "Lỗi cú pháp";
      console.log("Failed to create Page error: ", error);
      console.log("Failed to create Page error: ", err);
      enqueueSnackbar(err, {
        variant: "error",
      });
      setIsLoading(false);
      return Promise.reject(err);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="newee-create-page">
      <div className="container-form h-500">
        <form>
          <div className="header d-flex-space-between-center">
            <div className="header-go-back text-center">
              <Link to="/">
                <span>
                  <i className="fas fa-arrow-left red"></i>
                </span>
              </Link>
            </div>
            <div className="header-title text-center">Kiểm tra đơn hàng</div>
            <div className="header-info"></div>
          </div>
          <div className="body">
            <div className="pb-2">
              <label htmlFor="sub">Số điện thoại</label>
            </div>
            <div className="custom-input mb-2">
              <input
                id="url"
                name="url"
                type="number"
                placeholder="Nhập Số điện thoại của đối tác..."
                onChange={(e) => handleChangeInput(e)}
                // value={dataSite.url}
              />
            </div>

            <div className="pb-2">
              <label htmlFor="shopName">Tên đơn hàng</label>
            </div>
            <div className="custom-input">
              <input
                id="shopName"
                name="shopName"
                type="text"
                placeholder="Tên đơn hàng được gửi về Email của đối tác"
                onChange={(e) => handleChangeInput(e)}
                // value={dataSite.shopName}
              />
            </div>
          </div>
          <div className="footer">
            <ButtonLoadings
              isLoading={isLoading}
              handle={handleCreatePage}
              name="Kiểm tra"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
