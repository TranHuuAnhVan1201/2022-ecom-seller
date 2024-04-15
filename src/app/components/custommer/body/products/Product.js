/**
 * Resolves with a reference to a service worker that matches the script URL
 * of this instance, as soon as it's available.
 *
 * If, at registration time, there's already an active or waiting service
 * worker with a matching script URL, it will be used (with the waiting
 * service worker taking precedence over the active service worker if both
 * match, since the waiting service worker would have been registered more
 * recently).
 * If there's no matching active or waiting service worker at registration
 * time then the promise will not resolve until an update is found and starts
 * installing, at which point the installing service worker is used.
 *
 * @return {Promise<ServiceWorker>}
 */

import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// import Pagination from "../pagination/Pagination"
import sale1 from '../../../../../newee/products/discount/1.jpg'
import { ToSlug } from '../../../../utils/ToSlug'
import * as actions from '../../../../_actions/custommer/products/product'
import './Product.scss'

// import sale2 from "../../../../../newee/products/discount/2.jpg"
// import sale3 from "../../../../../newee/products/discount/3.jpg"
// import sale4 from "../../../../../newee/products/discount/4.jpg"
/**
 * 
 * @param {*} props 
 * @returns 
 */
function Product(props) {
  const dispatch = useDispatch()

  const FetchProduct = useSelector((state) => state.FetchAllProduct)

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

  return (
    <>
      <div
        className="product-list d-flex flex-wrap py-2 justify-content-start align-items-start"
        id="product-tab"
      >
        {FetchProduct !== [] || FetchProduct !== null
          ? FetchProduct.map((value, key) => {
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
                        {value.moneyReceived ? (
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
      </div>

      {/* <Pagination
                checkdisable={disable}
                pagination={pagination}
                onPageChange={handlePageChange}
            /> */}
    </>
  )
}

export default Product
