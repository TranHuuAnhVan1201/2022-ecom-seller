import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
const Header = React.lazy(() =>
  import('../../../components/custommer/header-home-custommer/HeaderHome')
)
const FooterHome = React.lazy(() =>
  import('../../../components/custommer/footer-home-custommer/FooterHome')
)
// supports
const HomeDefault = React.lazy(() => import('../default-pages/defaultPage'))

const FormSaleTogether = React.lazy(() => import('../../supports/saleTogether/FormSaleTogether'))
const SaleTogether = React.lazy(() => import('../../supports/saleTogether/SaleTogether'))
const Policy = React.lazy(() => import('../../supports/policy/Policy'))
const Abouts = React.lazy(() => import('../../supports/abouts/Abouts'))
const Regulations = React.lazy(() => import('../../supports/regulations/Regulations'))

// huong dan dat hang
const Tutorial = React.lazy(() => import('../../supports/_tutorial/Index'))
const Reports = React.lazy(() => import('../../supports/_reports/Index'))
const Question = React.lazy(() => import('../../supports/_question/Index'))
const Shipping = React.lazy(() => import('../../supports/_shipping/Index'))
const Regulation = React.lazy(() => import('../../supports/_regulations/Index'))
const Policys = React.lazy(() => import('../../supports/_policy/Index'))
const PolicysBH = React.lazy(() => import('../../supports/_policy/IndexBH'))

function Supports() {
  return (
    <BrowserRouter>
      <React.Suspense>
        <Header></Header>
        <Switch>
          <Route path={'/'} exact component={HomeDefault} />
          <Route path={'/supports/about'} exact component={Abouts} />
          <Route path={'/supports/policy'} exact component={Policy} />
          <Route path={'/supports/ban-hang-cung-newee'} exact component={SaleTogether} />
          <Route path={'/supports/ban-hang-cung-newee/dang-ky'} component={FormSaleTogether} />
          <Route path={'/supports/tutorial'} exact component={Tutorial} />
          <Route path={'/supports/report'} exact component={Reports} />
          <Route path={'/supports/question'} exact component={Question} />
          <Route path={'/supports/shipping'} exact component={Shipping} />
          <Route path={'/supports/regulation'} exact component={Regulation} />
          <Route path={'/supports/policys'} exact component={Policys} />
          <Route path={'/supports/quaranty-policy'} exact component={PolicysBH} />
        </Switch>
      </React.Suspense>
      <FooterHome></FooterHome>
    </BrowserRouter>
  )
}

export default Supports
