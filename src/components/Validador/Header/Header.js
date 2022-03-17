import React from 'react';
import withStyles from '@mui/styles/withStyles';
import {Link} from 'react-router-dom';
import BG from '../../../assets/img/especificaciones.jpg';
import S3 from '../../../assets/iconos_azul/validador_icono.svg'
//import PDNAppBar from "../../PDNAppBar/PDNAppBar";
import {Typography, Grid} from "@mui/material"
import './Header.css';
import BarraLogoMenu from "../../Compartidos/BarraLogoMenu";
import classNames from 'classnames';
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}

const style = theme => ({
        root: {
            flexGrow:1
        },
        container1: {
            //background: 'grey',
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            backgroundImage: `url(${BG})`
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        item1:{
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        item2:{
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2)
        },
        item3:{
            maxWidth: 1200,
        },
        s2: {
            maxWidth: '150px'
        },
        whiteText: {
            color: '#fff'
        },
        pdnLogo: {
            maxWidth: 110,
            paddingLeft: "40px",
            paddingTop: "40px",
            paddingBottom: "40px"
        }
    }
);

class Header extends React.Component{

    render(){
        const {classes} = this.props;
        const isMdUp = useIsWidthUp("md");

        return (
            <div className={classes.root}>
                <BarraLogoMenu/>
                
                <Grid container spacing={0} className="breadcrumb" justifyContent='center'>
                    <Grid item xs={12} className={classes.item3}>
                        <ul>
                            <li>
                                <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                            </li>
                            <li>
                                Validador
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className={classNames(classes.container1, 'servidores')} justifyContent='center'>
                    <Grid item xs={12} md={4} align = {isMdUp ? 'right':'center'} className={classes.item1}>
                        <img src={S3} alt="Sistema 2" className={classes.s2}/>
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.item2} align = {isMdUp ? 'left':'center'} >
                        <Typography variant="h4" paragraph className={classes.whiteText} style={{fontWeight: 300}}>
                            Plataforma Digital Nacional
                        </Typography>
                        <Typography variant="h4" paragraph className={classes.whiteText} style={{  fontWeight: 600}}>
                            Validador de estandares de datos
                        </Typography>
                        <Typography  className={classes.whiteText} style={{fontSize: '18px',fontWeight: 500}}>
                            En está página puedes validar archivos en formato JSON contra los estándares de datos <br/>de la Plataforma Digital Nacional
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withWidth()(withStyles(style) (Header));
