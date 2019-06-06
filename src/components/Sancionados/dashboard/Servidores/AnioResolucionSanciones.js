import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import "./index.css";
import Typography from "@material-ui/core/Typography";
import {LinePlot, Pie} from "d3plus-react";
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
        marginBottom : "15px"
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK+'/viz/servidores/getAnioSancion',
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


class AnioResolucionSanciones extends React.Component {
    state = {};
    componentDidMount() {
        aux().then(result => {
            let total = 0;
            let aux = result.data.map(item => {
                total += parseInt(item.count);
                return {
                    anio: item.anio_resolucion.toString(),
                    x: item.anio_resolucion,
                    y: parseInt(item.count)
                }
            });
            this.setState({
                    methods: {
                        data: aux,
                        xConfig: {
                            title: "Año de la sanción",
                            gridConfig: {stroke: "black"},
                        },
                        yConfig: {
                            title: "Número de sanciones",

                        },
                        legend: false,
                        height: 400,
                        shapeConfig: {
                            Line: {
                                strokeWidth: 2,
                                stroke: "blue",
                            }
                        },
                        tooltipConfig: {
                            title: function (d) {
                                return "Datos";
                            },
                            tbody: [
                                ["Año de la sanción: ", function (d) {
                                    return d["anio"]
                                }
                                ],
                                ["Número de sanciones: ", function (d) {
                                    return d["y"]
                                }
                                ]
                            ]
                        },
                        title:"Número de sanciones por año",

                    },
                    configPie: {
                        data: aux,
                        groupBy: "anio",
                        value: function (d) {
                            return d["y"]
                        },
                        height: 300,
                        label:function(d){return d["anio"]+"\n"+"("+((d["y"]*100) / total).toFixed(2)+"%)"},
                        legend :false,
                        tooltipConfig: {
                            tbody: [
                                ["Número de sanciones: ", function (d) {
                                    return d["y"]
                                }
                                ]
                            ]
                        }

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
                    <Grid item xs={12} md={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            {"Cantidad de sanciones"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            Como se puede apreciar en las gráficas, el número de funcionarios sancionados de 2013 - 2015 se mantuvo sin grandes cambios, sancionando cada año aproximandamente a 300 funcionarios. En 2016 hubo un incremento de 16% con respecto a 2015. Sin embargo, para 2017 este número se incrementó en casi 100%, llegando a 700 sancionados. Para 2018 disminuyó pero sólo en 7%.
                            En términos totales, si consideramos los 6 años que van de 2013-2018, se tuvieron poco más de 2,500 funcionarios sancionados. Más del 50% de este total, se registró entre 2017 y 2018.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <LinePlot config={this.state.methods}/>
                        }
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <Pie config={this.state.configPie}/>
                        }
                    </Grid>



                </Grid>

            </div>
        )
    }

}

AnioResolucionSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AnioResolucionSanciones);