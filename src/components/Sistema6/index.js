import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Busqueda from "./BusquedaV2";
import Cifras from "./Cifras";
//import Perspectivas from "./Perspectivas";
import Top from './Top';
import Descarga from "../Compartidos/Descarga";
import Disclaimer from "./Disclaimer";
import img1 from "../../assets/rediseno/svg_iconos_azul/SVG/s6_01.svg";
//import img2 from "../../assets/img/particulares_sancionados.svg";
import img3 from "../../assets/rediseno/svg_iconos_azul/SVG/s6_02.svg";
import {Grid, Paper, Typography, Box} from "@mui/material";
import SelectSupplier from "./SelectSupplier";
import bgimg from "../../assets/rediseno/fondo_cruces_dark.png";
import HeaderV2 from '../HomeV2/HeaderV2';
import pdnRoutes from "../../routes";

import { ThemeProvider } from '@mui/material/styles';
import ThemeV2 from '../../ThemeV2';

//import LabeledHeatmap from './Charts/LabeledHeatmap';
//import Treemap from './Charts/Treemap';
//import ScatterPlot from "./Charts/ScatterPlot";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
    },
    tabContainer: {
        paddingTop: 90,
        //paddingBottom: 90
    },
    tabItem: {
        maxWidth: 1200,
    },
    item: {
        maxWidth: 1200,
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        // overflow: "auto"
    },
    paper1: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '0px 10px 10px 10px'
    },
    paper2: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '10px 0px 10px 10px'
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
        color: theme.palette.S6.color,
        marginLeft: theme.spacing(1),
        paddingTop: theme.spacing(1)
    }});


const Index = props => {
    const {classes} = props;
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [dataSupplier, setDataSupplier]  = React.useState("SHCP");
    const handleSelectTab = t => setSelectedTab(t);
    const isSelected = t => t === selectedTab;
    const system = pdnRoutes.find(route => route.path==='/contrataciones');

    return (<div className={classes.root}>
        <HeaderV2 section = {system}/>
        <Grid container spacing={0} justifyContent="center" className={classes.tabContainer}>
            <Grid item xs={12} style={{padding:0, maxWidth: 1200}}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                          onClick={() => handleSelectTab(0)}
                          id={0}
                        //className={isSelected(0)?classes.selectedTab:classes.tab}
                    >

                        <figure className={isSelected(0)?classes.cardSeleccionada: classes.card}>
                            <img src={img1} className={classes.image} alt="explora"/>
                        </figure>

                        <Typography style={{fontWeight: isSelected(0)?500:300, paddingTop: 15}} className={classes.labelCard}>
                            Explora las contrataciones
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                          onClick={ () => handleSelectTab(1)}
                          id={1}
                        //className={isSelected(1)?classes.selectedTab:classes.tab}
                    >

                        <figure className={isSelected(1)? classes.cardSeleccionada: classes.card}>
                            <img src={img3} className={classes.image} alt="Visualiza"/>
                        </figure>

                        <Typography style={{fontWeight: isSelected(1)?500:300, paddingTop: 15}} className={classes.labelCard}>
                            Visualiza las contrataciones
                        </Typography>

                    </Grid>
                </Grid>
            </Grid>
            <ThemeProvider theme={ThemeV2}>
                {selectedTab === 0?
                    <Grid item xs={12} className={classes.tabItem} style={{"overflow":"auto"}}>
                        <Paper className={classes.paper1} elevation={15}>
                            <Box paddingLeft={1} paddingRight={1} paddingBottom={3}>
                            
                                <SelectSupplier dataSupplier={dataSupplier} setDataSupplier={setDataSupplier}/>
                            
                            </Box>
                            {/* TODO: add supplier  support*/}
                            <Busqueda dataSupplier={dataSupplier}/>
                        </Paper>
                    </Grid>
                    :
                    <Grid item xs={12} className={classes.tabItem}>
                        <Paper className={classes.paper2} elevation={15}>
                            <Box paddingTop={1} paddingBottom={3}>
                                <SelectSupplier dataSupplier={dataSupplier} setDataSupplier={setDataSupplier}/>
                            </Box>

                            {/* TODO: add supplier support*/}
                            <Disclaimer dataSupplier={dataSupplier}/>

                            {/* TODO: add supplier support*/}
                            <Cifras dataSupplier={dataSupplier}/>

                            { dataSupplier && dataSupplier === 'SHCP' &&
                                <Top dataSupplier={dataSupplier}/>
                            }
                        </Paper>
                    </Grid>
                }
            </ThemeProvider>
        </Grid>

        {/*<Grid container spacing={0} justifyContent="center" style={{backgroundColor: "#34b3eb"}}>
            <Grid item xs={12} className={classes.item}>
                <Perspectivas/>
            </Grid>
        </Grid>*/}

        <Grid container spacing={0} justifyContent="center">
            <Grid item xs={12} className={classes.item}>
                <Descarga url="https://datos.gob.mx/busca/dataset/concentrado-de-contrataciones-abiertas-de-la-apf" tipoGA={'bulk-s6'}/>
            </Grid>
        </Grid>

        {/*<Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <ScatterPlot/>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <Typography paragraph> Heatmap </Typography>
                        <LabeledHeatmap/>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <Typography paragraph> Treemap </Typography>
                        <Treemap/>
                    </Grid>
                </Grid>*/}

    </div>);
}

export default withStyles(styles)(Index);
