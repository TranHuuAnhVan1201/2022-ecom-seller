import { useEffect, useState } from 'react'
import { list_product } from 'v2/data'
import { useDidMount } from '.'
import { productApiPr } from '../../api/private'

const useHighDiscountProducts = (itemsCount) => {
  const [highDiscountProducts, setHighDiscountProducts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const didMount = useDidMount(true)

  const fetchHighDiscountProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await productApiPr.getListHighDiscountProduct(itemsCount, 1)
      if (response.length === 0) {
        if (didMount) {
          // setError("Không tìm thấy sản phẩm chiết khấu cao.");
          setHighDiscountProducts(list_product)
          setLoading(false)
        }
      } else {
        if (didMount) {
          setHighDiscountProducts(response)
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
    if (highDiscountProducts.length === 0 && didMount) {
      fetchHighDiscountProducts()
    }
  }, [])

  return {
    highDiscountProducts,
    fetchHighDiscountProducts,
    isLoading,
    error,
  }
}

export default useHighDiscountProducts
