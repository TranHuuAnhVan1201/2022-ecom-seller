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

function ProductSale(props) {
  const dispatch = useDispatch()
  const FetchProduct = useSelector((state) => state.FetchAllProduct)
  const dataLogin = useSelector((state) => state.Login.dataLogin)
  const social = useSelector((state) => state.Social)
  const [combo, setCombo] = useState(() => {
    return FetchProduct.slice(0, 10) ?? []
  })

  useEffect(() => {
    load()
    setCombo(FetchProduct.slice(0, 10) ?? [])
  }, [Object(FetchProduct).length, Object.keys(dataLogin).length, social])

  const load = async () => {
    var newFilter = 'Combo'

    if (Object.keys(dataLogin).length === 0) {
      dispatch(actions.actLoadAllProductListRequestPublic(200, 1))
    } else {
      console.log('da chay 2')
      dispatch(actions.actLoadAllProductListRequest(200, 1))
    }
    return
    let d3 = FetchProduct.filter((product) =>
      product.name.toLowerCase().includes(newFilter.toString().toLowerCase())
    )
    let d4 = d3.filter(
      (item) =>
        item.id !== 'cfb177f5-b2a9-4b2a-9e12-b2cb1085d659' &&
        item.id !== 'e399967b-2fab-4a4b-b805-8883db27fb1b'
    )
    setCombo(FetchProduct.slice(0, 10) ?? [])
    // console.log(d4);
  }

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
        {combo.length !== 0
          ? combo.map((value, key) => {
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
                      <div className="card-title">{capitalize(value.name)}</div>
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

export default ProductSale
