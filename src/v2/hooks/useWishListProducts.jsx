import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { wishListApi } from "../../api/private";
import { PRODUCT_GET_LIKE } from "../constants/constants";
import { useDidMount } from "../hooks";

const useWishListProducts = (itemsCount) => {
  const [wishListProducts, setWishListProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const didMount = useDidMount(true);
  const dispatch = useDispatch();

  const fetchWishListProducts = async () => {
    try {
      setLoading(true);
      setError("");

      //  const response = await productApiPr.getListHighDiscountProduct(
      //    itemsCount,
      //    1
      //  );

      //  console.log(response);

      const response = await wishListApi.getAll();
      if (response.status === 204) {
        dispatch({ type: PRODUCT_GET_LIKE, payload: [] });
        //setWishListProducts([]);
      } else {
        dispatch({ type: PRODUCT_GET_LIKE, payload: response });
        //setWishListProducts(response);
      }

      if (response.length === 0) {
        if (didMount) {
          setError("Không tìm thấy sản phẩm chiết khấu cao.");
          setLoading(false);
        }
      } else {
        if (didMount) {
          setWishListProducts(response);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError("Không tìm thấy sản phẩm chiết khấu cao.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (wishListProducts.length === 0 && didMount) {
      fetchWishListProducts();
    }
  }, []);

  return {
    wishListProducts,
    fetchWishListProducts,
    isLoading,
    error,
  };
};

export default useWishListProducts;
