import React from "react";
import Register from "../components/auth/Register";
import back from "../icons/back.svg";
import more from "../icons/more.svg";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar-phone desk">
        <img onClick={() => navigate(-1)} src={back} alt="" />
        <div></div>
      </nav>
      <Register />
    </>
  );
}
