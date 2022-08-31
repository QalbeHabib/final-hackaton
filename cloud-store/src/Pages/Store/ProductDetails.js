import { StarIcon, MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { addCart } from "../../Axios/Requests/Cart";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../Axios/Requests/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const reviews = { href: "#", average: 4, totalCount: 117 };
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const { state } = useLocation();
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [errorStock, setErrorStock] = useState("");
  const [data, setData] = useState({});
  const user = useSelector((state) => state.users);
  const isLogin = user.isLoggedIn;
  const dispatch = useDispatch();

  const notify = () => {
    // Calling toast method by passing string
    toast.success("Cart Updated", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const AddToCart = (value) => {
    addCart(value, user, qty)
      .then((res) => {
        dispatch({
          type: "CART_DRAWER",
          payload: { drawer: user.cartDrawer, cartData: res.data },
        });
        setErrorStock("");
        setQty(1);
        notify();
      })
      .catch((err) => {
        setErrorStock(err.response);
      });
  };
  useEffect(() => {
    getProductById(state._id)
      .then((res) => {
        const newQty = user.cartData?.products?.find(
          (item) => item.product._id == state._id
        );
        const obj = {
          ...res.data,
          qty: newQty?.qty >= 1 ? res.data.qty - newQty?.qty : res.data.qty,
        };
        setData(obj);
        console.log("Cart", user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [qty, error, errorStock]);

  // increment and decrement qty
  const handleQty = (e) => {
    if (data.qty != 0) {
      if (e === "+1") {
        if (data.qty > qty) {
          setQty(qty + 1);
          setError("");
        }
      } else if (e === "-1") {
        if (qty > 1) {
          setQty(qty - 1);
        }
      }

      if (e === "-1") {
        setError("");
      } else if (qty >= data.qty) {
        setError("Out of Stock");
      }
    } else {
      setQty(0);
      setError("No Products Available in Stock");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {/* {product.breadcrumbs.map((breadcrumb) => ( */}
              <li></li>
              <li className="text-sm">
                <a
                  href={"#"}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {data.category}
                </a>
              </li>
              <div className="flex items-center">
                <a
                  href={"#"}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  {/* {breadcrumb.name} */}
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-5 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
              <li className="text-sm">
                <a
                  href={"#"}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {data.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={`https://hackaton-final.herokuapp.com/${data.img}`}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {data.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">$ {data.price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-row border border-slate-400 w-fit rounded-lg p-2 mt-4">
                <button className="p-1 px-2">
                  <MinusIcon
                    onClick={() => handleQty("-1")}
                    className={
                      "text-gray-900 h-5 w-5 flex-shrink-0 active:text-slate-500"
                    }
                    aria-hidden="true"
                  />
                </button>
                <p> {qty} </p>
                <button className="p-1 px-2">
                  <PlusIcon
                    onClick={() => handleQty("+1")}
                    className={
                      "text-gray-900 h-5 w-5 flex-shrink-0 active:text-slate-500"
                    }
                    aria-hidden="true"
                  />
                </button>
              </div>
              {error}

              <button
                onClick={() => AddToCart(data)}
                type="submit"
                disabled={!isLogin ? true : data.qty == 0 ? true : false}
                className={`mt-10 w-full ${
                  data.qty == 0
                    ? "bg-red-600 hover:bg-red-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {!isLogin
                  ? "Login Required"
                  : data.qty == 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
            </div>

            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{data.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <ToastContainer />
    </div>
  );
}
