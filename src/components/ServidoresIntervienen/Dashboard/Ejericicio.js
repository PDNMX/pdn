import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import {BarChart} from "d3plus-react";
import rp from "request-promise";
import Alert from "@material-ui/lab/Alert";

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
                                return d["ejercicio"] + "ejercicio"
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
                            En este primer acercamiento, se muestra la información correspondiente a periodos fiscales de los años 2015 a la fecha.
                            Como se aprecia, hay un ligero crecimiento en el número de registros de servidores públicos que intervienen en procesos de contratación cada año.
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