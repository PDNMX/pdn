import React from "react";
import { Grid, Link, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import ReactGA from "react-ga4";

const styles = (theme) => ({
  root: {},
  image: {
    width: 150,
    paddingRight: 10,
  },
});

const BlogCard = (props) => {
  const { classes, post } = props;
  return (
    <Grid
      item
      md={4}
      to={post.url}
      component={Link}
      href={post.url}
      onClick={() => ReactGA.pageview("/blog")}
    >
      {/* <div className="blog-img">
        <img src={post.feature_image} className={classes.image} />
      </div> */}
      <Typography>{post.title}</Typography>
    </Grid>
  );
};

export default withStyles(styles)(BlogCard);
