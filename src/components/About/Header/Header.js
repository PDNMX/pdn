import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';
import {Typography} from "@mui/material"
import BG from "../../../assets/img/mesa_ayuda.jpg";
import BarraLogoMenu from "../../Compartidos/BarraLogoMenu";
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs"/>;

function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}

const style = theme => ({
        root: {
            flexGrow: 1
        },

        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        item1: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        item2: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2)
        },
        item3: {
            maxWidth: 1200,
        },
        s2: {
            maxWidth: '170px'
        },
        whiteText: {
            color: '#fff'
        },
        pdnLogo: {
            maxWidth: 110,
            paddingLeft: "40px",
            paddingTop: "40px",
            paddingBottom: "40px"
        },
        z5: {
            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            backgroundImage: `url(${BG})`,
            padding: '82px 0 82px'
        }
    }
);

const Header = props => {

    const {classes} = props;
    const isMdUp = useIsWidthUp("md");

    return (
        <div className={classes.root}>
            {/*<PDNAppBar/>*/}

            <BarraLogoMenu/>
            <Grid container spacing={0} className="breadcrumb" justifyContent='center'>
                <Grid item xs={12} className={classes.item3}>
                    <ul>
                        <li>
                            <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                        </li>
                        <li>
                            ¿Qué es la PDN?
                        </li>
                    </ul>
                </Grid>
            </Grid>

            <Grid container spacing={0} className={classes.z5} justifyContent='center'>


                <Grid item xs={12} md={7} className={classes.item2} align={isMdUp ? 'left' : 'center'}>
                    <Typography variant="h2" paragraph className={classes.whiteText}
                                style={{fontSize: '42px', fontWeight: 300, marginBottom: '30px'}}>
                        ¿Qué es la Plataforma Digital Nacional?
                    </Typography>
                    <Typography className={classes.whiteText}
                                style={{fontSize: '16px', fontWeight: 500, marginBottom: '1.5em'}}>
                        La <strong>Plataforma Digital Nacional</strong> es una fuente de <strong>inteligencia para
                        construir integridad y
                        combatir la corrupción,</strong> que creará valor para el gobierno y la sociedad, a partir de
                        grandes
                        cantidades de datos.
                    </Typography>
                    <Typography className={classes.whiteText} style={{fontSize: '16px', fontWeight: 500}}>
                        La Plataforma es un <strong>medio para el intercambio de datos anticorrupción</strong> del
                        Gobierno, que
                        busca quitar barreras y romper silos de información para que los datos sean comparables,
                        accesibles y utilizables, empezando con <strong>seis sistemas de datos prioritarios</strong>.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );

}

export default withWidth()(withStyles(style)(Header));
