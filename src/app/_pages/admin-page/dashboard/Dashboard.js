import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './Dashboard.scss'

const HeaderAdmin = React.lazy(() => import('../../../components/admin/header-admin/HeaderAdmin'))
const Sidebar = React.lazy(() => import('../../../components/admin/_slidebar/Sidebar'))

// import wrapper
const Users = React.lazy(() => import('../../../components/admin/pages/Users/Users'))
const EditBank = React.lazy(() =>
  import('../../../components/admin/pages/Users/page/editBank/EditBank')
)
const ChangePassword = React.lazy(() =>
  import('../../../components/admin/pages/Users/ChangePassword')
)
const Address = React.lazy(() => import('../../../components/admin/pages/Users/InformationAddress'))
const Sale = React.lazy(() => import('../../../components/admin/pages/Sale/Sale'))

const Analysis = React.lazy(() => import('../../../components/admin/pages/analysis/Analysis'))
const AnalysisBank = React.lazy(() =>
  import('../../../components/admin/pages/analysis/AnalysisBank')
)
const Custommer = React.lazy(() => import('../../../components/admin/pages/customer/Custommer'))
const Notification = React.lazy(() =>
  import('../../../components/admin/pages/customer/Notification')
)

// BANKING
const Banking = React.lazy(() => import('../../../components/admin/pages/Banking/Banking'))

function Dashboard(props) {
  const [add, setAdd] = useState(false)
  const collapseSidebar = (toggle) => {
    setAdd(toggle)
  }
  return (
    <BrowserRouter basename="/admin">
      <div
        id="a-seller-wrapper"
        className={add ? 'a-seller-wrapper sidebar-expand' : 'a-seller-wrapper'}
      >
        <React.Suspense fallback={<div>Loading...</div>}>
          <Sidebar collapseSidebar={collapseSidebar}></Sidebar>

          <div className="wrapper">
            <Switch>
              <Route path={'/admin/users'} component={Users} />
              <Route path={'/admin/sale'} exact component={Sale} />
              <Route path={'/admin/users/editBank'} component={EditBank} />
              <Route path={'/admin/users/change'} component={ChangePassword} />
              <Route path={'/admin/users/address'} component={Address} />
              <Route path={'/admin/analysis'} component={Analysis} />
              <Route path={'/admin/analysis-bank'} component={AnalysisBank} />
              <Route path={'/admin/banking'} component={Banking} />
              <Route path={'/admin/custommer'} component={Custommer} />
              <Route path={'/admin/notifications'} component={Notification} />
              <Route path={'/'} component={Users} />
            </Switch>
          </div>
        </React.Suspense>
      </div>
    </BrowserRouter>
  )
}

export default Dashboard
