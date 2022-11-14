import React, { useState, useEffect } from "react";

import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import HomePage from "./../../HomePage";
import { makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import SideBar from "../../components/SideBar/SideBar";
import { useParams, useNavigate } from "react-router";
import { IPost } from "./../../Interface/Post";
import axios from "axios";
const theme = createTheme();

const useStyles = makeStyles({
  singlePostImage: {
    width: "500px",
    height: "500px",
    borderRadius: "15px",
    marginLeft: "-1000px",
    marginTop: "100px",
  },
  clickAbleIcons: {
    color: "black",
    "&:hover": {
      color: "grey",
    },
    cursor: "pointer",
    textDecoration: "none",
  },
});

const SinglePost = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  const [post, setPost] = useState<IPost>();
  const [error, setError] = useState<Boolean>(false);

  let navigate = useNavigate();
  const paramId = useParams();
  const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
  });
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await instance.get(`/post/${paramId.id}`);
      setPost(res.data.posts);
    };
    fetchPosts();
  }, []);

  const SubmitDelete = async () => {
    await instance
      .delete(`/post/${paramId.id}`, {
        headers: {},
        data: {
          username: "a",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        console.log(error.message);
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", flex: 10 }}>
        {/* {post ? ( */}
        <>
          <Box sx={{ ml: 90, mt: 18 }}>
            <Typography variant="h4" color="initial">
              {post?.title}
            </Typography>
            <Box>
              <Box width={400}>
                <Typography
                  variant="subtitle2"
                  color="initial"
                  sx={{ fontStyle: "italic", my: 5 }}
                >
                  {post?.desc}
                </Typography>
              </Box>
              <Typography variant="h6">
                Author : <b>Safak</b>
              </Typography>
              <Box sx={{ display: "flex", my: 4 }}>
                <AvTimerIcon />
                <Typography variant="subtitle2" sx={{ mt: 0.3 }}>
                  {post?.createdAt.split("T")[1]} Ago
                </Typography>
              </Box>
              <Box sx={{ ml: 15 }}>
                <Link to={`/write-post/${post?._id}`}>
                  <EditIcon
                    className={classes.clickAbleIcons}
                    onClick={() => {
                      console.log("editIcon");
                    }}
                    sx={{ mr: 2 }}
                  />
                </Link>
                <DeleteIcon
                  className={classes.clickAbleIcons}
                  onClick={SubmitDelete}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <img
              src="https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt=""
              className={classes.singlePostImage}
            />
            <Box />
          </Box>
        </>

        <SideBar />
      </Box>
    </>
  );
};

export default SinglePost;
