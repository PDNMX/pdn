import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import {servidores} from "../Utils/glosario.json";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const Glosario = props => {
    const data = servidores.find(e => e.id === props.id);
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
    button: {
        background: '#ffe01b',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2)
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
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
        height: 4,
        //border: 4,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    sangria: {
        paddingLeft: theme.spacing(2)
    }
});

function FichaServidorPublico(props) {
    //const [open, setOpen] = React.useState(false);
    const {open, closeDialog, servidorPublico, classes} = props;
    const {puesto, nombrecompleto, nombres, primerApellido, segundoApellido, institucionDependencia} = servidorPublico || {};
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        closeDialog();
    };

    return (
        <div>
            <Dialog
                maxWidth='md'
                fullWidth={true}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Ficha del Servidor Público"}</DialogTitle>
                {servidorPublico &&

                <DialogContent >

                    <Grid container spacing={0}>

                        <Grid item xs={6}>
                            <Typography component='div'>

                                <HtmlTooltip title={<Glosario id={1}/>}>
                                    <b>{nombrecompleto || `${nombres} ${primerApellido} ${segundoApellido}` }</b>
                                </HtmlTooltip>

                                <Typography component='div' className={classes.sangria}>
                                    {/*<HtmlTooltip title={<Glosario id={2}/>}>
                                        {puesto.nombre}<
                                    </HtmlTooltip>*/}
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
                                {servidorPublico.nivelResponsabilidad.map((r, index) => {
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
                                {servidorPublico.tipoProcedimiento.map((o, index) => {
                                    return <li key={index} className={classes.li}>
                                        <Typography className={classes.bulletText}>{o.valor}</Typography>
                                    </li>
                                })}
                            </ul>
                        </Grid>
                    </Grid>

                </DialogContent>
                }
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" autoFocus className={classes.button}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(FichaServidorPublico);
