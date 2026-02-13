import React from "react";
import Login from "../componets/auth/Login";
import back from "../icons/back.svg";
import more from "../icons/more.svg";

export default function LoginPage() {
  return (
    <>
      <nav className="navbar-phone desk">
        <img onClick={() => navigate(-1)} src={back} alt="" />
      </nav>
      <Login />
    </>
  );
}
