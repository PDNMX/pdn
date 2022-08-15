import React from 'react';
import {withStyles} from "@mui/styles";
import {Box, Paper, Divider, Grid, Tooltip, Typography, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DownloadItem from "../Compartidos/DownloadItem";

const servidores = require('../Utils/glosario.json')

const Glosario = props => {
    const data = servidores.servidores.find(e => e.id === props.id);
    return <React.Fragment>
        <Typography color="inherit">{data.title}</Typography>
        <em>{data.description}</em>
    </React.Fragment>;
};

const HtmlTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        margin: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
        color: theme.palette.text.primary,
        marginTop: 0
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
        paddingBottom: theme.spacing(1)
    },
    bulletText: {
        display: 'inline',
        textTransform :'capitalize'
    },
    divider: {
        backgroundColor: theme.palette.primary.dark,
        height: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    sangria: {
        paddingLeft: theme.spacing(2)
    },
    btnBack: {
        color: theme.palette.primary.dark,
    }
});

const FichaDetalle = props => {
    const {closeDialog, servidorPublico, classes} = props;
    const {puesto, nombrecompleto, nombres, primerApellido, segundoApellido, institucionDependencia} = servidorPublico || {};

    return (
        <Paper className={classes.root} elevation={3}>
            <Box sx={{ display:'flex', flexDirection: 'row'}}>
                <Box sx={{flexGrow: 1}}>
                    <Typography paragraph variant='h5'>
                        FICHA DE LA PERSONA SERVIDORA PÚBLICA
                    </Typography>
                </Box>

                <Box>
                    <Button startIcon={<CloseIcon/>} onClick={() => closeDialog()} variant='text' className={classes.btnBack}/>
                </Box>
            </Box>

            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Typography component='div'>

                        <HtmlTooltip title={<Glosario id={1}/>}>
                            <b>{nombrecompleto || `${nombres} ${primerApellido} ${segundoApellido}` }</b>
                        </HtmlTooltip>

                        <Typography component='div' className={classes.sangria}>
                            {puesto.nombre}
                        </Typography>
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography>
                        <HtmlTooltip title={<Glosario id={0}/>}>
                            <b>Institución / Dependencia</b>
                        </HtmlTooltip>
                    </Typography>

                    <Typography paragraph className={classes.sangria}>
                        {institucionDependencia.nombre}
                    </Typography>

                </Grid>
            </Grid>

            <Divider className={classes.divider}/>

            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Typography>
                        <b>Nivel de responsabilidad</b>
                    </Typography>
                    <ul className={classes.ul}>
                        {servidorPublico.nivelResponsabilidad &&
                            servidorPublico.nivelResponsabilidad.map((r, index) => {
                                return <li key={index} className={classes.li}>
                                    <Typography className={classes.bulletText}>{r.valor}</Typography>
                                </li>
                            })}
                    </ul>
                </Grid>

                <Grid item xs={6}>
                    <Typography>
                        <b>Interviene en</b>
                    </Typography>
                    <ul className={classes.ul}>
                        {servidorPublico.tipoProcedimiento &&
                            servidorPublico.tipoProcedimiento.map((o, index) => {
                                return <li key={index} className={classes.li}>
                                    <Typography className={classes.bulletText}>{o.valor}</Typography>
                                </li>
                            })}
                    </ul>
                </Grid>
            </Grid>

            <Box sx={{display: 'flex', justifyContent: 'center', padding: 2}}>
                <DownloadItem item={servidorPublico}/>
            </Box>

        </Paper>
    );
}


export default withStyles(styles)(FichaDetalle);
