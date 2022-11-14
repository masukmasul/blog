import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

import PinterestIcon from "@mui/icons-material/Pinterest";
import SearchIcon from "@mui/icons-material/Search";

import { createTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const theme = createTheme();

const useStyles = makeStyles({
  sideBar: {
    margin: "20px",
    paddingBottom: "30px",
    backgroundColor: "white",
    borderRadius: "10px",
    flexDirection: "column",
    width: "400px",
  },
  sideBarTitle: {
    margin: "10px",
    padding: "5px",
    width: "80%",
    borderTop: "1px solid grey",
    borderBottom: "1px solid grey",
    fontFamily: `"Varela Rounds",sans-serif`,
    fontWeight: "600",
    lineHeight: "20px",
    textAlign: "center",
  },
  sideBarList: {
    listStyle: "none",
    marginBottom: "30px",
  },
  sideBarListItem: {
    display: "inline-block",
    width: "50%",
    marginTop: "15px",
    cursor: "pointer",
  },
  sideBarItem: {},
  image: {
    marginTop: "30px",
    width: "300px",
    height: "300px",
    marginLeft: "10px",
    borderRadius: "10px",
  },
});
const SideBar = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.sideBar} sx={{ display: "flex", flex: 3 }}>
        <Box className={classes.sideBarItem}>
          <Box
            component="span"
            sx={{ display: "block" }}
            className={classes.sideBarTitle}
          >
            ABOUT ME
          </Box>

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgEAW5tuKp1DEwUNcGka3339CzDmVH2jqx8RX3OWdP&s"
            alt=""
            className={classes.image}
          />
          <Typography
            variant="subtitle2"
            color="initial"
            sx={{ p: 2, fontStyle: "oblique", align: "center" }}
            align="center"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            obcaecati. Adipisci totam unde molestiae inventore. Minima, vero
            temporibus et unde aperiam illum blanditiis porro nulla, deserunt
            doloribus quos saepe similique!
          </Typography>
        </Box>

        <Box className={classes.sideBarItem}>
          <Box
            component="span"
            sx={{ display: "block" }}
            className={classes.sideBarTitle}
          >
            Categories
          </Box>
          <ul className={classes.sideBarList}>
            <li className={classes.sideBarListItem}>Life</li>
            <li className={classes.sideBarListItem}>Music</li>
            <li className={classes.sideBarListItem}>Sport</li>
            <li className={classes.sideBarListItem}>Cinema</li>
            <li className={classes.sideBarListItem}>tech </li>
          </ul>
        </Box>
        <Box className={classes.sideBarItem}>
          <Box
            component="span"
            sx={{ display: "block" }}
            className={classes.sideBarTitle}
          >
            Follow US
          </Box>
          <Box className={classes.sideBarItem} sx={{ mx: 15 }}>
            <FacebookIcon style={{ color: "black" }} />
            <PinterestIcon style={{ color: "black" }} />
            <TwitterIcon style={{ color: "black" }} />
            <GoogleIcon style={{ color: "black" }} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
