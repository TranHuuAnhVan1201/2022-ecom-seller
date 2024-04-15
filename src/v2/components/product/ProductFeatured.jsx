import PropType from "prop-types";
import React from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UseWishList } from "../../hooks";
import { FormatVND, ToSlug } from "../../utils";
import { RatingStar } from "../common";
function capitalize(s) {
  return s && s.toLowerCase();
}

const ProductFeatured = ({ product, key }) => {
  const { favorites, sellings } = useSelector((state) => state.FetchAllProduct);
  const { actionToFavorite } = UseWishList();
  const history = useHistory();
  const onClickItem = () => {
    if (!product) return;

    history.push(`/product-detail/${ToSlug(product.name)}.${product.id}`);
  };

  return (
    //<SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
    <div className="card card-whish-list item-sale col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 py-2">
      <div className="a-hover" onClick={onClickItem}>
        {product.link ? (
          <LazyLoadImage
            alt={"Newee" + product.name}
            src={product.link}
            height={222}
            width={222}
          />
        ) : (
          <Skeleton width="222px" height="222px" />
        )}
        <div className="card-body">
          <div className="card-title">
            {capitalize(product.name) || <Skeleton width={220} />}
          </div>
          <div className="card-group-price">
            {product.ratingScores || product.ratingScores === 0 ? (
              <p className="card-stars">
                {product.ratingScores > 0 ? (
                  <>
                    <RatingStar rating={product.ratingScores} />
                    <span className="ml-1">
                      {product.amountRating} đánh giá
                    </span>
                  </>
                ) : null}
              </p>
            ) : (
              <Skeleton width={160} />
            )}

            {product.price1 ? (
              <p className="card-group wl">
                {product.discount !== 0 && (
                  <span className="card-price-old">
                    {FormatVND(product.price1)}₫
                  </span>
                )}

                <span className="card-price-black">
                  {FormatVND(
                    product.discount !== 0
                      ? product.priceDiscountMin
                      : product.price1
                  )}
                  ₫
                </span>

                {product.discountMin !== 0 ? (
                  <span className="card-sale">
                    -{product.discount?.toFixed(0)}%
                  </span>
                ) : null}
              </p>
            ) : (
              <Skeleton width={160} />
            )}

            {product.percent ? (
              <p className="card-coupon">
                Chiết khấu:
                <span className="item-voucher">{product.percent}%</span>
              </p>
            ) : (
              <Skeleton width={120} />
            )}
          </div>
        </div>
      </div>
      <div className="card-footer">
        {product.moneyReceived ? (
          <>
            <p className="card-coupons">
              <span className="item-voucher">
                {FormatVND(product.moneyReceived)}₫
              </span>
            </p>
            <div
              className="count-wish"
              onClick={() => actionToFavorite(product.id, key)}
            >
              <div className="count-wish-list">
                <span>
                  {favorites.includes(product.id) ? (
                    <HiHeart />
                  ) : (
                    <HiOutlineHeart />
                  )}
                </span>
              </div>
            </div>
          </>
        ) : (
          <Skeleton width={200} />
        )}
      </div>
    </div>
    //</SkeletonTheme>
  );
};

ProductFeatured.propTypes = {
  product: PropType.shape({
    image: PropType.string,
    name: PropType.string,
    id: PropType.string,
    brand: PropType.string,
  }).isRequired,
};

export default ProductFeatured;
