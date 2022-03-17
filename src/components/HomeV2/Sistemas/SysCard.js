import React from "react";
import {Typography, Box} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {withStyles} from "@mui/styles";

const styles = theme => ({
    icon: {
        width: 100
    },
    box: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        width: 230,
        borderRadius: 2,
        //display: "flex",
        //justifyContent: "center"
        textAlign: "center",
        textDecoration: "none"
    },
})

const SysCard = props => {
    const {classes, sys} = props;

    return (
        <Box border={1} className={classes.box}
             style={{borderColor: sys.color}}
             component={RouterLink} to={sys.url}
        >
            <img src={sys.icon} alt={sys.name} className={classes.icon}/>
            <Typography color={sys.color}>{sys.name}</Typography>
        </Box>
    );
};

export default withStyles(styles)(SysCard);