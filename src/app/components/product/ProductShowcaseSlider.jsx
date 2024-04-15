/* eslint-disable react/forbid-prop-types */
import PropType from "prop-types";
import React from "react";
import Slider from "react-slick";
import { FeaturedProduct } from "../product";
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
};

const ProductShowcaseSlider = ({ products, skeletonCount }) => (
  <div className="product-display-grid">
    <Slider {...settings}>
      {products.length === 0
        ? new Array(skeletonCount)
            .fill({})
            .map((product, index) => (
              <FeaturedProduct key={`Newee ${index}`} product={product} />
            ))
        : products.map((product) => (
            <FeaturedProduct key={product.id} product={product} />
          ))}
    </Slider>
  </div>
);

ProductShowcaseSlider.defaultProps = {
  skeletonCount: 4,
};

ProductShowcaseSlider.propTypes = {
  products: PropType.array.isRequired,
  skeletonCount: PropType.number,
};

export default ProductShowcaseSlider;
