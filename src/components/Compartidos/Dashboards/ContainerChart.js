import React from 'react';
import {withStyles} from "@mui/styles";
import {IconButton, Paper} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const styles = theme => ({
    paperChart: {
        backgroundColor: theme.palette.background.paperChart,
        padding: theme.spacing(1),
        overflow: 'auto',
        color: theme.palette.text.main,
        minHeight: 450
    },
    infoButton:{
        textAlign:'right'
    },
    spaceTop:{
        height: 40
    }
});

const ContainerChart = (props) => {
    const {handleOpen, children, classes} = props;
    return (
        <Paper elevation={24} className={classes.paperChart}>
            {
                typeof handleOpen !== 'undefined' ?
                <div className={classes.infoButton}>
                    <IconButton onClick={handleOpen}>
                        <HelpOutlineIcon/>
                    </IconButton>
                </div>
                    :
                <div className={classes.spaceTop}></div>
            }
            {children}
        </Paper>
    );
}

export default withStyles(styles)(ContainerChart);