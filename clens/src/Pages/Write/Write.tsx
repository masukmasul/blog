import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { createTheme } from "@mui/material/styles";
import SideBar from "./../../components/SideBar/SideBar";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router";
import { IPost } from "./../../Interface/Post";

const theme = createTheme();

const useStyles = makeStyles({});

const Write = () => {
  let navigate = useNavigate();
  const classes = useStyles();
  const [createPost, setCreatePost] = useState({ title: "", desc: "" });
  const [success, setSuccess] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [alert, setAlert] = useState<Boolean>(true);
  const [message, setMessage] = useState<String>("");

  const paramId = useParams();
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 10000);
  });
  const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
  });
  useEffect(() => {
    if (paramId) {
      const fetchPosts = async () => {
        await instance
          .get(`/post/${paramId.id}`)
          .then((response) => {
            createPost.title = response.data.posts?.title;

            setCreatePost({ ...createPost, desc: response.data.posts?.desc });
          })
          .catch((e) => {
            setMessage(e.message);
          });
      };
      fetchPosts();
    }
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatePost({ ...createPost, [e.target.id]: e.target.value });
  };
  const formSubmit = async () => {
    if (paramId) {
      await instance
        .put(`/post/${paramId.id}`, {
          username: "a",
          title: createPost?.title,
          desc: createPost?.desc,
        })
        .then(
          (response) => {
            setSuccess(true);
            createPost.title = "";

            setCreatePost({ ...createPost, desc: "" });
            setMessage("Blog Edited Successfully");
            setAlert(true);
          },
          (error) => {
            setMessage(error.message);
            setError(true);
            setAlert(true);
            console.log(error);
          }
        );
    } else {
      await instance
        .post("/post/create-post", {
          title: createPost.title,
          desc: createPost.desc,
          username: "a",
        })
        .then(
          (response) => {
            setSuccess(true);
            setCreatePost({ ...createPost, title: "" });
            setCreatePost({ ...createPost, desc: "" });
            setMessage("Blog Submitted Successfully");
            setAlert(true);
          },
          (error) => {
            setMessage(error.message);
            setError(true);
            setAlert(true);
          }
        );
    }
  };
  return (
    <>
      <form action="" method="post">
        {success && alert ? (
          <Alert severity="success" sx={{ mt: 10, width: "35%", mx: 72 }}>
            {message}
          </Alert>
        ) : error && alert ? (
          <Alert severity="error" sx={{ mt: 10, width: "35%", mx: 72 }}>
            {message}
          </Alert>
        ) : (
          <></>
        )}

        <Box>
          <TextField
            sx={{ my: 10, mx: 70 }}
            id="title"
            label="Title"
            placeholder="Whats the story about"
            variant="standard"
            value={createPost.title}
            onChange={handleSubmit}
          />
          <TextField
            sx={{ mx: 70, width: 500 }}
            style={{ height: 200 }}
            id="desc"
            label="Description"
            placeholder="Share Your Thoughts"
            variant="standard"
            value={createPost.desc}
            onChange={handleSubmit}
          />
          <Button
            variant="outlined"
            color="success"
            sx={{ mx: 70 }}
            style={{ height: "50px" }}
            onClick={formSubmit}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Write;
