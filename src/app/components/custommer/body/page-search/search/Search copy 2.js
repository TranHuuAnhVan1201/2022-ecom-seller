import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./Search.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../_actions/custommer/products/product";
import SearchResult from "./SearchResult";
import SearchLoading from "./SearchLoading";
import SearchNulls from "./SearchNulls";
import apiLocalhost0 from "../../../../../_untils/apiLocalhost0";
import Loading from "./../../../../../_pages/loading/Loading";

function to_slug(str) {
  if (str) {
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, "");

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, "");

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, "");

    // return
    return str;
  }
}

function Search(props) {
  const FetchProduct = useSelector((state) => state.FetchAllProduct);
  const Shop = useSelector((state) => state.Shop);
  const dataLogin = useSelector((state) => state.Login.dataLogin);
  let { slug, idCategory } = useParams();
  // console.log(slug, idCategory);

  const dispatch = useDispatch();
  const history = useHistory();
  const [checks, setChecks] = useState(false);
  const [categorys, setCategorys] = useState();
  const [list, setList] = useState();
  const [active, setActive] = useState();
  const [activePrice, setActivePrice] = useState();
  const [activeCategory, setActiveCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listCategoryPublic, setListCategoryPublic] = useState();

  const [loading, setLoading] = useState(false);
  // var slugs = window.location.search;
  // console.log(slugs);

  const categoryDemo = [
    {
      id: "2637dd6e-d44d-471e-9fac-6475101d710a",
      name: "Nhà Cửa và Đời Sống",
      // url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/qhxgsdswvwgdwrpjor12.png",
    },
    {
      id: "49049185-89d9-42d7-9fb7-0e6230a6bc4e",
      name: "Sức Khỏe và Sắc Đẹp",
      // url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/k9mj7nidr7bjjkhgxzo0.png",
    },
    {
      id: "a7e1a4cc-d916-48f1-b722-9a7e1c4b2323",
      name: "Chăm Sóc Thú Cưng",
      // url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/mmwu2w1rcbzpeyfzgkza.png",
    },
    {
      id: "deed476c-e8ab-4786-8e7e-68f2fb7d70bc",
      name: "Bách Hóa",
      // url: "https://res.cloudinary.com/cv-thav-herokuapp-com/image/upload/v1617767348/newee/newee%200604/t7qtx1jtkkwja9tfpgtb.png",
    },
    {
      id: "e78901cc-75f6-4e5e-8830-9fd007b681e9",
      name: "Combo độc lạ",
      // url: `${img5}`,
    },
    {
      id: "801d0f4d-8a54-4a7e-8837-804cf42f8729",
      name: "Sách",
      // url: `${img6}`,
    },
    {
      id: "fbd0ba77-e2a0-4710-acea-210c98e06e7a",
      name: "Thời Trang",
      // url: `${img6}`,
    },
  ];
  const productCategory = async () => {
    apiLocalhost0(`Newee/ProductSeller/GetListCategory`, "GET", null)
      .then((res) => {
        console.log("da chay");
        // setCategorys(res.data.data);
        console.log(res);

        var sort = res.data.data.filter(
          (e) =>
            e.name === categoryDemo[0].name ||
            e.name === categoryDemo[1].name ||
            e.name === categoryDemo[2].name ||
            e.name === categoryDemo[3].name ||
            e.name === categoryDemo[4].name ||
            e.name === categoryDemo[5].name ||
            e.name === categoryDemo[6].name
        );

        setCategorys(sort);
        setChecks(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onClickCategory = (id, key, name) => {
    Shop.onCategoryID = name;
    setActiveCategory(key);
    filerCategory(FetchProduct, name);
  };
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
    if (tab === 0) {
    } else if (tab === 1) {
      setList(FetchProduct);
    } else if (tab === 2) {
      let ascending = list.sort((a, b) => Number(a.price1) - Number(b.price1));
      setList(ascending);
    } else if (tab === 3) {
      let ascending = list.sort((a, b) => Number(b.price1) - Number(a.price1));
      setList(ascending);
    } else if (tab === 4) {
      console.log(list);
      let ascending = list.sort(
        (a, b) => Number(a.percent) - Number(b.percent)
      );
      setList(ascending);
    } else if (tab === 5) {
      let ascending = list.sort(
        (a, b) => Number(b.percent) - Number(a.percent)
      );

      setList(ascending);
    }

    setLoading(false);
  };
  const price = [
    { name: "Dưới 100.000", price1: 0, price2: 100000 },
    { name: "Từ 100.000 đến 500.000", price1: 100000, price2: 500000 },
    { name: "Từ 500.000 đến 1.000.000", price1: 500000, price2: 1000000 },
    { name: "Trên 1.000.000", price1: 1000000, price2: 10000000 },
  ];

  const handleSort = (key, price1, price2) => {
    setActivePrice(key);
    if (FetchProduct) {
      var d = FetchProduct.filter(
        (e) => price1 <= e.price1 && e.price1 < price2
      );

      setList(d);
    }
  };

  const brand = [
    "Nano Vietnam Tech",
    "Đức Thiện",
    "3Hmask",
    "Mr.Oh",
    "Dạ Lan",
    "INO",
    "ROHTO",
    "AlcoFREE",
    "Blossomy",
    "Hatika",
    "DrHelens",
    "Sunhee",
    "Corset Chuẩn",
    "CHUNG KIM",
    "Vipep",
    "NOVA CONSUMER",
    "No brand",
  ];

  const searchBrandOnly = (data) => {
    if (data) {
      if (Shop.searchBrand === 100) {
        var d2 = data.filter((e) => e.brand === brand[10]);

        var newFilter = "Combo";

        const data2 = d2.filter((product) =>
          product.name
            .toLowerCase()
            .includes(newFilter.toString().toLowerCase())
        );

        setList(data2);
        setIsLoading(true);
      } else if (Shop.searchBrand === 16) {
        var d3 = data.filter((e) => e.categoryName === "Combo độc lạ");

        setList(d3);
        setIsLoading(true);
      } else {
        const data3 = data.filter(
          (product) => product.brand && to_slug(product.brand).includes(slug)
        );

        setList(data3);
        setIsLoading(true);
      }
      //  else {
      //   var d = data.filter((e) => e.brand === brand[Shop.searchBrand]);
      //   setList(d);
      //   setIsLoading(true);
      // }

      setLoading(false);
    }
  };

  const onClickBrand = (key) => {
    if (FetchProduct) {
      var d = FetchProduct.filter((e) => e.brand === brand[key]);
      setList(d);
      setIsLoading(true);
      setLoading(false);
    }
  };

  const filerCategory = (data, filter) => {
    if (Shop.onCategoryID !== undefined && data) {
      var d2 = data.filter((e) => e.categoryName === Shop.onCategoryID);
      setList(d2);
      setIsLoading(true);
    } else if (filter !== undefined) {
      var arr = data.filter((e) => e.categoryName === filter);

      setList(arr);
      setIsLoading(true);
    } else if (data === undefined) {
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (
      Shop.results === null ||
      Shop.results === [] ||
      Shop.results === undefined
    ) {
      setList(null);
    } else if (Shop.onCategoryID !== undefined) {
      filerCategory(FetchProduct);
    } else if (Shop.results) {
      setList(Shop.results);
    }

    handleTab(0);
    setLoading(false);
  }, [Shop.results, Shop.onCategoryID]);

  useEffect(() => {
    setLoading(true);
    // TH DANG NHAP

    if (dataLogin && dataLogin.length !== 0) {
      console.log("da chay 123");
      getCategory();
      productCategory();
    }
    getCategoryPublic();

    if (Shop.onCategoryID !== undefined) {
      filerCategory(FetchProduct);
      setLoading(false);
    } else if (Shop.searchBrand !== undefined) {
      searchBrandOnly(FetchProduct);
      setLoading(false);
    } else if (Shop.results) {
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    setLoading(true);
    if (idCategory !== "all" && dataLogin.length === 0) {
      getProductPublicWidthCategory(idCategory, 1000, 1);
    } else {
      console.log("lỗi rồi");
      setLoading(false);
    }
    // console.log("idCategory => dataLogin", dataLogin);
    // console.log("idCategory => ", FetchProduct);
  }, [idCategory]);

  useEffect(() => {
    setLoading(true);
    if (FetchProduct.length === 0 && dataLogin.length !== 0) {
      dispatch(actions.actLoadAllProductListRequest(1000, 1));
      setList(FetchProduct);
    } else if (FetchProduct.length === 0 && dataLogin.length === 0) {
      console.log("actLoadAllProductListRequestPublic", FetchProduct);
      dispatch(actions.actLoadAllProductListRequestPublic(1000, 1));
      console.log("actLoadAllProductListRequestPublic", FetchProduct);
    }

    return;
    if (Shop.searchBrand !== undefined) {
      searchBrandOnly(FetchProduct);
      setLoading(false);
    }
    if (Shop.onCategoryID !== undefined) {
      filerCategory(FetchProduct);
      setLoading(false);
    }
    // 03/12/
    if (Shop.searchBrand === undefined && Shop.onCategoryID === undefined) {
      const data3 = FetchProduct.filter(
        (product) =>
          (product.brand && to_slug(product.brand).includes(slug)) ||
          (product.categoryName && to_slug(product.categoryName).includes.slug)
      );
      setList(data3);
      setIsLoading(true);
      setLoading(false);
    }
  }, [FetchProduct]);

  useEffect(() => {
    console.log(slug);
    const data3 = FetchProduct.filter(
      (product) =>
        (product.brand && to_slug(product.brand).includes(slug)) ||
        (product.categoryName && to_slug(product.categoryName).includes.slug)
    );
    setList(data3);
    setIsLoading(true);
    setLoading(false);
  }, [slug]);
  // 18/09
  const getCategoryPublic = () => {
    apiLocalhost0(`Newee/ProductSeller/PublicGetListCategory`, "GET", null)
      .then((res) => {
        console.log("da chay getCategoryPublic => ", res);
        console.log("category ", categorys);
        setListCategoryPublic(res.data);
        setChecks(true);
        setCategorys(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getCategory = () => {
    console.log("da chay 123");
    apiLocalhost0(`Newee/ProductSeller/GetListCategory`, "GET", null)
      .then((res) => {
        console.log("da chay getCategory => ", res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getProductPublicWidthCategory = (
    idCategoryPublic,
    total,
    indexPage
  ) => {
    console.log("bat dau", isLoading);

    apiLocalhost0(
      `Newee/ProductPublic/GetlistByCategory/${idCategoryPublic}/${total}/${indexPage}`,
      "GET",
      null
    )
      .then((res) => {
        console.log("da chay getProductPublicWidthCategory => ", res.data.data);
        setList(res.data.data);
        setIsLoading(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    console.log("ket thuc", isLoading);
  };

  return (
    <section id="search-result" className="overlay-scrollbar">
      <div className="search-all">
        <div className="container">
          <div className="left">
            <div className="category-search left-list ">
              <h4 className="title">Danh mục sản phẩm</h4>
              <div className="list">
                {checks && categorys !== undefined
                  ? categorys.map((value, key) => {
                      return (
                        <Link
                          to={"/search/" + to_slug(value.name) + "." + value.id}
                          onClick={() =>
                            onClickCategory(value.id, key, value.name)
                          }
                          className={
                            activeCategory === key
                              ? "list-category active"
                              : " "
                          }
                          key={key}
                        >
                          <li>{value.name}</li>
                        </Link>
                      );
                    })
                  : null}
              </div>
            </div>

            <div className="category-search left-price-sort ">
              <h4 className="title">Giá</h4>
              <div className="list">
                {price.map((value, key) => {
                  return (
                    <Link
                      to={"/search/" + slug + "." + idCategory}
                      onClick={() =>
                        handleSort(key, value.price1, value.price2)
                      }
                      className={key === activePrice ? "sort active" : "sort"}
                      key={key}
                    >
                      {value.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="category-search left-brand ">
              <h4 className="title">Thương hiệu</h4>
              <div className="list">
                {brand.map((value, key) => {
                  return (
                    <Link
                      to={"/search/" + to_slug(value) + ".all"}
                      key={key}
                      onClick={() => onClickBrand(key)}
                    >
                      {value}
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* <div className="category-search left-color ">
              <h4 className="title">Màu sắc</h4>
              <div className="list">
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">Trắng</a>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">Hồng</a>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">Xanh</a>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">Đen</a>
                </div>
              </div>
            </div> */}

            {/* <div className="category-search left-shipping ">
              <h4 className="title">Địa chỉ nhận hàng</h4>
              <div className="list">
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">Viettel Post</a>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">Giao hàng tiết kiệm</a>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">Now</a>
                </div>
              </div>
            </div> */}

            {/* <div className="category-search left-service ">
              <h4 className="title">Dịch vụ</h4>
              <div className="list">
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">Giao hàng 2h</a>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">Miễn phí giao hàng</a>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">Rẻ hơn hoàn tiền</a>
                </div>
              </div>
            </div> */}

            {/* <div className="category-search left-size">
              <h4 className="title">Kích thước</h4>
              <div className="list">
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">M</a>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">L</a>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">S</a>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <a href="/search/supplier">XL</a>
                </div>
              </div>
            </div> */}
            {/* <div className="category-search left-supplier ">
              <h4 className="title">Nhà cung cấp</h4>
              <div className="list">
                <a href="/search/supplier">3H MASK</a>
              </div>
            </div> */}
            {/* <div className="category-search left-category-search ">
              <h4 className="title">Phân loại</h4>
            </div> */}
            {/* <div className="category-search left-material">
              <h4 className="title">Chất liệu</h4>
            </div> */}
          </div>
          <div className="right">
            <div className="header">
              <div className="header-result"></div>
              <div className="header-tab">
                {arr2.map((value, key) => {
                  return (
                    <h5
                      className={key === active ? "active" : ""}
                      onClick={() => handleTab(key)}
                      key={key}
                    >
                      {value}
                    </h5>
                  );
                })}
              </div>
            </div>

            <div className="body">
              {/* {checks ? (
                isLoading === false ? (
                  <SearchLoading />
                ) : list !== undefined && list !== null ? (
                  <SearchResult data={list} />
                ) : (
                  <SearchNulls />
                )
              ) : null} */}

              {checks && loading ? (
                <Loading />
              ) : list !== undefined && list !== null && list.length !== 0 ? (
                <SearchResult data={list} />
              ) : (
                <SearchNulls />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Search;
