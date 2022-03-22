import Back from "@/components/Back";
import Meta from "@/components/Meta";
import NavBottom from "@/components/NavBottom";
import axios from "axios";
import { useState, useEffect } from "react";

const Fund = () => {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    phone_number: "",
    currency: "",
    tx_ref: "",
  });
  const [Amount, setAmount] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isDisabled) {
      document.getElementById("start-payment-button").disabled = true;
    } else {
      document.getElementById("start-payment-button").disabled = false;
    }
  }, [isDisabled]);

  useEffect(() => {
      const userToken = localStorage.getItem("userToken");
      axios({
        method: "POST",
        url: "https://api.deanpay.com/api/wallet/fund",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          setuserData({
              name : res.data.fullname,
              email : res.data.email,
              currency : res.data.currency,
              phone_number : res.data.phone_number,
              tx_ref : res.data.tx_ref,
          })
        })
        .catch((err) => {
          setIsDisabled(true);
          console.log(err.response);
        });
    }, []);

  const amountHandler = (e) => {
    setAmount(e.target.value.trim());
    if(e.target.value.trim().length >= 3){
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  return (
    <>
      <div className="w-4/5 py-3 px-6">
        <Back url="/dashboard" />
      </div>
      <div className="flex flex-col w-4/5 lg:w-3/5 h-[70vh] mx-auto justify-center items-center">
        <Meta title="Fund Account" />

        <form
          method="POST"
          action="https://checkout.flutterwave.com/v3/hosted/pay"
        >
          <p className="text-3xl md:text-4xl font-semibold text-slate-900">Fund Account</p>
          <div>
            <input
              type="number"
              name="amount"
              className="block w-full items-center justify-between bg-slate-50 text-slate-500 border-[1.5px] border-slate-300 rounded-xl py-2 px-4 text-lg my-5"
              placeholder="Amount in NGN"
              min="100"
              onChange={amountHandler}
              value={Amount}
            />
          </div>
          <div className="text-red-600 my-5 text-xs font-medium">
            3rd party transaction fees MAY apply for this transaction, we have no control over these fees.
          </div>
          <input
            type="hidden"
            name="public_key"
            value="FLWPUBK-7c779a8f6829e5398210d6f413efefc3-X"
          />
          {/* @todo - CHANGE PUBLIC KEY & URL FOR PRODUCTION */}
          <input type="hidden" name="customer[email]" value={userData.email} />
          <input type="hidden" name="customer[name]" value={userData.name} />
          <input type="hidden" name="tx_ref" value={userData.tx_ref} />
          <input type="hidden" name="currency" value={userData.currency} />
          <input type="hidden" name="meta[token]" value="54" />
          <input
            type="hidden"
            name="redirect_url"
            value="https://app.deanpay.com/api/fund"
          />
          <button
            type="submit"
            id="start-payment-button"
            className="w-full bg-[#2e63c0] text-white text-[15px] font-medium py-3 rounded-lg hover:bg-slate-600 disabled:bg-gray-300 disabled:text-gray-400"
          >
            Fund
          </button>
        </form>
      </div>
      <NavBottom />
    </>
  );
};

export default Fund;
