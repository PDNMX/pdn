import React from 'react';
import {withStyles} from "@mui/styles";
import {IconButton, Paper, Tooltip} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const styles = theme => ({
    paperChart: {
        backgroundColor: theme.palette.background.paperChart,
        padding: theme.spacing(1),
        color: theme.palette.text.main,
        minHeight: 500
    },
    infoButton:{
        textAlign:'right'
    },
    /* spaceTop:{
        height: 40
    } */
});

const ContainerChart = (props) => {
    const {handleOpen, children, classes} = props;
    return (
        <Paper elevation={24} className={classes.paperChart}>
            {
                typeof handleOpen !== 'undefined' ?
                <div className={classes.infoButton}>
                    <Tooltip title={'Ver información'}>
                        <IconButton onClick={handleOpen} >
                            <HelpOutlineIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
                    :
                <div className={classes.spaceTop}></div>
            }
            {children}
        </Paper>
    );
}

export default withStyles(styles)(ContainerChart);
