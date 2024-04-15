import debounce from "lodash.debounce";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { HiHeart, HiOutlineHeart, HiOutlineShare } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NoSSR from "react-no-ssr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { productApi } from "../../../api/public";
import dataFilterStar from "../../../data/filter/filterStar";
import { Empty } from "../../components/common/body/empty/Empty";
import { ButtonLoading, ButtonOutline } from "../../components/common/loadings";
import FormShare from "../../components/_custommer/body/product-detail/FormShare/FormShare";
import "../../components/_custommer/body/product-detail/productDetail.scss";
import "../../components/_seller/body/product-detail/detail.css";
import { FormatVND } from "../../utils/FormatVND";
import * as action from "../../_actions/custommer/isDisplayForm/DisplayForm";
import { CART_ADD_ITEM } from "../../_constants/ActionType";

export const DetailCustomer = (props) => {
  let login = "Đăng nhập Newee để sử dụng chức năng này!";
  let warningVariant = "Vui lòng chọn thuộc tính sản phẩm!";
  let successVariant = "Thêm sản phẩm vào giỏ hàng thành công!";
  let errorVariant = "Thêm sản phẩm vào giỏ hàng không thành công!";
  let warningShare = "Vui lòng chọn ảnh sản phẩm cần chia sẻ!";
  let successShare = "Chia sẻ mẫu bán hàng thành công!";
  let errorShare = "Chia sẻ mẫu bán hàng thất bại!";
  let successShareVariant = "Chia sẻ nội dung hàng hàng thành công!";
  let errorShareVariant = "Chia sẻ nội dung bán hàng không thành công!";
  let warningShareVariant = "Vui lòng chọn ảnh sản phẩm!";

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  let { id } = useParams();
  const history = useHistory();
  const {
    user,
    products,
    cart: { cartItems },
    userInfo,
  } = useSelector((state) => state.FetchAllProduct);

  console.log("user", user);

  const [item, setItem] = useState({});
  const [variant, setVariant] = useState([]);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [image, setImage] = useState();
  const [imgShare, setImgShare] = useState("");
  const [metaImage, setMetaImage] = useState(null);
  const [dataPublic, setDataPublic] = useState(null);
  const [dataPrivate, setDataPrivate] = useState(null);

  const [keyVariant, setKeyVariant] = useState(0);

  useEffect(() => {
    if (item && item.link) {
      setImgShare(item.link);
    }
  }, []);

  const dispatch = useDispatch();

  const handleHoverVariant = (id, key) => {
    setStateVariant({
      ...stateVariant,
      selected: key,
      selectedId: id,
    });
  };
  const handleUnHoverVariant = (id, key) => {
    setStateVariant({
      ...stateVariant,
      selected: -1,
      selectedId: "",
    });
  };
  const handleClickVariant = (id, key) => {
    setStateVariant({
      ...stateVariant,
      current: key,
      currentId: id,
    });
  };

  const getProductDetail = async () => {
    try {
      const response = await productApi.getDetail(id);
      console.log(response);
      setDataPublic(response);
      // setImage(response.link)
    } catch (error) {
      console.log(error);
    }
  };

  const getProductVariant = async () => {
    try {
      const response = await productApi.getListVariant(id);
      console.log(response);
      if (response.length > 0) {
        const ascending = response.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        setVariant(ascending);
        setMax(response[0].count);
        setImage(response[0].imageLink);
      } else {
        setVariant([]);
      }
    } catch (error) {
      console.log(error);
      setVariant([]);
    }
  };
  const handleSubmitToCheckout = async () => {
    const item = "anhvan";
    dispatch({ type: CART_ADD_ITEM, item });
  };
  useEffect(() => {
    getProductDetail();
    getProductVariant();
  }, [id]);

  // form

  const [logged, setlogged] = useState(false);

  const [idForm, setIDForm] = useState("");

  const onEdit = (idForm, value) => {
    setIDForm(idForm);
    setlogged(true);
    dispatch(action.openForm());
  };

  const onSetLogged = () => {
    setlogged(false);
  };
  const onReloadPage = (name) => {
    // getUser();
    setlogged(false);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: name,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const contentDownload = (url) => {
    window.open(`${url}`);
  };

  const shareRef = useRef(null);
  const scrollToElement = () =>
    shareRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  const imageShareRef = useRef(null);
  const scrollToImageShare = () =>
    imageShareRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  const commentRef = useRef(null);
  const scrollToComment = () =>
    commentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [quantitySaveDb, setQuantitySaveDb] = useState(1); // would be an API call normally

  const debouncedSave = useRef(
    debounce((quantity) => saveChangeInput(quantity), 1000)
  ).current;

  const handleChangeInput = (event) => {
    setIsLoading(true);
    const { value: quantity } = event.target;
    setQuantity(quantity);
    debouncedSave(quantity);
  };
  const saveChangeInput = (value) => {
    setQuantitySaveDb(value);
    setIsLoading(false);
  };

  const handleQuantityReduced = () => {
    setQuantity((pre) => ((pre - 1) * 1 > 0 ? pre * 1 - 1 : 0));
    setQuantitySaveDb((pre) => ((pre - 1) * 1 > 0 ? pre * 1 - 1 : 0));
  };
  const handleQuantityIncrease = () => {
    setQuantity((pre) => pre * 1 + 1);
    setQuantitySaveDb((pre) => pre * 1 + 1);
  };

  const addToCartHandler = async () => {
    closeSnackbar();
    enqueueSnackbar(login, {
      variant: "warning",
    });
    return;
  };
  const addToCartHandlerPush = async () => {
    closeSnackbar();
    enqueueSnackbar(login, {
      variant: "warning",
    });
    return;
  };

  const [stateVariant, setStateVariant] = useState({
    selected: -1,
    selectedId: "",
    current: -1,
    currentId: "",
  });
  const [selectedContent, setSelectedContent] = useState({
    numberContent: 0,
    content: "",
    images: "",
    numberImages: -1,

    currentImage: "",
    current: -1,
    selectedImage: "",
    selected: -1,
  });
  const handleSelectedContent = async (key, content) => {
    selectedContent.content = content;
    setSelectedContent({ ...selectedContent, numberContent: key });
  };
  const handleSelectedImages = async (key, images) => {
    selectedContent.images = images;
    selectedContent.currentImage = images;
    setSelectedContent({ ...selectedContent, selected: key });
  };
  const handleUnSelectedImages = async (key, images) => {
    selectedContent.images = "";
    selectedContent.currentImage = images;
    setSelectedContent({
      ...selectedContent,
      selected: selectedContent?.current || -1,
    });
  };
  const handleClickImages = async (key, images) => {
    selectedContent.images = images;
    selectedContent.currentImage = images;

    setSelectedContent({ ...selectedContent, current: key });
  };

  useEffect(() => {
    // FB
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "786779932029214",
        cookie: true,
        xfbml: true,
        version: "v10.0",
      });

      window.FB.AppEvents.logPageView();
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  const shareFB = () => {
    console.log("selectedContent?.images", selectedContent);

    window.FB.ui(
      {
        display: "popup",
        method: "share",
        // media: [
        //   `https://res.cloudinary.com/ngheconn/image/upload/v1621407394/test/bvfingnshnthmd2wh9ed.jpg`,
        //   `https://res.cloudinary.com/ngheconn/image/upload/v1621417538/test/cz6kojuz0pfcee7vfozu.jpg`,
        //   `https://res.cloudinary.com/ngheconn/image/upload/v1621996656/test/rldsxhgb0dc7ropbjj22.jpg`,
        // ],
        media: [`${selectedContent?.currentImage}`],
      },
      function (response) {
        if (!response) {
          console.log(response);
          console.log("User did not share the page.");
          enqueueSnackbar(errorShareVariant, {
            variant: "error",
          });
        } else {
          console.log(response);
          console.log("User shared the page!");
          enqueueSnackbar(successShareVariant, {
            variant: "success",
          });
        }
      }
    );
  };
  const shareContent = async () => {
    setIsLoading(true);
    closeSnackbar();
    if (selectedContent.current === -1) {
      enqueueSnackbar(warningShareVariant, {
        variant: "warning",
      });
      setIsLoading(false);
      return;
    } else {
      shareFB();
      scrollToImageShare();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const [ratings, setRatings] = useState([]);
  console.log("ratings", ratings);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // const { data } = await axios.get(
      //   `https://api.newee.asia:5001/Newee/RatingSeller/List/${slug}/1`
      // )

      const response = await productApi.getComment(id);
      console.log(response);

      setRatings([...response]);
    } catch (error) {
      setRatings([]);
    }
  };

  const Loading = () => <div>Loading...</div>;

  const uiPrivate = (
    <div className="container-detail ">
      <ul className="container-breadcrumb">
        <li>
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="p2">
          <span>›</span>
        </li>
        <li>
          <Link to={`/${dataPublic?.brand}`}>{dataPublic?.brand}</Link>
        </li>
      </ul>

      <div className="container-content">
        {logged === true ? (
          <FormShare
            id={idForm}
            data={dataPublic.description}
            listContent={dataPublic}
            listImage={item.link}
            onReload={onReloadPage}
            onSetLogged={onSetLogged}
            imgShare={imgShare ? imgShare : item.link}
          ></FormShare>
        ) : null}
        {
          <>
            <div className="content-left">
              <div className="content-left-img">
                <div className="content-left-img-primary">
                  <LazyLoadImage
                    src={
                      variant[stateVariant?.selected]?.imageLink ||
                      variant[stateVariant?.current]?.imageLink ||
                      dataPublic?.link
                    }
                    width={450}
                    height={450}
                    alt="Newee"
                    className="image-sm"
                  />
                </div>
                <div className="content-left-slide-bottom d-flex-left">
                  {variant &&
                    variant
                      .slice(0, 5)
                      .map((value, key) => (
                        <LazyLoadImage
                          key={value.id + "image variant"}
                          src={value.imageLink || dataPublic?.link}
                          width={82}
                          height={82}
                          alt="Newee"
                          className={
                            key === stateVariant?.current ||
                            value.id === stateVariant?.currentId
                              ? "slide-bottom-image image-selected"
                              : "slide-bottom-image"
                          }
                          onMouseEnter={() => handleHoverVariant(value.id, key)}
                          onMouseLeave={() =>
                            handleUnHoverVariant(value.id, key)
                          }
                          onClick={() => handleClickVariant(value.id, key)}
                        />
                      ))}
                </div>

                <div className="box-options box-policy mt-2">
                  <li
                    className="py-2 d-flex-center mr-2"
                    onClick={scrollToElement}
                  >
                    <span className="newee-icons pr-1">
                      <HiOutlineShare />
                    </span>
                    Chia sẻ mẫu bán hàng
                  </li>
                  <li
                    className="py-2 d-flex-center mr-2"
                    onClick={scrollToComment}
                  >
                    <span className="newee-icons pr-1">
                      <HiHeart />
                    </span>
                    Đánh giá
                  </li>
                  <li className="py-2 d-flex-center mr-2">
                    <span className="newee-icons pr-1">
                      <HiOutlineHeart />
                    </span>
                    Yêu thích
                  </li>
                </div>
              </div>

              <div className="content-left-description"></div>
            </div>
            <div className="content-right">
              <h1>{dataPublic?.name}</h1>
              <div className="box-price">
                {variant[0]?.discount > 0 ? (
                  <>
                    {variant.length > 0 && (
                      <span className="box-price-old">
                        {FormatVND(
                          variant[stateVariant?.selected]?.price ||
                            variant[stateVariant?.current]?.price ||
                            variant[0].price
                        )}
                        ₫
                      </span>
                    )}

                    {variant.length > 0 && (
                      <strong className="box-price-current">
                        {FormatVND(
                          variant[0].priceDiscount > 0
                            ? stateVariant.selected >= 0
                              ? variant[stateVariant.selected].priceDiscount
                              : stateVariant.current >= 0
                              ? variant[stateVariant?.current].priceDiscount
                              : variant[0].priceDiscount
                            : stateVariant.selected >= 0
                            ? variant[stateVariant.selected].price
                            : stateVariant.current >= 0
                            ? variant[stateVariant?.current].price
                            : variant[0].price
                        )}
                        ₫
                      </strong>
                    )}
                    {variant.length > 0 && (
                      <span className="box-price-percent">
                        {variant[0].discount > 0
                          ? stateVariant.selected >= 0
                            ? variant[stateVariant.selected].discount
                            : stateVariant.current >= 0
                            ? variant[stateVariant?.current].discount
                            : variant[0].discount
                          : variant[0].discount}
                        % Giảm
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {variant.length > 0 && (
                      <strong className="box-price-current">
                        {FormatVND(
                          variant[0].priceDiscount > 0
                            ? stateVariant.selected >= 0
                              ? variant[stateVariant.selected].priceDiscount
                              : stateVariant.current >= 0
                              ? variant[stateVariant?.current].priceDiscount
                              : variant[0].priceDiscount
                            : stateVariant.selected >= 0
                            ? variant[stateVariant.selected].price
                            : stateVariant.current >= 0
                            ? variant[stateVariant?.current].price
                            : variant[0].price
                        )}
                        ₫
                      </strong>
                    )}
                  </>
                )}
              </div>

              <div className="box-options">
                <label>{variant[0]?.propertyName || "Phân Loại"}</label>
                <div className="box-options-flex">
                  {variant?.map((value, key) => (
                    <li
                      key={value.id + "options"}
                      className={
                        key === stateVariant?.selected ||
                        value.id === stateVariant?.currentId
                          ? "product-variation product-variation-selected"
                          : "product-variation"
                      }
                      onMouseEnter={() => handleHoverVariant(value.id, key)}
                      onMouseLeave={() => handleUnHoverVariant(value.id, key)}
                      onClick={() => handleClickVariant(value.id, key)}
                    >
                      {value.propertyValue}
                    </li>
                  ))}
                </div>
              </div>
              <div className="box-options mt-3">
                <label>Số lượng</label>
                <div className="box-options-flex-0 box-quantity bg-white ">
                  <button
                    className="btn-quantity"
                    onClick={handleQuantityReduced}
                  >
                    -
                  </button>
                  <input
                    className="input-quantity detail"
                    value={quantity}
                    onChange={handleChangeInput}
                  ></input>
                  <button
                    className="btn-quantity"
                    onClick={handleQuantityIncrease}
                  >
                    +
                  </button>
                </div>

                <label style={{ flex: 1 }}>
                  {variant[0]?.count || 0} sản phẩm có sẵn
                </label>
              </div>
              <div className="box-options box-btn mt-4">
                <ButtonOutline
                  loading={isLoading}
                  text={"Thêm vào giỏ hàng"}
                  handleClick={addToCartHandler}
                />

                <ButtonLoading
                  loading={isLoading}
                  text={"Mua ngay"}
                  handleClick={addToCartHandlerPush}
                />
              </div>
              {/* <div className="box-options box-policy mt-4">
                <li className="py-4">
                  <div onClick={scrollToElement}>
                    <span>
                      <HiOutlineShare /> Chia sẻ mẫu bán hàng
                    </span>
                  </div>
                </li>
                <li className="py-4">
                  <p>
                    <span className="">
                      <HiOutlineHeart /> <HiHeart />
                      Yêu thích
                    </span>
                  </p>
                </li>
              </div> */}
            </div>
          </>
        }
      </div>

      <div className="container-des">
        <div className="container-left">
          <div className="container-left-content">
            <h4 className="bg-gray p20 ">Mô tả sản phẩm</h4>
            <pre className="container-des-pre p15-20">
              {dataPublic?.description}
            </pre>
          </div>

          <div className="container-left-content" ref={shareRef}>
            <h4 className="bg-gray p20">Chia sẻ mẫu bán hàng</h4>
            {dataPublic?.content1 !== null ? (
              <>
                <div className="box-options box-btn mt-2 mb-1">
                  <button
                    className={
                      selectedContent.numberContent === 0
                        ? "newee-btn btn-tinted btn-m mr-2 selected"
                        : "newee-btn btn-tinted btn-m mr-2"
                    }
                    onClick={() =>
                      handleSelectedContent(0, dataPublic?.content1)
                    }
                    onMouseEnter={() =>
                      handleSelectedContent(0, dataPublic?.content1)
                    }
                  >
                    Mẫu 1
                  </button>
                  <button
                    className={
                      selectedContent.numberContent === 1
                        ? "newee-btn btn-tinted btn-m mr-2 selected"
                        : "newee-btn btn-tinted btn-m mr-2"
                    }
                    onClick={() =>
                      handleSelectedContent(1, dataPublic?.content2)
                    }
                    onMouseEnter={() =>
                      handleSelectedContent(1, dataPublic?.content2)
                    }
                  >
                    Mẫu 2
                  </button>
                  <button
                    className={
                      selectedContent.numberContent === 2
                        ? "newee-btn btn-tinted btn-m mr-2 selected"
                        : "newee-btn btn-tinted btn-m mr-2"
                    }
                    onClick={() =>
                      handleSelectedContent(2, dataPublic?.content3)
                    }
                    onMouseEnter={() =>
                      handleSelectedContent(2, dataPublic?.content3)
                    }
                  >
                    Mẫu 3
                  </button>
                </div>

                <div className="d-flex-start mb-1">
                  <div
                    className={
                      selectedContent.numberContent === 0
                        ? "pre-content selected"
                        : "pre-content"
                    }
                  >
                    <pre className="container-des-pre p15-20">
                      {dataPublic?.content1}
                    </pre>
                  </div>
                  <div
                    className={
                      selectedContent.numberContent === 1
                        ? "pre-content selected"
                        : "pre-content"
                    }
                  >
                    <pre className="container-des-pre p15-20">
                      {dataPublic?.content2}
                    </pre>
                  </div>
                  <div
                    className={
                      selectedContent.numberContent === 2
                        ? "pre-content selected"
                        : "pre-content"
                    }
                  >
                    <pre className="container-des-pre p15-20">
                      {dataPublic?.content3}
                    </pre>
                  </div>
                </div>
                <div ref={imageShareRef}>
                  <h4>Chọn ảnh sản phẩm: </h4>
                  <div className="d-flex-left slide-bottom p15-20">
                    {variant &&
                      variant
                        .slice(0, 10)
                        .map((value, key) => (
                          <LazyLoadImage
                            key={value.id + "share"}
                            src={value.imageLink || dataPublic?.link}
                            width={82}
                            height={82}
                            alt="Newee"
                            className={
                              key === selectedContent?.current ||
                              key === selectedContent?.selected
                                ? "slide-bottom-image image-selected"
                                : "slide-bottom-image"
                            }
                            onMouseEnter={() =>
                              handleSelectedImages(key, value.imageLink)
                            }
                            onMouseLeave={() =>
                              handleUnSelectedImages(key, value.imageLink)
                            }
                            onClick={() =>
                              handleClickImages(key, value.imageLink)
                            }
                          />
                        ))}
                  </div>
                </div>

                <div className="mt-1">
                  <ButtonLoading
                    loading={isLoading}
                    text={"Chia sẻ Mẫu bán hàng"}
                    handleClick={shareContent}
                  />
                </div>
              </>
            ) : (
              <div className="p15-20">
                <Empty
                  name="Newee chưa cập nhập Mẫu bán hàng cho sản phẩm này! Vui lòng kiểm tra lại sau!"
                  btnTitle="Về trang chủ"
                  handleClick={() => history.push("/")}
                />
              </div>
            )}
          </div>
          <div className="container-left-content" ref={commentRef}>
            <h4 className="bg-gray p20">Đánh giá sản phẩm</h4>
            {ratings.length < 1 ? (
              <div className="p15-20">
                <Empty
                  name="Chưa có đánh giá sản phẩm! Vui lòng kiểm tra lại sau!"
                  btnTitle="Về trang chủ"
                  handleClick={() => history.push("/")}
                />
              </div>
            ) : (
              <div className="ratings-detail">
                <div className="ratings-overview">
                  <div className="ratings-overview-star">
                    <div className="wrap-score">
                      <span className="score">5</span>
                      <span className="score-out-of">trên 5</span>
                    </div>
                    <div className="wrap-star">
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                      <span className="star">&#9733;</span>
                    </div>
                  </div>

                  <div className="ratings-overview-filter">
                    <div className="box-options">
                      <div className="box-options-flex">
                        {dataFilterStar.map((value, key) => (
                          <li
                            key={value.key}
                            className={
                              key === stateVariant?.selected ||
                              value.id === stateVariant?.currentId
                                ? "button-filter selected"
                                : "button-filter"
                            }
                            // onMouseEnter={() => handleHoverVariant(value.id, key)}
                            // onMouseLeave={() => handleUnHoverVariant(value.id, key)}
                            // onClick={() => handleClickVariant(value.id, key)}
                          >
                            {value.name} (0)
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ratings-list">
                  <div className="ratings-list-comment">
                    {ratings.length < 1 ? (
                      <div className="p15-20">
                        <Empty
                          name="Chưa có đánh giá sản phẩm! Vui lòng kiểm tra lại sau!"
                          btnTitle="Về trang chủ"
                        />
                      </div>
                    ) : (
                      <div className="ratings-detail">
                        <div className="ratings-list">
                          <div className="ratings-list-comment">
                            {ratings.length > 0 &&
                              ratings.map((value) => (
                                <div className="rating">
                                  <div className="avatar">
                                    <LazyLoadImage
                                      src={
                                        variant[stateVariant?.selected]
                                          ?.imageLink ||
                                        variant[stateVariant?.current]
                                          ?.imageLink ||
                                        dataPublic?.link
                                      }
                                      width={60}
                                      height={60}
                                      // layout="fixed"
                                      alt="Newee"
                                      className="image-round"
                                    />
                                  </div>
                                  <div className="body">
                                    <div className="ratings-body-name">
                                      {value.buyerName}
                                    </div>
                                    <div className="ratings-body-phone">
                                      {value.phone}
                                    </div>
                                    <div className="ratings-body-star">
                                      <span className="star">&#9733;</span>
                                      <span className="star">&#9733;</span>
                                      <span className="star">&#9733;</span>
                                      <span className="star">&#9733;</span>
                                      <span className="star">&#9733;</span>
                                    </div>
                                    <div className="ratings-body-time">
                                      {value.creationTime} | Phân loại hàng:
                                      Truyền thống
                                    </div>
                                    <div className="ratings-body-comment">
                                      {value.content}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <div className="ratings-list-footer"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  const content = (
    <>
      <Helmet>
        <title>{dataPublic?.name || "Newee | Detail"}</title>

        <meta name="robots" content="all" data-rh="true" />
        <meta
          property="og:title"
          content={dataPublic?.name || "Detail 4"}
          data-react-helmet="true"
        />
        <meta
          property="title"
          content={dataPublic?.name || "Detail 4"}
          data-react-helmet="true"
        />
        <meta
          name="description"
          content={
            dataPublic?.description || "Newee - Best Products for your pet"
          }
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content={
            dataPublic?.description || "Newee | Best Products for your pet"
          }
          data-react-helmet="true"
        />
        <meta
          property="og:image"
          content={
            "https://api.newee.asia:8001/Photos/Product/637637952221201153.jpg"
          }
          data-react-helmet="true"
        />
        <meta property="og:url" content="https://testseller.newee.asia" />
        <meta property="og:site_name" content="Detail - site-name" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
      </Helmet>
      <section>{uiPrivate}</section>
    </>
  );

  return <NoSSR>{content}</NoSSR>;
};
