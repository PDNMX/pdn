import React from 'react';
import withStyles from "@mui/styles/withStyles";
import {Box, Paper, Typography} from "@mui/material";
import VerticalProgressBar from "./VerticalProgressBar";
import PieChart from "./PieChart";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const styles = theme => ({
    paper: {
        flexGrow: 1,
        background: theme.palette.background.paperChart
    }
});

const bar_colors = [ '#43b9a5', '#f46c81', '#f5ca5d', '#5ccbf0', '#beF5a6' ];

const percentage = (a, b) => {
    if (a === 0){
        return 0;
    } else{
        return (a / b * 100).toFixed(0);
    }
};

const VistaDetalleSistema = props => {
    const {estado, system, classes, avance_s1, avance_s2} = props;
    const {icon, color, name} = system;

    /* Vista detallada por Sistema */
    return <Box sx={{display: 'flex', flexWrap: "wrap", alignItems: "stretch"}} justifyContent="center">

        <Paper elevation={15} sx={{ m: 1, p:2,  maxWidth: 200, display: 'flex', flexWrap: 'wrap', justifyContent: "center", alignContent: "center"}} className={classes.paper} >
            <Box p={2}>
                <img src={icon} style={{width: "120px"}} alt={estado.name}/>
            </Box>

            <Box p={1}>
                <Typography paragraph fontWeight="bold" color={color} align="center">
                    {name}
                </Typography>
            </Box>
        </Paper>

        <Paper elevation={15} sx={{ m: 1, p: 2, display: 'flex', justifyContent: 'center' }} className={classes.paper}>

            {(system.id === 1 || system.id === 2) &&
                <Box display='flex' flexWrap='wrap'>
                    <Box p={1} textAlign="center">
                        <Typography variant="h5" sx={{color: bar_colors[0], fontWeight: 'bold'}}>
                            {percentage(
                                estado.data[`s${system.id}`].ejecutivo.tiene,
                                estado.data[`s${system.id}`].ejecutivo.total
                            )}%
                        </Typography>
                        <Typography variant="body2" color='white'>
                            {estado.data[`s${system.id}`].ejecutivo.tiene} de {estado.data[`s${system.id}`].ejecutivo.total}
                        </Typography>
                        <VerticalProgressBar color={bar_colors[0]} value={percentage(
                            estado.data[`s${system.id}`].ejecutivo.tiene,
                            estado.data[`s${system.id}`].ejecutivo.total
                        )}/>
                        <Typography color="white">
                            Ejecutivo
                        </Typography>
                    </Box>

                    <Box p={1} textAlign="center">
                        <Typography variant="h5" sx={{color: bar_colors[1], fontWeight: 'bold'}}>
                            {percentage(
                                estado.data[`s${system.id}`].legislativo.tiene,
                                estado.data[`s${system.id}`].legislativo.total
                            )}%
                        </Typography>
                        <Typography variant="body2" color='white'>
                            {estado.data[`s${system.id}`].legislativo.tiene} de {estado.data[`s${system.id}`].legislativo.total}
                        </Typography>
                        <VerticalProgressBar color={bar_colors[1]} value={percentage(
                            estado.data[`s${system.id}`].legislativo.tiene,
                            estado.data[`s${system.id}`].legislativo.total
                        )}/>
                        <Typography color="white">Legislativo</Typography>
                    </Box>

                    <Box p={1} textAlign="center">
                        <Typography variant="h5" sx={{color: bar_colors[2], fontWeight: 'bold'}}>
                            {/*estado.data[`s${system.id}`].judicial.avance*/}
                            {percentage(
                                estado.data[`s${system.id}`].judicial.tiene,
                                estado.data[`s${system.id}`].judicial.total
                            )}%
                        </Typography>
                        <Typography variant="body2" color='white'>
                            {estado.data[`s${system.id}`].judicial.tiene} de {estado.data[`s${system.id}`].judicial.total}
                        </Typography>
                        <VerticalProgressBar color={bar_colors[2]} value={percentage(
                            estado.data[`s${system.id}`].judicial.tiene,
                            estado.data[`s${system.id}`].judicial.total
                        )}/>
                        <Typography color="white">Judicial</Typography>
                    </Box>

                    <Box p={1} textAlign="center">
                        <Typography variant="h5" sx={{color: bar_colors[3], fontWeight: 'bold'}}>
                            {percentage(
                                estado.data[`s${system.id}`].ocas.tiene,
                                estado.data[`s${system.id}`].ocas.total
                            )}%
                        </Typography>
                        <Typography variant="body2" color='white'>
                            {estado.data[`s${system.id}`].ocas.tiene} de {estado.data[`s${system.id}`].ocas.total}
                        </Typography>
                        <VerticalProgressBar color={bar_colors[3]} value={percentage(
                            estado.data[`s${system.id}`].ocas.tiene,
                            estado.data[`s${system.id}`].ocas.total
                        )}/>
                        <Typography color="white">Autónomos</Typography>
                    </Box>

                    <Box p={1} textAlign="center">
                        <Box sx={{
                            borderColor: 'white',
                            borderStyle: 'solid',
                            borderWidth: '0 2px 0 2px',
                            paddingRight: 2,
                            paddingLeft: 2
                        }}>

                            <Typography variant="h5" sx={{color: bar_colors[4], fontWeight: 'bold'}}>
                                {percentage(
                                    estado.data[`s${system.id}`].municipal.tiene,
                                    estado.data[`s${system.id}`].municipal.total
                                )}%
                            </Typography>
                            <Typography variant="body2" color='white'>
                                {estado.data[`s${system.id}`].municipal.tiene} de {estado.data[`s${system.id}`].municipal.total}
                            </Typography>
                            <VerticalProgressBar color={bar_colors[4]} value={percentage(
                                estado.data[`s${system.id}`].municipal.tiene,
                                estado.data[`s${system.id}`].municipal.total
                            )}/>
                            <Typography color="white" variant="body2">Municipios y</Typography>
                            <Typography color="white" variant="body2">Org. Municipales</Typography>
                        </Box>
                    </Box>

                    <Box p={1} textAlign="center" display='flex' flexWrap="wrap" alignContent="center" sx={{maxWidth: 300}}>
                        {/* Radial chart */}
                        <Box>
                            <Typography color="white" sx={{fontWeight: 'bold'}} variant='h6'>
                                Total de instituciones conectadas
                            </Typography>

                            <PieChart color={color} value={system.id ===1 ? avance_s1 : avance_s2}/>

                            <Typography variant="h3" sx={{fontWeight: 'bold'}} color={color}>
                                {/* falta */}
                                {system.id ===1 ? avance_s1 : avance_s2}%
                            </Typography>
                            <Typography color="white" variant="h6">
                                {
                                    estado.data[`s${system.id}`].ejecutivo.tiene +
                                    estado.data[`s${system.id}`].legislativo.tiene +
                                    estado.data[`s${system.id}`].judicial.tiene +
                                    estado.data[`s${system.id}`].municipal.tiene
                                } de {
                                estado.data[`s${system.id}`].ejecutivo.total +
                                estado.data[`s${system.id}`].legislativo.total +
                                estado.data[`s${system.id}`].judicial.total +
                                estado.data[`s${system.id}`].municipal.total
                            }
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            }

            {system.id ===3 &&
                <Box display='flex' flexWrap='wrap'>
                    <Box p={3} sx={{maxWidth: 600}}>
                        <Typography color="white">
                            ¿Cuenta con la información de las sanciones impuestas a personas servidoras públicas por
                            faltas graves contempladas en los Art. 78 y 80 de la
                            Ley General de Responsabilidades Administrativas?
                        </Typography>

                        {estado.data.s3.s3s?
                            <Box display="flex" p={2}>
                                <CheckCircleOutlineIcon sx={{color: "white"}}/>
                                <Typography fontWeight="bold" color="white" paddingLeft={1}>
                                    Sí
                                </Typography>
                            </Box>
                            :
                            <Box display="flex" p={2}>
                                <HighlightOffIcon sx={{color: "white"}}/>
                                <Typography fontWeight="bold" color="white" paddingLeft={1}>
                                     No
                                </Typography>
                            </Box>
                        }


                        <Typography color='white'>
                            ¿Cuenta con la información de las sanciones impuestas a particulares en términos del Art. 81
                            de la Ley General de Responsalidades Administrativas?
                        </Typography>

                        {estado.data.s3.s3p?
                            <Box display="flex" p={2}>
                                <CheckCircleOutlineIcon sx={{color: "white"}}/>
                                <Typography fontWeight="bold" color="white" paddingLeft={1}>
                                    Sí
                                </Typography>
                            </Box>
                            :
                            <Box display="flex" p={2}>
                                <HighlightOffIcon sx={{color: "white"}}/>
                                <Typography fontWeight="bold" color="white" paddingLeft={1}>
                                    No
                                </Typography>
                            </Box>
                        }
                    </Box>
                </Box>
            }
        </Paper>
    </Box>;
}

export default withStyles(styles)(VistaDetalleSistema);
