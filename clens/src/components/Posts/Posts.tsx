import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { IPost } from "./../../Interface/Post";
import Post from "../Post/Post";
const theme = createTheme();

const useStyles = makeStyles({});
export interface Props {
  posts: IPost[];
}
const Posts = ({ posts }: Props) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        {posts.map((data: IPost) => {
          return (
            <Grid item xs={4}>
              <Post post={data} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Posts;
