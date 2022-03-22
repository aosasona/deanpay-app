import { useState } from "react";
import axios from "axios";
import Back from "@/components/Back";
import Meta from "@/components/Meta";
import { MdOutlinePassword, MdOutlinePhone } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi"
import NavBottom from "@/components/NavBottom";
import Loader from "@/components/Loader";
import PayError from "@/components/PayError";
import PaySuccess from "@/components/PaySuccess";
import { FaUserSecret } from "react-icons/fa";

const ResetPassword = () => {
  const [Email, setEmail] = useState("");
  const [Word, setWord] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [fieldType, setfieldType] = useState("password");
  const [passVisibility, setpassVisibility] = useState(false);
  const [Status, setStatus] = useState({
    Error: false,
    Loading: false,
    Success: false,
    Text: "",
  });

  //Visbility toggler for password
  const toggleVisibility = () => {
    if (passVisibility === true) {
      setpassVisibility(false);
      setfieldType("password");
    } else {
      setpassVisibility(true);
      setfieldType("text");
    }
  };

  //Email password handler
 const emailHandler = (e) => {
    setEmail((e.target.value).trim());
 }

 //Email password handler
 const wordHandler = (e) => {
    setWord((e.target.value).trim());
 }

  //new password handler
  const newPasswordHandler = (e) => {
    setnewPassword(e.target.value);
  };

  //confirm password handler
  const confirmPasswordHandler = (e) => {
    setconfirmPassword(e.target.value);
  };

  //RESET STATUS
  const ResetStatus = () => {
    setStatus({
      Error: false,
      Loading: false,
      Success: false,
      Text: "",
    });
  };

  //Timed status reset function
  const Reset = (time) => {
    setTimeout(() => {
      ResetStatus();
    }, time);
  };

  const formHandler = async () => {
    if (!(Email && Word && newPassword && confirmPassword)) {
      setStatus({
        Error: true,
        Loading: false,
        Success: false,
        Text: "All fields are required!",
      });
      Reset(3500);
    } else if (!(newPassword === confirmPassword)) {
      setStatus({
        Error: true,
        Loading: false,
        Success: false,
        Text: "Passwords do not match!",
      });
      Reset(3500);
    } else {
      setStatus({
        Error: false,
        Loading: true,
        Success: false,
        Text: "",
      });

      //Request body
      const Body = {
        Email: Email,
        Word: Word,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };

      console.log(Body)

      await axios
        .post("https://api.deanpay.com/api/password/reset", Body)
        .then((response) => {
          //   console.log(response);
          setStatus({
            Error: false,
            Loading: false,
            Success: true,
            Text: response.data.message,
          });
          Reset(10000);
        })
        .catch((error) => {
          //   console.log(error.response);
          setStatus({
            Error: true,
            Loading: false,
            Success: false,
            Text: error.response.data.message,
          });
          Reset(3500);
        });
    }
  };

  return (
    <>
      <Meta
        title="Reset Password"
        description="Secure your account by changing your password"
      />

      <div className="h-[90vh] w-screen flex flex-col items-center mb-20">
        <div className="w-[95%] lg:w-4/6 bg-white pt-10 px-5 lg:px-8">
          <Back url="/login" />
          <h1 className="text-4xl py-2 font-medium text-left">Reset</h1>
          <p className="mt-3 text-xs text-slate-500 grotesk">
           Recover your password to gain access to your DeanPay wallet 🙂
          </p>
        </div>
        <div className="w-[95%] lg:w-4/6 bg-white mt-5 px-5 lg:px-8">
          {Status.Error === true && <PayError text={Status.Text} />}
          {Status.Success === true && <PaySuccess text={Status.Text} />}
          <div className="w-full flex flex-row items-center justify-between bg-slate-200 text-slate-600 px-5 py-1 my-3 rounded-lg text-[16px] lg:text-lg">
            <HiOutlineMail />
            <input
              type="email"
              className="text-black bg-transparent w-full focus:outline-none px-4 py-2"
              placeholder="Email Address"
              onChange={emailHandler}
            />
          </div>

          <div className="w-full flex flex-row items-center justify-between bg-slate-200 text-slate-600 px-5 py-1 my-3 rounded-lg text-[16px] lg:text-lg">
            <FaUserSecret />
            <input
              type="text"
              className="text-black bg-transparent w-full focus:outline-none px-4 py-2"
              placeholder="Security Word"
              onChange={wordHandler}
            />
          </div>

          <div className="w-full flex flex-row items-center justify-between bg-slate-200 text-slate-600 px-5 py-1 my-3 rounded-lg text-[16px] lg:text-lg">
            <MdOutlinePassword />
            <input
              type={fieldType}
              className="text-black bg-transparent w-full focus:outline-none px-4 py-2"
              placeholder="New password"
              onChange={newPasswordHandler}
              />
              {passVisibility === true ? (
                <div onClick={toggleVisibility} className="cursor-pointer">
                  <AiOutlineEyeInvisible />
                </div>
              ) : (
                <div onClick={toggleVisibility} className="cursor-pointer">
                  <AiOutlineEye />
                </div>
              )}
          </div>

          <div className="w-full flex flex-row items-center justify-between bg-slate-200 text-slate-600 px-5 py-1 my-3 rounded-lg text-[16px] lg:text-lg">
            <MdOutlinePassword />
            <input
              type={fieldType}
              className="text-black bg-transparent w-full focus:outline-none px-4 py-2"
              placeholder="Confirm new password"
              onChange={confirmPasswordHandler}
            />
          </div>

          {Status.Loading === true && (
            <div className="mt-6">
              <Loader />
            </div>
          )}

          {Status.Loading === false && (
            <button
              type="button"
              className="w-full mt-3 mb-20 py-3 lg:py-4 px-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
              onClick={formHandler}
            >
              Reset Password
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
