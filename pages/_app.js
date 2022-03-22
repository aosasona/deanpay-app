//Packages
import Router from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";
import { useRouter } from "next/router";
//Stylesheets
import "../styles/globals.css";
import "../styles/nprogress.css";

//Router events
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // const protectedRoutes = ["fund", "pay", "transfer"];

  useEffect(() => {
    const userToken = localStorage.getItem("userToken"); //get current token
    const pathName = router.pathname; //get the current path name

    // console.log(pathName);
    //Check if the route matches any of the protected ones
    const checkRoute = () => {
      if (
        pathName.includes("/pay") ||
        pathName.includes("/fund") ||
        pathName.includes("/transfer") ||
        pathName.includes("/logout") ||
        pathName.includes("/verification") ||
        pathName.includes("/security") ||
        pathName.includes("/fail") ||
        pathName.includes("/success")
      ) {
        return true;
      }
    };
    if (
      checkRoute &&
      (userToken == null || userToken == undefined) &&
      pathName.trim() !== "/"
    ) {
      router.push("/login");
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
