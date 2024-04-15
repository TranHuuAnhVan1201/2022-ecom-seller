import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import sale1 from "../../../../../newee/products/discount/1.jpg";
import { FormatVND, ToSlug } from "../../../../utils";

function ProductSeller(props) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.FetchAllProduct);

  useEffect(() => {
    console.warn(products);
  }, [products]);
  function capitalize(s) {
    // return s && s[0].toUpperCase() + s.slice(1).toCapitalize();
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
        {products.length > 5
          ? products
              .sort((a, b) => Number(b.percent) - Number(a.percent))
              .slice(0, 5)
              .map((value, key) => {
                return (
                  <div
                    className="card item-sale col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 py-2"
                    key={key}
                  >
                    <Link
                      to={
                        "/product-detail/" + ToSlug(value.name) + "." + value.id
                      }
                    >
                      <LazyLoadImage
                        alt={"Newee" + value.name}
                        src={value.link} // use normal <img> attributes as props
                        height={222}
                        width={222}
                      />
                      <div className="card-body">
                        <div className="card-title">
                          {capitalize(value.name)}
                        </div>
                        <div className="card-group-price">
                          <p className="card-price-del">
                            {value.discount !== 0
                              ? FormatVND(value.price1) + " ₫"
                              : null}
                          </p>

                          <p className="card-group">
                            <span className="card-price">
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
                              <span className="item-voucher">
                                {value.percent}%
                              </span>
                            </p>
                          ) : null}

                          {value.percent ? (
                            <p className="card-coupons">
                              <span className="item-voucher">
                                ({FormatVND(value.moneyReceived)}
                                ₫)
                              </span>
                            </p>
                          ) : null}

                          <div className="item-list-icon d-flex-space-between">
                            <div
                              className="item-icon"
                              style={{
                                marginLeft: "4px",
                                marginBottom: "4px",
                              }}
                            >
                              <LazyLoadImage
                                alt={"Newee" + value.name}
                                src={sale1}
                                width={30}
                                height={30}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
          : null}
      </Slider>
    </div>
  );
}

export default ProductSeller;
