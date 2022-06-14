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
    link: {
        textDecoration: "none",
        color: '#89d4f2',//theme.palette.text.linkColor,
        wordBreak: "break-all",
    },
});

const CustomTypography = withStyles(theme =>({
    root: {
        color: theme.palette.text.main
    }
}))(Typography);

const Disclaimer = props => {
    const {classes, dataSupplier} = props;

    return (
        <div className={classes.root}>
            <CustomTypography paragraph color="textPrimary">
                Aquí encontrarás la siguiente información:
            </CustomTypography>

            <ul className={classes.ul}>
                <li className={classes.li}>
                    <CustomTypography color="textPrimary" display='inline'>Cuánto gasta el gobierno federal</CustomTypography>
                </li>
                <li className={classes.li}>
                    <CustomTypography color="textPrimary" display='inline'>Qué tipos de procedimientos</CustomTypography>
                </li>
                <li className={classes.li}>
                    <CustomTypography color="textPrimary" display='inline'>Información sobre los proveedores que participan</CustomTypography>
                </li>
            </ul>

            { dataSupplier && dataSupplier === 'SHCP' &&
                <CustomTypography paragraph color='textPrimary'>
                    Los datos utilizados en esta sección fueron tomados del portal de datos abiertos
                    del gobierno <Link className={classes.link}
                                       href="https://datos.gob.mx/busca/organization/contrataciones-abiertas"
                                       target="_blank">datos.gob.mx</Link>.
                </CustomTypography>
            }
        </div>
    );
}

export default withStyles(styles)(Disclaimer);