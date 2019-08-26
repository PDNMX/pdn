import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";
import Link from "@material-ui/core/Link";

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: 0,
        paddingTop: 0
    },

    ul: {
        listStyle: 'none',
        paddingLeft: '20px'
    },
    li: {
        "&:before":{
            content: '"•"',
            color: '#5fb1e6',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
        //paddingBottom: theme.spacing(2)
    },
});

class Disclaimer extends React.Component{

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography paragraph color="textPrimary">
                    Aquí encontrarás la siguiente información:
                </Typography>

                <ul className={classes.ul}>
                    <li className={classes.li}><Typography color="textPrimary" display='inline'>Cuánto gasta el gobierno</Typography></li>
                    <li className={classes.li}><Typography color="textPrimary" display='inline'>Qué tipos de procedimientos</Typography></li>
                    <li className={classes.li}><Typography color="textPrimary" display='inline'>Información sobre los proveedores que participan</Typography></li>
                </ul>

                <Typography paragraph color='textPrimary'>
                    Los datos utilizados en esta sección fueron tomados del portal de datos abiertos
                    del gobierno <Link href="https://datos.gob.mx/busca/organization/contrataciones-abiertas" target="_blank">datos.gob.mx</Link>.
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(Disclaimer);