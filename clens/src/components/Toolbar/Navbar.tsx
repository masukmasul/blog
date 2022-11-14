import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PinterestIcon from "@mui/icons-material/Pinterest";
import SearchIcon from "@mui/icons-material/Search";

import { Box } from "@mui/material";

import { makeStyles } from "@mui/styles";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
export interface Props {}

const useStyles = makeStyles({
  typo: {
    fontFamily: `"Lora",sans-serif`,
    textTransform: "uppercase",
  },
});
const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar
      position="relative"
      variant="elevation"
      style={{ backgroundColor: "white", fontFamily: "Josefin Sans" }}
    >
      <Toolbar variant="regular">
        <Box className={"Topleft"} sx={{ display: "flex", flex: 0.7 }}>
          <FacebookIcon style={{ color: "black" }} />
          <PinterestIcon style={{ color: "black" }} />
          <TwitterIcon style={{ color: "black" }} />
          <GoogleIcon style={{ color: "black" }} />
        </Box>

        <Box
          className={classes.typo}
          style={{ fontFamily: "Josefin Sans", textTransform: "capitalize" }}
          sx={{ display: "flex", flex: 1 }}
        >
          <Link to="/">
            <Typography
              variant="h6"
              color="initial"
              sx={{ ml: 3 }}
              className={classes.typo}
            >
              Home
            </Typography>
          </Link>
          <Link to="/write-post">
            <Typography
              variant="h6"
              className={classes.typo}
              color="initial"
              sx={{ ml: 3 }}
            >
              Write Blog
            </Typography>
          </Link>
          <Link to="contactus">
            <Typography
              className={classes.typo}
              variant="h6"
              color="initial"
              sx={{ ml: 3 }}
            >
              Contact Us
            </Typography>
          </Link>
          <Link to="/service">
            <Typography
              className={classes.typo}
              variant="h6"
              color="initial"
              sx={{ ml: 3 }}
            >
              Service
            </Typography>
          </Link>
        </Box>

        <Box className={"Middle"} sx={{ display: "flex" }}>
          <Link to="/settings">
            <img
              src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              style={{ height: "40px", width: "40px", borderRadius: "50%" }}
            />
          </Link>
          <SearchIcon
            style={{ color: "black", fontSize: "28px" }}
            sx={{ ml: 1, mt: 0.5 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
