import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { APP_IMG } from '../../../../../../../v2/assets'
import { list_banner } from '../../../../../../../v2/data'
import * as actions from '../../../../../../_actions/custommer/products/product'
import { ToSlug } from '../../../../../../utils/ToSlug'
import './Banner.scss'

function Banner(props) {
    const dispatch = useDispatch()
  
    const onClickBrand = (number) => {
        dispatch(actions.searchBrand(number))
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    }

    return (
        <div className="banners">
            <div className="banners-left owl-home ">
                <Slider {...settings}>
                    {list_banner.map((value) => (
                        <Link
                            to={'/search/' + ToSlug(value.name) + '.all'}
                            onClick={() => onClickBrand(value.id * 1)}
                            key={value.id}
                        >
                            <div className="banner-left-img b2">
                                <LazyLoadImage
                                    src={value.url}
                                    width={824}
                                    height={274}
                                    alt={`Newee banner ${value.name}`}
                                />
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
            <div className="banners-right">
                <LazyLoadImage src={APP_IMG.bannerRight} width={409} height={274} alt="Newee banner" />
            </div>
        </div>
    )
}

export default Banner
