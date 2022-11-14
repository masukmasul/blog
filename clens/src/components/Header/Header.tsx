import { Box, Typography } from "@mui/material";
import React from "react";
import "./Header.css";
import { makeStyles } from "@mui/styles";

import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const Header = () => {
  return (
    <div className={"header"}>
      <div className="headerTitle">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        src="https://images.pexels.com/photos/15286/pexels-photo.jpg?cs=srgb&dl=pexels-luis-del-r%C3%ADo-15286.jpg&fm=jpg"
        alt=""
        className="image"
      />
    </div>
  );
};

export default Header;
