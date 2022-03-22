/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Meta from "@/components/Meta";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";

const Signup = () => {
  //NextJS router
  const router = useRouter();

  //Redirect if the user is already logged in
  const isServer = typeof window === "undefined";

  if (!isServer) {
    if (localStorage.getItem("userToken") !== null) {
      router.push("/dashboard");
    }
  }

  //Email Validation String
  const validate =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  //State definitions
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [Word, setWord] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");

  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [Error, setError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [Loading, setLoading] = useState(false);

  //Error reset function
  const resetError = () => {
    if (Error.isError !== false) {
      setError({
        isError: false,
        errorMessage: "",
      });
    }
  };

  //First name change handler
  const firstChangeHandler = (e) => {
    setFirstName(e.target.value.trim());
    resetError();
  };
  //Last name input change handler
  const lastChangeHandler = (e) => {
    setLastName(e.target.value.trim());
    resetError();
  };
  //Email input change handler
  const emailChangeHandler = (e) => {
    setEmail(e.target.value.trim());
    resetError();
  };
  //Phone number change handler
  const phoneChangeHandler = (e) => {
    setPhoneNumber(parseInt(e.target.value.trim()));
    resetError();
  };

  //Password input change handler
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value.trim());
    resetError();
  };

  //Confirm Password input change handler
  const passwordConfirmChangeHandler = (e) => {
    setPasswordConfirmation(e.target.value.trim());
    resetError();
  };

  //Words handler
  const wordHandler = (e) => {
    setWord(e.target.value.trim());
  };

  //Form submission handler
  const formHandler = (form) => {
    form.preventDefault();

    //Check if any of the fields are blank
    if (!(firstName && lastName && email && Word && password && passwordConfirmation)) {
      setError({
        isError: true,
        errorMessage: "All fields are required! 🙂",
      });
    } else {
      //Check if the email address is validate
      if (!emailField.value.match(validate)) {
        setError({
          isError: true,
          errorMessage: "E-mail field is invalid! 😕",
        });
      } else {
        //Check if the password is too short i.e < 6
        if (password.length < 6) {
          setError({
            isError: true,
            errorMessage: "Password is too short! (at least 6 characters) 😁",
          });
        } else {
          //Check if the passwords matchall
          if (password !== passwordConfirmation) {
            setError({
              isError: true,
              errorMessage: "Passwords do not match! 🥲",
            });
          } else {
            if (typeof phoneNumber !== "number") {
              setError({
                isError: true,
                errorMessage: "Invalid Phone Number!",
              });
            } else {
              //If all the conditions have been met, make the Api call
              setLoading(true); //Activate the loader
              const phone_number = phoneNumber
                .toString()
                .split("")
                .slice(-10)
                .join("");

              const capitalVar = (text) => {
                const capitalArray = text.split("");
                const capitalFirst = capitalArray[0].toUpperCase();
                const capitalWord = capitalArray.join("");

                return capitalWord;
              };

              const first_name = capitalVar(firstName);
              const last_name = capitalVar(lastName);

              axios
                .post("https://api.deanpay.com/api/users/create", {
                  first_name,
                  last_name,
                  email,
                  secretWord : Word,
                  phone_number,
                  password,
                  password_confirm: passwordConfirmation,
                })
                .then((res) => {
                  setLoading(false); //Stop the loader
                  localStorage.setItem("userToken", String(res.data.token)); //save the token to local storage

                  //Redirect to dashboard
                  router.push("/dashboard");
                })
                .catch((err) => {
                  setLoading(false);
                  setError({
                    isError: true,
                    errorMessage: err.response.data.message,
                  });
                });
            }
          }
        }
      }
    }
  };

  return (
    <>
      <Meta
        title="Sign Up | DeanPay"
        desc="Create an account to enjoy easy payments!"
      />
      <div className="block lg:hidden"></div>
      <div className="flex flex-row w-screen">
        <div className="hidden w-full h-screen bg-slate-100 text-white lg:flex flex-col justify-center items-center">
          <img src="/img/auth.svg" className="w-4/5 p-4" alt="Image" />
        </div>
        <div className="w-full">
          <div className="flex w-full h-[90vh] lg:h-[100vh] justify-center items-center">
            <form
              onSubmit={formHandler}
              className="w-[90%] md:w-5/6 bg-white px-1 py-12 md:px-12"
            >
              <h1 className="text-4xl lg:text-5xl font-medium py-5">Sign Up</h1>
              {Error.isError && (
                <div
                  className="bg-red-100 w-full rounded-xl py-3 text-red-600 font-light text-xs text-center px-3 my-3"
                  id="error"
                >
                  {Error.errorMessage}
                </div>
              )}
              <div className="flex space-x-2">
              {/* First Name */}
              <input
                type="text"
                onChange={firstChangeHandler}
                className="font-light bg-slate-50 border-2 border-slate-300 focus:outline-none focus:border-slate-900 rounded-xl w-full py-2 px-4 text-lg my-3"
                placeholder="First Name..."
                id="firstField"
              />

              {/* Last Name */}
              <input
                type="text"
                onChange={lastChangeHandler}
                className="font-light bg-slate-50 border-2 border-slate-300 focus:outline-none focus:border-slate-900 rounded-xl w-full py-2 px-4 text-lg my-3"
                placeholder="Last Name..."
                id="lastField"
              />
              </div>
              {/* Phone Number */}
              <input
                type="tel"
                onChange={phoneChangeHandler}
                className="block font-light bg-slate-50 border-2 border-slate-300 focus:outline-none focus:border-slate-900 rounded-xl w-full py-2 px-4 text-lg my-3"
                placeholder="Phone Number..."
                id="phoneField"
              />
              {/* Email Address */}
              <input
                type="email"
                onChange={emailChangeHandler}
                className="block font-light bg-slate-50 border-2 border-slate-300 focus:outline-none focus:border-slate-900 rounded-xl w-full py-2 px-4 text-lg my-3"
                placeholder="Email address..."
                id="emailField"
              />

              <div className="flex space-x-2">
              {/* Password */}
              <input
                type="password"
                onChange={passwordChangeHandler}
                className="block font-light bg-slate-50 border-2 border-slate-300 focus:outline-none focus:border-slate-900 rounded-xl w-full py-2 px-4 text-lg my-3"
                placeholder="Password..."
                id="passwordField"
              />
              {/* Password Confirm */}
              <input
                type="password"
                onChange={passwordConfirmChangeHandler}
                className="block font-light bg-slate-50 border-2 border-slate-300 focus:outline-none focus:border-slate-900 rounded-xl w-full py-2 px-4 text-lg my-3"
                placeholder="Confirm Password..."
                id="passwordConfirmField"
              />
              </div>

              {/* Secret Word */}
              <input
                type="text"
                onChange={wordHandler}
                className="block font-light bg-slate-50 border-2 border-slate-300 focus:outline-none focus:border-slate-900 rounded-xl w-full py-2 px-4 text-lg my-3"
                placeholder="Secret Word"
                id="wordField"
              />
              <h2 className="text-xs text-red-600">
                Enter only <b>ONE</b> word here; needed for password recovery, make it something you will <b>CERTAINLY</b> remember
              </h2>

              
              {!Loading && (
                <button
                  type="submit"
                  className="w-full rounded-xl py-3 bg-[#2e63c0] text-white hover:text-white hover:bg-blue-900 mt-7 font-normal"
                  id="buttonField"
                >
                  Sign Up
                </button>
              )}
              {Loading && (
                <div className="loaderContainer bg-slate-100 w-full rounded-tl-xl rounded-br-xl py-3 mt-7 font-normal">
                  <div className="loader"></div>
                </div>
              )}
              <div className="mt-5 text-xs md:text-sm font-normal flex justify-end">
                <p className="text-blue-500 flex items-center">
                  <FaSignInAlt /> &nbsp;{" "}
                  <Link href="/login">I have an account</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
