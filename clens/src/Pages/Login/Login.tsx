import React from "react";
import "./Login.css";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router";

import Button from "@mui/material/Button";
const Login = () => {
  const navigate = useNavigate();

  return (
    <Box className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm">
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
        />
        <button className="loginButton">Login</button>
      </form>
      <Button
        variant="contained"
        color="success"
        sx={{ ml: 120 }}
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </Button>
    </Box>
  );
};

export default Login;
