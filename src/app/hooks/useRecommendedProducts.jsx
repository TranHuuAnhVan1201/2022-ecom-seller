import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productApiPr } from "../../api/private";
import { useDidMount } from "../hooks";
import { OFF_SPINNERS, ON_SPINNERS } from "../_constants/ActionType";
const useRecommendedProducts = (itemsCount) => {
  const dispatch = useDispatch();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stop, setStop] = useState("");
  const didMount = useDidMount(true);

  const [offset, setOffset] = useState(0);

  const fetchRecommendedProducts = async () => {
    console.warn("đã chạy");
    try {
      setLoading(true);
      setError("");

      const response = await productApiPr.getAll(itemsCount, 1);
      console.log(response);
      setOffset((pre) => pre + 1);

      if (response.length === 0) {
        if (didMount) {
          setError("Không tìm thấy sản phẩm chiết khấu cao.");
          setLoading(false);
        }
      } else {
        if (didMount) {
          setRecommendedProducts(response);
          setStop("");
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
    if (recommendedProducts.length === 0 && didMount) {
      fetchRecommendedProducts();
    }
  }, []);

  const fetchRecommendedMoreProducts = async () => {
    dispatch({ type: ON_SPINNERS });
    try {
      const response = await productApiPr.getAll(20, offset);
      console.log(response);

      if (response.length === 0 || response.data === null) {
        if (didMount) {
          setStop("Không còn sản phẩm để hiển thị.");
          setLoading(false);
        }
      } else {
        if (didMount) {
          setRecommendedProducts([...recommendedProducts, ...response]);
          setOffset((pre) => pre + 1);
          setLoading(false);
        }
      }
      dispatch({ type: OFF_SPINNERS });
    } catch (error) {
      console.warn("error", error);
      if (didMount) {
        setStop("Không còn sản phẩm để hiển thị.");
        setLoading(false);
      }
      dispatch({ type: OFF_SPINNERS });
    }
  };

  return {
    recommendedProducts,
    fetchRecommendedProducts,
    fetchRecommendedMoreProducts,
    stop,
    isLoading,
    error,
  };
};

export default useRecommendedProducts;
