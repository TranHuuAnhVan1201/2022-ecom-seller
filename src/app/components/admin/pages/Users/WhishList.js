import debounce from 'lodash.debounce'
import { useSnackbar } from 'notistack'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { wishListApi } from '../../../../../api/private'
//import { RatingStar } from '../../../../common/starRating/RatingStar'
import { RatingStar } from '../../../../common/starRating/RatingStar'
import { FormatVND } from '../../../../utils'
import { ToSlug } from '../../../../utils/ToSlug'
import { OFF_SPINNERS, ON_SPINNERS, PRODUCT_GET_LIKE } from '../../../../_constants/ActionType'
import { EmptyNull } from '../../../common/body/empty/EmptyNull'
import { AntButton } from '../../../common/button'

function WhishList(props) {
    const dispatch = useDispatch()
    let success = 'Cập nhập Yêu thích Newee thành công!'
    let warning = 'Cập nhập Yêu thích Newee không thành công!'
    let errors = 'Cập nhập Yêu thích Newee không thành công!'

    const { closeSnackbar, enqueueSnackbar } = useSnackbar()

    const { products, user, productLike, isRender } = useSelector((state) => state.FetchAllProduct)
    function capitalize(s) {
        return s && s.toLowerCase()
    }

    const [state, setState] = useState({
        itemsToShowList: products.length > 0 && isRender ? products.slice(0, 20) : [],
        hideLoadMore: false,
        showResetButton: false,
    })
    const [isLoading, setIsLoading] = useState(false)

    const loadMore = async () => {
        setIsLoading(true)
        setTimeout(() => {
            if (products?.length < 1) return
            if (state.itemsToShowList.length === products.length) {
                return
            } else {
                const visibleItemsCount = state.itemsToShowList.length
                const totalItems = products.length

                const dataLoad = [
                    ...state.itemsToShowList,
                    ...products.slice(visibleItemsCount, visibleItemsCount + 20),
                ]

                const isCheck = dataLoad.length === totalItems

                setState({
                    itemsToShowList: dataLoad,
                    hideLoadMore: isCheck,
                    showResetButton: isCheck,
                })
            }
            setIsLoading(false)
        }, 1000)
    }
    const firstLoading = useRef(true)

    useLayoutEffect(() => {
        if (firstLoading.current) {
            firstLoading.current = false
            return
        }

        if (products.length > 0 && isRender) {
            loadMore()
        }
    }, [JSON.stringify(products)])

    const [index, setIndex] = useState(0)
    const handleIndex = async (index) => {
        setIndex(index)
    }

    const [favorite, setFavorite] = useState([]) // <= this state holds the id's of all favorite reciepies
    const [remove, setRemove] = useState([])
    // following function handles the operation of adding fav recipes's id's

    const addToFavorite = (id, key) => {
        dispatch({ type: ON_SPINNERS })

        if (!favorite.includes(id)) {
            setFavorite(favorite.concat(id))
            debouncedSave(favorite.concat(id))
        } else {
            let index = favorite.indexOf(id)
            let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)]
            setRemove(remove.concat(id))
            setFavorite(temp)
            debouncedRemove(remove.concat(id))
        }
    }

    const [isCheck, setIsCheck] = useState(false)

    useEffect(() => {
        if (productLike.length > 0 && isCheck === false) {
            setFavorite(productLike.map((value) => value.id))

            setIsCheck(true)
        }
    }, [productLike])

    const debouncedSave = useRef(debounce((quantity) => saveChangeInput(quantity), 300)).current
    const debouncedRemove = useRef(debounce((quantity) => saveRemove(quantity), 300)).current

    const saveChangeInput = async (data) => {
        closeSnackbar()
        let req = data.map((value) => ({
            productId: value,
        }))
        try {
            if (req.length > 0) {
                const response = await wishListApi.add(req)
                const response2 = await wishListApi.getAll()
                console.log(response2)
                if (response2.status === 204) {
                    let isEmpty = []
                    dispatch({ type: PRODUCT_GET_LIKE, payload: [] })
                } else {
                    dispatch({ type: PRODUCT_GET_LIKE, payload: response2 })
                }
                enqueueSnackbar(success, {
                    variant: 'success',
                })
                dispatch({ type: OFF_SPINNERS })
            }
        } catch (error) {
            dispatch({ type: OFF_SPINNERS })
            console.log('error', error)
            enqueueSnackbar(errors, {
                variant: 'error',
            })
        }
    }
    const saveRemove = async (data) => {
        closeSnackbar()
        try {
            for (let i = 0; i < data.length; i++) {
                const response = await wishListApi.delete(data[i])
            }

            const response2 = await wishListApi.getAll()

            if (response2.status === 204) {
                let isEmpty = []
                dispatch({ type: PRODUCT_GET_LIKE, payload: [] })
            } else {
                dispatch({ type: PRODUCT_GET_LIKE, payload: response2 })
            }

            enqueueSnackbar(success, {
                variant: 'success',
            })
            dispatch({ type: OFF_SPINNERS })
        } catch (error) {
            dispatch({ type: OFF_SPINNERS })
            console.log('error', error)
            enqueueSnackbar(errors, {
                variant: 'error',
            })
        }
    }

    return (
        <>
            <div className="newee-sticky-container">
                <div
                    onClick={() => handleIndex(0)}
                    className={index === 0 ? 'newee-btn-div active' : 'newee-btn-div'}
                >
                    Gợi ý hôm nay
                </div>
                <div
                    onClick={() => handleIndex(1)}
                    className={index === 1 ? 'newee-btn-div active' : 'newee-btn-div'}
                >
                    Danh sách yêu thích
                    {/* {productLike.length} */}
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
                            <Link to={'/product-detail/' + ToSlug(value.name) + '.' + value.id}>
                                <LazyLoadImage
                                    alt={'Newee' + value.name}
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
                                            onClick={() => addToFavorite(value.id, key)}
                                        >
                                            <div className="count-wish-list">
                                                <span>
                                                    {favorite.includes(value.id) ? (
                                                        <HiHeart />
                                                    ) : (
                                                        <HiOutlineHeart />
                                                    )}
                                                </span>
                                                {/*<span className="number">
                                                    {value.countLike || 0}{' '}
                                                </span>*/}
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
                                <Link to={'/product-detail/' + ToSlug(value.name) + '.' + value.id}>
                                    <LazyLoadImage
                                        alt={'Newee' + value.name}
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
                                                {' '}
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
                                                <span className="item-voucher">
                                                    {value.percent}%
                                                </span>
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
                                                onClick={() => addToFavorite(value.id, key)}
                                            >
                                                <div className="count-wish-list">
                                                    <span>{<HiHeart />}</span>
                                                    <span className="number">
                                                        {value.countLike || 0}{' '}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <EmptyNull name={'Chưa có sản phẩm yêu thích...'} />
                    ))}
            </div>
            {index === 0 && (
                <div className="d-flex-center mt-1 mb-2 large">
                    <AntButton
                        type={'primary'}
                        size={'large'}
                        icons={null}
                        isLoading={isLoading}
                        handle={!isLoading ? loadMore : undefined}
                        name="Xem thêm"
                    />
                </div>
            )}
        </>
    )
}

export default WhishList
