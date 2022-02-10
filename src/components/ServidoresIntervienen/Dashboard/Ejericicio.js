import React from 'react';
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import {Grid, Typography, Alert} from "@mui/material";
import {BarChart} from "d3plus-react";
import rp from "request-promise";

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
            uri: process.env.REACT_APP_S2_BACKEND + '/api/v0/getAgrupacionEjercicio',
            json: true,
            method: "GET"
        };
        return rp(options);
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
        aux().then(result => {
            let aux = result.data.map(item => ({
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
                            La siguiente gráfica muestra el número de registros de personas servidoras públicas que intervinieron en Enajenación, contrataciones o concesiones a nivel federal
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
        )
    }

}

Ejercicio.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Ejercicio);