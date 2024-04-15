import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'
import { Cards } from '../../../common/card/Cards'

function ProductSale(props) {
  const dispatch = useDispatch()

  const { products, errors } = useSelector((state) => state.FetchAllProduct)

  if (errors.length !== 0 || products.length === 0) {
    return <div>Product not found</div>
  }

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,

    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 488,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 415,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }

  return (
    <div className="product-list p-slider" id="product-tab">
      <Slider {...settings}>
        {products.length > 0
          ? products
              .slice(0, 10)
              .map((value, key) => (
                <Cards
                  className={'card item-sale col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 py-2'}
                  value={value}
                  key={key.id}
                />
              ))
          : null}
      </Slider>
    </div>
  )
}

export default ProductSale
