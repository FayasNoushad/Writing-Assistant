import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../helpers/api";

function Register({ setRegister }) {
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!(fName && email && password)) {
      return alert("Fill all required fields");
    }
    if (password != confirmPassword) {
      setIsPasswordWrong(true);
      return;
    }
    const data = {
      email,
      fName,
      lName,
      password,
    };
    try {
      const response = await api.post("/user/register", data);
      console.log(response);
      if (!response.data.success) {
        return alert("Something wrong");
      }
      localStorage.setItem("email", email);
      localStorage.setItem("fName", fName);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      return alert(error);
    }
    setFName("");
    setLName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    alert("Registered Successfully.");
    navigate(0);
  };
  return (
    <form>
      <div className="row">
        <label>Name</label>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            aria-label="First name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            aria-label="Last name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        {isPasswordWrong && (
          <small className="password-wrong">* Confirm password is wrong</small>
        )}
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            if (password === e.target.value) {
              setIsPasswordWrong(false);
            }
            setConfirmPassword(e.target.value);
          }}
          required
        />
      </div>
      <br />
      <div className="submit-btn">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => submit(e)}
        >
          Submit
        </button>
      </div>
      <span
        className="login-or-register-msg"
        onClick={() => setRegister(false)}
      >
        Already registered? then login.
      </span>
    </form>
  );
}

export default Register;
