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
function SearchResultOld(props) {
    let { data } = props;
    // console.log(data);
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
    const getIDPRODUCT = (id) => {
        dispatch(actions.ID_PRODUCT(id));
    };
    return (
        <div className="body-search-product">
            {data && data.length !== 0 ? (
                data.map((value, key) => {
                    // console.log("da co sna pham");
                    return (
                        <div className="product-item item" key={key}>
                            <Link
                                to={"/product-detail/" + to_slug(value.name) + "." + value.id}
                                //   onClick={() => getIDName(value)}
                                onClick={() => getIDPRODUCT(value.id)}
                                className="vertion2020 large"
                            >
                                <div className="thumbnail">
                                    <div className="bage-top">
                                        {value.shipping === 1 ? (
                                            <div className="item-top">
                                                <div className="skew"></div>
                                                <img
                                                    alt="bage-top"
                                                    width={16}
                                                    height={16}
                                                    src="http://placehold.jp/56x16.png"
                                                ></img>
                                                <span>Freeship</span>
                                            </div>
                                        ) : null}
                                    </div>
                                    <img src={value.link} alt="search"></img>
                                </div>
                                <div className="info item-text">
                                    <div className="name item-title">
                                        <span>{value.name}</span>
                                    </div>

                                    <del className="deal-price">{formatVND(value.price1)} ₫</del>
                                    <div className="item-price">
                                        <span className="deal-discount">
                                            {formatVND(
                                                value.price1 - (value.price1 / 100) * value.discount
                                            )}{" "}
                                            đ
                                        </span>
                                        {value.discount !== 0 ? (
                                            <span className="item-sale">-{value.discount} %</span>
                                        ) : null}
                                    </div>
                                    <div className="item-coupon">
                                        Chiết khấu:{" "}
                                        <span className="item-voucher">
                                            {(
                                                100 -
                                                (value.priceSeller1 * 100) / value.price1
                                            ).toFixed(2)}{" "}
                                            %
                                        </span>
                                    </div>

                                    {/* <div className="item-rate">
                    <img
                      src={
                        "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617724777/newee/newee%200604/qqangp3hoopbozcvrigh.png"
                      }
                      alt="rate"
                    ></img>
                    <span>0 đánh giá</span>
                  </div> */}
                                    <div className="badge-benefits">
                                        Danh mục: {value.categoryName}
                                    </div>
                                    <div className="badge-add-info"></div>
                                </div>
                            </Link>
                        </div>
                    );
                })
            ) : (
                <div style={{ padding: "16px" }}>Không có sản phẩm</div>
            )}
        </div>
    );
}

export default SearchResultOld;
