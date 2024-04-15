import { SnackbarProvider } from "notistack";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { hydrate, render } from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "react-router-scroll-top";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { categoryApiPr, dataLoginApiPr } from "./api/private";
import { categoryApi, productApi } from "./api/public";
import "./App.scss";
import {
  OFF_SPINNERS,
  ON_SPINNERS,
  PRIVATE_CART_LOADING,
  PRODUCT_GET_ALL,
  PRODUCT_GET_CATEGORY,
  USER,
  USER_INFO,
} from "./app/_constants/ActionType";
import NotFoundPage from "./app/_pages/custommer-page/Not_Found_Page/NotFoundPage";
import appReducer from "./app/_reducers/index";
import { HeaderCustomer, HeaderSeller } from "./app/components/common/header";
import { Spinner } from "./app/components/common/Spinners";
import { DetailCustomer, HomeCustomer } from "./app/views/customer";
import "./scss/main.scss";
import "./styles/cart.css";
import "./styles/comment.css";
import "./styles/Dashboard.scss";
import "./styles/form.css";
import "./styles/header.css";
import "./styles/Home.css";
import "./styles/resize.css";
import "./styles/resizeButton.css";
import "./styles/responsive.css";
import "./styles/slick.css";
import "./styles/Spinners.css";
import { list_categories } from "./v2/data";
import { HomeSeller } from "./v2/views/seller";

//import './app/'

const Header = lazy(() => import("./app/components/common/header/HeaderHome"));

const FooterHome = lazy(() =>
  import("./app/components/common/footer/FooterHome")
);
// seller - admin

const SellerHome = lazy(() => import("./app/components/_seller/HomeSeller"));
const ProductDetail = lazy(() =>
  import("./app/components/_seller/body/product-detail/ProductDetail")
);
const ProductDetail2 = lazy(() =>
  import("./app/components/_custommer/body/product-detail/ProductDetail")
);

const About = lazy(() => import("./app/_pages/supports/abouts/Abouts"));
const Guide = lazy(() => import("./app/_pages/supports/guide/Guide"));
const Checkout = lazy(() =>
  import("./app/components/_seller/body/checkout/Checkout")
);
const Checkout2 = lazy(() =>
  import("./app/components/_seller/body/checkout/Checkout2")
);
const Contact = lazy(() => import("./app/_pages/supports/contacts/Contact"));

const Sidebar = lazy(() => import("./app/components/admin/_slidebar/Sidebar"));

// import wrapper
const Users = lazy(() => import("./app/components/admin/pages/Users/Users"));
const WhishList = lazy(() =>
  import("./app/components/admin/pages/Users/WhishList")
);
const WishList = lazy(() => import("./app/components/_seller/body/wishList"));
const EditBank = lazy(() =>
  import("./app/components/admin/pages/Users/page/editBank/EditBank")
);
const ChangePassword = lazy(() =>
  import("./app/components/admin/pages/Users/ChangePassword")
);
const Address = lazy(() =>
  import("./app/components/admin/pages/Users/InformationAddress")
);
const Sale = lazy(() => import("./app/components/admin/pages/Sale/Sale"));

const Analysis = lazy(() =>
  import("./app/components/admin/pages/analysis/Analysis")
);
const AnalysisBank = lazy(() =>
  import("./app/components/admin/pages/analysis/AnalysisBank")
);
const Custommer = lazy(() =>
  import("./app/components/admin/pages/customer/Custommer")
);

const Banking = lazy(() =>
  import("./app/components/admin/pages/Banking/Banking")
);

// custommer

const CustomerHome = lazy(() =>
  import("./app/components/_custommer/HomeCustomer")
);

const ForgotSeller = lazy(() => import("./app/components/login/Forgot"));

const RegisterStepSeller = lazy(() =>
  import("./app/components/register/register-step/RegisterStep")
);

const Connect = lazy(() => import("./app/_pages/connect/Connect"));
const ConnectFB = lazy(() => import("./app/_pages/connect/ConnectFB"));
const Login = lazy(() => import("./app/components/login/Login"));

// COMMON
const CommonSearch = lazy(() =>
  import("./app/components/common/body/page-search/search/Search")
);
const CartEmpty = lazy(() =>
  import("./app/components/_custommer/body/cart/Cart")
);
const CartNew = lazy(() => import("./app/components/_seller/body/cart/Cart"));
const CreatePage = lazy(() =>
  import("./app/components/_seller/body/createPage/CreatePage")
);
const Checking = lazy(() =>
  import("./app/components/_seller/body/createPage/Checking")
);

const FormSaleTogether = lazy(() =>
  import("./app/_pages/supports/saleTogether/FormSaleTogether")
);
const SaleTogether = lazy(() =>
  import("./app/_pages/supports/saleTogether/SaleTogether")
);
const Policy = lazy(() => import("./app/_pages/supports/policy/Policy"));
const Abouts = lazy(() => import("./app/_pages/supports/abouts/Abouts"));
const Regulations = lazy(() =>
  import("./app/_pages/supports/regulations/Regulations")
);

// huong dan dat hang
const Tutorial = lazy(() => import("./app/_pages/supports/_tutorial/Index"));
const Reports = lazy(() => import("./app/_pages/supports/_reports/Index"));
const Question = lazy(() => import("./app/_pages/supports/_question/Index"));
const Shipping = lazy(() => import("./app/_pages/supports/_shipping/Index"));
const Regulation = lazy(() =>
  import("./app/_pages/supports/_regulations/Index")
);
const Policys = lazy(() => import("./app/_pages/supports/_policy/Index"));
const PolicysBH = lazy(() => import("./app/_pages/supports/_policy/IndexBH"));

// View

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancer(applyMiddleware(thunk)));

function App() {
  const notistackRef = useRef();
  const dispatch = useDispatch();
  const { user, isSpinners } = useSelector((state) => state.FetchAllProduct);
  const [token, setToken] = useState(() => {
    let isToken = localStorage.getItem("tokenSeller") ?? null;
    return isToken;
  });

  const [idCart, setIdCart] = useState(() => {
    let cart = localStorage.getItem("idCartSeller") ?? null;
    return cart;
  });

  const [isUser, setIsUser] = useState(() => {
    let token = localStorage.getItem("tokenSeller") ?? null;
    let cart = localStorage.getItem("idCartSeller") ?? null;
    let idUser = localStorage.getItem("idUserSeller") ?? null;
    return { token, cart, idUser };
  });

  const [add, setAdd] = useState(false);
  const collapseSidebar = (toggle) => {
    setAdd(toggle);
  };

  useEffect(() => {
    dispatch({ type: ON_SPINNERS });
    if (isUser.token !== null) {
      try {
        dispatch({ type: USER, user: isUser });
      } catch (error) {
        dispatch({ type: OFF_SPINNERS });
      }
    }
    if (token && token.length > 0) {
      const FetchPages = async () => {
        try {
          const info = await dataLoginApiPr.getDataLogin(token);
          dispatch({ type: USER_INFO, info });

          const cart = await dataLoginApiPr.getDataCart(
            user?.cart ?? idCart,
            token
          );
          dispatch({ type: PRIVATE_CART_LOADING, cart });

          const resCategory = await categoryApiPr.getAll();
          dispatch({ type: PRODUCT_GET_CATEGORY, payload: resCategory });

          dispatch({ type: OFF_SPINNERS });
        } catch (error) {
          dispatch({ type: OFF_SPINNERS });
        }
      };
      FetchPages();
      //  dispatch({ type: OFF_SPINNERS });
    } else {
      const fetchPage = async () => {
        try {
          const res_categories = await categoryApi.getAll();
          const is_res_categories = res_categories.length > 0 ? res_categories : list_categories
          dispatch({ type: PRODUCT_GET_CATEGORY, payload: is_res_categories});
          
          const response = await productApi.getAll(1000, 1);
          dispatch({ type: PRODUCT_GET_ALL, payload: response });
          dispatch({ type: OFF_SPINNERS });
        } catch (error) {
          dispatch({ type: OFF_SPINNERS });
        }
      };

      fetchPage();
    }
  }, [token]);

  return (
    <BrowserRouter basename="/">
      <ScrollToTop>
        <Suspense fallback={<Spinner />}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            ref={notistackRef}
            action={(key) => (
              <span
                onClick={() => notistackRef.current.closeSnackbar(key)}
                style={{
                  padding: "0 6px",
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✖
              </span>
            )}
          >
            {token ? (
              <HeaderSeller token={token} setToken={setToken} />
            ) : (
              <HeaderCustomer token={token} setToken={setToken} />
            )}
            {isSpinners && <Spinner />}
            <div className="newee-wrapper mg-85 mg-105">
              <Switch>
                <Route path={"/connect/:token/:cart/:idUser"} exact>
                  <Connect
                    setToken={setToken}
                    setIdCart={setIdCart}
                    setIsUser={setIsUser}
                  />
                </Route>

                <Route path={"/login-av234"} exact>
                  <Login setToken={setToken} />
                </Route>
                {/*<Route path={'/forgot'} exact component={ForgotSeller} />*/}
                {/*<Route path={'/register'} component={RegisterStepSeller} />*/}

                <Route path={"/supports/about"} exact component={Abouts} />
                <Route path={"/supports/policy"} exact component={Policy} />
                <Route
                  path={"/supports/ban-hang-cung-newee"}
                  exact
                  component={SaleTogether}
                />
                <Route
                  path={"/supports/ban-hang-cung-newee/dang-ky"}
                  component={FormSaleTogether}
                />
                <Route path={"/supports/tutorial"} exact component={Tutorial} />
                <Route path={"/supports/report"} exact component={Reports} />
                <Route path={"/supports/question"} exact component={Question} />
                <Route path={"/supports/shipping"} exact component={Shipping} />
                <Route
                  path={"/supports/regulation"}
                  exact
                  component={Regulation}
                />
                <Route path={"/supports/policys"} exact component={Policys} />
                <Route
                  path={"/supports/quaranty-policy"}
                  exact
                  component={PolicysBH}
                />

                {token && (
                  <Switch>
                    <Route path={"/create-page"} exact component={CreatePage} />
                    <Route path={"/checking"} exact component={Checking} />
                    <Route
                      path={"/search/:slug.:idCategory"}
                      exact
                      component={CommonSearch}
                    />
                    <Route path={"/search"} exact component={CommonSearch} />
                    <Route path={"/cart"} exact component={CartNew} />
                    <Route path={"/wish-list"} exact component={WishList} />
                    <Route
                      path={"/product-detail/:slug.:id"}
                      exact
                      component={ProductDetail}
                    />
                    <Route path={"/gioi-thieu-newee"} component={About} />
                    <Route path={"/guide"} component={Guide} />
                    <Route path={"/checkout"} component={Checkout} />
                    <Route path={"/checkout2"} component={Checkout2} />
                    <Route path={"/contact"} component={Contact} />
                    <Route path={"/loginFB"} exact component={ConnectFB} />
                    <Route path={"/"} exact component={HomeSeller} />

                    <Switch>
                      <div
                        id="a-seller-wrapper v0404-02022"
                        className={
                          add
                            ? "a-seller-wrapper sidebar-expand"
                            : "a-seller-wrapper"
                        }
                      >
                        <Sidebar collapseSidebar={collapseSidebar}></Sidebar>
                        <div className="wrapper">
                          <Switch>
                            <Route path={"/admin"} exact component={Users} />
                            <Route path={"/admin/users"} component={Users} />

                            <Route
                              path={"/admin/sale"}
                              exact
                              component={Sale}
                            />
                            <Route
                              path={"/admin/users/editBank"}
                              component={EditBank}
                            />
                            <Route
                              path={"/admin/users/change"}
                              component={ChangePassword}
                            />
                            <Route
                              path={"/admin/users/address"}
                              component={Address}
                            />
                            <Route
                              path={"/admin/analysis"}
                              component={Analysis}
                            />
                            <Route
                              path={"/admin/analysis-bank"}
                              component={AnalysisBank}
                            />
                            <Route
                              path={"/admin/banking"}
                              component={Banking}
                            />
                            <Route
                              path={"/admin/custommer"}
                              component={Custommer}
                            />
                          </Switch>
                        </div>
                      </div>
                    </Switch>
                    <Route path="*" component={NotFoundPage} />
                  </Switch>
                )}
                <Switch>
                  <Route path={"/"} exact component={HomeCustomer} />
                  <Route
                    path={"/product-detail/:slug.:id"}
                    exact
                    component={DetailCustomer}
                  />
                  <Route
                    path={"/search/:slug.:idCategory"}
                    exact
                    component={CommonSearch}
                  />
                  <Route path={"/search"} exact component={CommonSearch} />
                  <Route path={"/cart"} exact component={CartEmpty} />
                  <Route path={"/gioi-thieu-newee"} component={About} />
                  <Route path={"/guide"} component={Guide} />
                  <Route path={"/checkout"} component={Checkout} />
                  <Route path={"/contact"} component={Contact} />
                  <Route path={"/loginFB"} exact component={ConnectFB} />
                  <Route path="*" component={NotFoundPage} />
                </Switch>
              </Switch>
            </div>

            <FooterHome></FooterHome>
          </SnackbarProvider>
        </Suspense>
      </ScrollToTop>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}
