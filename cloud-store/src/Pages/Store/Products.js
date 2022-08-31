import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import {
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { getProduct } from "../../Axios/Requests/Product";
import { subCategories, filters } from "../../assets/constants";
import { useSelector } from "react-redux";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.users.allProducts);

  const [obj, setObj] = useState({
    productss: products,
    categories: {
      men: false,
      women: false,
      bags: false,
      watch: false,
      kids: false,
      accessories: false,
    },
  });

  const ProductDetails = (data) => {
    navigate(`/product/view/${data.name}`, { state: data });
  };
  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  const handleChange = (e) => {
    const { name } = e.target;

    setObj({
      ...obj,
      categories: {
        ...obj.categories,
        [name]: !obj.categories[name],
      },
    });
  };
  const [filterProducts, setFilterProducts] = useState(products);
  const [newFil, setNewFil] = useState([]);
  useEffect(() => {
    const objchanged = Object.entries(obj.categories);
    const checkedProducts = objchanged
      .filter((category) => category[1])
      .map((category) => category[0]);

    const newFilter = products.filter(({ category }) =>
      checkedProducts.includes(category)
    );
    setNewFil(newFilter);
    const allFilteredData = newFilter.length === 0 ? products : newFilter;

    setFilterProducts(allFilteredData);
  }, [obj]);

  return (
    <div>
      <div className="bg-white">
        <div>
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 flex z-40">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                    <div className="px-4 flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul
                        role="list"
                        className="font-medium text-gray-900 px-2 py-3 transition "
                      >
                        {subCategories?.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className="block px-2 py-3">
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>

                      {filters?.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusSmIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusSmIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              {/* \\----\\ Mobile View //----//*/}
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  <div className="flex items-center">
                                    <input
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      type="checkbox"
                                      name="men"
                                      checked={obj.categories.men}
                                      onChange={(e) => handleChange(e)}
                                    />
                                    <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                      {" "}
                                      Men{" "}
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      name="women"
                                      checked={obj.categories.women}
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      onChange={(e) => handleChange(e)}
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                      Women{" "}
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={obj.categories.kids}
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      name="kids"
                                      onChange={(e) => handleChange(e)}
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                      Kids{" "}
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      name="accessories"
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      checked={obj.categories.accessories}
                                      onChange={(e) => handleChange(e)}
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                      Accessories{" "}
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      name="bags"
                                      type="checkbox"
                                      checked={obj.categories.bags}
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      onChange={(e) => handleChange(e)}
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                      Bags{" "}
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={obj.categories.watch}
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      name="watch"
                                      onChange={(e) => handleChange(e)}
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                      Watch{" "}
                                    </label>
                                  </div>
                                  {/* ))} */}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                New Arrivals
              </h1>

              <div className="flex items-center">
                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200"
                  >
                    {subCategories?.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul>

                  {filters?.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          {/* ======= WebSite View =======*/}
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <input
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  type="checkbox"
                                  name="men"
                                  checked={obj.categories.men}
                                  onChange={(e) => handleChange(e)}
                                />
                                <label className="ml-3 text-sm text-gray-600">
                                  {" "}
                                  Men{" "}
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="women"
                                  checked={obj.categories.women}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) => handleChange(e)}
                                />
                                <label className="ml-3 text-sm text-gray-600">
                                  Women{" "}
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={obj.categories.kids}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  name="kids"
                                  onChange={(e) => handleChange(e)}
                                />
                                <label className="ml-3 text-sm text-gray-600">
                                  Kids{" "}
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="accessories"
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  checked={obj.categories.accessories}
                                  onChange={(e) => handleChange(e)}
                                />
                                <label className="ml-3 text-sm text-gray-600">
                                  Accessories{" "}
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  name="bags"
                                  type="checkbox"
                                  checked={obj.categories.bags}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) => handleChange(e)}
                                />
                                <label className="ml-3 text-sm text-gray-600">
                                  Bags{" "}
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={obj.categories.watch}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  name="watch"
                                  onChange={(e) => handleChange(e)}
                                />
                                <label className="ml-3 text-sm text-gray-600">
                                  Watch{" "}
                                </label>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Replace with your content */}
                  <div className=" h-96 lg:h-full">
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {newFil.length === 0
                        ? products?.map((product, index) => (
                            <div
                              onClick={() => ProductDetails(product)}
                              key={index}
                              className="group relative border rounded p-4 hover:shadow-lg hover:scale-105 cursor-pointer transition"
                            >
                              <div className="w-full min-h-[10rem] max-h-[12rem] bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden  lg:h-80 lg:aspect-none">
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
                          ))
                        : filterProducts?.map((product, index) => (
                            <div
                              onClick={() => ProductDetails(product)}
                              key={index}
                              className="group relative border rounded p-4 hover:shadow-lg hover:scale-105 cursor-pointer transition"
                            >
                              <div className="w-full min-h-[10rem] max-h-[12rem] bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden  lg:h-80 lg:aspect-none">
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
                          ))}
                    </div>
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
