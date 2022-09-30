import React from 'react';
import withStyles from "@mui/styles/withStyles";
import {Box, Paper, Typography} from "@mui/material";
import VerticalProgressBar from "./VerticalProgressBar";
import PieChart from "./PieChart";

const styles = theme => ({
    paper: {
        flexGrow: 1,
        background: theme.palette.background.paperChart
    }
});

const bar_colors = [ '#43b9a5', '#f46c81', '#f5ca5d', '#5ccbf0', '#beF5a6' ];

const VistaDetalleSistema = props => {
    const {estado, system, classes} = props;
    const {icon, color, data, name} = system;

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
            <Box display='flex' flexWrap='wrap'>

                <Box p={1} textAlign="center">
                    <Typography variant="h5" sx={{color: bar_colors[0], fontWeight: 'bold'}}>
                        {data[0]}%
                    </Typography>
                    <Typography variant="body2" color='white'>
                        0 de 1
                    </Typography>
                    <VerticalProgressBar color={bar_colors[0]} value={data[0]}/>
                    <Typography color="white">
                        Ejecutivo
                    </Typography>
                </Box>

                <Box p={1} textAlign="center">
                    <Typography variant="h5" sx={{color: bar_colors[1], fontWeight: 'bold'}}>
                        {data[1]}%
                    </Typography>
                    <Typography variant="body2" color='white'>
                        0 de 1
                    </Typography>
                    <VerticalProgressBar color={bar_colors[1]} value={data[1]}/>
                    <Typography color="white">Legislativo</Typography>
                </Box>

                <Box p={1} textAlign="center">
                    <Typography variant="h5" sx={{color: bar_colors[2], fontWeight: 'bold'}}>
                        {data[2]}%
                    </Typography>
                    <Typography variant="body2" color='white'>
                        0 de 1
                    </Typography>
                    <VerticalProgressBar color={bar_colors[2]} value={data[2]}/>
                    <Typography color="white">Judicial</Typography>
                </Box>

                <Box p={1} textAlign="center">
                    <Typography variant="h5" sx={{color: bar_colors[3], fontWeight: 'bold'}}>
                        {data[3]}%
                    </Typography>
                    <Typography variant="body2" color='white'>
                        0 de 1
                    </Typography>
                    <VerticalProgressBar color={bar_colors[3]} value={data[3]}/>
                    <Typography color="white">Autónomos</Typography>
                </Box>

                <Box p={1} textAlign="center">
                    <Box sx={{ borderColor: 'white', borderStyle: 'solid', borderWidth: '0 2px 0 2px', paddingRight: 2, paddingLeft: 2}}>

                        <Typography variant="h5" sx={{color: bar_colors[4], fontWeight: 'bold'}}>
                            {data[4]}%
                        </Typography>
                        <Typography variant="body2" color='white'>
                            0 de 1
                        </Typography>
                        <VerticalProgressBar color={bar_colors[4]} value={data[4]}/>
                        <Typography color="white">Municipal</Typography>
                    </Box>
                </Box>

                <Box p={1} textAlign="center" display='flex' flexWrap="wrap" alignContent="center" sx={{maxWidth: 300}}>
                    {/* Radial chart */}
                    <Box>
                        <Typography color="white" sx={{fontWeight: 'bold'}} variant='h6'>
                            Total de instituciones conectadas
                        </Typography>

                        <PieChart color={color} value={data[5]}/>

                        <Typography variant="h3" sx={{fontWeight: 'bold'}} color={color}>
                            {data[5]}%
                        </Typography>
                        <Typography color="white" variant="h6">
                            113 de 210
                        </Typography>
                    </Box>

                </Box>
            </Box>

        </Paper>
    </Box>;
}

export default withStyles(styles)(VistaDetalleSistema);