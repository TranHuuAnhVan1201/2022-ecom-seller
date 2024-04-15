import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import sale1 from "../../../../../../newee/products/discount/1.jpg";
import * as actions from "../../../../../_actions/custommer/products/product";

// import sale2 from "../../../../../../newee/products/discount/2.jpg"
// import sale3 from "../../../../../../newee/products/discount/3.jpg"
// import sale4 from "../../../../../../newee/products/discount/4.jpg"

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
function SearchResult(props) {
  let { data } = props;
  console.log('data Search Result',data);
  
  const dispatch = useDispatch();



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
  const getIDPRODUCT = (id) => {
    dispatch(actions.ID_PRODUCT(id));
  };
  function capitalize(s) {
    return s && s.toLowerCase();
  }
  return (
    <div
      className="product-list search-result d-flex flex-wrap py-2 justify-content-start align-items-start"
      id="product-tab"
    >
      { data && data !== null
        ? data.map((value, key) => {
          return (
            <div
              className="card item-sale col-xl-4 col-lg-3 col-md-4 col-sm-6 col-6 py-2"
              key={key}
            >
              <Link
                to={"/product-detail/" + to_slug(value.name) + "." + value.id}
                onClick={() => getIDPRODUCT(value.id)}
              >
                <img width={222} height={222} src={value.link} alt="Newee asia" />
                <div className="card-body">
                  <div className="card-title">{capitalize(value.name)}</div>
                  <div className="card-group-price">
                    <p className="card-price-del">
                      {value.discount !== 0
                        ? formatVND(value.price1) + " ₫"
                        : null}
                    </p>

                    <p className="card-group">
                      <span className="card-price">
                          {formatVND(
                              value.discount !== 0 ? value.priceDiscountMin : value.price1
                          ) } {" "}
                        ₫
                      </span>

                      {value.discount !== 0 ? (
                        <span className="card-sale">
                          -{value.discount.toFixed(0)}%
                        </span>
                      ) : null}
                    </p>

                    <p className="card-coupon">
                      Chiết khấu:
                      <span className="item-voucher">
                        {value.percent}%
                      </span>
                    </p>
                     {value.moneyReceived ?
                      <p className="card-coupons">
                  
                          <span className="item-voucher">
                          ({formatVND(value.moneyReceived)}₫)
                          </span>
                      </p> : null
                    }
                    

                    <div className="item-list-icon d-flex-space-between">
                      <div
                        className="item-icon"
                        style={{ marginLeft: "4px", marginBottom: "4px" }}
                      >
                        <img src={sale1} alt="Newee" width={30} height={30}></img>
                      </div>
                      {/* <div className="item-icon"
                                                style={{ marginLeft: "4px", marginBottom: "4px" }}
                                            >
                                                <img
                                                    src={sale2}
                                                    alt="Newee"
                                                    width={30}
                                                    height={30}
                                                ></img>
                                            </div> */}
                      {/* <div className="item-icon"
                                                style={{ marginLeft: "4px", marginBottom: "4px" }}
                                            >
                                                <img
                                                    src={sale3}
                                                    alt="Newee"
                                                    width={30}
                                                    height={30}
                                                ></img>
                                            </div> */}
                      {/* <div className="item-icon"
                                                style={{ marginLeft: "4px", marginBottom: "4px" }}
                                            >
                                                <img
                                                    src={sale4}
                                                    alt="Newee"
                                                    width={30}
                                                    height={30}
                                                ></img>
                                            </div> */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
        : null}
    </div>
  );
}

export default SearchResult;
