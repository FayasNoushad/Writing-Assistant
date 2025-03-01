import React, { useState } from "react";
import "./Auth.css";
import Register from "./Register/Register";
import Login from "./Login/Login";

function Auth({ register = false }) {
  const [registerStatus, setRegisterStatus] = useState(register);
  return (
    <div className="auth">
      <h2 className="auth-heading">{registerStatus ? "Register" : "Login"}</h2>
      <br />
      {registerStatus ? (
        <Register setRegister={setRegisterStatus} />
      ) : (
        <Login setRegister={setRegisterStatus} />
      )}
    </div>
  );
}

export default Auth;
