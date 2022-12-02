import React, {useEffect, useRef} from "react";
import withStyles from '@mui/styles/withStyles';
import {Typography, Link} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import legislacion_icono from "../../assets/rediseno/ico_interconexion_legislacion.svg";
import mapa_s2s3_icono from "../../assets/rediseno/ico_interconexion_s1-s3.svg";
import icon_cobertura from "../../assets/rediseno/ico_cobertura.svg";
import Box from "@mui/material/Box";
import ReactGA from "react-ga";

const styles = theme => ({
    root: {
        backgroundColor: '#364e56',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        position: 'absolute',
        zIndex: 2,
        width: '100%'
    },
    item: {
        "&:hover": {
            backgroundColor: "#64808f"
        },
        borderStyle: 'solid',
        borderWidth: 2,
        minWidth: theme.spacing(25),
        transition: 'height 2s',
        height: '70%'
    },
    opc: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        textAlign: 'center',
    },
    icon: {
        maxWidth: theme.spacing(9),
        paddingBottom: theme.spacing(1)
    },
    link: {
        textDecoration: "none",
        color: "#b2bfc4"
    }
});

const InterconexionMenu = props => {
    const {classes} = props;
    const innerRef = useRef(null);

    useEffect(() => {
        const x = document.getElementById("interconexionMenu");
        x.addEventListener("mouseleave", toggle);
        return () => {
            x.removeEventListener("mouseleave", toggle);
        };
    }, []);

    const toggle = (e) => {
        props.toogle();
    }

    return (
        <Box id={"interconexionMenu"} ref={innerRef}  className={classes.root} sx={{
            display: 'flex',
            justifyContent: 'center'
        }}>

            <Link className={classes.link} href='https://www.plataformadigitalnacional.org/mapa-sla/' onClick={()=>ReactGA.pageview('/mapa-sla')}>
                <Box className={`${classes.item}`}  sx={{
                    m:1,
                    p:2,
                    color:'#34b3eb'
                }}>
                    <div className={`${classes.opc} `}>
                        <img src={legislacion_icono} alt="Legislación" className={classes.icon}/>
                        <Typography color={'#b2bfc4'}>{'Legislación'}</Typography>

                    </div>
                </Box>
            </Link>

            <Link className={classes.link} href='https://www.plataformadigitalnacional.org/mapa-avance/' onClick={()=>ReactGA.pageview('/mapa-avance')}>
                <Box className={`${classes.item}`}  sx={{
                    m:1,
                    p:2,
                    color:'#34b3eb'
                }}>
                    <div className={`${classes.opc} `}>

                        <img src={mapa_s2s3_icono} alt="Sistemas 1, 2 y 3" className={classes.icon}/>
                        <Typography color={'#b2bfc4'}>{'Sistemas 1, 2 y 3'}</Typography>

                    </div>
                </Box>
            </Link>

            <Link className={classes.link} component={RouterLink} to='/cobertura'>
                <Box className={`${classes.item}`}  sx={{
                    m:1,
                    p:2,
                    color:'#34b3eb'
                }}>
                    <div className={`${classes.opc} `}>
                        <img src={icon_cobertura} alt="Cobertura" className={classes.icon}/>
                        <Typography color={'#b2bfc4'}>Cobertura</Typography>
                    </div>
                </Box>
            </Link>

        </Box>
    );
}
export default withStyles(styles)(InterconexionMenu);
