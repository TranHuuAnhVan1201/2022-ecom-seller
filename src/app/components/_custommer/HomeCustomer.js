import React from 'react'
import MetaHome from '../../../assets/images/meta/metahome.png'
import MetaDecorator from '../Util/MetaDecorator'
import { Filters } from '../common/body/filter'
import Banner from './body/home-default/home-detail/banner/Banner'
import Category from './body/home-default/home-detail/category/Category'
import Need from './body/home-default/home-detail/need/Need'
import QuickLink from './body/home-default/home-detail/quick-link/QuickLink'
import Product from './body/products/Product'
import ProductSale from './body/products/ProductSale'

const content = require('../../../data/content.json')
function HomeCustomer(props) {
  return (
      <>
          <MetaDecorator
              description={content.pageDescription}
              title={content.pageTitle}
              imageUrl={MetaHome}
              imageAlt={content.metaImageAlt}
          />
          <section id="home-default-seller mg-85 mg-135">
              <div className="h-85 h-135 "></div>
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
}

export default HomeCustomer
