import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaHome from '../../../../../newee/meta/metahome.png'
import * as actions from '../../../../_actions/custommer/products/product'
import MetaDecorator from '../../../Util/MetaDecorator'
import Product from '../products/Product'
import ProductSale from '../products/ProductSale'
import ProductSeller from '../products/ProductSeller'
import Banner from './home-detail/banner/Banner'
import Category from './home-detail/category/Category'
import Filter from './home-detail/filter/Filter'
import Filter2 from './home-detail/filter/Filter2'
import FilterCategory from './home-detail/filter/FilterCateogry'
import Need from './home-detail/need/Need'
import QuickLink from './home-detail/quick-link/QuickLink'

const content = require('../meta/content.json')

function HomeDefault(props) {
    const dispatch = useDispatch()
    const [first, setFirst] = useState(false)

    const dataLogin = useSelector((state) => state.Login.dataLogin)

    useEffect(() => {
        // if (Object.keys(dataLogin).length === 0) return;
        if (localStorage.getItem('idCart') && Object.keys(dataLogin).length !== 0) {
            let cart = localStorage.getItem('idCart')
            dispatch(actions.actLoadCartListRequest(cart))
        }

        if (localStorage.getItem('token')) {
            dispatch(actions.actLoadDataLogin())
        }
    }, [])

    return (
        <>
            <section id="home-default-seller mg-85 mg-135">
                <MetaDecorator
                    description={content.pageDescription}
                    title={content.pageTitle}
                    imageUrl={MetaHome}
                    imageAlt={content.metaImageAlt}
                />

                <Banner />
                <Filter />
                <ProductSale />
                {Object.keys(dataLogin).length !== 0 && (
                    <>
                        <Filter2 />
                        <ProductSeller />
                    </>
                )}

                <QuickLink />
                <Need />
                <FilterCategory />
                <Category />
                <Product />
            </section>
        </>
    )
}

export default HomeDefault
