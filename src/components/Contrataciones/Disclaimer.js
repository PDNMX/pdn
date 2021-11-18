import React from 'react';
import Typography from "@mui/material/Typography";
import withStyles from '@mui/styles/withStyles';
import Link from "@mui/material/Link";

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

const Disclaimer = props => {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <Typography paragraph color="textPrimary">
                Aquí encontrarás la siguiente información:
            </Typography>

            <ul className={classes.ul}>
                <li className={classes.li}><Typography color="textPrimary" display='inline'>Cuánto gasta el gobierno federal</Typography></li>
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

export default withStyles(styles)(Disclaimer);