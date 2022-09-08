import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {Box, OutlinedInput, FormControl, InputLabel, Typography} from '@mui/material';
import {logIn, logOut} from './Auth';
import AlertaError from "./AlertaError";
import {InputAdornment, IconButton} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {UserContext} from "./UserContext";

const LoginDialog = props => {
    const {open, setOpen} = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const {user, setUser} = React.useContext(UserContext);

    const [state, setState] = React.useState({
        email: '',
        password: '',
        showPassword: false
    });

    // TODO: hide alert on modal open
    const [alertData, setAlertData] = React.useState({
        open: false,
        severity: "success",
        message: "success"
    });

    const handleClose = () => {
        // hide alert
        setAlertData({
            ...alertData,
            open:false
        })
        // hide dialog
        setOpen(false);
    };

    const handleChangeEmail = e => {
        setState({
            ...state,
            email: e.target.value
        });
    }

    const handleChangePassword = e => {
        setState({
            ...state,
            password: e.target.value
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const result =  await logIn(state.email, state.password);

        if (result.success){
            setUser({
                loggedIn: true,
                ...result.user
            });

            handleClose(); // hide dialog
        } else {
            setAlertData({
                ...alertData,
                open: true,
                message: result.message,
                severity: result.success ? "success" : "error"
            });
        }
    }

    const handleLogout = () => {
        logOut();
        handleClose(); //hide dialog
        setUser({
            loggedIn: false,
            nombres: "No autenticado"
        });
    }

    const handleClickShowPassword = () => {
        setState({
            ...state,
            showPassword: !state.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {user.loggedIn? "Terminar la sesión": "Inicio de sesión"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {user.loggedIn ?
                            `Authenticado como ${user.nombres} ${user.primerApellido} ${user.segundoApellido}`
                            :
                            "Inicie sesión para acceder a las funcionalidades reservadas de la PDN."
                        }
                    </DialogContentText>

                    <Box paddingTop={3} paddingBottom={3}>

                        {user.loggedIn ?
                            <Box p={4} align="center">
                                <Typography paragraph variant="h5">
                                    ¿Deseas terminar la sesión?
                                </Typography>

                                <Button onClick={() => handleLogout()} variant="contained">
                                    Cerrar sesión
                                </Button>
                            </Box>
                            :
                            <form onSubmit={handleSubmit}>
                                <FormControl sx={{margin: 1}} fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
                                    <OutlinedInput type="email" label="E-mail" required
                                                   value={state.email} onChange={handleChangeEmail}/>
                                </FormControl>

                                <FormControl sx={{margin: 1}} fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput type={state.showPassword ? 'text' : 'password'} label="Contraseña" required
                                                   value={state.password} onChange={handleChangePassword}
                                                   endAdornment={
                                                       <InputAdornment position="end">
                                                           <IconButton
                                                               aria-label="toggle password visibility"
                                                               onClick={handleClickShowPassword}
                                                               onMouseDown={handleMouseDownPassword}
                                                               edge="end"
                                                           >
                                                               {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                           </IconButton>
                                                       </InputAdornment>}
                                    />
                                </FormControl>

                                <Button variant="contained" sx={{margin: 1}} type='submit'>
                                    Enviar
                                </Button>
                            </form>
                        }
                    </Box>

                    <Box p={1}>
                        <AlertaError alertData={alertData} setAlertData={setAlertData}/>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus variant="contained">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default LoginDialog;
