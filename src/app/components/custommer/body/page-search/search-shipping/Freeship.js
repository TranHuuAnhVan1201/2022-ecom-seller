import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../../../_actions/custommer/products/product";
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
function Freeship(props) {
  let { data } = props;
  console.log(data);
  const dispatch = useDispatch();
  const getIDName = (item) => {
    dispatch(actions.IDName(item));
  };
  const formatVND = (str) => {
    if (typeof str !== "string") {
      let toStr = String(str);
      

      
      if (toStr.split(".")[1] !== undefined) {
        return toStr.split(".")[0]
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ",") + prev;
        }) + "." + toStr.split(".")[1];
      } else {
        return toStr
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ",") + prev;
        })
      }
    }
  };
  return (
    <div className="body-search-product">
      {data
        ? data.map((value, key) => {
            return (
              <div className="product-item col-4">
                <Link
                  to={"/product-detail/" + to_slug(value.name) + "." + value.id}
                  onClick={() => getIDName(value)}
                  className="vertion2020 large"
                >
                  <div className="thumbnail">
                    <div className="bage-top">
                      {value.shipping === 1 ? (
                        <div className="item-top">
                          <div className="skew"></div>
                          <img alt="bage-top" width={16} height={16}></img>
                          <span>Freeship</span>
                        </div>
                      ) : null}
                    </div>
                    <img src={value.link} alt="search"></img>
                  </div>
                  <div className="info">
                    <div className="service">
                      <div>
                        <img
                          width="56"
                          height="16"
                          alt="123"
                          src="http://placehold.jp/56x16.png"
                        ></img>
                      </div>
                    </div>
                    <div className="name">
                      <p className="p-search-seller-admin">ADMIN</p>
                      <span>{value.name}</span>
                    </div>

                    <div className="price-discount">
                      <div className="price-discount-price">
                        {formatVND(value.price1)} đ
                      </div>
                      <div className="price-discount-pricesale">
                        {formatVND(value.priceSeller1)} đ
                      </div>
                      <div className="price-discount-discount">
                        {value.price1 / value.priceSeller1 !== 0
                          ? ((value.price1 / value.priceSeller1) * 100).toFixed(
                              1
                            )
                          : 0}{" "}
                        %
                      </div>
                    </div>
                    <div className="badge-under-price">
                      <img width="124" height="18" alt="123"></img>
                    </div>
                    <div className="badge-benefits">
                      Danh mục: {value.category}
                    </div>
                    <div className="badge-add-info"></div>
                  </div>
                </Link>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Freeship;
