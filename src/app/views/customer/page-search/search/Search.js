import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ToSlug } from '../../../../../utils/ToSlug'
import { OFF_SPINNERS } from '../../../../../_constants/ActionType'
import MetaDecorator from '../../../../Util/MetaDecorator'
import { Empty } from '../../empty/Empty'
import './Search.scss'
import SearchResult from './SearchResult'

function Search(props) {
    const { products, categories } = useSelector((state) => state.FetchAllProduct)
    const Shop = useSelector((state) => state.Shop)

    let { slug, idCategory } = useParams()

    const dispatch = useDispatch()
    const history = useHistory()
    const [checks, setChecks] = useState(false)

    const [list, setList] = useState([])
    const [active, setActive] = useState()
    const [activePrice, setActivePrice] = useState()
    const [activeCategory, setActiveCategory] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [listCategoryPublic, setListCategoryPublic] = useState()

    const [loading, setLoading] = useState(false)

    const categoryDemo = [
        {
            id: '2637dd6e-d44d-471e-9fac-6475101d710a',
            name: 'Nhà Cửa và Đời Sống',
            // url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/qhxgsdswvwgdwrpjor12.png",
        },
        {
            id: '49049185-89d9-42d7-9fb7-0e6230a6bc4e',
            name: 'Sức Khỏe và Sắc Đẹp',
            // url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/k9mj7nidr7bjjkhgxzo0.png",
        },
        {
            id: 'a7e1a4cc-d916-48f1-b722-9a7e1c4b2323',
            name: 'Sản phẩm dành cho Cây trồng, vật nuôi',
            // url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/mmwu2w1rcbzpeyfzgkza.png",
        },
        {
            id: 'deed476c-e8ab-4786-8e7e-68f2fb7d70bc',
            name: 'Bách Hóa',
            // url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/t7qtx1jtkkwja9tfpgtb.png",
        },
        {
            id: 'e78901cc-75f6-4e5e-8830-9fd007b681e9',
            name: 'Combo độc lạ',
            // url: `${img5}`,
        },
        {
            id: '801d0f4d-8a54-4a7e-8837-804cf42f8729',
            name: 'Sách',
            // url: `${img6}`,
        },
        {
            id: 'fbd0ba77-e2a0-4710-acea-210c98e06e7a',
            name: 'Thời Trang',
            // url: `${img6}`,
        },
    ]

    const onClickCategory = (id, key, name) => {
        Shop.onCategoryID = name
        setActiveCategory(key)
        filerCategory(products, name)
    }
    const arr2 = [
        'Tìm kiếm',
        'Tất cả',
        // "Bán chạy",
        'Giá tăng thấp đến cao',
        'Giá giảm cao đến thấp',
        'Chiết khấu tăng dần',
        'Chiết khấu giảm dần',
    ]
    const handleTab = (tab) => {
        setActive(tab)
        if (list === null && tab !== 1) return

        if (products.length === undefined) return
        else if (tab === 0) {
            setState({
                ...state,
                // result: products,
                activeNavbar: 0,
            })
        } else if (tab === 1) {
            setState({
                ...state,
                result: products,
                activeNavbar: tab,
            })
        } else if (tab === 2) {
            let ascending = products.sort((a, b) => Number(a.price1) - Number(b.price1))

            setState({
                ...state,
                result: ascending,
                activeNavbar: tab,
            })
        } else if (tab === 3) {
            let ascending = products.sort((a, b) => Number(b.price1) - Number(a.price1))
            setState({
                ...state,
                result: ascending,
                activeNavbar: tab,
            })
        } else if (tab === 4) {
            let ascending = products.sort((a, b) => Number(a.percent) - Number(b.percent))
            setState({
                ...state,
                result: ascending,
                activeNavbar: tab,
            })
        } else if (tab === 5) {
            let ascending = products.sort((a, b) => Number(b.percent) - Number(a.percent))

            setState({
                ...state,
                result: ascending,
                activeNavbar: tab,
            })
        }

        setLoading(false)
    }
    const price = [
        { name: 'Dưới 100.000', price1: 0, price2: 100000 },
        { name: 'Từ 100.000 đến 500.000', price1: 100000, price2: 500000 },
        { name: 'Từ 500.000 đến 1.000.000', price1: 500000, price2: 1000000 },
        { name: 'Trên 1.000.000', price1: 1000000, price2: 10000000 },
    ]

    const handleSort = (key, price1, price2) => {
        setActivePrice(key)

        if (products.length > 0) {
            var d = products.filter((e) => price1 <= e.price1 && e.price1 < price2)

            setList(d)
        }
    }

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
        'Konbini',
        'Hamifa',
        'Daily Beauty',
        'No brand',
    ]

    const searchBrandOnly = (data) => {
        if (data) {
            if (Shop.searchBrand === 100) {
                var d2 = data.filter((e) => e.brand === brand[10])

                var newFilter = 'Combo'

                const data2 = d2.filter((product) =>
                    product.name.toLowerCase().includes(newFilter.toString().toLowerCase())
                )

                setList(data2)
                setIsLoading(true)
            } else if (Shop.searchBrand === 16) {
                var d3 = data.filter((e) => e.categoryName === 'Combo độc lạ')

                setList(d3)
                setIsLoading(true)
            } else {
                const data3 = data.filter(
                    (product) => product.brand && ToSlug(product.brand).includes(slug)
                )

                setList(data3)
                setIsLoading(true)
            }
            //  else {
            //   var d = data.filter((e) => e.brand === brand[Shop.searchBrand]);
            //   setList(d);
            //   setIsLoading(true);
            // }

            setLoading(false)
        }
    }

    const onClickBrand = (key) => {
        if (products.length > 0) {
            var d = products.filter((e) => e.brand === brand[key])
            setList(d)
            setIsLoading(true)
            setLoading(false)
        }
    }

    const filerCategory = (data, filter) => {
        if (Shop.onCategoryID !== undefined && data) {
            var d2 = data.filter((e) => e.categoryName === Shop.onCategoryID)
            setList(d2)
            setIsLoading(true)
        } else if (filter !== undefined) {
            var arr = data.filter((e) => e.categoryName === filter)

            setList(arr)
            setIsLoading(true)
        } else if (data === undefined) {
        }

        setLoading(false)
    }

    const [state, setState] = useState({
        result: [],
        activeCategory: 0,
        activeNavbar: 0,
    })

    useEffect(() => {
        if (products.length > 0) {
            const data3 = products.filter(
                (product) =>
                    (product.brand && ToSlug(product.brand).includes(slug)) ||
                    (product.categoryName && ToSlug(product.categoryName).includes(slug))
            )
            setState({
                ...state,
                result: data3,
            })
            dispatch({ type: OFF_SPINNERS })
        }
    }, [products, slug])

    const handleFilter = (value, index) => {
        if (products.length > 0) {
            const data3 = products.filter(
                (product) =>
                    (product.brand && ToSlug(product.brand).includes(slug)) ||
                    (product.categoryName && ToSlug(product.categoryName).includes(slug))
            )

            setState({
                ...state,
                activeCategory: index,
                result: data3,
            })
        } else {
            setState({
                ...state,
                activeCategory: index,
                result: [],
            })
        }
    }

    const [isRedirect, setIsRedirect] = useState(false)
    const Redirect = () => {
        setIsRedirect(true)

        setTimeout(() => {
            //  history.push('/login')
            window.location.href = 'https://newee.asia/dangnhap.html'
            setIsRedirect(false)
        }, 1000)
    }

    return (
        <div>
            <MetaDecorator
                description={'Newee asia - Happy Seller - search'}
                title={'Newee asia - Happy Seller - search'}
                imageUrl={
                    'https://testseller.newee.asia/static/media/5-coc-web.a09f4e28398dcd7fae06.jpg'
                }
                imageAlt={'Newee asia - Happy Seller - search'}
            />
            <section id="search-result" className="overlay-scrollbar ">
                <div className="search-all">
                    <div className="container">
                        <div className="left">
                            <div className="category-search left-list ">
                                <h4 className="title">Danh mục sản phẩm</h4>
                                <div className="list">
                                    {categories.length > 0 &&
                                        categories.map((value, key) => (
                                            <Link
                                                to={
                                                    '/search/' + ToSlug(value.name) + '.' + value.id
                                                }
                                                onClick={() => handleFilter(value, key)}
                                                className={
                                                    state.activeCategory === key
                                                        ? 'list-category active'
                                                        : ' '
                                                }
                                                key={value.id + 'category'}
                                            >
                                                <li>{value.name}</li>
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            <div className="category-search left-brand ">
                                <h4 className="title">Thương hiệu</h4>
                                <div className="list">
                                    {brand.map((value, key) => (
                                        <Link
                                            to={'/search/' + ToSlug(value) + '.all'}
                                            key={key + 'brand'}
                                            onClick={() => onClickBrand(key)}
                                        >
                                            {value}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="header">
                                <div className="header-result"></div>
                                <div className="header-tab">
                                    {arr2.map((value, key) => (
                                        <h5
                                            className={key === active ? 'active' : ''}
                                            onClick={() => handleTab(key)}
                                            key={key + 'arr2'}
                                        >
                                            {value}
                                        </h5>
                                    ))}
                                </div>
                            </div>

                            <div className="body">
                                {state.result.length > 0 ? (
                                    <SearchResult data={state.result} />
                                ) : (
                                    <Empty
                                        name={'Đăng nhập Newee để sử dụng chức năng này...'}
                                        btnTitle="Đăng nhập Newee..."
                                        handleClick={Redirect}
                                        isLoading={isRedirect}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Search
