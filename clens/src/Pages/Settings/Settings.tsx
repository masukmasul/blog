import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

import { makeStyles } from "@mui/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createTheme } from "@mui/material/styles";
import SideBar from "./../../components/SideBar/SideBar";
const theme = createTheme();

const useStyles = makeStyles({
  Settings: {},
  se: {},
  singlePostImage: {
    width: "500px",
    height: "500px",
    borderRadius: "15px",
    marginLeft: "-1000px",
    marginTop: "100px",
  },
  singlePostTitle: {},
  singlePostEdit: {},
});
const Settings = () => {
  const classes = useStyles();
  return (
    <Box className={classes.Settings} sx={{ display: "flex", flex: 8 }}>
      <Box>
        <Box sx={{ display: "flex", my: 2 }}>
          <Typography
            variant="h6"
            color="info"
            sx={{ flex: 1, m: 2, fontFamily: "sans-serif" }}
          >
            Update Your Account
          </Typography>
          <Typography
            variant="h6"
            color="initial"
            sx={{ m: 2, fontFamily: "sans-serif" }}
          >
            Delete Your Account
          </Typography>
        </Box>
        <img
          src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          style={{
            height: "200px",
            width: "200px",
            borderRadius: "50%",
            marginLeft: "35px",
          }}
        />
        <AccountCircleIcon />
        <div>
          <TextField
            id=""
            label="UserName"
            placeholder="UserName"
            defaultValue="Adil Ahmad"
            onChange={() => {}}
            sx={{ width: 1000, my: 5, ml: 2 }}
          />
        </div>
        <div>
          <TextField
            id=""
            label="Email"
            placeholder="Adam Bas"
            defaultValue="ab@gmail.com"
            onChange={() => {}}
            sx={{ width: 1000, mb: 5, ml: 2 }}
          />
        </div>
        <div>
          <TextField
            id=""
            label="Password"
            placeholder="***"
            onChange={() => {}}
            sx={{ width: 1000, mb: 5, ml: 2 }}
          />
        </div>
        <Button variant="outlined" color="primary" sx={{ ml: 100 }}>
          Submit
        </Button>
      </Box>
      <SideBar />
    </Box>
  );
};

export default Settings;
