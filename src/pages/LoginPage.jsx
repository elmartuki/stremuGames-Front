import React from "react";
import Login from "../components/auth/Login";
import back from "../icons/back.svg";
import more from "../icons/more.svg";
import { useNavigate }  from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar-phone desk">
        <img onClick={() => navigate(-1)} src={back} alt="" />
      </nav>
      <Login />
    </>
  );
}
