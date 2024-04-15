import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDidMount } from ".";
import { productApiPr } from "../../api/private";
import { PRODUCT_GET_ALL_RELOAD } from "../../app/_constants/ActionType";
const useFetchProducts = (itemsCount) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.FetchAllProduct);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const didMount = useDidMount(true);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await productApiPr.getAll(itemsCount, 1);

      console.log(response);

      if (response.length === 0) {
        if (didMount) {
          setError("Không tìm thấy sản phẩm.");
          setLoading(false);
        }
      } else {
        if (didMount) {
          dispatch({ type: PRODUCT_GET_ALL_RELOAD, payload: response });
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError("Không tìm thấy sản phẩm.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (products.length === 0 && didMount) {
      fetchAllProducts();
    }
  }, []);

  return {
    fetchAllProducts,
    isLoading,
    error,
  };
};

export default useFetchProducts;
