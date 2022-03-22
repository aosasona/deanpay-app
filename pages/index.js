/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Meta from "@/components/Meta";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";


const Login = () => {

    //NextJS router
    const router = useRouter()
    
    //Redirect if the user is already logged in
    const isServer = typeof window === "undefined";

    if(!isServer) {
      if(localStorage.getItem("userToken") !== null) {
        router.push("/dashboard");
      }
    }

  //State definitions
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

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

  //Email input change handler
  const emailChangeHandler = (e) => {
    setEmail((email = e.target.value.trim()));
    resetError();
  };

  //Password input change handler
  const passwordChangeHandler = (e) => {
    setPassword((password = e.target.value.trim()));
    resetError();
  };

  //Form submission handler
  const formHandler = (form) => {

    form.preventDefault();

    //Check if none is blank
    if (!email || !password) {
      if (!email) {
        var inputError = "Email field cannot be empty 😏";
      } else {
        var inputError = "Provide a password 🙄";
      }
      setError({
        isError: true,
        errorMessage: inputError,
      });
    } else {
      //Check if the email is in the right format
      const validate =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (String(email).match(validate)) {
        //Make the loader visible
        setLoading(true);

        //Make the API call
        axios
          .post("https://api.deanpay.com/api/users/login", {
            email,
            password,
          })
          .then((res) => {
              
            setLoading(false); //Stop the loader
            localStorage.setItem("userToken", String(res.data.token)); //save the token to local storage

            //Redirect to dashboard
            router.push("/dashboard");
            
          })
          .catch((err) => {
              setLoading(false)
              setError({
                  isError : true,
                  errorMessage : err.response.data.message
              })
          });
      } else {
        setError({
          isError: true,
          errorMessage: "Provide a VALID email 🤦🏻‍♂️",
        });
      }
    }
  };

  return (
    <>
      <Meta title="Login | DeanPay" desc="Sign in to your account to enjoy discounts!"/>
      <div className="block lg:hidden">
      </div>
      <div className="flex flex-row w-screen">
        <div className="hidden w-full h-[100vh] bg-slate-100 text-white lg:flex flex-col justify-center items-center">
          <img src="/img/auth.svg" className="w-4/5 p-4" alt="Image" />
        </div>
        <div className="w-full">
          <div className="flex w-full h-[90vh] lg:h-[100vh] justify-center items-center">
            <form
              onSubmit={formHandler}
              className="w-5/6 px-2 py-12 md:px-12 rounded-2xl"
            >
              <h1 className="text-4xl lg:text-5xl font-medium py-5">Login</h1>
              <input
                type="text"
                onChange={emailChangeHandler}
                className="block font-light bg-slate-50 border-2 border-slate-300 focus:outline-none focus:border-slate-900 rounded-xl w-full py-2 px-4 text-lg my-3"
                placeholder="Email address..."
                id="emailField"
              />
              <input
                type="password"
                onChange={passwordChangeHandler}
                className="block font-light bg-slate-50 border-2 border-slate-300 focus:outline-none focus:border-slate-900 rounded-xl w-full py-2 px-4 text-lg my-3"
                placeholder="Password..."
                id="passwordField"
              />
              {Error.isError && (
                <div
                  className="bg-red-100 w-full rounded-xl py-3 text-red-600 font-light text-xs text-center px-3"
                  id="error"
                >
                  {Error.errorMessage}
                </div>
              )}
              {!Loading && (
                <button
                  type="submit"
                  className="w-full rounded-xl py-3 bg-[#2e63c0] text-white hover:text-white hover:bg-blue-900 mt-7 font-normal"
                  id="buttonField"
                >
                  Sign In
                </button>
              )}
              {Loading && (
                <div className="loaderContainer bg-slate-100 w-full rounded-xl py-3 mt-7 font-normal">
                  <div className="loader"></div>
                </div>
              )}
              <div className="mt-5 text-xs md:text-sm font-normal flex justify-between">
                <p className="text-red-500">
                  <Link href="/reset">Forgot Password?</Link>
                </p>
                <p className="text-[#2e63c0] flex items-center">
                  <FaUser /> &nbsp;{" "}
                  <Link href="/signup">Create An Account</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Login;
