import * as types from '../../../_constants/ActionType'

const initProduct = []

var fetchProductPublic = (state = initProduct, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_PUBLIC:
      console.log('FETCH_PRODUCT_PUBLIC', action.data)
      state = action.data
      return [...state]

    default:
      return state
  }
}
export default fetchProductPublic
