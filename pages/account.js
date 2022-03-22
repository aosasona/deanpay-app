/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Meta from "@/components/Meta";
import Loader from "@/components/Loader";
import NavBottom from "@/components/NavBottom";
import PayError from "@/components/PayError";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";

const Account = () => {
  //User State
  const [User, setUser] = useState({
    verified: false,
    balance: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  //Status State
  const [Status, setStatus] = useState({
    isLoading: false,
    isError: false,
    Text: "",
  });

  useEffect(() => {
    setStatus({
      isLoading: true,
      isError: false,
      Text: "",
    });
    const userToken = localStorage.getItem("userToken");
    if (userToken !== null) {
      axios({
        method: "GET",
        url: "https://api.deanpay.com/api/wallet",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          setUser({
            balance: res.data.balance,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            email: res.data.email,
          });

          setStatus({
            isLoading: false,
            isError: false,
            Text: "",
          });
        })
        .catch((err) => {
          setStatus({
            isLoading: false,
            isError: true,
            Text: "Unable to load data, try logging in again ☹️",
          });
        });
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Meta title="Account" />
      <div className="w-[90vw] md:w-2/5 mx-auto mt-14 md:mt-20">
        {Status.isLoading === true && (
          <div className="w-[90vw] h-[50vh] flex items-center justify-center">
            <div className="scale-150">
              <Loader />
            </div>
          </div>
        )}

        {Status.isLoading === false && (
          <>
            <img
              src="/img/user.svg"
              alt="User image"
              className="w-1/3 md:w-1/6 mx-auto"
            />
            <h1 className="text-center text-xl font-semibold text-slate-700 mt-5">
              {User.firstName + " " + User.lastName}
            </h1>
            {!User.verified && (
              <PayError text="Your account is not verified!" />
            )}

            <div className="flex flex-col space-y-4 mt-3 mb-8 cursor-pointer">
              <Link href="/security" passHref>
                <div className="flex items-center w-full px-4 py-3 bg-slate-100 text-slate-700 font-medium text-sm md:text-[15px] rounded-xl space-x-3">
                  <div className="bg-slate-200 text-2xl px-2 py-2 rounded-xl">
                    <RiLockPasswordLine />
                  </div>
                  <div>Security</div>
                </div>
              </Link>

              <Link href="/verification" passHref>
                <div className="flex items-center w-full px-4 py-3 bg-slate-100 text-slate-700 font-medium text-sm md:text-[15px] rounded-xl space-x-3">
                  <div className="bg-slate-200 text-2xl px-2 py-2 rounded-xl">
                    <MdOutlineVerifiedUser />
                  </div>
                  <div>Verification</div>
                </div>
              </Link>

              <Link href="/logout" passHref>
                <div className="flex items-center w-full px-4 py-3 bg-red-100 text-red-600 font-medium text-sm md:text-[15px] rounded-xl space-x-3">
                  <div className="bg-red-200 text-2xl px-2 py-2 rounded-xl">
                    <IoLogOutOutline />
                  </div>
                  <div>Log Out</div>
                </div>
              </Link>
            </div>
          </>
        )}

        <h3 className="text-center text-xs text-slate-400 mb-14">
          DeanPay V1.0.0
        </h3>
      </div>
      <NavBottom />
    </>
  );
};

export default Account;
