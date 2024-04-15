import debounce from "lodash.debounce";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishListApi } from "../../../api/private";
import {
  OFF_SPINNERS,
  ON_SPINNERS,
  PRODUCT_GET_LIKE,
  PRODUCT_GET_LIKE_CHANGE,
} from "../../_constants/ActionType";

let success = "Cập nhập Yêu thích Newee thành công!";
let warning = "Cập nhập Yêu thích Newee không thành công!";
let errors = "Cập nhập Yêu thích Newee không thành công!";

function useWishList() {
  const { favorites } = useSelector((state) => state.FetchAllProduct);

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState([]);
  const [remove, setRemove] = useState([]);

  const actionToFavorite = (id, key) => {
    dispatch({ type: ON_SPINNERS });
    if (!favorites.includes(id)) {
      dispatch({
        type: PRODUCT_GET_LIKE_CHANGE,
        payload: favorites.concat(id),
      });
      debouncedSave(favorite.concat(id));
    } else {
      let index = favorites.indexOf(id);
      let temp = [...favorites.slice(0, index), ...favorite.slice(index + 1)];

      dispatch({
        type: PRODUCT_GET_LIKE_CHANGE,
        payload: temp,
      });

      debouncedRemove(remove.concat(id));
    }
  };
  const debouncedSave = useRef(
    debounce((quantity) => saveChangeInput(quantity), 100)
  ).current;
  const debouncedRemove = useRef(
    debounce((quantity) => saveRemove(quantity), 100)
  ).current;

  const saveChangeInput = async (data) => {
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

  //  useLayoutEffect(() => {
  //    actionToFavorite(id, key);
  //  }, [id, key]);

  return { actionToFavorite };
}

export default useWishList;
