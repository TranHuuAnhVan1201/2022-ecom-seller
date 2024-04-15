import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDocumentTitle, useScrollTop } from "../../../../../hooks";
import { ToSlug } from "../../../../../utils/ToSlug";
import { OFF_SPINNERS } from "../../../../../_constants/ActionType";
import { Empty, EmptyNull } from "../../empty";
import "./Search.scss";
import SearchResult from "./SearchResult";

function Search(props) {
  useDocumentTitle("Tìm kiếm sản phẩm");
  useScrollTop();
  const { user, products, categories } = useSelector(
    (state) => state.FetchAllProduct
  );

  let { slug, idCategory } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const [checks, setChecks] = useState(false);

  const [list, setList] = useState([]);
  const [active, setActive] = useState();
  const [activePrice, setActivePrice] = useState();
  const [activeCategory, setActiveCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listCategoryPublic, setListCategoryPublic] = useState();

  const [loading, setLoading] = useState(false);

  const arr2 = [
    "Tìm kiếm",
    "Tất cả",
    // "Bán chạy",
    "Giá tăng thấp đến cao",
    "Giá giảm cao đến thấp",
    "Chiết khấu tăng dần",
    "Chiết khấu giảm dần",
  ];
  const handleTab = (tab) => {
    setActive(tab);
    if (list === null && tab !== 1) return;

    if (products.length === undefined) return;
    else if (tab === 0) {
      setState({
        ...state,
        // result: products,
        activeNavbar: 0,
      });
    } else if (tab === 1) {
      setState({
        ...state,
        result: products,
        activeNavbar: tab,
      });
    } else if (tab === 2) {
      let ascending = products.sort(
        (a, b) => Number(a.price1) - Number(b.price1)
      );

      setState({
        ...state,
        result: ascending,
        activeNavbar: tab,
      });
    } else if (tab === 3) {
      let ascending = products.sort(
        (a, b) => Number(b.price1) - Number(a.price1)
      );
      setState({
        ...state,
        result: ascending,
        activeNavbar: tab,
      });
    } else if (tab === 4) {
      let ascending = products.sort(
        (a, b) => Number(a.percent) - Number(b.percent)
      );
      setState({
        ...state,
        result: ascending,
        activeNavbar: tab,
      });
    } else if (tab === 5) {
      let ascending = products.sort(
        (a, b) => Number(b.percent) - Number(a.percent)
      );

      setState({
        ...state,
        result: ascending,
        activeNavbar: tab,
      });
    }

    setLoading(false);
  };

  const brand = [
    "Mr.Oh",
    "Vipep",
    "Hamifa",
    "Bazanland",
    "Red Dao",
    "Eledy",
    "Tây Nguyên Xanh",
    "Miss Ede",
    "Pơ Lang",
    //'No brand',
  ];

  const onClickBrand = (key) => {
    if (products.length > 0) {
      var d = products.filter((e) => e.brand === brand[key]);
      setList(d);
      setIsLoading(true);
      setLoading(false);
    }
  };

  const [state, setState] = useState({
    result: [],
    activeCategory: -1,
    activeNavbar: -1,
  });

  useEffect(() => {
    if (products.length > 0) {
      const data3 = products.filter(
        (product) =>
          (product.brand && ToSlug(product.brand).includes(slug)) ||
          (product.categoryName && ToSlug(product.categoryName).includes(slug))
      );
      setState({
        ...state,
        result: data3,
      });
      dispatch({ type: OFF_SPINNERS });
    }
  }, [products, slug]);

  const handleFilter = (value, index) => {
    if (products.length > 0) {
      const data3 = products.filter(
        (product) =>
          (product.brand && ToSlug(product.brand).includes(slug)) ||
          (product.categoryName && ToSlug(product.categoryName).includes(slug))
      );

      setState({
        ...state,
        activeCategory: index,
        result: data3,
      });
    } else {
      setState({
        ...state,
        activeCategory: index,
        result: [],
      });
    }
  };

  const [isRedirect, setIsRedirect] = useState(false);
  const Redirect = () => {
    setIsRedirect(true);

    setTimeout(() => {
      //history.push('/login')
      window.location.href = "https://newee.asia/dangnhap.html";
      setIsRedirect(false);
    }, 1000);
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let queries = useQuery();
  let query = queries.get("keyword");

  useEffect(() => {
    if (query) {
      if (products && products.length > 0) {
        const data3 = products.filter(
          (product) =>
            product.name
              ?.toLowerCase()
              .includes(query.toString().toLowerCase()) ||
            product.brand
              ?.toLowerCase()
              .includes(query.toString().toLowerCase()) ||
            product.description
              ?.toLowerCase()
              .includes(query.toString().toLowerCase()) ||
            product.content1
              ?.toLowerCase()
              .includes(query.toString().toLowerCase()) ||
            product.categoryName
              ?.toLowerCase()
              .includes(query.toString().toLowerCase())
        );
        //console.log(data3)
        setState({
          ...state,
          result: data3,
        });
        //dispatch({ type: OFF_SPINNERS })
      }
    }
  }, [query, products]);

  return (
    <div>
      <section id="search-result" className="overlay-scrollbar mg-85 mg-105">
        <div className="search-all">
          <div className="container">
            <div className="left">
              <div className="category-search left-list ">
                <h4 className="title">Danh mục sản phẩm</h4>
                <div className="list">
                  {categories.length > 0 &&
                    categories.map((value, key) => (
                      <Link
                        to={"/search/" + ToSlug(value.name) + "." + value.id}
                        onClick={() => handleFilter(value, key)}
                        className={
                          state.activeCategory === key
                            ? "list-category active"
                            : " "
                        }
                        key={value.id + "category"}
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
                      to={"/search/" + ToSlug(value) + ".all"}
                      key={key + "brand"}
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
                      className={key === active ? "active" : ""}
                      onClick={() => handleTab(key)}
                      key={key + "arr2"}
                    >
                      {value}
                    </h5>
                  ))}
                </div>
              </div>

              <div className="body">
                {state.result.length > 0 ? (
                  <SearchResult data={state.result} />
                ) : user.token ? (
                  <EmptyNull name={"Không có sản phẩm..."} />
                ) : (
                  <Empty
                    name={"Đăng nhập Newee để sử dụng chức năng này...!"}
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
  );
}

export default Search;
