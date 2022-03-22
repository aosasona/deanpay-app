import Nav from "@/components/Nav";
import Meta from "@/components/Meta";
import Card from "@/components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import ListCard from "@/components/ListCard";
import {BiImport} from "react-icons/bi"
import { FaMoneyBillWave } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import NavBottom from "@/components/NavBottom";
const numeral = require("numeral");

const Account = () => {
  const router = useRouter();
  const [userData, setuserData] = useState({
    verified: false,
    balance: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [Transactions, setTransactions] = useState([]);

  const [Error, setError] = useState({
    isError: false,
    Text: "",
  });

  useEffect(() => {
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
          setuserData({
            balance: res.data.balance,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            email: res.data.email,
          });
          setTransactions(res.data.transactions);
        })
        .catch((err) => {
          setError({
            isError: true,
            Text: "Unable to load data",
          });
        });
    } else {
      router.push("/login");
    }
  }, [router]);

  //Get the bearer token from localstorage
  return (
    <>
      <Meta
        title="Dashboard"
        keyword="dashboard, deanpay, airtime, data, payment"
      />
      <div className="text-3xl lg:text-4xl w-[88%] lg:w-3/5 mx-auto mt-5 font-medium">
        {userData.firstName != "" ? (
          <>Hi {userData.firstName},</>
        ) : (
          <div className="loader"></div>
        )}
      </div>
      <Card>
        <>
          {userData.balance !== "" ? (
            "NGN " + numeral(userData.balance).format("0,0.00")
          ) : (
            <div className="loader"></div>
          )}
        </>
      </Card>

      {Error.isError === true && (
        <div className="bg-red-200 text-red-700 text-center text-sm font-light rounded-lg w-[88%] lg:w-2/5 mx-auto py-2 px-3 mt-3">
          {Error.Text}
        </div>
      )}

      {Error.isError === false && (
        <>
          <div className="flex justify-between mt-3 w-[88%] md:w-3/6 mx-auto text-sm space-x-3 grotesk">
            <Link href="/fund" passHref>
              <button className="bg-[#1b7938] w-full py-4 px-4 rounded-2xl text-white hover:bg-slate-500 hover:border-0 hover:text-white flex flex-col items-start justify-center space-y-3 button-bg">
                <span className="text-2xl bg-white text-[#1b7938] px-2 py-2 rounded-[50%] bg-opacity-50 hover:bg-slate-500 hover:border-0 hover:text-white">
                  <BiImport />
                </span>
                <div className="text-left">
                <span className="text-zinc-100">Fund Account</span>
                <p className="opacity-80 text-[8px] md:text-[9px] text-left font-medium ">Top-up your wallet balance</p>
                </div>
              </button>
            </Link>

            <Link href="/pay" passHref>
              <button className="bg-[#2f7aa2] w-full py-4 px-4 rounded-2xl text-white hover:bg-slate-500 hover:border-0 hover:text-white flex flex-col items-start justify-center space-y-3 button-bg">
                <span className="text-2xl bg-white text-[#2f7aa2] px-2 py-2 rounded-[50%] bg-opacity-50 hover:bg-slate-500 hover:border-0 hover:text-white">
                  <MdOutlinePayments />
                </span>
                <div className="text-left">
                <span className="text-zinc-100">Pay Bills</span>
                <p className="opacity-80 text-[8px] md:text-[9px] text-left font-medium">Pay for a service in few clicks</p>
                </div>
              </button>
            </Link>
          </div>

          <p className="w-[88%] lg:w-3/5 mx-auto mt-8 mb-5 font-light text-sm grotesk">
            Recent Transactions
          </p>
          <div className="mt-1 px-2 py-2 h-[40vh] md:h-[50vh] mb-20 overflow-y-scroll">
            {Transactions.length === 0 ? (
              <div className="w-[88%]  lg:w-3/5 mx-auto py-8 text-sm text-red-800 text-center">
                No Transactions Yet.
              </div>
            ) : (
              Transactions.map((transaction, index) => (
                <ListCard inFlow={transaction.isInFlow} key={index} txRef={transaction.tx_ref}>
                  <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm md:text-[16px] text-slate-700">
                          {transaction.transactionType.split(" ")[0]}
                        </span>{" "}
                        <span className="text-[9px] md:text-[11px] font-medium text-slate-400">
                          {transaction.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col md:text-xs text-[10px] font-medium space-y-0 text-right">
                      <p
                        className={
                          transaction.isInFlow === true
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {transaction.isInFlow === true ? "+" : "-"}
                        {"N" + numeral(transaction.amount).format("0,0.00")}
                      </p>
                      <p>{transaction.createdAt.slice(0, 10)} {transaction.createdAt.slice(11, 16)}</p>
                    </div>
                  </div>
                </ListCard>
              ))
            )}
          </div>
        </>
      )}

    <NavBottom />
    </>
  );
};

export default Account;
