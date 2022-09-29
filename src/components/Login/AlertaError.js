import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const AlertaError = props => {
    const classes = useStyles();
    const {alertData, setAlertData} = props;

    return (<div className={classes.root}>
        <Collapse in={alertData.open}>
            <Alert
                severity={alertData.severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setAlertData({
                                ...alertData,
                                open: false
                            });
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                <AlertTitle>Atención</AlertTitle>
                {alertData.message}
            </Alert>
        </Collapse>
    </div>);
}

export default AlertaError;