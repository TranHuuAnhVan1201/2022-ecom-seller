import React from "react";
import { Link } from "react-router-dom";
import { useFeaturedProducts } from "../../../app/hooks";
import MetaHome from "../../../assets/images/meta/metahome.png";
import { MessageDisplay } from "../../components/common";
import { FEATURED_PRODUCTS } from "../../constants/routes";
import { Filters } from "../common/body/filter";
import { ProductShowcaseGrid } from "../product";
import MetaDecorator from "../Util/MetaDecorator";
import Banner from "./body/home-default/home-detail/banner/Banner";
import { Category } from "./body/home-default/home-detail/category/Category";
import Need from "./body/home-default/home-detail/need/Need";
import { QuickLink } from "./body/home-default/home-detail/quick-link";
import Product from "./body/products/Product";
import ProductSale from "./body/products/ProductSale";
import ProductSeller from "./body/products/ProductSeller";

const content = require("../../../data/content.json");

function HomeSeller() {
  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useFeaturedProducts();
  console.log("conssole.log-", errorFeatured && !isLoadingFeatured);

  return (
    <>
      <section id="home-default-seller mg-85 mg-135">
        <MetaDecorator
          description={content.pageDescription}
          title={content.pageTitle}
          imageUrl={MetaHome}
          imageAlt={content.metaImageAlt}
        />
        <div className="h-85 h-135 "></div>
        <Banner />
        <Filters name={"Sản phẩm bán chạy"} />
        <div className="display">
          <div className="display-header">
            <h1>Featured Products</h1>
            <Link to={FEATURED_PRODUCTS}>See All</Link>
          </div>
          {errorFeatured && !isLoadingFeatured ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </div>

        <ProductSale />
        <Filters name={"Sản phẩm chiết khấu cao"} />
        <ProductSeller />
        <QuickLink />
        <Need />
        <Filters name={"Danh mục sản phẩm"} />
        <Category />
        <Product />
      </section>
    </>
  );
}

export default HomeSeller;
