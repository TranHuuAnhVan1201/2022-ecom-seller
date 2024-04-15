// Tất cả sản phẩm

import React, { useLayoutEffect, useRef, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RatingStar } from "../../../../common/starRating/RatingStar";
import useWishList from "../../../../hooks/wishList/useWishList";
import { FormatVND } from "../../../../utils";
import { ToSlug } from "../../../../utils/ToSlug";
import { EmptyNull } from "../../../common/body/empty/EmptyNull";
import { AntButton } from "../../../common/button";

function capitalize(s) {
  return s && s.toLowerCase();
}

function Product(props) {
  const { actionToFavorite } = useWishList();

  const { productLike, isRender, productsNew, favorites } = useSelector(
    (state) => state.FetchAllProduct
  );

  const [state, setState] = useState({
    itemsToShowList:
      productsNew.length > 0 && isRender ? productsNew.slice(0, 20) : [],
    //itemsToShowList: [],
    hideLoadMore: false,
    showResetButton: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    if (productsNew.length < 1) return;
    if (state.itemsToShowList.length === productsNew.length) {
      return;
    } else {
      const visibleItemsCount = state.itemsToShowList.length;
      const totalItems = productsNew.length;

      const dataLoad = [
        ...state.itemsToShowList,
        ...productsNew.slice(visibleItemsCount, visibleItemsCount + 20),
      ];

      const isCheck = dataLoad.length === totalItems;

      setState({
        itemsToShowList: dataLoad,
        hideLoadMore: isCheck,
        showResetButton: isCheck,
      });
    }
    setIsLoading(false);
  };
  const firstLoading = useRef(true);

  useLayoutEffect(() => {
    if (firstLoading.current) {
      firstLoading.current = false;
      return;
    }

    if (productsNew.length > 0 && isRender) {
      loadMore();
    }
  }, [productsNew]);

  const [index, setIndex] = useState(0);
  const handleIndex = async (index) => {
    setIndex(index);
  };

  return (
    <>
      <div className="newee-sticky-container">
        <div
          onClick={() => handleIndex(0)}
          className={index === 0 ? "newee-btn-div active" : "newee-btn-div"}
        >
          Gợi ý hôm nay
        </div>
        <div
          onClick={() => handleIndex(1)}
          className={index === 1 ? "newee-btn-div active" : "newee-btn-div"}
        >
          Danh sách yêu thích
        </div>
      </div>
      <div
        className="product-list d-flex flex-wrap py-2 justify-content-start align-items-start"
        id="product-tab"
      >
        {state &&
          state.itemsToShowList.length > 0 &&
          index === 0 &&
          state.itemsToShowList.map((value, key) => (
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
                    <span className="ml-1"> {value.amountRating} đánh giá</span>
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
          ))}

        {index === 1 &&
          (productLike?.length > 0 ? (
            productLike?.map((value, key) => (
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
                          <span>{<HiHeart />}</span>
                          <span className="number">
                            {value.countLike || 0}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyNull name={"Chưa có sản phẩm yêu thích..."} />
          ))}
      </div>
      {index === 0 && (
        <div className="d-flex-center mt-1 mb-2 large">
          <AntButton
            type={"primary"}
            size={"large"}
            icons={null}
            isLoading={isLoading}
            handle={!isLoading ? loadMore : undefined}
            name="Xem thêm"
          />
        </div>
      )}
    </>
  );
}

export default Product;
