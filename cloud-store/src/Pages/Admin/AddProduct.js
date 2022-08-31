import React, { useState, useEffect, useContext, useCallback } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Example() {
  const [image, setImage] = React.useState();
  const dispatch = useDispatch();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const notify = () => {
    toast.success("Product Created Successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const createUser = useCallback(async (body) => {
    try {
      const formData = new FormData();
      formData.append("name", body.name);
      formData.append("price", body.price);
      formData.append("qty", body.qty);
      formData.append("description", body.description);
      formData.append("category", body.category);
      formData.append("img", body.img);

      const fetched = await fetch(`/product/add`, {
        method: "POST",
        body: formData,
      });
      const data = await fetched.json();
      dispatch({ type: "ALL_PRODUCTS", payload: { products: data } });
      notify();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleCreate = (values, { resetForm }) => {
    console.log(values);
    createUser(values);

    resetForm({});
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>
        </div>
      </header>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5"></div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 ">
            <div className="px-4 sm:px-0">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                <div className="mt-1 md:ml-4 flex justify-center items-center  pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {image ? (
                    <img
                      src={image}
                      alt="avatar"
                      className=" w-full h-auto rounded-2xl"
                    />
                  ) : (
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            {/*  */}
            <Formik
              enableReinitialize
              initialValues={{
                name: "",
                img: "",
                price: "",
                qty: "",
                category: "",
                description: "",
              }}
              onSubmit={handleCreate}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit} className="row align-center">
                  {/* <form action="https://hackaton-final.herokuapp.com/product/add" method="POST"  encType="multipart/form-data" id="category"> */}
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Product Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            autoComplete="given-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Product Image
                          </label>
                          <input
                            type="file"
                            name="img"
                            id="img"
                            // onChange={(e) => onImageChange(e)}
                            onChange={(event) => [
                              setFieldValue(
                                "img",
                                event.currentTarget.files[0]
                              ),
                              onImageChange(event),
                            ]}
                            autoComplete="given-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="last-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Price
                            </label>
                            <input
                              type="number"
                              name="price"
                              id="price"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.price}
                              autoComplete="price"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              required
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Stock
                            </label>
                            <input
                              type="text"
                              name="qty"
                              id="qty"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.qty}
                              autoComplete="qty"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Category
                            </label>
                            <select
                              id="category"
                              name="category"
                              form="category"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.category}
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option>Select Category</option>
                              <option className="pt-2" value="men">
                                Mens
                              </option>
                              <option value="women">Women</option>
                              <option value="kids">Kids</option>
                              <option value="watch">Watch</option>
                              <option value="bags">Bags</option>
                              <option value="accessories">Accessories</option>
                            </select>
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Product Description
                            </label>
                            <textarea
                              name="description"
                              id="description"
                              rows="4"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Leave a comment..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}
