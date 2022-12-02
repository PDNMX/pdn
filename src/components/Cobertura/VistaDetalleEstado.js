import React from 'react';
import {Typography, Grid, Paper, Box} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import {useParams} from "react-router-dom";
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes";
import estados from "./estados.json";
import CustomizedProgressBar from "./CustomizedProgressBar";
import icon_s1 from '../../assets/rediseno/ico_sistemas/ico_s1_color.svg';
import icon_s2 from '../../assets/rediseno/ico_sistemas/ico_s2_color.svg';
import icon_s3 from '../../assets/rediseno/ico_sistemas/ico_s3_color.svg';
import VistaDetalleSistema from "./VistaDetalleSistema";

const colors = {
    s1 : "#F8CAC4",
    s2 : "#D8ACD8",
    s3 : "#C6C1EB",
};

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
    },
});

const percentage = (a, b) => {
    if (a === 0){
        return 0;
    } else{
        return (a / b * 100).toFixed(0);
    }
};

const VistaDetalleEstado = props => {
    const {classes} = props;
    const {id_estado} = useParams();
    const section = pdnRoutes.find(r => r.path === '/cobertura/:id_estado');
    const estado = estados.find(e => e.route.includes(id_estado));
    const icon = require(`../../assets/Cobertura/iconos_estados/${estado.icon2}`);

    const sys = [
        {
            id: 1,
            color: colors.s1,
            data: [10, 92,30, 43,50, 90 ],
            icon: icon_s1,
            name: "Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal"
        },
        {
            id: 2,
            color: colors.s2,
            data: [80, 12,45, 33,76, 23],
            icon: icon_s2,
            name: "Sistema de los servidores públicos que intervengan en procedimientos de contrataciones públicas"
        },
        {
            id: 3,
            color: colors.s3,
            data: [20, 10, 30, 50, 30, 53],
            icon: icon_s3,
            name: "Sistema nacional de servidores públicos y particulares sancionados"
        }
    ];

    const [system, setSystem] = React.useState(
        JSON.parse(JSON.stringify(sys[0]))
    );

    const handleSetSystem = id => {
        setSystem( sys.find( s => s.id === id) );
    };

    const avance_s1 = percentage(
        estado.data.s1.ejecutivo.tiene +
        estado.data.s1.legislativo.tiene +
        estado.data.s1.judicial.tiene +
        estado.data.s1.municipal.tiene
        ,
        estado.data.s1.ejecutivo.total +
        estado.data.s1.legislativo.total +
        estado.data.s1.judicial.total +
        estado.data.s1.municipal.total
    );

    const avance_s2 = percentage(
        estado.data.s2.ejecutivo.tiene +
        estado.data.s2.legislativo.tiene +
        estado.data.s2.judicial.tiene +
        estado.data.s2.municipal.tiene,
        estado.data.s2.ejecutivo.total +
        estado.data.s2.legislativo.total +
        estado.data.s2.judicial.total +
        estado.data.s2.municipal.total
    );

    const avance_s3 =
        (estado.data.s3.s3s? 50 : 0) +
        (estado.data.s3.s3p? 50 : 0);

    return <div>
        <HeaderV2 section={section}/>
        <Grid container spacing={0} justifyContent='center'>
            <Grid item xs={12} className={classes.rootItem}>
                <Paper elevation={15} className={classes.rootPaper}>

                    <Typography variant="h3" paragraph align="center" color="white">
                        {estado.name}
                    </Typography>

                    <Typography align="center" color="white" paragraph>
                        Información al 30 de septiembre del 2022, reportada por las Secretarías Ejecutivas del Sistema Anticorrupción Estatal
                    </Typography>

                    <Box sx={{display: 'flex', flexWrap: "wrap", alignItems: "stretch"}} justifyContent="center">
                        <Paper elevation={15} sx={{ m: 1, p: 2 }} className={classes.paper}>
                            <Box display="flex" flexWrap="wrap" justifyContent="center">
                                <Box>
                                    <img src={icon} width="260px" alt={estado.name}/>
                                </Box>

                                <Box sx={{ paddingTop: '40px', flexGrow: 1}}>
                                    <Box display='flex' onClick={() => handleSetSystem(1)} sx={{cursor: 'pointer'}}>
                                        <img src={icon_s1} alt='Sistema 1' style={{width: '40px', padding: "2px"}}/>
                                        <CustomizedProgressBar value={avance_s1} color={colors.s1} />
                                    </Box>

                                    <Box display='flex' onClick={() => handleSetSystem(2)} sx={{cursor: 'pointer'}}>
                                        <img src={icon_s2} alt='Sistema 2' style={{width: '40px', padding: "2px"}}/>
                                        <CustomizedProgressBar value={avance_s2} color={colors.s2}/>
                                    </Box>

                                    <Box display="flex" onClick={() => handleSetSystem(3)} sx={{cursor: 'pointer'}}>
                                        <img src={icon_s3} alt='Sistema 3' style={{width: '40px', padding: "2px"}}/>
                                        <CustomizedProgressBar value={avance_s3} color={colors.s3}/>
                                    </Box>
                                </Box>
                            </Box>

                        </Paper>

                        <Paper elevation={15} sx={{ m:1, p: 2, textAlign: "center", maxWidth: 200 }} className={classes.paper}>
                            <Typography variant="h5" color="white" sx={{fontWeight: 'bold'}}>
                                Instituciones en la PDN
                            </Typography>

                            {/*<Typography variant="body2" color="white">
                                Información de instituciones en la PDN
                            </Typography>*/}

                            <Typography variant="h4" color={colors.s1} sx={{fontWeight: 'bold'}}>
                                {avance_s1}%
                            </Typography>
                            <Typography color='white'>
                                {
                                    estado.data.s1.ejecutivo.tiene +
                                    estado.data.s1.legislativo.tiene +
                                    estado.data.s1.judicial.tiene +
                                    estado.data.s1.municipal.tiene
                                } de {
                                estado.data.s1.ejecutivo.total +
                                estado.data.s1.legislativo.total +
                                estado.data.s1.judicial.total +
                                estado.data.s1.municipal.total
                            }
                            </Typography>
                            <Typography variant="h4" color={colors.s2} sx={{fontWeight: 'bold'}}>
                                {avance_s2}%
                            </Typography>
                            <Typography color='white'>
                                {
                                    estado.data.s2.ejecutivo.tiene +
                                    estado.data.s2.legislativo.tiene +
                                    estado.data.s2.judicial.tiene +
                                    estado.data.s2.municipal.tiene
                                } de {
                                estado.data.s2.ejecutivo.total +
                                estado.data.s2.legislativo.total +
                                estado.data.s2.judicial.total +
                                estado.data.s2.municipal.total
                            }
                            </Typography>

                            <Typography variant="h4" color={colors.s3} sx={{fontWeight: 'bold'}}>
                                {avance_s3}%
                            </Typography>
                            <Typography color="white" fontWeight="bold">Sancionados</Typography>
                            <Typography color='white' variant="body2"> Servidores públicos: {estado.data.s3.s3s? "Sí" : "No"} </Typography>
                            <Typography color='white' variant="body2"> Particulares: {estado.data.s3.s3p? "Sí" : "No"} </Typography>

                        </Paper>
                    </Box>

                    <VistaDetalleSistema estado={estado} system={system}
                                         avance_s1={avance_s1}
                                         avance_s2={avance_s2}
                                         avance_s3={avance_s3}
                    />
                </Paper>
            </Grid>
        </Grid>
    </div>
}

export default withStyles(styles)(VistaDetalleEstado);
