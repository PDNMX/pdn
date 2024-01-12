import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import BlogCard from "./BlogCard";
import axios from "axios";

const styles = () => ({
  container: {
    maxWidth: 1500,
    margin: "auto",
    background: "#f2f0f2",
    paddingTop: "4rem",
    paddingBottom: "4rem",
  },
  root: {
    background: "#f2f0f2",
  },
});

const BlogComponent = (props) => {
  const { classes } = props;
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const config = {
      url: import.meta.env.VITE_BLOG_API_URL,
      method: "GET",
      params: {
        key: import.meta.env.VITE_BLOG_API_KEY,
        limit: 6,
      },
      json: true,
    };

    axios(config)
      .then((data) => {
        //console.log(data);
        setPosts(data.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        className={classes.container}
      >
        <Grid item md={12}>
          <Typography variant="h4">Blog</Typography>
        </Grid>

        <Grid item md={12}>
          <Typography variant="h6" style={{ textAlign: "justify" }} paragraph>
            Conoce nuestra ultimas públicaciones
          </Typography>
        </Grid>

        {posts.map((p, i) => {
          return <BlogCard key={i} post={p} />;
        })}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(BlogComponent);
