import { useRouter } from "next/router"

const Logout = () => {
     //NextJS router
     const router = useRouter()
    
     //Redirect if the user is already logged in
     const isServer = typeof window === "undefined";
 
     if(!isServer) {
       if(localStorage.getItem("userToken") !== null) {
           localStorage.removeItem("userToken")
         router.push("/login");
       }
     }

     return null
}

export default Logout