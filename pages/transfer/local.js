import Back from "@/components/Back";
import Meta from "@/components/Meta";
import Loader from "@/components/Loader";
import WalletModal from "@/components/WalletModal";
import { useState } from "react";
import { BsEnvelopeOpen, BsFillBackspaceFill } from "react-icons/bs";
import axios from "axios";
import PayError from "@/components/PayError";
import PaySuccess from "@/components/PaySuccess";
import NavBottom from "@/components/NavBottom";
const numeral = require("numeral");

const Local = () => {
  //States
  const [Amount, setAmount] = useState(0);
  const [User, setUser] = useState("");
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
  const [Name, setName] = useState("");
  const [Confirm, setConfirm] = useState(false);
  const [Password, setPassword] = useState("");

  //email handler
  const userHandler = (e) => {
    setUser(e.target.value);
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
  const passwordHandler = (e) => {
    setPassword(e.target.value.trim());
    if (Password.length >= 4 && Password.length !== 0) {
        setButton({
            Main : false,
            Modal : false,
        })
    } else {
      setButton({
          Main : false,
          Modal : true,
      })
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

  //Bring up the confirmation Modal
  const transferModal = () => {
    setStatus({ Error: false, Loading: true, Success: false, Text: "" });
    axios
      .post("https://api.deanpay.com/api/wallet/details", {
        email: User,
      })
      .then((response) => {
        setName(response.data.message);
        setConfirm(true)
        ResetStatus();
      })
      .catch((error) => {
        setStatus({
          Error: true,
          Loading: false,
          Success: false,
          Text: error.response.data.message,
        });
        setTimeout(() => {
          ResetStatus();
        }, 6000);
      });
  };

  //Make the transfer
  const MakeTransfer = async() => {
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
      receiver : User,
      amount : Amount,
      password : Password
    };


        await axios
          .post("https://api.deanpay.com/api/transfer/wallet", Body, Auth)
          .then(
            (response) => {
            // console.log(response);
            setStatus({
              Error: false,
              Loading: false,
              Success: true,
              Text: response.data.message,
            });
            setTimeout(() => {
              ResetStatus();
            }, 10000);
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
              Text: error.response.data.message,
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
        title="Transfer - DeanPay wallet"
        desc="Transfer money to a DeanPay wallet for 0 fees!"
      />

      {Confirm === true && (
        <WalletModal
          user={Name}
          amount={Amount}
          changeConfirm={changeConfirm}
          makePurchase={MakeTransfer}
          passwordHandler={passwordHandler}
          isDisabled={Button.Modal}
        />
      )}

      <div className="w-[90%] mx-auto">
        <Back url="/transfer" />
       
        <h2 className="text-slate-500 text-center text-xs my-3 grotesk">
          Send money to any DeanPay wallet for free 🤑
        </h2>
        <div className="w-full md:w-3/5 mx-auto flex items-center justify-between bg-slate-50 text-slate-500 border-[1.5px] border-slate-300 py-1 px-4 rounded-xl">
          <BsEnvelopeOpen />
          <input
            type="email"
            className="w-[95%] text-[16px] font-light focus:outline-none bg-transparent py-3 px-2"
            placeholder="Enter recipient's email..."
            onChange={userHandler}
            value={User}
          />
        </div>
        <div className="w-full mx-auto">
        {Status.Error === true && <PayError text={Status.Text} />}
        {Status.Success === true && <PaySuccess text={Status.Text} />}
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
        <div className="mt-6 mb-20 w-full md:w-3/5 mx-auto">
          {Status.Loading === false ? (
            <button
              className="w-full bg-[#2e63c0] text-white text-[15px] font-medium py-3 rounded-lg hover:bg-slate-600 disabled:bg-gray-300 disabled:text-gray-400"
              onClick={transferModal}
              disabled={Button.Main}
            >
              Continue
            </button>
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <NavBottom />
    </main>
  );
};

export default Local;
