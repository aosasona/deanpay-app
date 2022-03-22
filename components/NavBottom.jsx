import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiTransfer, BiUserCircle, BiHome } from "react-icons/bi";
import { RiDashboardFill, RiUserFill } from "react-icons/ri";

const NavBottom = () => {
  return (
    <>
      <div className="fixed w-full bottom-0 bg-slate-200 text-slate-600 grid grid-cols-3 justify-around place-items-center py-3 md:py-4 text-2xl md:text-[1.6rem] shadow-xl cursor-pointer">
        <Link href="/dashboard" passHref>
          <div className="flex flex-col md:flex-row items-center">
            <div>
              <BiHome />
            </div>
            <div className="text-xs md:text-[1rem] text-slate-500 pt-1 md:py-0 md:px-3">Dashboard</div>
          </div>
        </Link>
        <Link href="/transfer" passHref>
          <div className="flex flex-col md:flex-row items-center">
            <div>
              <BiTransfer />
            </div>
            <div className="text-xs md:text-[1rem] text-slate-500 pt-1 md:py-0 md:px-3">Transfer</div>
          </div>
        </Link>
        <Link href="/account" passHref>
          <div className="flex flex-col md:flex-row items-center">
            <div>
              <BiUserCircle />
            </div>
            <div className="text-xs md:text-[1rem] text-slate-500 pt-1 md:py-0 md:px-3">Account</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBottom;
