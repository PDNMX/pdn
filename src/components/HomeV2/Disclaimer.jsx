import React from 'react';
/* import Button from '@mui/material/Button'; */
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import withStyles from '@mui/styles/withStyles';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import {Typography} from "@mui/material";
import ButtonPDN from '../Compartidos/ButtonPDN';

const styles = theme => ({
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
        color: theme.palette.text.primary
    },
    li: {
        "&:before": {
            content: '"•"',
            color: '#713972',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(0),
        },
    }
});

const AlertDialog = props => {
    const [state, setState] = React.useState({open: true});
    const {classes} = props;

    const handleClose = () => { setState({ open: false }); };

    return (
        <div>
            {/*<Button onClick={this.handleClickOpen}>Open alert dialog</Button>*/}
            <Dialog
                open={state.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <Paper className={classes.paper} style={{ margin: 0, borderRadius: 0 }}>
                <DialogTitle className={classes.text_color} id="alert-dialog-title">{"Plataforma Digital Nacional"}</DialogTitle>
                <DialogContent>

                    <Typography paragraph align="justify">
                    Esta es la versión 1.1 de la PDN, la cual contiene:
                    </Typography>

                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <Typography className={classes.text_color} display='inline'>
                                Datos en los Sistemas: 1, 2, 3, y 6.
                            </Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography className={classes.text_color} display='inline'>
                                Nuevas secciones y funcionalidades.
                            </Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography className={classes.text_color} display="inline">
                                Nueva imagen. 
                            </Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography className={classes.text_color} display="inline">
                                La PDN se construye de manera modular y escalable, por lo que esta versión NO debe ser vista como la última.
                            </Typography>
                        </li>
                    </ul>

                    <Typography paragraph align="justify">
                        Las y los usuarios de la PDN deberán privilegiar los intereses de las personas titulares de los datos personales contenidos en los sistemas. El tratamiento de los datos no debe utilizarse para ejercer algún  tipo de discriminación, trato injusto, arbitrario o contrario a lo establecido en la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados.
                    </Typography>

                    <Typography paragraph align="justify">
                        Te invitamos a revisar los <Link component={RouterLink} to='/terminos' className={classes.enlaces}>&quot;Términos y Condiciones de Uso&quot;</Link> y el <Link href={"https://drive.google.com/file/d/18Y_bcTXFqwIX0j96efeLchUIBsUFfmZr/view"} target={"_blank"} className={classes.enlaces}>&quot;Aviso de Privacidad&quot;</Link>, así como a dejar tus comentarios sobre las funcionalidades y experiencia de usuario en la sección de <Link href={import.meta.env.VITE_LINK_GOOGLEFORM} target={"_blank"} className={classes.enlaces}>&quot;Comenta&quot;</Link>.
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <ButtonPDN onClick={handleClose}>
                        Aceptar
                    </ButtonPDN>
                </DialogActions>
            </Paper>
                
            </Dialog>
        </div>
    );
};

export default withStyles(styles)(AlertDialog);
