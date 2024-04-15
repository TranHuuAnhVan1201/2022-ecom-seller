import React from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { RatingStar } from "../../../../common/starRating/RatingStar";
import useWishList from "../../../../hooks/wishList/useWishList";
import { FormatVND, ToSlug } from "../../../../utils";

function ProductSale(props) {
  const { favorites, sellings } = useSelector((state) => state.FetchAllProduct);
  const { actionToFavorite } = useWishList();

  function capitalize(s) {
    return s && s.toLowerCase();
  }

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,

    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 488,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 415,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="product-list p-slider" id="product-tab">
      <Slider {...settings}>
        {sellings.length > 0
          ? sellings.map((value, key) => (
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
            ))
          : null}
      </Slider>
    </div>
  );
}

export default ProductSale;