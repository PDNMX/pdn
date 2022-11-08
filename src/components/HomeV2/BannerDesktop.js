import React, {useEffect} from "react";
import withStyles from '@mui/styles/withStyles';
import {AppBar, Typography, Grid} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import imgHeader from "../../assets/rediseno/logo_pdn.svg";
import Espe from "../../assets/rediseno/ico_especificaciones.svg";
import Mesa from "../../assets/rediseno/ico_mesa-ayuda.svg";
import MDA from "../../assets/rediseno/ico_mda.svg";
import Sistemas from "../../assets/rediseno/ico_sistemas_f.svg";
import Interconexion from "../../assets/rediseno/ico_interconexion.svg";
import LoginIcon from "../../assets/rediseno/ico_login.svg";
import SistemasMenu from "./SistemasMenu";
import InterconexionMenu from "./InterconexionMenu";
import ReactGA from "react-ga";
import Link from '@mui/material/Link';
//import {getUser} from '../Login/Auth';
import {UserContext} from "../Login/UserContext";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#3e5866',
    },
    item: {
        maxWidth: 1000
    },
    opc: {
        "&:hover": {
            backgroundColor: "#64808f"
        },
        paddingBottom: theme.spacing(2),
        textAlign: 'center',
        cursor: "pointer"
    },
    selected: {
        backgroundColor: "#64808f"
    },
    icon: {
        width: theme.spacing(7),
        paddingTop: theme.spacing(2),
        paddingBottom: 0,
        paddingRight: theme.spacing(7),
        paddingLeft: theme.spacing(7)
    },
    link: {
        textDecoration: "none",
        color: "#b2bfc4"
    },
    textMenu: {
        color: "#b2bfc4"
    },
    iconSesion: {
        width: theme.spacing(6),
        paddingTop: theme.spacing(2),
        paddingBottom: 0
    },
    iconPDN: {
        height: theme.spacing(7)
    },
    containerIconPDN: {
        display: 'flex',
        alignItems: 'center'
    },
    rootC: {
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(4)
    }
});

const BannerDesktop = props => {
    const {classes, systems, setOpenLoginDialog} = props;
    const [showSistemas, setShowSistemas] = React.useState(false);
    const [showInterconexion, setShowInterconexion] = React.useState(false);

    const {user} = React.useContext(UserContext);

    const toggle = () => {
        setTimeout(() => {
            setShowSistemas(!showSistemas);
        }, 1000)
    }

    const toggleInterconexion = () => {
        setTimeout(() => {
            setShowInterconexion(!showInterconexion)
        }, 1000)
    }

    useEffect(() => {
        if (showSistemas) {
            setShowInterconexion(false);
        }
    }, [showSistemas]);

    useEffect(() => {
        if (showInterconexion) {
            setShowSistemas(false);
        }
    }, [showInterconexion]);

    const handleOpenLoginDialog = () => {
        setOpenLoginDialog(true);
    };

    return (
        <React.Fragment>
            <AppBar
                position="static"
                style={{
                    backgroundColor: "#3e5866",
                    border: 0,
                    boxShadow: "none"
                }}
            >
                <Grid container justifyContent="space-between" className={classes.rootC}>
                    <Grid item className={classes.containerIconPDN}>
                        <RouterLink className={classes.link} to="/">
                            <img src={imgHeader} alt="PDN" className={classes.iconPDN}/>
                        </RouterLink>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item className={classes.opc}>
                                <RouterLink className={classes.link} to="/mesa-de-ayuda">
                                    <img src={Mesa} alt="PDN" className={classes.icon}/>
                                    <Typography className={classes.textMenu}>
                                        MESA DE AYUDA
                                    </Typography>
                                </RouterLink>
                            </Grid>
                            <Grid item className={classes.opc}>
                                <RouterLink className={classes.link} to="/especificaciones">
                                    <img src={Espe} alt="PDN" className={classes.icon}/>
                                    <Typography className={classes.textMenu}>
                                        ESPECIFICACIONES
                                    </Typography>
                                </RouterLink>
                            </Grid>
                            <Grid item className={`${classes.opc} ${showSistemas ? classes.selected : ""} `}
                                  onClick={() => setShowSistemas(!showSistemas)}>
                                <img
                                    src={Sistemas}
                                    className={classes.icon}
                                    alt="Mercado Digital Anticorrupción"
                                />
                                <Typography className={classes.textMenu}>
                                    SISTEMAS
                                </Typography>
                            </Grid>
                            <Grid item className={`${classes.opc} ${showInterconexion ? classes.selected : ""}`}
                                  onClick={() => setShowInterconexion(!showInterconexion)}>
                                <img
                                    src={Interconexion}
                                    className={classes.icon}
                                    alt="Interconexión"
                                />
                                <Typography className={classes.textMenu}>
                                    INTERCONEXIÓN
                                </Typography>
                            </Grid>
                            <Grid item className={classes.opc}>
                                <Link href="https://mda.plataformadigitalnacional.org/"
                                      className={classes.link}
                                      onClick={() => ReactGA.pageview('/mda')}
                                >
                                    <img
                                        src={MDA}
                                        className={classes.icon}
                                        alt="Mercado Digital Anticorrupción"
                                    />
                                    <Typography className={classes.textMenu}>
                                        MERCADO DIGITAL
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item/>
                    {user.loggedIn?

                        <Grid item style={{textAlign: 'center'}} onClick={() => handleOpenLoginDialog()}>
                            <img
                                src={LoginIcon}
                                className={classes.iconSesion}
                                alt="Usuario"
                            />
                            <Typography className={classes.textMenu} fontSize="small">
                                {user.nombres}
                            </Typography>
                            <Typography className={classes.textMenu} fontSize="small">
                                Cerrar sesión
                            </Typography>
                        </Grid>
                        :
                        <Grid item style={{textAlign: 'center'}} onClick={() => handleOpenLoginDialog()}>
                            <img
                                src={LoginIcon}
                                className={classes.iconSesion}
                                alt="Iniciar sesión"
                            />
                            <Typography className={classes.textMenu} fontSize="small">
                                {user.nombres}
                            </Typography>
                            <Typography className={classes.textMenu} fontSize="small">
                               Iniciar sesión
                            </Typography>
                        </Grid>
                    }
                </Grid>
            </AppBar>
            {showSistemas &&
                <SistemasMenu toogle={() => toggle()} systems={systems}/>
            }
            {showInterconexion &&
                <InterconexionMenu toogle={() => toggleInterconexion()}/>
            }

        </React.Fragment>
    );
}
export default withStyles(styles)(BannerDesktop);
