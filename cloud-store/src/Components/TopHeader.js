/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
  { name: "Admin", href: "/admin" },
];
const userNavigate = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TopHeader() {
  const isLoggenIn = useSelector((state) => state.users.userObj.role);
  const cartData = useSelector((state) => state.users.cartData);
  const cartuser = useSelector((state) => state.users);
  // const newCartData = cartuser.cartData.filter(item => item.userId === cartuser.userObj._id)
  const newProducts = cartData.products ? cartData.products : [];
  const dispatch = useDispatch();
  const [userState, setUserState] = React.useState(userNavigate);
  useEffect(() => {
    if (isLoggenIn == "admin") {
      setUserState(userNavigation);
    } else {
      setUserState(userNavigate);
    }
  }, [isLoggenIn]);

  const logoutbtn = (value) => {
    if (value == 1) {
      dispatch({ type: "LOG_OUT", payload: { alert: true } });
    }
  };
  const cart = () => {
    dispatch({
      type: "CART_DRAWER",
      payload: { drawer: true, cartData: cartData },
    });
  };

  return (
    <Popover className="relative bg-white">
      <div className="bg-indigo-600 p-1">
        <div className=" max-w-[1300px] mx-auto h-10 flex items-center  px-4 sm:px-6 lg:px-8 justify-between">
          <p className=" text-sm font-medium text-white ">
            Get free delivery on orders over $100
          </p>

          <Menu as="div" className="ml-3 relative flex">
            <button
              onClick={() => cart()}
              type="button"
              className=" bg-transparent p-1 mr-2 rounded-full text-white focus:outline-none hover:text-slate-400 relative flex justify-center items-center"
            >
              <div className="    absolute -top-1 -right-1 text-sm">
                {newProducts.length == 0 ? "" : newProducts.length}
              </div>
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div>
              <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.imageUrl}
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-8 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                {userState?.map((item, index) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link to={`${item?.href}`}>
                        <a
                          onClick={() => logoutbtn(index)}
                          // href={item?.href}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {item?.name}
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </Popover>
  );
}
