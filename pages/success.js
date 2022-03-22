/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Meta from "@/components/Meta";

const Success = () => {
  return (
    <>
      <Meta title="Success!" />
      <div className="w-screen h-[90vh] flex items-center text-center">
        <div className="w-4/5 lg:w-2/5 max-h-[90vh] flex flex-col justify-center items-center bg-white shadow-xl rounded-2xl  py-10 px-5 mx-auto">
          <img
            src="/img/success.png"
            alt="Success"
            className="w-3/5 lg:w-2/5"
          />
          <h1 className="text-xl lg:text-3xl font-medium text-green-700">
            Transaction Successful!
          </h1>
          <p className="text-xs font-light text-slate-500 pt-2 w-4/5">Cheers 🍻</p>
          <p className="text-xs text-slate-800 hover:text-blue-600 mt-8 pb-2">
            <Link href="/dashboard/">❌ Close Page</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Success;
