import Link from "next/link";
import Meta from "@/components/Meta";

/* eslint-disable @next/next/no-img-element */
const Fail = () => {
  return (
    <>
      <Meta title="Success!" />
      <div className="w-screen h-screen flex items-center text-center">
        <div className="w-4/5 lg:w-2/5 max-h-[90vh] flex flex-col justify-center items-center bg-white rounded-2xl drop-shadow-xl py-10 px-5 mx-auto">
          <img src="/img/fail.png" alt="Fail" className="w-3/5 lg:w-2/5" />
          <h1 className="text-[1.4rem] lg:text-3xl font-medium text-red-700">
            Transaction Failed!
          </h1>
          <p className="text-[11px] text-slate-500 font-light pt-2">Ah, something went wrong 😪</p>
          <div className="w-full text-xs text-zinc-700 mt-7 pb-2 flex flex-row items-center justify-evenly">
            <p className="hover:text-blue-600 hover:font-medium space-x-2">
              <Link href="https://www.deanpay.com/contact">🤙 Contact Us</Link>
            </p>
            <p className="hover:text-slate-800 hover:font-medium space-x-2">
              <Link href="/dashboard/">❌ Close Page</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fail;
