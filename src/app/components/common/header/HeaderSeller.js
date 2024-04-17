// import { useRouter } from 'next/router'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import { memo, useRef, useState } from 'react'
import { AiOutlineFileSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
import { HiChevronDown } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { USER_INFORMATION } from 'v2/data/constant'
import logo from '../../../../newee/logo/logo.png'
import { USER_LOGOUT } from '../../../_constants/ActionType'
import { useFetchProducts } from '../../../hooks'
import { ToSlug } from '../../../utils'

export const HeaderSeller = memo(() => {
  const history = useHistory()
  const dispatch = useDispatch()

  const {
    userInfo,
    cart: { cartItems },
    categories,
    products,
  } = useSelector((state) => state.FetchAllProduct)
  useFetchProducts(1000)

  const [searchTerm, setSearchTerm] = useState('')
  const typingTimeoutRef = useRef(null)
  const [active, setActive] = useState(false)
  const [states, setStates] = useState({ keyword: '', productLikeFilter: [] })

  function handleSearchTermChange(e) {
    e.preventDefault()
    const value = e.target.value
    setSearchTerm(value)
    setActive(true)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // moi lan go doi 300ms
    typingTimeoutRef.current = setTimeout(() => {
      handleFilterChange(value)
    }, 300)

    if (e.key === 'Enter') {
      history.replace(`/search/?keyword=${searchTerm}`)
      setActive(false)
      return
    }
  }
  function handleSubmit(e) {
    e.preventDefault()

    history.replace(`/search/?keyword=${searchTerm}`)
    setActive(false)
  }

  function handleClickMenu(name, id) {
    history.replace(`/search/${ToSlug(name)}.${id}}`)
    setActive(false)
  }

  function handleFilterChange(newFilter) {
    if (newFilter !== undefined) {
      const data = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(newFilter.toString().toLowerCase()) ||
          product.brand?.toLowerCase().includes(newFilter.toString().toLowerCase()) ||
          product.description?.toLowerCase().includes(newFilter.toString().toLowerCase()) ||
          product.content1?.toLowerCase().includes(newFilter.toString().toLowerCase()) ||
          product.categoryName?.toLowerCase().includes(newFilter.toString().toLowerCase()),
      )
      setStates({ keyword: newFilter, productLikeFilter: data })
    }
  }

  const node = useRef()
  const handleClick = () => {
    if (!active) {
      document.addEventListener('click', handleOutsideClick, false)
    } else {
      document.removeEventListener('click', handleOutsideClick, false)
    }
    setActive((prevState) => ({
      active: !prevState.active,
    }))
  }
  const handleOutsideClick = (e) => {
    if (node || node.current === null) {
      setActive(false)
      return
    } else if (!node.current.contains(e.target)) {
      setActive(false)
      return
    }
  }

  const [check, setCheck] = useState(false)

  const onLogout = async () => {
    setCheck(false)
    localStorage.clear()
    dispatch({ type: USER_LOGOUT })
    history.push('/')
    window.location.reload()
  }

  const getInformation = JSON.parse(localStorage.getItem(USER_INFORMATION))
  console.log('getInformation', getInformation)
  return (
    <div className="header-wrap top">
      <div className="wrap">
        <div className="ui-desktop">
          <div className="header-nav-search-wrap">
            <div className="header-nav-search">
              <div className="header-nav-logo">
                <Link to="/" className="logo">
                  <img src={logo} width={148} height={60} alt="newee" className="img-logo"></img>
                </Link>
              </div>
              <div className="header-nav-search-btn mr-3" ref={node}>
                <div className={active ? 'search-bar red' : 'search-bar'}>
                  <div className="search-bar-main">
                    <form
                      role="search"
                      className="search-bar-input"
                      onSubmit={handleSubmit}
                      action="search?="
                    >
                      <input
                        type="search"
                        placeholder="Tìm kiếm sản phẩm yêu thích"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        onClick={handleClick}
                      />
                    </form>
                    <div className="search-syntax"></div>
                    {active && (
                      <div className="search-result">
                        {states.keyword.length === 0 ? (
                          <div className="search-result-list">
                            <Link to="/">
                              <div className="search-result-span">
                                <span>
                                  <BiSearchAlt />
                                </span>
                                Tìm kiếm đơn hàng với cú pháp: Số điện thoại/Mã đơn hàng
                              </div>
                            </Link>
                          </div>
                        ) : (
                          <div className="search-result-list">
                            {states.productLikeFilter.length > 0 ? (
                              states.productLikeFilter.map((value) => (
                                <Link
                                  to={'/product-detail/' + ToSlug(value.name) + '.' + value.id}
                                  key={value.id}
                                >
                                  <div className="search-result-span">
                                    <span>
                                      <BiSearchAlt />
                                    </span>
                                    {value.name}
                                  </div>
                                </Link>
                              ))
                            ) : (
                              <>
                                <Link to="/">
                                  <div className="search-result-span empty">Không có kết quả</div>
                                </Link>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    className="search-bar-submitted btn btn--s btn--inline"
                    onClick={handleSubmit}
                  >
                    <span>
                      <BiSearchAlt />
                    </span>
                  </button>
                </div>
              </div>

              <div className="header-nav-cart">
                <div className="container">
                  <div className="history" style={{ display: 'none' }}>
                    <Link to="/san-pham">
                      <AiOutlineFileSearch />
                    </Link>
                  </div>

                  <div className="history menus">
                    <div className="header__navbar-item header__navbar-item-has-qr header__navbar-item--separate">
                      <MenuOutlined />
                      <div className="header__qr">
                        <div className="header__qr-apps">
                          {categories.map((value, key) => (
                            <div
                              className="header__qr-link"
                              key={key}
                              onClick={() => handleClickMenu(value.name, value.id)}
                            >
                              {value.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="history-text">
                      Danh mục
                      <br />
                      sản phẩm
                    </div>
                  </div>

                  <div className="history menus">
                    <div className="header__navbar-item header__navbar-item-has-qr header__navbar-item--separate">
                      <UserOutlined />
                      <div className="header__qr">
                        <div className="header__qr-apps">
                          <Link to="/admin" className="header__qr-link">
                            <p>
                              <span>Quản lý tài khoản</span>
                            </p>
                          </Link>
                          <Link to="/admin/sale" className="header__qr-link">
                            <p>
                              <span>Đơn hàng của tôi</span>
                            </p>
                          </Link>
                          <Link to="/admin/banking" className="header__qr-link">
                            <p>
                              <span>Ví Newee</span>
                            </p>
                          </Link>
                          <Link to="/admin/analysis-bank" className="header__qr-link">
                            <p>
                              <span>Doanh thu</span>
                            </p>
                          </Link>
                          <Link to="/create-page" className="header__qr-link">
                            <p>
                              <span>Tạo trang bán hàng</span>
                            </p>
                          </Link>

                          <Link to="/wish-list" className="header__qr-link">
                            <p>
                              <span>Danh sách Yêu thích </span>
                            </p>
                          </Link>

                          <p
                            onClick={onLogout}
                            className="header__qr-link"
                            style={{ cursor: 'pointer' }}
                          >
                            <span>Thoát tài khoản</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="history-text">
                      <span className="s-text">
                        Tài khoản
                        <br />
                        {userInfo && userInfo.email}
                        {getInformation && getInformation.username}
                      </span>
                      <HiChevronDown />
                    </div>
                  </div>
                  <Link to="/cart">
                    <AiOutlineShoppingCart />
                    <div className="cart-number">{cartItems.length || 0}</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui-mobile">
          <div className="header-nav-search-btn" ref={node}>
            <div className={active ? 'search-bar red' : 'search-bar'}>
              <div className="search-bar-main">
                <form
                  role="search"
                  className="search-bar-input"
                  onSubmit={handleSubmit}
                  action="search?="
                >
                  <input
                    type="search"
                    placeholder="BẬT MÍ GIÁ SỐC..."
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    onClick={handleClick}
                  />
                </form>
                <div className="search-syntax"></div>
                {active && (
                  <div className="search-result">
                    {states.keyword.length === 0 ? (
                      <div className="search-result-list">
                        <Link to="/">
                          <div className="search-result-span">
                            <span>
                              <BiSearchAlt />
                            </span>
                            Tìm kiếm đơn hàng với cú pháp: Số điện thoại/Mã đơn hàng
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div className="search-result-list">
                        {states.productLikeFilter.length > 0 ? (
                          states.productLikeFilter.map((value) => (
                            <Link
                              to={'/product-detail/' + ToSlug(value.name) + '.' + value.id}
                              key={value.id}
                            >
                              <div className="search-result-span">
                                <span>
                                  <BiSearchAlt />
                                </span>
                                {value.name}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <>
                            <Link to="/">
                              <div className="search-result-span empty">Không có kết quả</div>
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                className="search-bar-submitted btn btn--s btn--inline"
                onClick={handleSubmit}
              >
                <span>
                  <BiSearchAlt />
                </span>
              </button>
            </div>
            <div className="search-content"></div>
          </div>
        </div>
      </div>
    </div>
  )
})
