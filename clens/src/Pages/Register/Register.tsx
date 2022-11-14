import React from "react";
import "./Register.css";
import { useNavigate, useParams } from "react-router";

import Button from "@mui/material/Button";
const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm">
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
        />
        <button className="registerButton">Register</button>
      </form>
      <Button
        variant="contained"
        color="success"
        sx={{ ml: 120 }}
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default Register;
