import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { IPost } from "../../Interface/Post";

const theme = createTheme();

const useStyles = makeStyles({
  post: {
    borderRadius: "10px",
    fontFamily: `'Josefin Sans',sans-serif`,
  },
  postImage: {
    width: "325px",
    marginBottom: "10px",
    borderRadius: "10px",
  },
  postInfo: {},
  postCats: {},
  postCat: {},
  postTitle: {},
  postDate: {},
  button: {
    color: "grey",
    backgroundColor: "red",
    height: "20px",
    width: "10px",
  },
});

export interface Props {
  post: any;
}
const Post = ({ post }: Props) => {
  const classes = useStyles();
  return (
    <>
      <Box width={325} className={classes.post} sx={{ ml: 6, mt: 6 }}>
        <img
          src="https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt=""
          className={classes.postImage}
        />
        <Box className={classes.postInfo}>
          <Box className={classes.postCats}>
            {post.categories.map((data: any, index: number) => (
              <Button
                variant="contained"
                className={classes.button}
                sx={{ mb: 2 }}
              >
                {data}
              </Button>
            ))}
          </Box>

          <Typography
            variant="h6"
            color="initial"
            sx={{ mb: 2, fontStyle: "italic", fontFamily: "Monospace" }}
            align="center"
          >
            {post.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="initial"
            sx={{ mb: 2, fontStyle: "oblique" }}
            align="center"
          >
            {post.desc}
          </Typography>
          <hr />
          <Box sx={{ display: "flex", my: 2 }}>
            <AvTimerIcon />
            <Typography variant="subtitle2" sx={{ mt: 0.3 }}>
              1 hour ago
            </Typography>
          </Box>
          <Link to={`/blog-post/${post._id}`}>
            <Button variant="text" sx={{ w: "325", ml: 13 }}>
              See Full Blog
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Post;
