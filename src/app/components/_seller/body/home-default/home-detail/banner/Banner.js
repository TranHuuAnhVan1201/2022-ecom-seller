import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
//import bannerRight from '../../../../../../../assets/images/banner/Cover_nho.png'
import bannerRight from '../../../../../../../assets/images/banner/NEWEE_San-vat-Viet-01.jpg'
import nameBanner from '../../../../../../../data/Banner'
import { ToSlug } from '../../../../../../utils/ToSlug'
import * as actions from '../../../../../../_actions/custommer/products/product'
import './Banner.scss'

function Banner(props) {
    const dispatch = useDispatch()
    const brand = [
        'Nano Vietnam Tech', //0
        'Đức Thiện', //1
        '3Hmask', //2
        'Mr.Oh', //3
        'Dạ Lan', //4
        'INO', //5
        'ROHTO', //6
        'AlcoFREE', //7
        'Blossomy', //8
        'Hatika', //9
        'DrHelens', //10
        'Sunhee',
        'Corset Chuẩn', //12
        'CHUNG KIM',
        'Vipep', //14
        'NOVA CONSUMER',
        'Torriden', //16
        "'Pete's Luxury Wholefoods",
        'Oxy', //18
        'No brand',
    ]
    const dataBrand = [
        'Nano Vietnam Tech',
        'Đức Thiện',
        '3Hmask',
        'Mr.Oh',
        'Dạ Lan',
        'INO',
        'ROHTO',
        'AlcoFREE',
        'Blossomy',
        'Hatika',
        'DrHelens',
        'Sunhee',
        'Corset Chuẩn',
        'CHUNG KIM',
        'Vipep',
        'NOVA CONSUMER',
        'Torriden',
        "'Pete's Luxury Wholefoods",
        'Oxy',
        'No brand',
    ]
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
                    {nameBanner.map((value) => (
                        <Link
                            to={'/search/' + ToSlug(value.name) + '.all'}
                            onClick={() => onClickBrand(value.id * 1)}
                            key={value.id}
                        >
                            <div className="banner-left-img b2">
                                <LazyLoadImage
                                    src={value.url}
                                    alt={`Newee banner ${value.name}`}
                                    className="banner-left-img"
                                />
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
            <div className="banners-right">
                <LazyLoadImage src={bannerRight} width={409} height={274} alt="Newee banner" />
            </div>
        </div>
    )
}

export default Banner
