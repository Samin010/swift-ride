import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function UserLogout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:5001/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    });

  return <div>User Logout</div>;
}
