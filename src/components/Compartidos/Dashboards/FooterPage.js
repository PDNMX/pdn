import React from 'react';
import {Paper, Typography, Link} from "@mui/material";
import {withStyles} from '@mui/styles';

const styles = theme => ({
    paperChart: {
        backgroundColor: theme.palette.background.paperChart,
        padding: theme.spacing(2),
        borderRadius: '10px 50px 10px 50px'
    },
    text:{
        color: theme.palette.text.main,
    },
    title:{
        color: theme.palette.text.main,
        textAlign: 'center'
    },
    link:{
        textDecoration: "none",
        color: theme.palette.text.linkColor,
        wordBreak: "break-all",
    }
})

const FooterPage = (props) => {
    const {classes, dataSet, provider, referenceDate} = props;
    return (
        <React.Fragment>
            <Paper elevation={24} className={classes.paperChart}>
                <Typography className={classes.title} variant={"h6"}>
                    Nota
                </Typography>
                <Typography className={classes.text} variant={"body2"}>
                    Los datos utilizados para la realización de estas gráficas fueron tomados de la página
                    <Link display='inline' href="https://datos.gob.mx/" target='_blank' className={classes.link}>
                        { " datos.gob.mx " }
                    </Link>
                     y corresponden al conjunto de datos <b>{`"${dataSet}"`}</b> publicado por la <b>{`${provider}`}</b>.
                    Fecha de consulta: {`${referenceDate}`}
                </Typography>

            </Paper>
        </React.Fragment>
    );
}

export default withStyles(styles)(FooterPage);