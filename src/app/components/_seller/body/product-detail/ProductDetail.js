import copy from "copy-to-clipboard";
import debounce from "lodash.debounce";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { HiHeart, HiOutlineHeart, HiOutlineShare } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  dataLoginApiPr,
  productApiPr,
  wishListApi,
} from "../../../../../api/private";
import { productApi } from "../../../../../api/public";
import dataFilterStar from "../../../../../data/filter/filterStar";
import { useScrollTop } from "../../../../hooks";
import useWishList from "../../../../hooks/wishList/useWishList";
import { TabContent } from "../../../../Layout/Tabs/TabContent";
import { FormatVND, ToSlug } from "../../../../utils";
import * as action from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
import {
  CART_ADD_ITEM,
  OFF_SPINNERS,
  ON_SPINNERS,
  PRIVATE_CART_LOADING,
  PRODUCT_GET_LIKE,
  USER,
} from "../../../../_constants/ActionType";
import { Empty } from "../../../common/body/empty/Empty";
import { ButtonLoading, ButtonOutline } from "../../../common/loadings";
import { RatingStar } from "../../../common/review/RatingStar";
import MetaDecorator from "../../../Util/MetaDecorator";
import "./detail.css";
import FormShare from "./FormShare/FormShare";
import "./productDetail.scss";

let warningVariant = "Vui lòng chọn thuộc tính sản phẩm!";
let successVariant = "Thêm sản phẩm vào giỏ hàng thành công!";
let errorVariant = "Thêm sản phẩm vào giỏ hàng không thành công!";
let successShareVariant = "Chia sẻ nội dung hàng hàng thành công!";
let errorShareVariant = "Chia sẻ nội dung bán hàng không thành công!";
let warningShareVariant = "Vui lòng chọn ảnh sản phẩm!";
let success = "Cập nhập Yêu thích Newee thành công!";
let errors = "Cập nhập Yêu thích Newee không thành công!";

function ProductDetail(props) {
  useScrollTop();
  const { actionToFavorite } = useWishList();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  let { id } = useParams();
  const history = useHistory();
  const {
    user,
    cart: { cartItems },
    productLike,
    favorites,
  } = useSelector((state) => state.FetchAllProduct);
  const dataConnect = JSON.parse(localStorage.getItem("dataConnect"));

  useEffect(() => {
    if (typeof user === "undefined") {
      dispatch({ type: USER, dataConnect });
    }
    console.log(user);
  }, [user]);
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
      const response = await productApiPr.getDetail(id);
      console.log("res", response);
      setDataPublic(response);
      // setImage(response.link)
    } catch (error) {
      console.log(error);
    }
  };

  const getProductVariant = async () => {
    try {
      const response = await productApiPr.getListVariant(id);

      if (response?.length > 0) {
        const ascending = response.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        setVariant(ascending);
        setMax(response[0].count);
        setImage(response[0].imageLink);
        console.log(ascending[0]);
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
    window.open(`${dataPublic?.productAsset}`);
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
    dispatch({ type: ON_SPINNERS });

    if (stateVariant?.currentId.length === 0) {
      enqueueSnackbar(warningVariant, {
        variant: "warning",
      });
      dispatch({ type: OFF_SPINNERS });
      return;
    }
    try {
      if (!isLoading) {
        const existItem = cartItems.find(
          (x) => x.idProduct === id && x.idVariant === stateVariant?.currentId
        );
        const quantity = existItem
          ? existItem.count * 1 + quantitySaveDb * 1
          : quantitySaveDb * 1;
        if (existItem) {
          const existItemTrue = (existItem.count = quantity);

          const responseChangeCount = await productApiPr.changeQuantityFromCart(
            existItem.id,
            quantity
          );

          const cart = await dataLoginApiPr.getDataCart(
            user?.cart || dataConnect?.cart
          );
          console.log(cart);
          dispatch({ type: PRIVATE_CART_LOADING, cart });
        } else {
          const response = await productApiPr.addToCart(
            user?.cart || dataConnect?.cart,
            id,
            stateVariant?.currentId,
            quantity
          );

          const cart = await dataLoginApiPr.getDataCart(
            user?.cart || dataConnect?.cart
          );
          dispatch({ type: PRIVATE_CART_LOADING, cart });
        }
        enqueueSnackbar(successVariant, {
          variant: "success",
        });
        dispatch({ type: OFF_SPINNERS });
      }
    } catch (error) {
      dispatch({ type: OFF_SPINNERS });
      console.log(error);
      enqueueSnackbar(errorVariant, {
        variant: "error",
      });
      console.warn("error");
    }
  };
  const addToCartHandlerPush = async () => {
    closeSnackbar();
    dispatch({ type: ON_SPINNERS });
    if (stateVariant?.currentId.length === 0) {
      enqueueSnackbar(warningVariant, {
        variant: "warning",
      });
      dispatch({ type: OFF_SPINNERS });
      return;
    }
    try {
      if (!isLoading) {
        const existItem = cartItems.find(
          (x) => x.idProduct === id && x.idVariant === stateVariant?.currentId
        );
        const quantity = existItem
          ? existItem.count * 1 + quantitySaveDb * 1
          : quantitySaveDb * 1;

        if (existItem) {
          const existItemTrue = (existItem.count = quantity);

          const responseChangeCount = await productApiPr.changeQuantityFromCart(
            existItem.id,
            quantity
          );

          const cart = await dataLoginApiPr.getDataCart(
            user?.cart || dataConnect?.cart
          );
          dispatch({ type: PRIVATE_CART_LOADING, cart });
        } else {
          const response = await productApiPr.addToCart(
            user?.cart || dataConnect?.cart,
            id,
            stateVariant?.currentId,
            quantity
          );

          const cart = await dataLoginApiPr.getDataCart(
            user?.cart || dataConnect?.cart
          );
          dispatch({ type: PRIVATE_CART_LOADING, cart });
        }
        dispatch({ type: OFF_SPINNERS });
        enqueueSnackbar(successVariant, {
          variant: "success",
        });
        history.push("/cart");
      }
    } catch (error) {
      dispatch({ type: OFF_SPINNERS });
      console.log(error);
      enqueueSnackbar(errorVariant, {
        variant: "error",
      });
    }
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
    switch (key) {
      case "1":
        selectedContent.content = dataPublic.content1;
        setSelectedContent({ ...selectedContent, numberContent: key });
        break;
      case "2":
        selectedContent.content = dataPublic.content2;
        setSelectedContent({ ...selectedContent, numberContent: key });
        break;
      case "3":
        selectedContent.content = dataPublic.content3;
        setSelectedContent({ ...selectedContent, numberContent: key });
        break;

      default:
        break;
    }
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
        appId: "549623566671707",
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
    copy(selectedContent?.content);
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
      return;
    }
  };

  const [favorite, setFavorite] = useState([]); // <= this state holds the id's of all favorite reciepies
  const [remove, setRemove] = useState([]);
  // following function handles the operation of adding fav recipes's id's

  const addToFavorite = (id, key) => {
    dispatch({ type: ON_SPINNERS });

    if (!favorite.includes(id)) {
      setFavorite(favorite.concat(id));
      debouncedSaveWL(favorite.concat(id));
    } else {
      let index = favorite.indexOf(id);
      let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
      setRemove(remove.concat(id));
      setFavorite(temp);
      debouncedRemoveWL(remove.concat(id));
    }
  };

  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    if (productLike.length > 0 && isCheck === false) {
      setFavorite(productLike.map((value) => value.id));

      setIsCheck(true);
    }
  }, [productLike]);

  const debouncedSaveWL = useRef(
    debounce((quantity) => saveChangeInput(quantity), 300)
  ).current;
  const debouncedRemoveWL = useRef(
    debounce((quantity) => saveRemove(quantity), 300)
  ).current;

  const saveChangeInputWL = async (data) => {
    closeSnackbar();
    let req = data.map((value) => ({
      productId: value,
    }));
    try {
      if (req.length > 0) {
        const response = await wishListApi.add(req);
        const response2 = await wishListApi.getAll();
        console.log(response2);
        if (response2.status === 204) {
          let isEmpty = [];
          dispatch({ type: PRODUCT_GET_LIKE, payload: [] });
        } else {
          dispatch({ type: PRODUCT_GET_LIKE, payload: response2 });
        }
        enqueueSnackbar(success, {
          variant: "success",
        });
        dispatch({ type: OFF_SPINNERS });
      }
    } catch (error) {
      dispatch({ type: OFF_SPINNERS });
      console.log("error", error);
      enqueueSnackbar(errors, {
        variant: "error",
      });
    }
  };
  const saveRemove = async (data) => {
    closeSnackbar();
    try {
      for (let i = 0; i < data.length; i++) {
        const response = await wishListApi.delete(data[i]);
      }

      const response2 = await wishListApi.getAll();

      if (response2.status === 204) {
        let isEmpty = [];
        dispatch({ type: PRODUCT_GET_LIKE, payload: [] });
      } else {
        dispatch({ type: PRODUCT_GET_LIKE, payload: response2 });
      }

      enqueueSnackbar(success, {
        variant: "success",
      });
      dispatch({ type: OFF_SPINNERS });
    } catch (error) {
      dispatch({ type: OFF_SPINNERS });
      console.log("error", error);
      enqueueSnackbar(errors, {
        variant: "error",
      });
    }
  };

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
          <Link to={`/search/${ToSlug(dataPublic?.brand)}.all`}>
            {dataPublic?.brand}
          </Link>
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
                      <FaRegCommentDots />
                    </span>
                    Đánh giá
                  </li>
                  <li
                    className="py-2 d-flex-center mr-2"
                    onClick={() => {
                      actionToFavorite(id);
                    }}
                  >
                    <span className="newee-icons red pr-1">
                      {favorites.includes(id) ? (
                        <HiHeart />
                      ) : (
                        <HiOutlineHeart />
                      )}
                    </span>
                    Yêu thích
                  </li>
                </div>
              </div>

              <div className="content-left-description"></div>
            </div>
            <div className="content-right">
              <div className="box-options">
                <label>Thương hiệu</label>
                <div className="box-options-flex">
                  <strong>{dataPublic?.brand}</strong>
                </div>
              </div>
              <div style={{ padding: "12px 0" }}></div>
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

              <div className="box-options end mb-4">
                <label>Chiết khấu</label>
                <div className="box-options-flex">
                  {variant.length > 0 && (
                    <strong className="box-money-received box-price-current">
                      {stateVariant.selected >= 0
                        ? variant[stateVariant.selected].percent +
                          "%" +
                          " (" +
                          FormatVND(
                            variant[stateVariant.selected].moneyReceived
                          ) +
                          "₫" +
                          ")"
                        : stateVariant.current >= 0
                        ? variant[stateVariant?.current].percent +
                          "%" +
                          " (" +
                          FormatVND(
                            variant[stateVariant?.current].moneyReceived
                          ) +
                          "₫" +
                          ")"
                        : variant[0].percent +
                          "%" +
                          " (" +
                          FormatVND(variant[0].moneyReceived) +
                          "₫" +
                          ")"}
                    </strong>
                  )}
                </div>
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
            </div>
          </>
        }
      </div>

      <div className="container-des">
        <div className="container-left av">
          <div className="container-left-content">
            <h4 className="bg-gray p20 ">Mô tả sản phẩm</h4>
            <pre className="container-des-pre p15-20">
              {dataPublic?.description}
            </pre>
          </div>

          <div className="container-left-content" ref={shareRef}>
            <h4 className="bg-gray p20">Chia sẻ mẫu bán hàng</h4>
            {dataPublic?.content1.length > 0 ? (
              <>
                <TabContent
                  data={dataPublic && dataPublic}
                  handleSelectedContent={handleSelectedContent}
                />
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
                  {/* {JSON.stringify(selectedContent)} */}
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

            {ratings?.length < 1 ? (
              <div className="p15-20">
                <Empty
                  name="Chưa có đánh giá sản phẩm! Vui lòng kiểm tra lại sau!"
                  btnTitle="Về trang chủ"
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
                    {ratings?.length > 0 &&
                      ratings.map((value) => (
                        <div className="rating">
                          <div className="avatar">
                            <LazyLoadImage
                              src={
                                variant[stateVariant?.selected]?.imageLink ||
                                variant[stateVariant?.current]?.imageLink ||
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
                              <RatingStar rating={value.scores} />
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
    </div>
  );
  const content = (
    <section className="">
      <MetaDecorator
        description={
          (dataPublic && dataPublic?.description?.substr(0, 150)) ||
          "Newee asia - Happy Seller"
        }
        title={
          (dataPublic && dataPublic?.name) ||
          "Newee asia - Happy Seller - title"
        }
        imageUrl={
          (dataPublic && dataPublic?.link) || "https://seller.newee.asia"
        }
        imageAlt={"Newee asia - Happy Seller"}
      />
      {uiPrivate}
    </section>
  );

  return <div>{content}</div>;
}

export default ProductDetail;
