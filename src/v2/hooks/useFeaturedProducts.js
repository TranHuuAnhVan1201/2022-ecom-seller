import { useEffect, useState } from 'react'
import { list_product } from 'v2/data'
import { productApiPr } from '../../api/private'
import { useDidMount } from '../hooks'
const radom = 1 + Math.floor(Math.random() * 10)

const useFeaturedProducts = (itemsCount) => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const didMount = useDidMount(true)

  const fetchFeaturedProducts = async () => {
    console.log('v2- fetchFeaturedProducts')
    try {
      setLoading(true)
      setError('')

      const response = await productApiPr.getAll(itemsCount, radom)
      if (response.length === 0 || response.data === null) {
        if (didMount) {
          // setError('Không tìm thấy sản phẩm bán chạy.')
          setFeaturedProducts(list_product)
          setLoading(false)
        }
      } else {
        if (didMount) {
          setFeaturedProducts(response)
          setLoading(false)
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Không tìm thấy sản phẩm bán chạy.')
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (featuredProducts.length === 0 && didMount) {
      fetchFeaturedProducts()
    }
  }, [])

  return {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading,
    error,
  }
}

export default useFeaturedProducts
