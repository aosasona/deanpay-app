import React from "react";

const PayError = ({ text }) => {
  return (
    <>
      <div className="w-full lg:w-3/5 mx-auto bg-red-100 text-red-600 py-4 px-3 text-xs lg:text-sm font-light rounded-lg text-center my-5">
        {text}
      </div>
    </>
  );
};

export default PayError;
