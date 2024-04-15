import React, { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "../../../common/card/Cards";

function Product(props) {
  const dispatch = useDispatch();

  const { products, errors } = useSelector((state) => state.FetchAllProduct);

  const [state, setState] = useState({
    itemsToShowList: products.length > 0 ? products.slice(0, 20) : [],
    hideLoadMore: false,
    showResetButton: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    setTimeout(() => {
      if (products?.length < 1) return;
      if (state.itemsToShowList.length === products.length) {
        return;
      } else {
        const visibleItemsCount = state.itemsToShowList.length;
        const totalItems = products.length;

        const dataLoad = [
          ...state.itemsToShowList,
          ...products.slice(visibleItemsCount, visibleItemsCount + 20),
        ];

        const isCheck = dataLoad.length === totalItems;

        setState({
          itemsToShowList: dataLoad,
          hideLoadMore: isCheck,
          showResetButton: isCheck,
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  const firstLoading = useRef(true);
  useLayoutEffect(() => {
    if (firstLoading.current) {
      firstLoading.current = false;
      return;
    }

    if (products?.length > 0) {
      loadMore();
    }
  }, [Object.keys(products).length]);

  if (errors.length !== 0 || products.length === 0) {
    return <div className="text-center">Product not found</div>;
  }
  return (
    <>
      <div
        className="product-list d-flex flex-wrap py-2 justify-content-start align-items-start"
        id="product-tab"
      >
        {state &&
          state.itemsToShowList.length > 0 &&
          state.itemsToShowList.map((value, key) => (
            <Cards
              className={
                "card item-sale col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 py-2"
              }
              value={value}
              key={key + value.id}
            />
          ))}
      </div>

      <div>
        {!state.hideLoadMore && products.length > 0 && (
          <div
            className={
              !isLoading
                ? "long-operation-btn load-more"
                : "long-operation-btn load-more long-operation-started"
            }
            onClick={!isLoading ? loadMore : undefined}
          >
            <span>Xem thêm</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
