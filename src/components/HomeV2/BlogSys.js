import React from "react";
import BlogComponent from "./Blog/BlogComponent";
import SysPDN from "./Sistemas/SysPDN";
import {Grid} from "@mui/material";
import {withStyles} from "@mui/styles";

const styles = theme => ({
    root: {
        //background: "#263d49",
        //padding: theme.spacing(2),
        //flexGrow: 1
    }
});

const BlogSys = props => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Grid item xs={12} md={12} lg={12} xl={12}  alignItems="flex-start" justifyContent='center'>
                    <SysPDN/>
            </Grid>
            

               
            
        </div>
    );
}

export default withStyles(styles)(BlogSys);