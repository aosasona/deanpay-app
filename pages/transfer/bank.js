import React from "react";
import axios from "axios";
import { useState } from "react";
import Meta from "@/components/Meta";
import Back from "@/components/Back";
import BankModal from "@/components/BankModal";
import PayError from "@/components/PayError";
import PaySuccess from "@/components/PaySuccess";
const numeral = require("numeral");
import { FaRegUser } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import { BsFillBackspaceFill } from "react-icons/bs";
import Loader from "@/components/Loader";
import NavBottom from "@/components/NavBottom";

const Bank = ({ Banks }) => {
  const [Amount, setAmount] = useState(0);
  const [AccNumber, setAccNumber] = useState(0);
  const [Bank, setBank] = useState({
    Name: "",
    Code: "",
  });
  const [Person, setPerson] = useState("");
  const [Status, setStatus] = useState({
    Error: false,
    Loading: false,
    Success: false,
    Text: "",
  });
  const [Button, setButton] = useState({
    Main: true,
    Modal: true,
  });
  const [Confirm, setConfirm] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordHandler = (e) => {
    setPassword(e.target.value.trim());
    if (Password.length >= 4 && Password.length !== 0) {
      setButton({
        Main: false,
        Modal: false,
      });
    } else {
      setButton({
        Main: false,
        Modal: true,
      });
    }
  };

  //Modal dialog change handler
  const changeConfirm = () => {
    if (Confirm === true) {
      setConfirm(false);
    } else {
      setConfirm(true);
    }
  };

  //Reset the current status
  const ResetStatus = () => {
    setStatus({
      Error: false,
      Loading: false,
      Success: false,
      Text: "",
    });
  };

  //Account handler
  const AccountHandler = (e) => {
    setAccNumber(e.target.value);
  };

  //Bank Modal
  const bankModal = () => {
    setStatus({
      Error: false,
      Loading: true,
      Success: false,
      Text: "",
    });
    axios
      .post("https://api.deanpay.com/api/banks/resolve", {
        AccNumber: AccNumber,
        Code: Bank.Code,
      })
      .then((response) => {
        if (response.data.status !== "error") {
          setPerson(response.data.details.account_name);
          setConfirm(true);
          ResetStatus();
        } else {
          setStatus({
            Error: true,
            Loading: false,
            Success: false,
            Text: response.data.message,
          });
          setTimeout(() => {
            ResetStatus();
          }, 6000);
        }
      })
      .catch((error) => {
        setStatus({
          Error: true,
          Loading: false,
          Success: false,
          Text: error.response.data.message,
        });
        console.log(error);
        setTimeout(() => {
          ResetStatus();
        }, 6000);
      });
  };

  const bankHandler = (b) => {
    const selectedValueRaw = b.target.value.trim();
    const selectedValue = selectedValueRaw.toString();
    const selectedBank = Banks.filter(
      (currentBank) => currentBank.code === selectedValue
    );
    const bankName = selectedBank[0].name;
    const bankCode = selectedBank[0].code;
    setBank({
      Name: bankName,
      Code: bankCode,
    });
  };

  var currentValue = Amount.toString().split(""); //Current value array
  //Number handler
  const enterNumber = (value) => {
    var numberArray = currentValue; //Put the current amount in an array
    var newValue = String(value); //Stringify the value if it isn't already
    numberArray.push(newValue); //Add thr entry to the array
    var finalAmountRaw = numberArray.join(""); //reconstruct the array into a string
    var finalAmount = parseInt(finalAmountRaw); //convert it to an interger
    setAmount(finalAmount); //Update the state

    if (numberArray.length > 2) {
      setButton({
        Main: false,
        Modal: true,
      });
    } else {
      setButton({
        Main: true,
        Modal: true,
      });
    }
  };

  //Delete handler
  const deleteNumber = () => {
    var currentArray = currentValue; //Current value array
    currentArray.pop(); //remove the last element
    var finalAmountRaw = currentArray.join(""); //reconstruct the array into a string
    var finalAmount = parseInt(finalAmountRaw); //convert it to an interger

    //Check how many elements are left
    if (currentArray.length > 0) {
      setAmount(finalAmount); //Update the state to the leftover
      if (currentArray.length > 2) {
        setButton({
          Main: false,
          Modal: true,
        });
      } else {
        setButton({
          Main: true,
          Modal: true,
        });
      }
    } else {
      setAmount(0); //set to 0 if all elements have been removed
    }
  };

  //Form handler
  const SendMoney = async() => {
       //Reset the current Status
       ResetStatus();

       //Get the current user's token
       const userToken = localStorage.getItem("userToken");
   
       setConfirm(false);
       setStatus({
         Error: false,
         Loading: true,
         Success: false,
         Text:"",
       });
   
       const Auth = {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${userToken}`,
         },
       };
   
       const Body = {
         AccountNumber: AccNumber,
         BankCode : Bank.Code,
         amount : Amount,
         password : Password
       };
   
   
           await axios
             .post("https://api.deanpay.com/api/transfer/bank", Body, Auth)
             .then(
               (response) => {
               // console.log(response);
               setStatus({
                 Error: false,
                 Loading: false,
                 Success: true,
                 Text:response.data.message,
               });
               setTimeout(() => {
                 ResetStatus();
               }, 20000);
               setButton({
                   Main : false,
                   Modal : true,
               })
             })
             .catch((error) => {
               // console.log(error.response);
               setStatus({
                 Error: true,
                 Loading: false,
                 Success: false,
                 Text:error.response.data.message,
               });
               setTimeout(() => {
                 ResetStatus();
               }, 3000);
               setButton({
                   Main : false,
                   Modal : true,
               })
             });
      
  };

  return (
    <main className="relative h-full">
      <Meta
        title="Transfer - NGN Bank"
        desc="Transfer to an NGN bank from your DeanPay wallet"
      />
      {Confirm === true && (
        <BankModal
          name={Person}
          amount={Amount}
          changeConfirm={changeConfirm}
          makePurchase={SendMoney}
          passwordHandler={passwordHandler}
          isDisabled={Button.Modal}
        />
      )}

      <div className="w-[90%] md:w-4/5 mx-auto">
        <Back url="/transfer" />

        <div className="w-full md:w-4/5 mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold">Pay a NGN Bank</h1>
          <h2
            className="text-center grotesk
        md:text-sm text-xs mt-3"
          >
            Send money to any Nigerian Naira account fast and and easily from your DeanPay wallet 😎 
          </h2>
          <div className="my-3">
            {Status.Error === true && <PayError text={Status.Text} />}
            {Status.Success === true && <PaySuccess text={Status.Text} />}
          </div>

          <div className="w-full md:w-3/5 mx-auto bg-slate-200 text-slate-600 px-5 py-1 mb-3 mt-5 rounded-lg text-[15px] lg:text-lg">
            <select
              className="bg-transparent py-2 focus:outline-none"
              onChange={bankHandler}
            >
              {Banks.map((Bank, Index) => (
                <option key={Index} value={Bank.code}>
                  {Bank.name}
                </option>
              ))}
            </select>
          </div>

          {/* Account Number */}
          <div className="w-full md:w-3/5 mx-auto flex flex-row items-center justify-between bg-slate-200 text-slate-600 px-5 py-1 my-4 rounded-lg text-[16px] lg:text-lg">
            <AiOutlineNumber />
            <input
              type="number"
              className="text-black bg-transparent w-full focus:outline-none px-4 py-2"
              placeholder="Account Number"
              onChange={AccountHandler}
            />
          </div>

          <div>
            <h2 className="w-min text-slate-500 bg-slate-200 font-semibold mt-4 px-3 py-1 rounded-lg mx-auto text-xs">
              NGN
            </h2>
            <div className="text-[2.5rem] font-semibold w-full text-center text-[#2e63c0] py-3 mt-4 rounded-xl">
              {Amount !== 0 && numeral(Amount).format("0,0.00")}
              {Amount === 0 && 0}
            </div>
          </div>

          {/* Keypad Container */}
          <div className="w-full md:w-3/5 mx-auto grid grid-cols-3 mt-4 bg-slate-50 text-slate-600 py-5 px-2 rounded-xl grotesk">
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("1")}
            >
              1
            </button>
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("2")}
            >
              2
            </button>
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("3")}
            >
              3
            </button>
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("4")}
            >
              4
            </button>
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("5")}
            >
              5
            </button>
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("6")}
            >
              6
            </button>
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("7")}
            >
              7
            </button>
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("8")}
            >
              8
            </button>
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("9")}
            >
              9
            </button>
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("00")}
            >
              00
            </button>
            <button
              className="text-2xl py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => enterNumber("0")}
            >
              0
            </button>
            <button
              className="text-2xl w-auto mx-auto px-5 py-5 hover:text-slate-400 rounded-[50%]"
              onClick={() => deleteNumber()}
            >
              <BsFillBackspaceFill />
            </button>
          </div>

          <div className="mt-6 mb-5 w-full md:w-3/5 mx-auto">
            {Status.Loading === false ? (
              <button
                className="w-full bg-[#2e63c0] text-white text-[15px] font-medium py-3 rounded-lg hover:bg-slate-600 disabled:bg-gray-300 disabled:text-gray-400"
                onClick={bankModal}
                disabled={Button.Main}
              >
                Continue
              </button>
            ) : (
              <Loader />
            )}
          </div>
          <h2 className="w-max mx-auto text-red-600 bg-red-100 text-center text-[10px] md:text-xs py-2 px-4 rounded-xl mb-20">A N10 fee applies to this transaction</h2>
        </div>
      </div>
      <NavBottom />
    </main>
  );
};

export default Bank;

export async function getServerSideProps() {
  const makeApiCall = await fetch(
    "https://api.deanpay.com/api/banks"
  );

  const response = await makeApiCall.json();

  return {
    props: {
      Banks: response,
    },
  };
}
