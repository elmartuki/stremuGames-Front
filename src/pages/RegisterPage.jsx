import React from "react";
import Register from "../componets/auth/Register";
import back from "../icons/back.svg";
import more from "../icons/more.svg";

export default function RegisterPage() {
  return (
    <>
      <nav className="navbar-phone desk">
        <img onClick={() => navigate(-1)} src={back} alt="" />
        <div></div>
      </nav>
      <Register />;
    </>
  );
}
