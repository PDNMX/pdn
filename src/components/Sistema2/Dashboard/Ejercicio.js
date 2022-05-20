import React from 'react';
import {withStyles} from '@mui/styles';
import {Grid, Typography, Alert} from "@mui/material";
import {BarChart} from "d3plus-react";
import axios from 'axios';

const styles = theme => ({
    frameChart: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    titulo: {
        textAlign: "center",
        marginBottom: theme.spacing(2),
        fontWeight: "bold"
    }
});

const aux = () => axios({
    url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getAgrupacionEjercicio',
    json: true,
    method: "GET"
});

let color = ["#F87268", "#DC6AF0", "#B286FD", "#8A97D6",
    "#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
    "#8BC34A", "#FFC107", "#FF9800", "#FF7247",
    "#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
    "#AD94D6", "#8A9BF9", "#6DBCFD", "#1C9BFD",
    "#1DE2FC", "#00DBC5", "#71E575", "#AFEE68",
    "#F9AE3E", "#FF9270", "#F2B39C"];

const Ejercicio = props => {
    const [state, setState] = React.useState({
        error: false
    });

    React.useEffect(() => {
        aux().then(res => {
            let aux = res.data.data.map(item => ({
                "ejercicio": item.ejercicio,
                "total": parseInt(item.total,10)
            }));

            setState({
                methods: {
                    data: aux,
                    groupBy: "ejercicio",
                    x: "ejercicio",
                    y: "total",
                    xConfig: {
                        title: "Ejercicio fiscal",

                    },
                    yConfig: {
                        title: "Número de registros"
                    },
                    tooltipConfig: {
                        title: d => 'Datos',
                        tbody: [
                            [ "Ejercicio fiscal: ", d => d["ejercicio"] ],
                            [ "Número de registros: ", d => d["total"]  ]
                        ]
                    },
                    height: 400,
                    shapeConfig: {
                        label: false,
                        fill: (d, i) => {
                            return color[i]
                        }
                    },
                    legend: false,
                    axes: {
                        fill: "#666672"
                    },
                    title: "Ejercicio fiscal"
                }
                }
            )
        }).catch(error => {
            console.error(error);
            setState({
                error: true
            });
        });
    },[]);

    const {classes} = props;
    return (
        <div>
            <Grid container spacing={0} justify='center' className={classes.frameChart}>
                <Grid item xs={12}>
                    <Typography variant={"h6"} className={classes.titulo} paragraph>
                        Ejercicio fiscal
                    </Typography>

                    <Typography variant={"body1"} paragraph>
                        La siguiente gráfica muestra el número de registros de personas servidoras públicas que intervinieron en Enajenación, contrataciones o concesiones a nivel federal
                    </Typography>
                </Grid>

                <Grid item xs={12} id={"graf"}>
                    {
                        state.methods && state.methods.data &&
                        <BarChart config={state.methods}/>
                    }
                    {
                        state.error &&
                        <Alert severity="error"> No disponible por el momento, intente más tarde.</Alert>
                    }
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"body1"} paragraph>
                        En el año 2015 participaron 20,526 personas servidoras públicas, en el año 2016 participaron 22,751, en el 2017 participaron 26,250, en el 2018 participaron 27,457, en 2019 hubo una reducción a 25,514, para el año 2020 eran 20,550 y en 2021 participaron 20,946.
                    </Typography>
                    <Typography>
                        Se aprecia una disminución en el año 2019 del <b>7.07%</b>, en el año 2010 del <b>25.15%</b> y en el año 2021 del <b>23.71%</b> respecto al año 2018, en donde se registró el mayor número de personas servidoras públicas interviniendo en procesos de contratación.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(Ejercicio);