import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import { deleteCart } from "../../Axios/Requests/Cart";
import { Formik, Form } from "formik";
import { checkoutSchema } from "../../Components/Validation/CheckoutSchema";
import { CheckoutInitialValues } from "../../assets/constants";
import { checkoutQty, getCart } from "./../../Axios/Requests/Cart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export default function Checkout() {
  const userObj = useSelector((state) => state.users.cartData);
  const user_id = useSelector((state) => state.users.userObj._id);
  const allProducts = useSelector((state) => state.users.allProducts);
  const [clientSecret, setClientSecret] = useState("");
  const [cartProducts, setCartProducts] = useState(
    // check if array is empty
    userObj.length > 0 ? userObj.products : []
  );
  const stripePromise = loadStripe(
    "pk_test_51LN9rySFCbq4hsXBa0sF6HRMsolKvgBOxS2zzi5eydLXriFuMM8naadDZwwZGm2N2sk6goohJOXrsRudcJ2NiFM200vO9doYx0"
  );
  const dispatch = useDispatch();
  const inputValues =
    "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md";

  const updatedQuantity = (id, qty) => {
    // filter product with id in all product
    const product = allProducts.find(
      (product) => product._id === id.product._id
    );
    if (product.qty != 0 && product.qty !== id.qty && product.qty >= id.qty) {
      checkoutQty(id, user_id, qty)
        .then((res) => {
          setCartProducts(res.data.products);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } else if (product.qty !== 0 && qty === -1) {
      checkoutQty(id, user_id, qty)
        .then((res) => {
          setCartProducts(res.data.products);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } else {
      alert("Helo");
    }
  };

  useEffect(() => {
    getCart(user_id)
      .then((res) => {
        setCartProducts(res.data.products);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [user_id]);

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

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  const removeProduct = (id) => {
    deleteCart(id, user_id)
      .then((res) => {
        setCartProducts(res.data.products);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  return (
    <>
      <Formik
        validationSchema={checkoutSchema}
        initialValues={CheckoutInitialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
              <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="shadow overflow-hidden sm:rounded-md ">
                      <div className="px-4 py-5 bg-white sm:p-6 max-w-xl mx-auto">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-6">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <input
                              type="text"
                              name="email-address"
                              placeholder="Enter your email"
                              id="email-address"
                              autoComplete="email"
                              className={inputValues}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-6">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Name On Card
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              className={inputValues}
                            />
                          </div>
                        </div>
                        {clientSecret && (
                          <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                          </Elements>
                        )}
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            onClick={handleSubmit}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Products
                      </h3>
                      <div className="mt-8">
                        <div className="flow-root max-h-60">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {/* {cartProducts.map((product,index) => (
                            <li key={index} className="px-6 py-4">
                              {product.product.name}
                              </li>
                          ))} */}
                            {cartProducts?.map((product, index) => (
                              <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={`https://hackaton-final.herokuapp.com/${product.product.img}`}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#"> {product.product.name} </a>
                                      </h3>
                                      <XIcon
                                        onClick={() =>
                                          removeProduct(product._id)
                                        }
                                        className="block h-6 w-6 hover:text-red-500 cursor-pointer"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <a href="#"> ${product.product.price} </a>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty</p>

                                    <div className="flex ">
                                      <button
                                        onClick={() =>
                                          updatedQuantity(product, -1)
                                        }
                                        type="button"
                                        className="font-medium px-2.5 border -mb-3 rounded-lg p-2 bg-white hover:bg-[#cfcfcf]"
                                      >
                                        -
                                      </button>
                                      <p className="pt-2 px-3">{product.qty}</p>
                                      <button
                                        onClick={() =>
                                          updatedQuantity(product, 1)
                                        }
                                        type="button"
                                        className="font-medium border px-2 -mb-3 rounded-lg p-2 bg-white hover:bg-[#cfcfcf]"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

// import React, { useState, useEffect } from "react";

// import CheckoutForm from "./CheckoutForm";
// import "./App.css";

// export default function App() {
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);

//   const appearance = {
//     theme: 'stripe',
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div className="App">
//
//     </div>
//   );
// }
