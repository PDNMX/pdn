import React from "react";
import BlogComponent from "./Blog/BlogComponent";
import SysPDN from "./Sistemas/SysPDN";
import {Grid} from "@mui/material";
import {withStyles} from "@mui/styles";

const styles = theme => ({
    root: {
        //background: "#263d49",
        padding: theme.spacing(2),
        flexGrow: 1
    }
});

const BlogSys = props => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5} lg={4} xl={4}>
                    <BlogComponent/>
                </Grid>

                <Grid item xs={12} md={7} lg={8} xl={8}>
                    <SysPDN/>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(BlogSys);