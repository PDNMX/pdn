import React from "react";
import {Box, Button} from "@mui/material";
import {withStyles} from "@mui/styles";
import BlogCard from "./BlogCard";
import axios from "axios";
import ReactGA from "react-ga4";

const BlogComponent = props => {
    const [posts, setPosts] = React.useState([]);

    React.useEffect( () => {
        const config = {
            url: import.meta.env.VITE_BLOG_API_URL,
            method: "GET",
            params: {
                key: import.meta.env.VITE_BLOG_API_KEY,
                limit: 3,
            },
            json: true
        };

        axios(config).then(data => {
            //console.log(data);
            setPosts(data.data.posts);
        }).catch(error => {
            console.log(error);
        })
    },[]);

    return (
        <div className='blog'>
            <Box display="flex">
                <Box>
                    <h1>Blog</h1>
                </Box>
            </Box>
            <Box display='flex'>
                {
                    posts.map((p, i) => {
                        return <BlogCard key={i} post={p} />
                    })
                }
            </Box>


            <Box display='flex' flexDirection='row-reverse'>
                <Button 
                    variant="contained"
                    href="https://www.plataformadigitalnacional.org/blog"
                    onClick={()=>ReactGA.pageview('/blog')}
                >
                    Conoce más
                </Button>
            </Box>

        </div>
    );
}

export default withStyles()(BlogComponent);
