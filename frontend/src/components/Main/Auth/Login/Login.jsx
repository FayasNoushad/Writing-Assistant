import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../helpers/api";

function Login({ setRegister }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (!(email && password)) {
      return alert("Fill all required inputs");
    }
    const data = { email, password };
    try {
      const response = await api.post("/user/login", data);
      if (!response.data.success) {
        return alert("Cannot login!");
      }
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("fName", response.data.fName);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      alert(error);
      return;
    } finally {
      setEmail("");
      setPassword("");
    }
    alert("Login Successfully.");
    navigate(0); // 0 to refresh
  };
  return (
    <form>
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
      <div className="submit-btn">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => submit(e)}
        >
          Submit
        </button>
      </div>
      <span className="login-or-register-msg" onClick={() => setRegister(true)}>
        Not registered? then register.
      </span>
    </form>
  );
}

export default Login;
