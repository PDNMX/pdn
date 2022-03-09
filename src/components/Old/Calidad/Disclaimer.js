import React from 'react';
import Typography from "@mui/material/Typography";
import withStyles from '@mui/styles/withStyles';
import Link from '@mui/material/Link';

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
                    En esta sección encontrarás una metodología que proponemos para evaluar la calidad de Datos Abiertos.
                    Con esta metodología se evaluaron los 44 conjuntos de datos de
                    la <Link href="https://datos.gob.mx/busca/group/guia-de-datos-abiertos-anticorrupcion">Guía de Apertura Anticorrupción</Link>.
                </Typography>

            </div>
        );
    }
}

export default withStyles(styles)(Disclaimer);