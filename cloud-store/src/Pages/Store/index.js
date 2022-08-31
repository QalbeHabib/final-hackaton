import HomePage from "./HomePage";
import AddToCart from "./AddToCart";
import Error404 from "./Error404";
import FAQ from "./FAQ";
import ContactUs from "./ContactUs";
import MainHeader from "../../Components/MainHeader";
import UserSignup from "../Auth/UserSignup";
import AdminSignup from "../Auth/AdminSignup";
import UserLogin from "../Auth/UserLogin";
import Favourite from "./Favourite";
import Categories from "./Categories";
import Dashboard from "../Admin/Dashboard";
import Products from "./Products";
import CheckoutDrawer from "../User/CheckoutDrawer";
import ProductDetails from "./ProductDetails";
import PrivacyPolicy from "./FooterPages/PrivacyPolicy";
import { Footer } from "../../Components/Footer";
import TermsCondition from "./FooterPages/TermsCondition";
import Logout from "../User/Logout";
import SearchBox from "../User/SearchBox";
import Loader from "../../Components/Loader";
import ViewProduct from "../Admin/ViewProduct";
import Checkout from "./Checkout";
import DeleteProduct from "../Admin/DeleteProduct";
import AdminRoute from "../../Components/AdminRoute";
import PrivateRoute from "../../Components/PrivateRoute";
export const Routes = {
  Home: HomePage,
  AddToCart: AddToCart,
  Error404: Error404,
  FAQ: FAQ,
  Footer: Footer,
  ContactUs: ContactUs,
  MainHeader: MainHeader,
  UserSignup: UserSignup,
  Favourite: Favourite,
  Categories: Categories,
  Dashboard: Dashboard,
  Products: Products,
  CheckoutDrawer: CheckoutDrawer,
  ProductDetails: ProductDetails,
  PrivacyPolicy: PrivacyPolicy,
  TermsCondition: TermsCondition,
  Logout: Logout,
  AdminSignup: AdminSignup,
  UserLogin: UserLogin,
  SearchBox: SearchBox,
  AdminRoute: Dashboard,
  Loader: Loader,
  ViewProduct: ViewProduct,
  Checkout: Checkout,
  DeleteProduct: DeleteProduct,
};
