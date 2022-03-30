import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import withStyles from '@mui/styles/withStyles';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import {Typography} from "@mui/material";

const styles = theme => ({
    button:{
        background: '#ffe01b',
    },
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
        padding: theme.spacing(1),
        marginTop: 0,
    }
});

const AlertDialog = props => {
    const [state, setState] = React.useState({open: true});
    const {classes} = props;

    //handleClickOpen = () => { setState({ open: true }); };
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
                <DialogTitle id="alert-dialog-title">{"Plataforma Digital Nacional"}</DialogTitle>
                <DialogContent>

                    <Typography paragraph align="justify">
                        Esta es la versión 1.1 de la Plataforma Digital Nacional (PDN), lo cual significa que:
                    </Typography>

                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <Typography color='textPrimary' display='inline'>
                                Contiene datos reales de los Sistemas: 1, 2, 3, y 6.
                            </Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography color='textPrimary' display='inline'>
                                Contiene nuevas secciones y funcionalidades.
                            </Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography color='textPrimary' display="inline">
                            La PDN se construye de manera modular y escalable conforme a lo establecido el capítulo IX de las <Link href="https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018" target="_blank">
                                Bases para el Funcionamiento de la Plataforma Digital Nacional
                            </Link>, por lo que esta versión NO debe ser vista como la última.
                            </Typography>
                        </li>
                    </ul>

                    <Typography paragraph align="justify">
                        Las y los usuarios de la PDN deberán privilegiar los intereses de las personas titulares de los datos personales contenidos en los sistemas. El tratamiento de los datos consultables en la PDN no debe utilizarse para ningún tipo de discriminación, trato injusto, arbitrario o contrario a lo establecido en la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados.
                    </Typography>

                    <Typography paragraph align="justify">
                        Te invitamos a revisar los <Link component={RouterLink} to='/terminos'>"Términos y Condiciones de Uso"</Link>,
                        así como a dejar tus comentarios sobre las funcionalidades y experiencia de usuario en la sección de <Link href={process.env.REACT_APP_LINK_GOOGLEFORM} target={"_blank"}>"Comenta"</Link>.
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} className={classes.button}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default withStyles(styles)(AlertDialog);
