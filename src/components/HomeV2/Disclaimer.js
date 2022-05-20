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
            color: '#5fb1e6',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
        /* padding: theme.spacing(1),
        marginTop: 0, */
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(4),
        marginBottom: theme.spacing(4),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '0px 10px 10px 10px'
    },
    text_color: {
        color: theme.palette.primario.contrastText
    },
    enlaces: {
        'textDecoration': 'none',
        // 'color': '#b1bcc1',
        'color': theme.palette.azulPDN,
        '&:visited': {
          color: theme.palette.azulPDN
        },
        '&:link': {
          color: theme.palette.azulPDN
        },
        '&:active': {
          color: theme.palette.azulPDN
        },
        '&:hover': {
          color: '#FFF',
          borderBottom: '2px solid #3ab0e5'
        }
      }
});
/* import styles from '../Declaraciones2/style'; */

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
                        Te invitamos a revisar los <Link component={RouterLink} to='/terminos' className={classes.enlaces}>"Términos y Condiciones de Uso"</Link> y el <Link href={"https://drive.google.com/file/d/18Y_bcTXFqwIX0j96efeLchUIBsUFfmZr/view"} target={"_blank"} className={classes.enlaces}>"Aviso de Privacidad"</Link>, así como a dejar tus comentarios sobre las funcionalidades y experiencia de usuario en la sección de <Link href={process.env.REACT_APP_LINK_GOOGLEFORM} target={"_blank"} className={classes.enlaces}>"Comenta"</Link>.
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <ButtonPDN onClick={handleClose} style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                        Aceptar
                    </ButtonPDN>
                </DialogActions>
            </Paper>
                
            </Dialog>
        </div>
    );
};

export default withStyles(styles)(AlertDialog);
