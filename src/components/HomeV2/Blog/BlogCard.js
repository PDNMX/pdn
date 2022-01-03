import React from 'react';
import {Box, Typography} from "@mui/material";
import {withStyles} from "@mui/styles";

const styles = theme => ({
    root: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        background: "rgb(255,255,255,0.5)"
    },
    image: {
        width: 150,
        paddingRight: 10
    }
});

const BlogCard = props => {
    const {classes, post} = props;
    return (
        <Box className={classes.root} display="flex">
            <img src={post.feature_image} className={classes.image}/>
            <Typography>
                {post.title}
            </Typography>
        </Box>
    );
};

export default withStyles(styles)(BlogCard);