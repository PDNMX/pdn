import React from 'react';
import {withStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import Glosario from "../Glosario/";
import ScrollToTopButton from "../Navigation/ScrollToTopButton";


const styles = theme => ({
    root: {
        //background: '#f5986f',
        position: 'fixed',
        bottom: '0',
        right: '0',
        zIndex: 1,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1) ,
        paddingRight: theme.spacing(1),
        textAlign: 'right',
        align: "right"
    },
    comenta:{
        margin: theme.spacing(1),
        backgroundColor: '#ffe01b'
    }
});

const Bandita = props => {
    const {classes} = props;
    return (
            <div className={classes.root}>
                <ScrollToTopButton/>
                <div>
                    <Glosario />
                </div>
                <div>
                    <Button variant='contained' className={classes.comenta}
                            href={process.env.REACT_APP_LINK_GOOGLEFORM}
                            target={"_blank"}> Comenta </Button>
                </div>
            </div>

    );
}

export default withStyles(styles)(Bandita);
