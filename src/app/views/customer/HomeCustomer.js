import React from 'react'
import MetaHome from '../../../assets/images/meta/metahome.png'
import MetaDecorator from '../../components/Util/MetaDecorator'
import Banner from '../../components/_custommer/body/home-default/home-detail/banner/Banner'
import Category from '../../components/_custommer/body/home-default/home-detail/category/Category'
import Need from '../../components/_custommer/body/home-default/home-detail/need/Need'
import QuickLink from '../../components/_custommer/body/home-default/home-detail/quick-link/QuickLink'
import Product from '../../components/_custommer/body/products/Product'
import ProductSale from '../../components/_custommer/body/products/ProductSale'
import { Filters } from '../../components/common/body/filter'

const content = require('../../../data/content.json')

export const HomeCustomer = (props) => (
    <>
        <MetaDecorator
            description={content.pageDescription}
            title={content.pageTitle}
            imageUrl={MetaHome}
            imageAlt={content.metaImageAlt}
        />

        <section id="home-default-seller" className="">
            <Banner />
            <Filters name={'Sản phẩm bán chạy'} />
            <ProductSale />
            <QuickLink />
            <Need />
            <Filters name={'Sản phẩm chiết khấu cao'} />
            <Category />
            <Product />
        </section>
    </>
)
