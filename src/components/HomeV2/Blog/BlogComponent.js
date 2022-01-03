import React from "react";
import {Typography, Box} from "@mui/material";
import {withStyles} from "@mui/styles";
import BlogCard from "./BlogCard";
import icon_blog from "../../../assets/rediseno/ico_blog.svg";
import rp from "request-promise";
import axios from "axios";

const styles = theme => ({
    root:{
        padding: theme.spacing(2),
        background: 'rgba(255,255,255,0.2)',
        backgroundOpacity: ".2",
        /*borderWidth: 4,
        borderColor: "#fff",
        borderRadius: "3"*/
        maxWidth: 500
    },
    icon:{
        width: 50,
        paddingRight: 10
    }
});

const CustomTypography = withStyles({
    root: {
        color: "#FFF",
        fontWeight: "bold"
    }
})(Typography);

const BlogComponent = props => {
    const [posts, setPosts] = React.useState([]);
    const {classes} = props;

    React.useEffect( () => {
        const config = {
            url: process.env.REACT_APP_BLOG_API_URL,
            method: "GET",
            params: {
                key: process.env.REACT_APP_BLOG_API_KEY,
                limit: 6,
            },
            json: true
        };

        axios(config).then(data => {
            console.log(data);
            setPosts(data.data.posts);
        }).catch(error => {
            console.log(error);
        })
    },[]);

    return (
        <div className={classes.root}>
            <Box display="flex">
                <Box>
                    <img src={icon_blog} alt="Blog PDN" className={classes.icon}/>
                </Box>
                <Box>
                    <CustomTypography variant="h4" paragraph>
                        Blog
                    </CustomTypography>
                </Box>
            </Box>
            {
                posts.map((p, i) => {
                    return <BlogCard key={i} post={p}/>
                })
            }
        </div>
    );
}

export default withStyles(styles)(BlogComponent);