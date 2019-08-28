import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core";
import rp from "request-promise";
import MensajeErrorDatos from "../../Tablas/MensajeErrorDatos";
import BarChart from "d3plus-react/es/src/BarChart";
import * as d3 from "d3";


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
        marginBottom: "30px",
        textAlign:"justify"

    },
    btnDownload: {
        textAlign: "right"
    },

});


function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getProcedimientosPeriodo',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            console.log(err);
            reject(err)
        });
    });
}

let z = d3.scaleOrdinal()
    .range(["#2685C8","#48BF40","#7C2BCD","#FF6A00"]);

class Ejercicio extends React.Component {
    state = {
        error: false,
    };

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return {
                    "ejercicio": item.ejercicio,
                    "total": parseInt(item.total,10),
                    "procedimiento":item.case
                }
            })
            this.setState({
                    methods: {
                        data: aux,
                        groupBy: "procedimiento",
                        stacked:true,
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
                                return d["procedimiento"];
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
                            fill: (d) => {
                                return z(d.procedimiento)
                            }
                        },

                    }
                }
            )
        }).catch(error => {
            this.setState({
                error: true
            })
        })
    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={0} justify='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>{"Procedimientos"}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            Los procesos de contratación están divididos en cuatro tipos, en la siguiente gráfica podrás observar cuántos procedimientos de
                            cada tipo han habido en cada año. Como se aprecia, la contratación es el tipo más común a lo largo del tiempo, mientras que en
                            los años 2017 y 2018 hubo un incremento de más del doble en las concesiones.<br/><br/>
                            <b>Tipos de procesos: </b><br/>
                            <b>Contrataciones públicas: </b>Se contemplan aquellas sujetas a la Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público (LAASSP), la Ley de Obras Públicas y Servicios Relacionados con las Mismas (LOPSRM) y la Ley de Asociaciones Público Privadas (LAPP).<br/>
                            <b>Concesiones, licencias, permisos, autorizaciones y prórrogas: </b>Comprende los regulados por las diversas disposiciones jurídicas de carácter federal que otorgan las dependencias de la Administración Pública Federal (APF).<br/>
                            <b>Enajenación de bienes muebles: </b>Que incluyen los actos traslativos de propiedad de los bienes muebles de la federación y de las entidades paraestatales conforme a la Ley General de Bienes Nacionales (LGBN).<br/>
                            <b>Asignación y emisión de dictámenes de avalúos nacionales: </b>Comprende únicamente los que son competencia del Instituto de Administración y Avalúos de Bienes Nacionales (INDAABIN).


                        </Typography>
                    </Grid>

                    <Grid item xs={12} id={"graf"}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <BarChart config={this.state.methods}/>
                        }
                        {
                            this.state.error &&
                            <MensajeErrorDatos/>
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