import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProtectWrapper({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // console.log(token)
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return <>{children}</>;
}

export default UserProtectWrapper;
