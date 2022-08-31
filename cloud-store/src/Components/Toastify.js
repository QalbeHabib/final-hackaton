import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Toastify = (props) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      Message Send Successfully
      <ToastContainer />{" "}
    </>
  );
};

export default Toastify;
