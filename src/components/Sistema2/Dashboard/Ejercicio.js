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
                        En esta entrega se cuenta con 160,776 registros, encontrarás la información correspondiente a períodos fiscales del año 2015 a mayo 2021.
                        Como se aprecia, el año 2018 es el que cuenta con un mayor número de personas servidoras públicas  que intervienen en procesos de contratación a nivel federal con 27,457, a partir del 2019 este número ha ido hacia la baja, teniendo 25,514 en 2019, 20,550  en 2020 y 17,756 hasta mayo 2021.
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
            </Grid>
        </div>
    );
};

export default withStyles(styles)(Ejercicio);