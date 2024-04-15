import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
const Header = React.lazy(() =>
  import('../../../components/custommer/header-home-custommer/HeaderHome')
)
const FooterHome = React.lazy(() =>
  import('../../../components/custommer/footer-home-custommer/FooterHome')
)
const HomeDefault = React.lazy(() =>
  import('../../../components/custommer/body/home-default/HomeDefault')
)

const ProductDetail = React.lazy(() =>
  import('../../../components/custommer/body/product-detail/ProductDetail')
)
const Cart = React.lazy(() => import('../../../components/custommer/body/shop/Carts'))
const Searchs = React.lazy(() =>
  import('../../../components/custommer/body/page-search/search/Search')
)
const Abouts = React.lazy(() => import('../../supports/abouts/Abouts'))
const Contact = React.lazy(() => import('../../supports/contacts/Contact'))
const Guide = React.lazy(() => import('../../supports/guide/Guide'))
const Checkout = React.lazy(() => import('../../../components/custommer/body/checkout/Checkout.js'))
// const Checkout2 = React.lazy(() => import("../../../components/custommer/body/checkout/Checkout2.js"));
function defaultPage() {
  return (
    <HashRouter>
      <React.Suspense>
        <Header></Header>
        <Switch>
          <Route path={'/'} exact component={HomeDefault} />
          <Route path={'/search/:slug.:idCategory'} component={Searchs} />

          <Route path={'/cart'} exact component={Cart} />
          <Route path={'/product-detail/:slug.:id'} exact component={ProductDetail} />
          <Route path={'/gioi-thieu-newee'} component={Abouts} />
          <Route path={'/guide'} component={Guide} />
          <Route path={'/checkout'} component={Checkout} />
          {/* <Route path={"/checkout2"} component={Checkout2} />   */}
          <Route path={'/contact'} component={Contact} />
        </Switch>
      </React.Suspense>
      <FooterHome></FooterHome>
    </HashRouter>
  )
}

export default defaultPage
