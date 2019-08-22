import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: 0,
        paddingTop: 0
    },
    bullet: {
        backgroundColor: '#89d4f2',
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        display: 'inline-block',
        marginLeft: '-20px',
        marginRight: "10px",
        marginBottom: '1px'
    },
    ul: {
        listStyle: 'none',
        //marginLeft: 0,
        paddingLeft: '20px'
    },
    li: {
        //paddingBottom: theme.spacing(2)
    },
});

class Disclaimer extends React.Component{

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography paragraph>
                    En esta sección encontrarás la metodología para evaluar la calidad de datos abiertos.
                    Con esta metodología se evaluaron los 44 conjuntos de datos de la Guía de apertura anticorrupción.
                </Typography>

            </div>
        );
    }
}

export default withStyles(styles)(Disclaimer);