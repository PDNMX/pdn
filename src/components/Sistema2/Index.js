import React from 'react';
import withStyles from '@mui/styles/withStyles';
import {Grid, Typography} from "@mui/material"
import BuscadorS2 from "./BuscadorS2v2";
import HeaderV2 from '../HomeV2/HeaderV2';
import Dashboard from "./Dashboard/Dashboard";
import BuscadorParticularesSancionados from '../Sancionados/Particulares/BuscadorParticularesSancionados';
import img1 from "../../assets/rediseno/svg_iconos_azul/SVG/s2_01.svg";
import img2 from "../../assets/rediseno/svg_iconos_azul/SVG/s2_02.svg";
import img3 from "../../assets/rediseno/svg_iconos_azul/SVG/s2_03.svg";
import bgimg from "../../assets/rediseno/fondo_cruces_dark.png";
import pdnRoutes from "../../routes/index";

import { ThemeProvider } from '@mui/material/styles';
import ThemeV2 from '../../ThemeV2';

import ReactGA from "react-ga";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
    },
    container: {
        paddingTop: 90,
        //paddingBottom: 90
    },
    tabText: {
        //color: theme.palette.secondary.contrastText
    },
    tabsSection: {
        maxWidth: '1200px',
    },
    contentsSection: {
        color: theme.palette.secondary.contrastText,
        maxWidth: '1200px',
    },
    image: {
        width: '60px'
    },
    card: {
        backgroundColor: theme.palette.background.opaque,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        margin: 0,
        "&:hover": {
            cursor: 'pointer',
            borderColor: theme.palette.secundario.main,
            transition: 'background 0.3s ease',
            opacity: .7
        },
        display: 'inline-block',
        float: 'left',
        padding: 0,
        borderStyle: 'solid',
        borderColor: theme.palette.background.opaque,
        borderBottomStyle: 'none',
        borderRadius: '10px 10px 0px 0px',
        marginRight:10

    },
    cardSeleccionada: {
        borderColor: theme.palette.secundario.main,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        margin: 0,
        borderStyle: 'solid',
        borderBottomStyle: 'none',
        borderRadius: '10px 10px 0px 0px',
        display: 'inline-block',
        float: 'left',
        marginRight:10,
        opacity:.7
    },
    labelCard:{
        color: theme.palette.S2.color,
        marginLeft: theme.spacing(1),
        paddingTop: theme.spacing(1)
    }
});

const TabContents = props => {
    const {index} = props;
    switch (index) {
        case 1:
            return <BuscadorS2/>;
        case 2:
            return <BuscadorParticularesSancionados/>;
        case 3:
            return <Dashboard/>;
        default:
            return <Dashboard/>;
    }
};

const Index = props => {
    const {classes} = props;
    const [contentId, setContentId] = React.useState( 1);
    const system = pdnRoutes.find(route => route.path==='/servidores');

    return (
        <div className={classes.root}>
            <HeaderV2 section = {system}/>

            {/* TABS */}
            <Grid container spacing={0} justifyContent="center" className={classes.container}>
                <Grid item xs={12} className={classes.tabsSection}>
                    <Grid container spacing={0}>
                        <Grid item md={4} xs={12} onClick={() => setContentId(1)}>

                            <figure className={contentId !== 1 ? classes.card : classes.cardSeleccionada}>
                                <img src={img1} alt="Servidores que intervinen en procesos de contratacion"
                                     className={classes.image}/>
                            </figure>
                            <Typography variant="subtitle1" className={classes.labelCard}
                                        style={{fontWeight: contentId === 1 ? 500 : 300}}>
                                Buscador de Servidores que intervienen en contrataciones
                            </Typography>
                        </Grid>

                        <Grid item md={4} xs={12} onClick={() => setContentId(2)}>

                            <figure className={contentId !== 2 ? classes.card : classes.cardSeleccionada}>
                                <img src={img2} alt="Particulares inhabilitados" className={classes.image}/>
                            </figure>
                            <Typography variant="subtitle1"
                                        style={{fontWeight: contentId === 2 ? 500 : 300}}
                                        className={classes.labelCard}>

                                Buscador de Particulares inhabilitados
                            </Typography>
                        </Grid>

                        <Grid item md={4} xs={12} 
                            onClick={() => {
                                setContentId(3);
                                ReactGA.event({ category: 'visor-s2', action: 'click' });
                              }}
                        >

                            <figure className={contentId !== 3 ? classes.card : classes.cardSeleccionada}>
                                <img src={img3} alt="Visor de datos" className={classes.image}/>
                            </figure>
                            <Typography variant="subtitle1"
                                        style={{fontWeight: contentId === 3 ? 500 : 300}}
                                        className={classes.labelCard}>
                                Visor de datos
                            </Typography>

                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} className={classes.contentsSection}>
                    <ThemeProvider theme={ThemeV2}>
                        <TabContents index={contentId}/>
                    </ThemeProvider>
                </Grid>

            </Grid>
        </div>
    );
};

export default withStyles(styles)(Index);
