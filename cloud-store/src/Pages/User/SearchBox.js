import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../Axios/Requests/Product";

export default function SearchBox() {
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [search, setSearch] = useState([]);
  const hideModel = () => {
    dispatch({
      type: "SEARCH_BOX",
      payload: { searchAlert: false, products: {} },
    });
  };

  useEffect(() => {
    getProduct().then((res) => {
      dispatch({
        type: "SEARCH_BOX",
        payload: { products: res.data, searchAlert: false },
      });
    });
  }, []);
  // filter search data from products array
  const searchData = (value) => {
    const search = alert.allProducts.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    setSearch(search);
    dispatch({
      type: "SEARCH_BOX",
      payload: { searchAlert: true, products: search },
    });
  };
  const ProductDetails = (data) => {
    navigate(`/product/view/${data.name}`, { state: data });
    dispatch({
      type: "SEARCH_BOX",
      payload: { searchAlert: false, products: search },
    });
  };
  return (
    <>
      <Transition.Root show={alert.searchBox} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => hideModel()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative  bg-[#f7f7f7] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full">
                  <div className="bg-[#ffffff] px-4   ">
                    <div class="flex items-center border-b  py-3  justify-center mr-4 w-full ">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full text-[#999] sm:mx-0 sm:h-10 sm:w-10">
                        <SearchIcon
                          className="h-6 w-6 text-[#333]"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        placeholder="Search"
                        onChange={(e) => searchData(e.target.value)}
                        className="border-none outline-none w-full p-3  focus:border-none focus:outline-none active:outline-none"
                      />
                    </div>
                    <p>
                      {search?.map((product, index) => (
                        <>
                          {console.log(product)}
                          <div
                            onClick={() => ProductDetails(product)}
                            key={product.name}
                            href={product.href}
                            className=" p-3 border shadow cursor-pointer m-1  flex items-center justify-between rounded-lg hover:bg-gray-50"
                          >
                            <div>
                              <img
                                src={
                                  `https://hackaton-final.herokuapp.com/` +
                                  product.img
                                }
                                width={50}
                                height={50}
                                alt="image"
                              />
                            </div>
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                {product.name}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.category}
                              </p>
                            </div>
                            <div>{product.price}</div>
                          </div>

                          {/* <p className=" text-center items-center">No recent searches</p> */}

                          {/* <div onClick={() => ProductDetails(product)} className="flex items-center border-b  py-3  justify-center mr-4 w-full ">
                          
                            <p className="text-center">{product.name}</p>
                          </div> */}
                        </>
                      ))}
                    </p>
                    <div className="h-[300px]"></div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
