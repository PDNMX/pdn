import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import "./index.css";
import Typography from "@material-ui/core/Typography";
import {Treemap} from "d3plus-react";
import rp from "request-promise";

const styles = theme => ({
    frameChart: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    desc: {
        textAlign: "center"
    },
    titulo: {
        textAlign: "center",
        marginBottom: "30px",
    },
    descripcion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15px"
    }
});


function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: 'http://localhost:3100/viz/getDependenciaMayor',
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


function loadData2() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: 'http://localhost:3100/viz/getSancionesAnualesDependencia',
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

class DependenciasSanciones extends React.Component {
    state = {};

    componentDidMount() {
        aux().then(result => {
            loadData2().then(result2=>{
                let aux = result.data.map(item => {
                    return {
                        "value": parseInt(item.total_sanciones),
                        "group": item.dependencia
                    }
                });
                let aux2 = result2.data.map(item => {
                    return {
                        "value": parseInt(item.total),
                        "group": item.dependencia,
                        "parent": item.anio
                    }
                });


                this.setState({
                        methods: {
                            data: aux,
                            height: 400,
                            groupBy: ["group"],
                            sum: "value",
                            tooltipConfig: {
                                tbody: [
                                    ["Número de sanciones: ", function (d) {
                                        return d["value"]
                                    }
                                    ]
                                ]
                            },
                            legend :false,
                            shapeConfig:{
                                label: function (d) {
                                    return d["group"]+"\n"+d["value"]+" sanciones"
                                },
                                labelConfig:{
                                    fontMax : 18,
                                    fontMin : 10
                                }
                            },
                        },
                    config2: {
                        data: aux2,
                        height: 400,
                        groupBy: ["parent","group"],
                        sum: "value",
                        tooltipConfig: {
                            tbody: [
                                ["Número de sanciones: ", function (d) {
                                    return d["value"]
                                }
                                ]
                            ]
                        },
                        legend :true,
                        shapeConfig:{
                            label: function (d) {
                                return d["group"]+"\n"+d["value"]+" sanciones"
                            },
                            labelConfig:{
                                fontMax : 18,
                                fontMin : 10
                            }
                        },
                    }
                    }
                )
            });
            });

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={0} justify='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            {"Dependencias con mayor número de sanciones"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <Treemap config={this.state.methods}/>
                        }

                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem
                            Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un
                            impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de
                            textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
                            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem
                            Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un
                            impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de
                            textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            this.state.config2 && this.state.config2.data &&
                            <Treemap config={this.state.config2}/>
                        }

                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem
                            Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un
                            impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de
                            textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
                            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem
                            Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un
                            impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de
                            textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
                        </Typography>
                    </Grid>

                </Grid>

            </div>
        )
    }

}

DependenciasSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DependenciasSanciones);