import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core"
import CandlestickExample from "../candlestick/candlestick-example";
import "../candlestick/styles/examples.scss";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class GAA extends React.Component{

    render(){
        const {classes} = this.props;

        return <div className={classes.root}>
            <Typography paragraph>
                Guía de Apertura Anticorrupción
            </Typography>

            <CandlestickExample/>


        </div>
    }
}


export default withStyles(styles)(GAA);