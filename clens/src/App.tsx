import React from "react";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SinglePost from "./Pages/SinglePost/Single";
import HomePage from "./HomePage";
import Navbar from "./components/Toolbar/Navbar";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Settings from "./Pages/Settings/Settings";
import Write from "./Pages/Write/Write";
const THEME = createTheme({
  typography: {
    fontFamily: "Raleway, Arial",
  },
});

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/blog-post/:id" element={<SinglePost />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/write-post" element={<Write />} />
          <Route path="/write-post/:id" element={<Write />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
