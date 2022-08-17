import React from 'react';
import {Typography, Grid, Paper, Box} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import {useParams} from "react-router-dom";
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes";
import estados from "./estados.json";
import icon_s1 from '../../assets/rediseno/ico_sistemas/ico_s1_color.svg';
import CustomizedProgressBar from "./CustomizedProgressBar";
import VerticalProgressBar from "./VerticalProgressBar";
import icon_s2 from '../../assets/rediseno/ico_sistemas/ico_s2_color.svg';
import icon_s3 from '../../assets/rediseno/ico_sistemas/ico_s3_color.svg';

const colors = {
    s1 : "#F8CAC4",
    s2 : "#D8ACD8",
    s3 : "#C6C1EB",
};

const bar_colors = [ '#43b9a5', '#f46c81', '#f5ca5d', '#5ccbf0', '#beF5a6' ];

const data = {
    s1: {
        value: 60,
        total: 100,
    },
    s2: {
        value: 20,
        total: 100
    },
    s3: {
        value: 10,
        total: 100
    }
}

const styles = theme => ({
    rootItem: {
        maxWidth: 1200,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    rootPaper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '10px 10px 10px 10px',
        //display: 'flex',
        //justifyContent: "center"
    },
    paper: {
        flexGrow: 1,
        background: theme.palette.background.paperChart
    }
});

const VistaDetalleEstado = props => {
    const {classes} = props;
    const {id_estado} = useParams();
    const section = pdnRoutes.find(r => r.path === '/cobertura/:id_estado');
    const estado = estados.find(e => e.route.includes(id_estado));
    const icon = require(`../../assets/Cobertura/iconos_estados/${estado.icon}`);

    return <div>
        <HeaderV2 section={section}/>
        <Grid container spacing={0} justifyContent='center'>
            <Grid item xs={12} className={classes.rootItem}>
                <Paper elevation={15} className={classes.rootPaper}>

                    <Typography variant="h3" paragraph align="center" color="white">
                        {estado.name}
                    </Typography>


                    <Box sx={{display: 'flex', flexWrap: "wrap", alignItems: "stretch"}} justifyContent="center">
                        <Paper elevation={15} sx={{ m: 2, p:2 }} className={classes.paper}>
                            <Box display="flex" flexWrap="wrap" justifyContent="center">
                                <Box>
                                    <img src={icon} width="260px" alt={estado.name}/>
                                </Box>

                                <Box sx={{ paddingTop: '40px', flexGrow: 1}}>
                                    <Box display='flex'>
                                        <img src={icon_s1} alt='Sistema 1' style={{width: '40px', padding: "2px"}}/>
                                        <CustomizedProgressBar value={data.s1.value} color={colors.s1} />
                                    </Box>

                                    <Box display='flex'>
                                        <img src={icon_s2} alt='Sistema 2' style={{width: '40px', padding: "2px"}}/>
                                        <CustomizedProgressBar value={data.s2.value} color={colors.s2}/>
                                    </Box>
                                    <Box display="flex">
                                        <img src={icon_s3} alt='Sistema 3' style={{width: '40px', padding: "2px"}}/>
                                        <CustomizedProgressBar value={data.s3.value} color={colors.s3}/>
                                    </Box>
                                </Box>
                            </Box>

                        </Paper>

                        <Paper elevation={15} sx={{ m:2, p: 2, textAlign: "center", maxWidth: 150 }} className={classes.paper}>
                            <Typography variant="h5" color="white" sx={{fontWeight: 'bold'}}>
                                Cobertura
                            </Typography>
                            <Typography variant="body2" color="white">
                                Conectados / Total de sujetos obligados
                            </Typography>

                            <Typography variant="h4" color={colors.s1} sx={{fontWeight: 'bold'}}>
                                {data.s1.value}%
                            </Typography>
                            <Typography color='white'> {data.s1.value} de {data.s1.total}</Typography>
                            <Typography variant="h4" color={colors.s2} sx={{fontWeight: 'bold'}}>
                                {data.s2.value}%
                            </Typography>
                            <Typography color='white'> {data.s2.value} de {data.s2.total} </Typography>
                            <Typography variant="h4" color={colors.s3} sx={{fontWeight: 'bold'}}>
                                {data.s3.value}%
                            </Typography>
                            <Typography color='white'> {data.s3.value} de {data.s3.total}</Typography>
                        </Paper>
                    </Box>


                    <Box sx={{display: 'flex', flexWrap: "wrap", alignItems: "stretch"}} justifyContent="center">

                        <Paper elevation={15} sx={{ m: 2 ,p:2, maxWidth: 150, display: 'flex', alignContent: "center"}} className={classes.paper} >
                            <img src={icon_s1} style={{minWidth:"140px", alignSelf: 'center'}} alt={estado.name}/>
                        </Paper>

                        <Paper elevation={15} sx={{ m: 2, p:2, display: 'flex', justifyContent: 'center' }} className={classes.paper}>
                            <Box display='flex' flexWrap='wrap'>
                                <Box p={1} textAlign="center">
                                    <Typography variant="h5" sx={{color: bar_colors[0], fontWeight: 'bold'}}>
                                        12.3%
                                    </Typography>
                                    <Typography variant="body2" color='white'>
                                        0 de 1
                                    </Typography>
                                    <VerticalProgressBar color={bar_colors[0]} id='pBar1' value={12.3}/>
                                    <Typography color="white">
                                        Ejecutivo
                                    </Typography>
                                </Box>
                                <Box p={1} textAlign="center">
                                    <Typography variant="h5" sx={{color: bar_colors[1], fontWeight: 'bold'}}>
                                        70%
                                    </Typography>
                                    <Typography variant="body2" color='white'>
                                        0 de 1
                                    </Typography>
                                    <VerticalProgressBar color={bar_colors[1]} id='pBar2' value={70}/>
                                    <Typography color="white">Legislativo</Typography>
                                </Box>
                                <Box p={1} textAlign="center">
                                    <Typography variant="h5" sx={{color: bar_colors[2], fontWeight: 'bold'}}>
                                        45%
                                    </Typography>
                                    <Typography variant="body2" color='white'>
                                        0 de 1
                                    </Typography>
                                    <VerticalProgressBar color={bar_colors[2]} id='pBar3' value={45}/>
                                    <Typography color="white">Judicial</Typography>
                                </Box>
                                <Box p={1} textAlign="center">
                                    <Typography variant="h5" sx={{color: bar_colors[3], fontWeight: 'bold'}}>
                                        15%
                                    </Typography>
                                    <Typography variant="body2" color='white'>
                                        0 de 1
                                    </Typography>
                                    <VerticalProgressBar color={bar_colors[3]} id='pBar4' value={15}/>
                                    <Typography color="white">Autónomos</Typography>
                                </Box>
                                <Box p={1} textAlign="center">
                                    <Typography variant="h5" sx={{color: bar_colors[4], fontWeight: 'bold'}}>
                                        87%
                                    </Typography>
                                    <Typography variant="body2" color='white'>
                                        0 de 1
                                    </Typography>
                                    <VerticalProgressBar color={bar_colors[4]} id='pBar5' value={87}/>
                                    <Typography color="white">Municipal</Typography>
                                </Box>

                                <Box p={2} textAlign="center" display='flex' alignContent="center">
                                    {/* Radial chart */}
                                    <Box>
                                        <Typography variant="h3" sx={{fontWeight: 'bold'}} color={colors.s1}>
                                            37.5%
                                        </Typography>

                                        <Typography color="white" variant="subtitle1">
                                            113 de 210
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Paper>
                    </Box>

                </Paper>
            </Grid>
        </Grid>
    </div>
}

export default withStyles(styles)(VistaDetalleEstado);