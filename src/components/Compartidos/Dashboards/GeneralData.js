import React from 'react';
import {Paper, Typography} from '@mui/material';
import {withStyles} from '@mui/styles';

const styles = theme => ({
    paperChart: {
        backgroundColor: theme.palette.background.paperChart,
        padding: theme.spacing(2),
        textAlign: 'center',
        borderRadius: '10px 50px 10px 50px'
    },
    text:{
        textAlign:'center',
        color: theme.palette.text.main
    },
    digit:{
        textAlign:'center',
        color: theme.palette.text.main
    }
})
const GeneralData = (props) => {
    const {classes, digit, text, currency} = props;
    return (
        <React.Fragment>
            <Paper elevation={24} className={classes.paperChart}>
                <Typography variant={"h3"} className={classes.digit}>
                    {currency ? '$':null} {digit ? digit.toLocaleString('en-US'): null}
                </Typography>
                <Typography variant={"subtitle"} className={classes.text}>
                    {text}
                </Typography>
            </Paper>
        </React.Fragment>
    );
}

export default withStyles(styles)(GeneralData)