import { combineReducers } from 'redux'
import isDisplayForm from './custommer/isDisplayForm/isDisplayForm'
import FetchProductPublic from './custommer/products/FetchProductPublic'
import IDName from './custommer/products/Id'
import LoadProduct from './custommer/products/LoadProduct'
import FetchAllProduct from './custommer/products/LoadProduct/FetchAllProduct'
import Social from './custommer/products/LoadProduct/Social'
import Login from './custommer/products/Login'
import Register from './custommer/products/Register'
import Shop from './custommer/products/Shop'

const appReducer = combineReducers({
  IDName,
  isDisplayForm,
  LoadProduct,
  Shop,
  Register,
  Login,
  FetchProductPublic,

  // fetch ALL PRODUCT
  FetchAllProduct,
  Social,
})
export default appReducer
