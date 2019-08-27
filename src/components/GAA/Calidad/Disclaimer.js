import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: 0,
        paddingTop: 0
    },
});

class Disclaimer extends React.Component{

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography paragraph color="textPrimary">
                    En esta sección encontrarás una metodología que proponemos para evaluar la calidad de datos abiertos.
                    Con esta metodología se evaluaron los 44 conjuntos de datos de la Guía de apertura anticorrupción.
                </Typography>

            </div>
        );
    }
}

export default withStyles(styles)(Disclaimer);