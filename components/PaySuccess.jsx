import React from "react";

const PaySuccess = ({ text }) => {
  return (
    <>
      <div className="w-full lg:w-3/5 mx-auto bg-green-100 text-green-600 py-4 px-3 text-xs lg:text-sm font-light rounded-lg text-center my-5">
        {text}
      </div>
    </>
  );
};

export default PaySuccess;
