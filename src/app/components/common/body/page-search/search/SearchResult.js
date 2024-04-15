import React from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RatingStar } from "../../../../../common/starRating/RatingStar";
import useWishList from "../../../../../hooks/wishList/useWishList";
import { FormatVND } from "../../../../../utils";
import { ToSlug } from "../../../../../utils/ToSlug";

function SearchResult(props) {
  let { data } = props;
  const { actionToFavorite } = useWishList();

  const { favorites } = useSelector((state) => state.FetchAllProduct);
  function capitalize(s) {
    return s && s.toLowerCase();
  }
  return (
    <div
      className="product-list search-result d-flex flex-wrap justify-content-start align-items-start"
      id="product-tab"
    >
      {data.length > 0
        ? data.map((value, key) => {
            return (
              <div
                className="card card-whish-list item-sale col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 py-2"
                key={key}
              >
                <Link
                  to={"/product-detail/" + ToSlug(value.name) + "." + value.id}
                >
                  <LazyLoadImage
                    alt={"Newee" + value.name}
                    src={value.link}
                    height={222}
                    width={222}
                  />
                </Link>
                <div className="card-body">
                  <div className="card-title">{capitalize(value.name)} </div>
                  <div className="card-group-price">
                    <p className="card-stars">
                      <RatingStar rating={value.ratingScores} />
                      <span className="ml-1">
                        {" "}
                        {value.amountRating} đánh giá
                      </span>
                    </p>

                    <p className="card-group wl">
                      {value.discount !== 0 && (
                        <span className="card-price-old">
                          {FormatVND(value.price1)}₫
                        </span>
                      )}

                      <span className="card-price-black">
                        {FormatVND(
                          value.discount !== 0
                            ? value.priceDiscountMin
                            : value.price1
                        )}
                        ₫
                      </span>

                      {value.discountMin !== 0 ? (
                        <span className="card-sale">
                          -{value.discount.toFixed(0)}%
                        </span>
                      ) : null}
                    </p>

                    {value.percent ? (
                      <p className="card-coupon">
                        Chiết khấu:
                        <span className="item-voucher">{value.percent}%</span>
                      </p>
                    ) : null}
                    <div className="d-flex-space-between-center">
                      {value.moneyReceived ? (
                        <p className="card-coupons">
                          <span className="item-voucher">
                            ({FormatVND(value.moneyReceived)}
                            ₫)
                          </span>
                        </p>
                      ) : null}

                      <div
                        className="count-wish"
                        onClick={() => actionToFavorite(value.id, key)}
                      >
                        <div className="count-wish-list">
                          <span>
                            {favorites.includes(value.id) ? (
                              <HiHeart />
                            ) : (
                              <HiOutlineHeart />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default SearchResult;
