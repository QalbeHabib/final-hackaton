import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewProduct = () => {
  const [products, setProducts] = React.useState([]);
  const allProducts = useSelector((state) => state.users.allProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);
  const DeleteProduct = (id) => {
    dispatch({ type: "DELETE_PRODUCT", payload: { alert: true, id: id } });
  };
  return (
    <div>
      <div>
        <div className="flex flex-wrap justify-center">
          <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products?.map((product, index) => (
                  <>
                    <div
                      key={index}
                      className="  relative border rounded p-4 hover:shadow-lg transition"
                    >
                      <div
                        onClick={() => DeleteProduct(product._id)}
                        className="w-10 h-10 p-2 z-10 cursor-pointer border group shadow bg-white absolute hover:bg-red-500 -top-4 -right-5 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 group text-gray-500 group-hover:text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <div className="w-full min-h-72 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden  lg:h-80 lg:aspect-none">
                        <img
                          src={`https://hackaton-final.herokuapp.com/${product.img}`}
                          alt={"hello"}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.name}
                            </a>
                          </h3>
                          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
