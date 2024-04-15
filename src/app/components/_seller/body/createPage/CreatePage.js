import debounce from "lodash.debounce";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { createSiteSellerApi } from "../../../../../api/private/createSiteSellerApi";
import { ButtonLoading } from "../../../common/buttonLoading";
export default function CreatePage() {
  let success = "Gửi yêu cầu tạo Domain thành công!";
  let errors = "Gửi yêu cầu tạo Domain thất bại!";
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
  const [isShow, setIsShow] = useState(false);
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

  const handleCreatePage = async () => {
    setIsLoading(true);
    closeSnackbar();
    console.log(dataSite);

    if (dataSite.shopName.length === 0 || dataSite.url.length === 0) {
      enqueueSnackbar(warning, {
        variant: "warning",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await createSiteSellerApi.create(dataSite);
      console.log("response create site", response);
      setIsShow(true);
      enqueueSnackbar(success, {
        variant: "success",
      });
    } catch (error) {
      setIsShow(false);
      const err = "Lỗi cú pháp";
      enqueueSnackbar(errors, {
        variant: "error",
      });
      setIsLoading(false);
      return Promise.reject(err);
    }

    setIsLoading(false);
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
            <div className="header-title text-center">Tạo trang bán hàng</div>
            <div className="header-info"></div>
          </div>
          <div className="body">
            <div className="pb-2">
              <label htmlFor="sub">Tên Domain</label>
            </div>
            <div className="custom-input mb-2">
              <input
                id="url"
                name="url"
                type="text"
                placeholder="Viết thường không dấu, khoảng trắng..."
                onChange={(e) => handleChangeInput(e)}
                // value={dataSite.url}
              />
            </div>

            <div className="pb-2">
              <label htmlFor="shopName">Tên Shop</label>
            </div>
            <div className="custom-input">
              <input
                id="shopName"
                name="shopName"
                type="text"
                placeholder="Có thể có dấu, khoảng trắng..."
                onChange={(e) => handleChangeInput(e)}
                // value={dataSite.shopName}
              />
            </div>
          </div>

          <div className="footer mgb-1">
            <div className="full">
              <ButtonLoading
                loading={isLoading}
                text={"Gửi yêu cầu"}
                handleClick={handleCreatePage}
              />
            </div>
          </div>
        </form>
        <div className="footer-notification">
          {isShow && (
            <p>
              Chúng tôi đã tiếp nhận yêu cầu của bạn. <br /> Sau khi trang bán
              hàng được hoàn tất, chúng tôi sẽ gửi thông báo kèm đường link
              trang bán hàng của bạn qua địa chỉ Email bạn đã đăng ký.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
