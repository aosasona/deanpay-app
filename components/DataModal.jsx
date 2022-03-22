const numeral = require("numeral");
const DataModal = ({
  phone,
  plan,
  passwordHandler,
  changeConfirm,
  makePurchase,
  isDisabled,
}) => {
  return (
    <>
      <div
        className="w-screen h-full absolute top-0 z-1 bg-zinc-900 opacity-50"
        onClick={changeConfirm}
      ></div>
      <div className="w-full absolute bottom-0 z-2">
        <div className="confirmModal relative w-full lg:w-3/5 xl:w-2/5 mx-auto flex flex-col items-center rounded-t-[1.8rem]  bg-white pt-12 pb-20 px-7 lg:px-14">
          <div className="text-[16px] lg:text-xl xl:text-2xl">
            Are you sure you want to purchase{" "}
            <span className="text-blue-600 font-bold">{plan.Name}</span> for{" "}
            <span className="text-blue-600 font-bold">
              {"+234" + String(phone).substring(phone.length - 10)}
            </span>{" "}
            ?
          </div>
          <input
            type="password"
            className="w-full md:text-lg bg-slate-100 border-[1.3px] border-slate-400 text-slate-800 focus:outline-blue-600 rounded-lg py-3 px-4 mt-6 mb-2"
            placeholder="Enter your password..."
            onChange={passwordHandler}
          />
          <div className="w-full md:text-lg">
            <button
              type="button"
              className="mt-3 py-3 lg:py-4 px-3 w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg disabled:bg-gray-300 disabled:text-gray-400"
              onClick={makePurchase}
              disabled={isDisabled}
            >
              Confirm
            </button>
            <button
              type="button"
              className="mt-3 mb-1 py-3 lg:py-4 px-3 w-full bg-gray-300 hover:bg-gray-900 hover:text-white text-gray-500 font-medium rounded-lg"
              onClick={changeConfirm}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataModal;
