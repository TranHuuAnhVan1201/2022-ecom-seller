import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { list_product } from 'v2/data'
import { useDidMount } from '.'
import { wishListApi } from '../../api/private'
import { PRODUCT_GET_LIKE } from '../constants/constants'

const useWishListProducts = (itemsCount) => {
  const [wishListProducts, setWishListProducts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const didMount = useDidMount(true)
  const dispatch = useDispatch()

  const fetchWishListProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await wishListApi.getAll()
      if (response.status === 204) {
        dispatch({ type: PRODUCT_GET_LIKE, payload: [] })
      } else {
        dispatch({ type: PRODUCT_GET_LIKE, payload: list_product })
        // dispatch({ type: PRODUCT_GET_LIKE, payload: response })
      }

      if (response.length === 0) {
        if (didMount) {
          // setError("Không tìm thấy sản phẩm chiết khấu cao.");
          setWishListProducts(list_product)
          setLoading(false)
        }
      } else {
        if (didMount) {
          setWishListProducts(response)
          setLoading(false)
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Không tìm thấy sản phẩm chiết khấu cao.')
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (wishListProducts.length === 0 && didMount) {
      fetchWishListProducts()
    }
  }, [])

  return {
    wishListProducts,
    fetchWishListProducts,
    isLoading,
    error,
  }
}

export default useWishListProducts
