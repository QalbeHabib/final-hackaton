import React, { useEffect, useState } from "react";
import { Routes as Path } from "./Pages/Store/index";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { getCart } from "./Axios/Requests/Cart";
import { getProduct } from "./Axios/Requests/Product";
import PrivateRoute from "./Components/PrivateRoute";
import AdminRoute from "./Components/AdminRoute";
const App = () => {
  const [header, setHeader] = useState();
  const [footer, setFooter] = useState();
  const location = useLocation();
  const path = location.pathname;
  const cart = useSelector((state) => state.users.cartDrawer);
  const id = useSelector((state) => state.users.userObj._id);
  const data = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    if (
      path.includes("lo") ||
      path.includes("UserSignup") ||
      path.includes("dmin")
    ) {
      setHeader(<div />);
      setFooter(<div />);
    } else {
      setHeader(<Path.MainHeader />);
      setFooter(<Path.Footer />);
    }
  }, [path]);

  // Getting User Value
  useEffect(() => {
    axios
      .get("https://hackaton-final.herokuapp.com/user/authenticate", {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        dispatch({
          type: "SET_CURRENT_USER",
          payload: {
            login_state: true,
            user: res.data,
            role: res.data.role == "user" ? false : true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Getting Cart Value
  useEffect(() => {
    if (id) {
      getCart(id).then((res) => {
        dispatch({
          type: "CART_DRAWER",
          payload: { drawer: cart, cartData: res.data },
        });
      });
    }
  }, [cart, id]);

  // Getting Product Value
  useEffect(() => {
    getProduct().then((res) => {
      dispatch({ type: "ALL_PRODUCTS", payload: { products: res.data } });
    });
  }, []);

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <>
      {header}
      <Routes>
        <Route exact path="/privacy" element={<Path.PrivacyPolicy />} />
        <Route exact path="/termscondition" element={<Path.TermsCondition />} />
        <Route exact path="/admin" element={<Path.Dashboard />} />
        <Route exact path="/header" element={<Path.MainHeader />} />
        <Route exact path="/products" element={<Path.Products />} />
        <Route
          exact
          path="/product/view/:id"
          element={<Path.ProductDetails />}
        />
        <Route exact path="/logoutalert" element={<Path.Logout />} />
        <Route exact path="/login" element={<Path.UserLogin />} />
        <Route exact path="/adminsignup" element={<Path.AdminSignup />} />
        <Route exact path="/UserSignup" element={<Path.UserSignup />} />
        <Route exact path="/" element={<Path.Home />} />
        <Route
          exact
          path="/addtocart"
          element={
            <PrivateRoute>
              <Path.AddToCart />
            </PrivateRoute>
          }
        />
        <Route exact path="/faq" element={<Path.FAQ />} />
        <Route exact path="/footer" element={<Path.Footer />} />
        <Route exact path="/favourite" element={<Path.Favourite />} />
        <Route exact path="/checkout" element={<Path.Checkout />} />
        <Route exact path="/contactUs" element={<Path.ContactUs />} />
        <Route exact path="/categories/:id" element={<Path.Categories />} />
        <Route exact path="/loader" element={<Path.Loader />} />
        <Route path="*" element={<Path.Error404 />} />
      </Routes>

      <Path.Logout />
      <Path.CheckoutDrawer />
      <Path.SearchBox />
      <Path.DeleteProduct />
      {footer}
    </>
  );
};
export default App;
