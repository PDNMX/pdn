import React from 'react';
import withStyles from '@mui/styles/withStyles';
import {Grid, Typography} from "@mui/material"
import BuscadorS2 from "./BuscadorS2";
import HeaderV2 from '../HomeV2/HeaderV2';
import classNames from 'classnames';
import Dashboard from "./Dashboard/Dashboard";
import BuscadorParticularesSancionados from '../Sancionados/Particulares/BuscadorParticularesSancionados';
import img1 from "../../assets/rediseno/svg_iconos_azul/SVG/s2_01.svg";
import img2 from "../../assets/rediseno/svg_iconos_azul/SVG/s2_02.svg";
import img3 from "../../assets/rediseno/svg_iconos_azul/SVG/s2_03.svg";
import bgimg from "../../assets/rediseno/fondo_cruces.png";
import pdnRoutes from "../../routes/index";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
    },
    container: {
        paddingTop: 90,
        paddingBottom: 90
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
    tab: {
        color: theme.palette.S2.color,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: theme.palette.background.opaque,
            transition: 'background 0.3s ease',
        },
    },
    selectedTab: {
        //backgroundColor: theme.palette.background.opaque,
        color: theme.palette.S2.color,
        borderStyle: 'solid',
        borderColor: theme.palette.secundario.main,
        borderRadius: '5px 5px 0px 0px',
        borderBottomStyle: 'none',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
    },
    logo: {
        width: '60px'
    },
    figure: {
        display: 'inline-block',
        float: 'left',
        margin: 0,
        padding: 0,
        paddingRight: '8px'
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
                        <Grid item md={4} xs={12}
                              onClick={() => setContentId(1)}
                              className={classNames(contentId !== 1 ? classes.tab : classes.selectedTab)}>

                            <figure className={classes.figure}>
                                <img src={img1} alt="Servidores que intervinen en procesos de contratacion"
                                     className={classes.logo}/>
                            </figure>
                            <Typography variant="subtitle1" className={classes.tabText}
                                        style={{fontWeight: contentId === 1 ? 500 : 300}}
                            >
                                Buscador de Servidores que intervienen en procesos de contratación
                            </Typography>
                        </Grid>

                        <Grid item md={4} xs={12} onClick={() => setContentId(2)}
                              className={classNames(contentId !== 2 ? classes.tab : classes.selectedTab)}>

                            <figure className={classes.figure}>
                                <img src={img2} alt="Particulares inhabilitados" className={classes.logo}/>
                            </figure>
                            <Typography variant="subtitle1"
                                        style={{fontWeight: contentId === 2 ? 500 : 300}}
                                        className={classes.tabText}>

                                Buscador de Particulares inhabilitados
                            </Typography>
                        </Grid>

                        <Grid item md={4} xs={12}
                              onClick={() => setContentId(3)}
                              className={classNames(contentId !== 3 ? classes.tab : classes.selectedTab)}>

                            <figure className={classes.figure}>
                                <img src={img3} alt="Visor de datos" className={classes.logo}/>
                            </figure>
                            <Typography variant="subtitle1"
                                        style={{fontWeight: contentId === 3 ? 500 : 300}}
                                        className={classes.tabText}>
                                Visor de datos
                            </Typography>

                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} className={classes.contentsSection}>
                        <TabContents index={contentId}/>
                </Grid>

            </Grid>
        </div>
    );
};

export default withStyles(styles)(Index);
