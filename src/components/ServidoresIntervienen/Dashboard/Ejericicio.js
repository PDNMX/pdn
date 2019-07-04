import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import {BarChart} from "d3plus-react";
import rp from "request-promise";


const styles = theme => ({
    frameChart: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    titulo: {
        textAlign: "center",
        marginBottom: "30px",
    },
    descripcion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15px",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginBottom: "30px"
    },
    btnDownload: {
        textAlign: "right"
    }
});


function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getAgrupacionEjercicio',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            alert("_No se pudo obtener la información");
            console.log(err);
        });
    });
}


let color = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B","#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B"];

class Ejercicio extends React.Component {
    state = {};

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return {
                    "ejercicio": item.ejercicio,
                    "total": parseInt(item.total)
                }
            })
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
        });
    }



    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={0} justify='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>{"Ejercicio fiscal"}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            En esté primer acercamiento, se muestra la información con que se cuenta, correspondiente a periodos fiscales entre los años 2015 a la fecha.<br/>
                            Como se aprecía en la gráfica, hay un ligero crecimiento en el número de registros de Servidores Públicos que intervienen en procesos de contratación año con año.<br/>
                            En particular el año 2019, ya cuenta con un número mayor al registrado de anualmente en el 2016. En secciones posteriores, se podrá analizar la información de cada año correspondiente.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} id={"graf"}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <BarChart config={this.state.methods}/>
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