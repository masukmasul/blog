import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import SideBar from "../../components/SideBar/SideBar";
import { Box, Grid } from "@mui/material";
import SinglePost from "../SinglePost/Single";
import Write from "./../Write/Write";
import Settings from "./../Settings/Settings";
import Login from "./../Login/Login";
import axios from "axios";
import { IPost } from "./../../Interface/Post";
import Posts from "../../components/Posts/Posts";
const Home = () => {
  const [posts, setPost] = useState<IPost[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const instance = await axios.create({
        baseURL: "http://localhost:8080/api/",
      });

      const res = await instance.get("/post");
      setPost(res.data.posts);
    };
    fetchPosts();
  });
  return (
    <div>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Posts posts={posts} />

        <SideBar />
      </Box>
    </div>
  );
};

export default Home;
