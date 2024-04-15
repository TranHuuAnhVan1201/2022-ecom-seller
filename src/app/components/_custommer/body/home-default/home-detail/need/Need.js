import React from 'react'
import { useDispatch } from 'react-redux'
import Slider from 'react-slick'
import nameBrand from '../../../../../../../data/nameBrand'
import * as actions from '../../../../../../_actions/custommer/products/product'
import { Items } from './Items'
import './Need.scss'

function Need(props) {
    const dispatch = useDispatch()
    const brand = [
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
        `Pete's Luxury Wholefoods`,
        'Tuyết Hà',
        'No brand',
    ]
    const onClickBrand = (number) => {
        dispatch(actions.searchBrand(number))
    }
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 4,
        initialSlide: 0,

        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 488,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 356,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    }

    return (
        <div className="need col-12">
            <div className="item">
                <Slider {...settings}>
                    {nameBrand
                        .filter((item) => item.isShow === true)
                        .map((value) => (
                            <Items value={value} onClickBrand={onClickBrand} key={value.id} />
                        ))}
                </Slider>
            </div>
        </div>
    )
}

export default Need
