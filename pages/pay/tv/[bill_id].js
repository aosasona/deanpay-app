/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useState } from "react";
import Back from "@/components/Back";
import Meta from "@/components/Meta";
import DataModal from "@/components/DataModal";
import PayError from "@/components/PayError";
import PaySuccess from "@/components/PaySuccess";
import { FaSimCard } from "react-icons/fa";
import Loader from "@/components/Loader";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
const numeral = require("numeral");

const TvBill = ({ Bundles, imageRef, network }) => {
  //States values
  const [Phone, setPhone] = useState("");
  const [Plan, setPlan] = useState({
    Name: "",
    Amount: 0,
    Index: 200,
  });
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

  //Set plan state
  const selectBundle = (bundleName, bundleCost, index) => {
    setPlan({
      Name: bundleName,
      Amount: bundleCost,
      Index: index,
    });
  };

  const selectStyle = (index) => {
    if (index !== Plan.Index) {
      return "flex flex-col items-center justify-center text-slate-700 text-center px-1 pb-1 pt-3 rounded-lg";
    } else {
      return "flex flex-col items-center justify-center text-[#2e63c0] text-center bg-blue-100 px-1 pb-1 pt-3";
    }
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value.trim());

    if (Phone.length >= 10) {
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

  const formHandler = (Form) => {
    Form.preventDefault();

    if (!Plan || !Phone) {
      setStatus({
        Error: true,
        Loading: false,
        Success: false,
        Text: "Enter a phone number!",
      });

      setTimeout(() => {
        ResetStatus();
      }, 3000);
    } else {
      const phoneNumber = /^\d+$/.test(Phone);

      if (phoneNumber === true && Phone.length >= 10) {
        if (Confirm === true) {
          setConfirm(false);
        } else {
          setConfirm(true);
        }
      } else {
        setStatus({
          Error: true,
          Loading: false,
          Success: false,
          Text: "Invalid phone number!",
        });

        setTimeout(() => {
          ResetStatus();
        }, 3000);
      }
    }
  };

  const MakePurchase = async () => {
    if (Plan.Index !== 200) {
      //Reset the current Status
      ResetStatus();

      //Get the current user's token
      const userToken = localStorage.getItem("userToken");

      setConfirm(false);
      setStatus({
        Error: false,
        Loading: true,
        Success: false,
        Text: "",
      });

      const Auth = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const Body = {
        phoneNumber: Phone,
        amount: Plan.Amount,
        plan: Plan.Name,
        password: Password,
      };

      await axios
        .post("https://api.deanpay.com/api/bill/data", Body, Auth)
        .then((response) => {
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
            Main: false,
            Modal: true,
          });
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
            Main: false,
            Modal: true,
          });
        });
    } else {
      setConfirm(false);
      setStatus({
        Error: true,
        Loading: false,
        Success: false,
        Text: "Please select a data plan!",
      });
      setTimeout(() => {
        ResetStatus();
      }, 3000);
    }
  };

  return (
    <>
      <Meta title={"Mobile Data - " + network} />
      {Confirm === true && (
        <DataModal
          phone={Phone}
          plan={Plan}
          changeConfirm={changeConfirm}
          makePurchase={MakePurchase}
          passwordHandler={passwordHandler}
          isDisabled={Button.Modal}
        />
      )}
      <div className="w-[90%] mx-auto">
        <div className="z-0">
          <Back url="/pay" />
        </div>

        <img
          src={imageRef}
          className="w-2/5 md:w-1/5 mx-auto my-4"
          alt="Main Image"
        />
        <h2 className="text-center text-lg font-medium text-slate-600 mb-4">
          {network + " NIGERIA"}
        </h2>

        <div>
          {Status.Error === true && <PayError text={Status.Text} />}
          {Status.Success === true && <PaySuccess text={Status.Text} />}
        </div>

        <div className="w-full md:w-3/5 mx-auto flex flex-row items-center justify-between bg-slate-200 text-slate-600 px-5 py-1 my-4 rounded-lg text-[16px] lg:text-lg">
          <BsFillCreditCard2FrontFill />
          <input
            type="text"
            className="text-black bg-transparent w-full focus:outline-none px-4 py-2"
            placeholder="SmartCard or IUC number"
            onChange={phoneHandler}
          />
        </div>

        <div className="w-full md:w-4/5 mx-auto">
          <h1 className="text-center bg-slate-200 text-slate-500 py-3 font-medium text-sm rounded-t-lg">
            AVAILABLE PLANS
          </h1>
          <div className="h-[25vh] md:h-[31vh] overflow-y-scroll overflow-x-hidden grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6 px-4 py-5 border-[0.18rem] border-t-0 border-slate-100 rounded-b-lg select-none">
            {Bundles.map((bundle, index) => (
              <div key={index}>
                <div
                  className={selectStyle(index)}
                  onClick={() =>
                    selectBundle(bundle.name, bundle.amount, index)
                  }
                >
                  <img src={imageRef} className="w-4/5" alt="Provider Image" />
                  <p className="text-[12px] w-4/5 font-medium my-2">
                    {bundle.short_name}
                  </p>
                  <p className="text-green-600 bg-green-100 text-xs font-medium rounded-xl mb-2 px-3 py-1">
                    {"N" + numeral(bundle.amount).format("0,0")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-4">
            {Status.Loading === false ? (
              <button
                className="w-full bg-[#2e63c0] text-white text-[15px] font-medium py-3 rounded-lg hover:bg-slate-600 disabled:bg-gray-300 disabled:text-gray-400"
                onClick={formHandler}
                disabled={Button.Main}
              >
                Pay
              </button>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TvBill;

export async function getServerSideProps({ query: { bill_id } }) {
  const res = await fetch("https://api.deanpay.com/api/others");

  const result = await res.json();

  const BundlesArray = result.filter(
    (item) => ((item.short_name.startsWith(bill_id) || item.short_name == bill_id) && item.country === "NG")
  );

  //Send back the image linkß
  const imageLink = () => {
    if (bill_id == "DSTV") {
      const image = "/img/dstv.png";
      return image;
    } else if (bill_id == "GOTV") {
      const image = "/img/gotv.png";
      return image;
    } else {
      const image = "/img/startimes.png";
      return image;
    }
  };

  return {
    props: {
      Bundles: BundlesArray,
      imageRef: imageLink(),
      network: bill_id,
    },
  };
}
