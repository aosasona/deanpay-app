/* eslint-disable @next/next/no-img-element */
import { FaSimCard, FaDollarSign, FaRegMoneyBillAlt } from "react-icons/fa";
import Back from "@/components/Back";
import Meta from "@/components/Meta";
import AirtimeModal from "@/components/AirtimeModal";
import Loader from "@/components/Loader";
import { useState } from "react";
import PayError from "@/components/PayError";
import PaySuccess from "@/components/PaySuccess";
import axios from "axios";
import NavBottom from "@/components/NavBottom";

const Airtime = ({ name }) => {
  //Send back the image linkß
  const imageLink = () => {
    if (name.short_name.toLowerCase().startsWith("mtn")) {
      const image = "/img/mtn.png";
      return image;
    } else if (name.short_name.toLowerCase().startsWith("airtel")) {
      const image = "/img/airtel.png";
      return image;
    } else if (name.short_name.toLowerCase().startsWith("glo")) {
      const image = "/img/glo.png";
      return image;
    } else {
      const image = "/img/9mobile.png";
      return image;
    }
  };

  //States
  const [Amount, setAmount] = useState(0);
  const [Phone, setPhone] = useState("");
  const [Confirm, setConfirm] = useState(false);
  const [Password, setPassword] = useState("");
  const [isDisabled, setisDisabled] = useState(true);
  const [Status, setStatus] = useState({
    Error: false,
    Loading: false,
    Success: false,
    Text: "",
  });

  //Onchange handlers
  const amountHandler = (e) => {
    setAmount(parseInt(e.target.value.trim()));
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value.trim());
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value.trim());
    if (Password.length >= 4 && Password.length !== 0) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
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
  //   Form Handler

  const formHandler = (Form) => {
    Form.preventDefault();

    if (!Amount || !Phone) {
      setStatus({
        Error: true,
        Loading: false,
        Success: false,
        Text: "Enter a phone number & amount!",
      });

      setTimeout(() => {
        ResetStatus();
      }, 3000);
    } else {
      const phoneNumber = /^\d+$/.test(Phone);

      if (phoneNumber === true && Phone.length >= 10) {
        if (Amount <= 15000) {
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
            Text: "You can purchase a MAXIMUM of N15,000 airtime at once!",
          });

          setTimeout(() => {
            ResetStatus();
          }, 3000);
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

  //Final submission change handler
  const makePurchase = async () => {
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
      amount: String(Amount),
      phoneNumber: Phone,
      Password: Password,
    };

    try {
      await axios
        .post(
          "https://api.deanpay.com/api/bill/airtime",
          Body,
          Auth
        )
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
          setisDisabled(true);
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
          setisDisabled(true);
        });
    } catch (error) {
      setStatus({
        Error: true,
        Loading: false,
        Success: false,
        Text: error,
      });
      setTimeout(() => {
        ResetStatus();
      }, 3000);
      setisDisabled(true);
    }
    setisDisabled(true);
  };

  return (
    <main className="relative h-full">
      {Confirm === true && (
        <AirtimeModal
          phone={Phone}
          amount={Amount}
          changeConfirm={changeConfirm}
          makePurchase={makePurchase}
          passwordHandler={passwordHandler}
          isDisabled={isDisabled}
        />
      )}
      <div className="w-screen h-[95vh]">
        <Meta
          title={"Airtime - " + name.short_name}
          desc="Purchase Airtime with your DeanPay balance"
        />
        <div className="w-4/5 pt-4 mx-auto">
          {" "}
          <Back url="/pay" />
        </div>
        <div className="w-full h-[75vh] md:h-[85vh] px-10 lg:w-3/5 mx-auto flex flex-col items-center justify-center text-light">
          <img
            src={imageLink()}
            alt="Image"
            className="w-4/6 md:w-2/5 border-2 border-white rounded-lg mb-1 z-[-1]"
          />
          <h1 className="text-slate-500 font-medium text-lg lg:text-xl mb-6">
            {name.short_name}
          </h1>
          {Status.Error === true && <PayError text={Status.Text} />}
          {Status.Success === true && <PaySuccess text={Status.Text} />}
          <form className="w-full lg:w-3/5" onSubmit={formHandler}>
            <div className="w-full flex flex-row items-center justify-between bg-slate-200 text-slate-600 px-5 py-1 my-3 rounded-lg text-[16px] lg:text-lg">
              <FaSimCard />
              <input
                type="text"
                className="text-black bg-transparent w-full focus:outline-none px-4 py-2"
                placeholder="Phone number"
                onChange={phoneHandler}
              />
            </div>
            <div className="w-full flex flex-row items-center justify-between bg-slate-200 text-slate-600 px-5 py-1 my-3 rounded-lg text-[16px] lg:text-lg">
              <FaRegMoneyBillAlt />
              <input
                type="number"
                className="text-black bg-transparent w-full focus:outline-none px-4 py-2"
                placeholder="Amount (NGN)"
                onChange={amountHandler}
              />
            </div>
            {Status.Loading === true && (
              <div className="mt-6">
                <Loader />
              </div>
            )}

            {Status.Loading === false && (
              <button
                type="submit"
                className="w-full mt-3 mb-20 py-3 lg:py-4 px-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
              >
                Pay
              </button>
            )}
          </form>
        </div>
      </div>
      <NavBottom />
    </main>
  );
};

export default Airtime;

export async function getServerSideProps({ query: { bill_id } }) {
  const res = await fetch("https://api.deanpay.com/api/airtime");

  const result = await res.json();

  const Items = result.filter((item) => (item.short_name.toLowerCase().startsWith(bill_id.toLowerCase())));

  console.log(result)
  return {
    props: {
      name: Items[0],
    },
  };
}
