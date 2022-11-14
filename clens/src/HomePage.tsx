import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./Pages/Home/Home";
import Navbar from "./components/Toolbar/Navbar";

const HomePage = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default HomePage;
