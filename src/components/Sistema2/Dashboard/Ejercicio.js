import React from 'react';
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
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

const aux = () => {
        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getAgrupacionEjercicio',
            json: true,
            method: "GET"
        };
        return axios(options);
};


let color = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B"];

class Ejercicio extends React.Component {
    state = {
        error: false,
    };

    componentDidMount() {
        aux().then(res => {
            let aux = res.data.data.map(item => ({
                "ejercicio": item.ejercicio,
                "total": parseInt(item.total,10)
            }));

            this.setState({
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
                        title: function (d) {
                            return "Datos";
                        },
                        tbody: [
                            ["Ejercicio fiscal: ", function (d) {
                                return d["ejercicio"]
                            }
                            ],
                            ["Número de registros: ", function (d) {
                                return d["total"]
                            }
                            ]
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
            console.error(error)
            this.setState({
                error: true
            });
        });
    }

    render() {
        const {classes} = this.props;
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
                            this.state.methods && this.state.methods.data &&
                            <BarChart config={this.state.methods}/>
                        }
                        {
                            this.state.error &&
                            <Alert severity="error"> No disponible por el momento, intente más tarde.</Alert>
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Ejercicio.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Ejercicio);