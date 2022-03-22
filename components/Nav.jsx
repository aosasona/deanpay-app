/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { IoRocket } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

const Nav = () => {
  const [NavState, setNavState] = useState(false);
  const isServer = typeof window === "undefined";

  const toggleNav = () => {
    if (NavState === false) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-screen h-auto bg-white flex flex-row items-center justify-between px-4 py-2 drop-shadow-md md:drop-shadow-none">
        <div className="flex flex-row h-11 items-center">
          <Link href="/" passHref>
            <img src="/img/favicon.png" alt="Logo" className="h-3/5 mx-2" />
          </Link>
          <h1 className="font-medium text-slate-900 text-lg lg:text-xl brandText">
            DeanPay
          </h1>
        </div>

        <div className="hidden md:flex flex-row items-center">
          {!isServer && localStorage.getItem("userToken") !== null && (
            <>
              <div className="text-sm font-normal px-2 lg:px-4 text-[#2e63c0] hover:text-blue-600 cursor-pointer">
                <Link href="/dashboard">My Dashboard</Link>
              </div>
              <div className="text-sm font-normal px-2 lg:px-4 text-red-500 hover:text-red-800 cursor-pointer">
                <Link href="/logout">Log Out</Link>
              </div>
            </>
          )}
          {!isServer && localStorage.getItem("userToken") === null && (
            <>
              <div className="text-sm font-normal px-2 lg:px-4 text-[#2e63c0] hover:text-blue-600 cursor-pointer">
                <Link href="/contact">Contact Us</Link>
              </div>

              <div className="flex space-x-4">
                <Link href="/login" passHref>
                  <div className="text-[#2e63c0] text-sm font-semibold border-[0.08rem] border-[#2e63c0] rounded-md px-6 py-2 cursor-pointer">
                    Sign In
                  </div>
                </Link>

                <Link href="/signup" passHref>
                  <div className="text-[#2e63c0] text-sm font-semibold border-[0.08rem] border-[#2e63c0] rounded-md px-6 py-2 cursor-pointer">
                    Sign Up
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* For mobile view only */}
        <div className="md:hidden">
          {NavState === false ? (
            <button onClick={toggleNav}>
              <img src="/img/Nav.svg" alt="Nav Button" />
            </button>
          ) : (
            <button onClick={toggleNav}>
              <img src="/img/NavCancel.svg" alt="Nav Button" />
            </button>
          )}
        </div>
      </nav>
      {NavState === true && (
        <div className="md:hidden w-full bg-white sticky top-14 flex flex-col py-8 px-4 drop-shadow-lg navAnimation">
          <p className="text-[16px] font-medium">
            <Link href="/contact">Contact Us</Link>
          </p>

          <div className="mt-8 flex flex-row justify-between space-x-4">
          {!isServer && localStorage.getItem("userToken") !== null && (
            <>
              <div className="text-sm font-normal px-2 lg:px-4 text-[#2e63c0] hover:text-blue-600 cursor-pointer">
                <Link href="/dashboard">My Dashboard</Link>
              </div>
              <div className="text-sm font-normal px-2 lg:px-4 text-red-500 hover:text-red-800 cursor-pointer">
                <Link href="/logout">Log Out</Link>
              </div>
            </>
          )}
          {!isServer && localStorage.getItem("userToken") == null && (
            <>
            <Link href="/signup" passHref>
              <button className="w-full flex items-center justify-center  space-x-2 bg-[#2e63c0] text-white font-medium py-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md">
                <IoRocket />
                <span>Get Started</span>
              </button>
            </Link>

            <Link href="/login" passHref>
              <button className="w-full flex items-center justify-center space-x-2 border-2 border-[#2e63c0] text-[#2e63c0] font-medium py-3 rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md">
                <FaUser />
                <span>Sign In</span>
              </button>
            </Link>
            </>
          )}
          </div>
        </div>
      )}
      
    </>
  );
};

export default Nav;
