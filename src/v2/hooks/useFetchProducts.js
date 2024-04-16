import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { list_product } from 'v2/data'
import { useDidMount } from '.'
import { productApiPr } from '../../api/private'
import { PRODUCT_GET_ALL_RELOAD } from '../constants/constants'
const useFetchProducts = (itemsCount) => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.FetchAllProduct)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const didMount = useDidMount(true)

  const fetchAllProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await productApiPr.getAll(itemsCount, 1)
      if (response.length === 0) {
        if (didMount) {
          // setError('Không tìm thấy sản phẩm.')
          dispatch({ type: PRODUCT_GET_ALL_RELOAD, payload: list_product })
          setLoading(false)
        }
      } else {
        if (didMount) {
          dispatch({ type: PRODUCT_GET_ALL_RELOAD, payload: response })
          setLoading(false)
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Không tìm thấy sản phẩm.')
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (products.length === 0 && didMount) {
      fetchAllProducts()
    }
  }, [])

  return {
    fetchAllProducts,
    isLoading,
    error,
  }
}

export default useFetchProducts
