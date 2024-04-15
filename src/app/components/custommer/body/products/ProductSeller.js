import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import sale1 from '../../../../../newee/products/discount/1.jpg'
import { ToSlug } from '../../../../utils/ToSlug'
import * as actions from '../../../../_actions/custommer/products/product'
import './Product.scss'
// import sale2 from "../../../../../newee/products/discount/2.jpg"
// import sale3 from "../../../../../newee/products/discount/3.jpg"
// import sale4 from "../../../../../newee/products/discount/4.jpg"

function ProductSeller(props) {
  const dispatch = useDispatch()
  const FetchProduct = useSelector((state) => state.FetchAllProduct)
  const [list, setList] = useState([])

  useEffect(() => {
    if (FetchProduct.length > 0) {
      let ascending2 = FetchProduct.sort((a, b) => Number(b.percent) - Number(a.percent))

      var top10 = ascending2.slice(0, 5)
      setList(top10)
    }
  }, [FetchProduct])

  const formatVND = (str) => {
    if (typeof str !== 'string') {
      let toStr = String(str)

      if (toStr.split('.')[1] !== undefined) {
        return (
          toStr
            .split('.')[0]
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
              return (index % 3 ? next : next + ',') + prev
            }) +
          '.' +
          toStr.split('.')[1]
        )
      } else {
        return toStr
          .split('')
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ',') + prev
          })
      }
    }
  }
  const getIDPRODUCT = (id) => {
    dispatch(actions.ID_PRODUCT(id))
  }
  function capitalize(s) {
    return s && s.toLowerCase()
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
  }

  return (
    <div className="product-list p-slider" id="product-tab">
      <Slider {...settings}>
        {list !== [] || list !== null
          ? list.map((value, key) => {
              return (
                <div
                  className="card item-sale col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 py-2"
                  key={key}
                >
                  <Link
                    to={'/product-detail/' + ToSlug(value.name) + '.' + value.id}
                    onClick={() => getIDPRODUCT(value.id)}
                  >
                    <LazyLoadImage
                      alt={'Newee' + value.name}
                      src={value.link} // use normal <img> attributes as props
                      height={222}
                      width={222}
                    />

                    <div className="card-body">
                      <div className="card-title">{capitalize(value.name + 123)}</div>
                      <div className="card-group-price">
                        <p className="card-price-del">
                          {value.discount !== 0 ? formatVND(value.price1) + ' ₫' : null}
                        </p>

                        <p className="card-group">
                          <span className="card-price">
                            {formatVND(
                              value.discount !== 0 ? value.priceDiscountMin : value.price1
                            )}
                            ₫
                          </span>

                          {value.discountMin !== 0 ? (
                            <span className="card-sale">-{value.discount.toFixed(0)}%</span>
                          ) : null}
                        </p>

                        {value.percent ? (
                          <p className="card-coupon">
                            Chiết khấu:
                            <span className="item-voucher">{value.percent}%</span>
                          </p>
                        ) : null}

                        {value.percent ? (
                          <p className="card-coupons">
                            <span className="item-voucher">
                              ({formatVND(value.moneyReceived)}
                              ₫)
                            </span>
                          </p>
                        ) : null}

                        <div className="item-list-icon d-flex-space-between">
                          <div
                            className="item-icon"
                            style={{ marginLeft: '4px', marginBottom: '4px' }}
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
              )
            })
          : null}
      </Slider>
    </div>
  )
}

export default ProductSeller
