import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

function CaptainProtectWrapper({ children }) {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  // console.log(token)
  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
     axios
       .get("http://localhost:5001/captains/profile", {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       })
       .then((response) => {
         if (response.status === 200) {
           setCaptain(response.data.captain);
           setIsLoading(false);
         }
       })
       .catch((error) => {
         console.log("Error in Captain Protect Wrapper", error.message);
         localStorage.removeItem("token");
         navigate("/captain-login");
       });

  }, [token,navigate,setCaptain]);

  // We dont want to validate only on the basis of token because token is created both at the time of user as well as captain login
 
  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default CaptainProtectWrapper;
