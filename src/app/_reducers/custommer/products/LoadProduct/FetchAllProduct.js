import * as Types from "./../../../../_constants/ActionType";
var initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [],
  userInfo: [],
  cart: {
    cartItems: [],
    cartLength: 0,
    totalPayment: 0,
    totalPaymentMoneySeller: 0,
  },
  products: [],
  sellings: [],
  suggested: [],
  productLike: [],
  favorites: [],
  productsNew: [],
  categories: [{id: '1', name: 'Sản phẩm mới'}],
  errors: [],
  isWaiting: false,
  isError: false,
  isSpinners: true,
  isRender: false,
};
const pickRandom = (arr, count) => {
  let _arr = [...arr];
  return [...Array(count)].map(
    () => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]
  );
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER:
      return { ...state, user: action.user };
    case Types.ON_SPINNERS:
      return { ...state, isSpinners: true };
    case Types.OFF_SPINNERS:
      return { ...state, isSpinners: false };
    case Types.USER_INFO:
      return { ...state, userInfo: action.info };

    case Types.PRIVATE_CART_LOADING:
      const carts = action.cart;
      const cartLength = carts?.reduce((a, c) => a + c.count, 0);
      const totalPayment = carts?.reduce(
        (a, c) =>
          a + c.count * (c.priceDiscount !== 0 ? c.priceDiscount : c.price),
        0
      );
      const totalPaymentSeller = carts?.reduce(
        (a, c) => a + c.totalMoneyReceived,
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(carts));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: action.cart,
          cartLength: cartLength,
          totalPayment: totalPayment,
          totalPaymentSeller,
        },
      };

    case Types.CART_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.id === existItem.id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case Types.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case Types.PRODUCT_LOADING:
      return { ...state };

    case Types.PRODUCT_GET_ALL:
      return { ...state, products: action.payload, isRender: false };
    case Types.PRODUCT_GET_ALL_RELOAD:
      return {
        ...state,
        products: [...action.payload],
        isRender: true,
      };
  

    case Types.PRODUCT_GET_LIKE:
      return {
        ...state,
        productLike: action.payload,
        favorites: action.payload.map((value) => value.id),
      };
    case Types.PRODUCT_GET_LIKE_CHANGE: {
      return {
        ...state,
        favorites: action.payload,
      };
    }

    case Types.PRODUCT_GET_CATEGORY:
      return { ...state, categories: action.payload };
  

    case Types.PRODUCT_ERROR:
      return { ...state, errors: action.payload };

    case Types.CLEAR_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
          cartLength: 0,
          totalPayment: 0,
          totalPaymentMoneySeller: 0,
        },
      };

    case Types.USER_LOGOUT:
      return {
        ...state,
        user: [],
        userInfo: [],
        cart: {
          cartItems: [],
          cartLength: 0,
        },

        products: [],
        categories: [],
        errors: [],
        isWaiting: false,
        isError: false,
      };

    default:
      return state;
  }
};
export default products;
