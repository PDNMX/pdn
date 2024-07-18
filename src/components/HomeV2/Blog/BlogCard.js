/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {Box, Link, Typography} from "@mui/material";
import {withStyles} from "@mui/styles";
import ReactGA from "react-ga4";

const styles = theme => ({
    root: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        background: "rgb(255,255,255,0.5)",
        textDecoration: "none"
    },
    image: {
        width: 150,
        paddingRight: 10
    }
});

const BlogCard = props => {
    const {classes, post} = props;
    return (
        <Box className={classes.root} display="flex" to={post.url} component={Link} href={post.url} onClick={()=>ReactGA.pageview('/blog')}>            
            <img src={post.feature_image} className={classes.image}/>
            <Typography color="textPrimary">
                {post.title}
            </Typography>
        </Box>
    );
};

export default withStyles(styles)(BlogCard);
