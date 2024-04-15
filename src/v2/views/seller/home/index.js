import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AntButton } from "../../../components/button";
import { Filters, MessageDisplay } from "../../../components/common";
import {
  ProductShowcaseGrid,
  ProductShowcaseSlider,
} from "../../../components/product";
import {
  useFeaturedProducts,
  useHighDiscountProducts,
  useRecommendedProducts,
  useWishListProducts,
} from "../../../hooks";
import { MetaDecorator } from "../../../utils";
import { Banner, Category, Need, QuickLink } from "./components";

const content = require("../../../../static/content.json");

export const HomeSeller = (props) => {
  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useFeaturedProducts(10);
  const {
    highDiscountProducts,
    fetchHighDiscountProducts,
    isLoading: isLoadingHighDiscount,
    error: errorHighDiscount,
  } = useHighDiscountProducts(10);

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    fetchRecommendedMoreProducts,
    stop,
    isLoading: isLoadingRecommended,
    error: errorRecommended,
  } = useRecommendedProducts(20);

  const {
    fetchWishListProducts,
    isLoading: isLoadingWishList,
    error: errorWishList,
  } = useWishListProducts();

  const [index, setIndex] = useState(0);
  const handleIndex = async (index) => {
    setIndex(index);
  };
  const { productLike } = useSelector((state) => state.FetchAllProduct);

  return (
    <>
      <section id="home-default-seller" className="">
        <MetaDecorator
          description={content.pageDescription}
          title={content.pageTitle}
          //  imageUrl={MetaHome}
          imageAlt={content.metaImageAlt}
        />

        <Banner />

        <Filters name={"Sản phẩm bán chạy"} />
        <div className="product-list p-slider mt-1 mb-1" id="product-tab">
          {errorFeatured && !isLoadingFeatured ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Thử lại"
            />
          ) : (
            <ProductShowcaseSlider
              products={featuredProducts}
              skeletonCount={5}
              //  title="Newee happy"
            />
          )}
        </div>

        <Filters name={"Sản phẩm chiết khấu cao"} />
        <div className="product-list p-slider mt-1 mb-1" id="product-tab">
          <>
            {errorHighDiscount && !isLoadingHighDiscount ? (
              <MessageDisplay
                message={errorHighDiscount}
                action={fetchHighDiscountProducts}
                buttonLabel="Thử lại"
              />
            ) : (
              <ProductShowcaseSlider
                products={highDiscountProducts}
                skeletonCount={5}
                //title="Newee asia"
              />
            )}
          </>
        </div>

        {/*<ProductSeller />*/}
        <QuickLink />
        <Need />
        <Filters name={"Danh mục sản phẩm"} />
        <Category />

        <div style={{ width: "100%" }}>
          <div className="newee-sticky-container">
            <div
              onClick={() => handleIndex(0)}
              className={index === 0 ? "newee-btn-div active" : "newee-btn-div"}
            >
              Gợi ý hôm nay
            </div>
            <div
              onClick={() => handleIndex(1)}
              className={index === 1 ? "newee-btn-div active" : "newee-btn-div"}
            >
              Danh sách yêu thích
            </div>
          </div>

          {index === 0 && (
            <>
              {errorRecommended && !isLoadingRecommended ? (
                <MessageDisplay
                  message={errorRecommended}
                  action={fetchRecommendedProducts}
                  buttonLabel="Thử lại"
                />
              ) : (
                <ProductShowcaseGrid
                  products={recommendedProducts}
                  skeletonCount={5}
                  //  title="Newee"
                />
              )}
            </>
          )}
          {index === 1 && (
            <>
              {errorWishList && !isLoadingWishList ? (
                <MessageDisplay
                  message={errorWishList}
                  action={fetchWishListProducts}
                  buttonLabel="Thử lại"
                />
              ) : (
                <ProductShowcaseGrid products={productLike} skeletonCount={5} />
              )}
            </>
          )}
          {index === 0 && stop && !isLoadingRecommended ? (
            <MessageDisplay
              message={stop}
              action={fetchRecommendedProducts}
              buttonLabel="Thử lại"
            />
          ) : (
            <div className="d-flex-center mt-1 mb-2 large">
              <AntButton
                type={"primary"}
                size={"large"}
                icons={null}
                isLoading={isLoadingRecommended}
                handle={
                  !isLoadingRecommended
                    ? fetchRecommendedMoreProducts
                    : undefined
                }
                name="Xem thêm"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default HomeSeller;
