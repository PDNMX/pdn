import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {Treemap} from "d3plus-react";
import axios from 'axios';
import * as d3 from "d3";
import MensajeErrorDatos from "../../../Mensajes/MensajeErrorDatos";

const styles = theme => ({
    frameChart: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
    },
    desc: {
        textAlign: "center"
    },
    titulo: {
        textAlign: "center",
        marginBottom: theme.spacing(2)
    },
    descripcion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3P_BACKEND + '/charts/getDependenciaMayor',
            json: true,
            method: "GET"
        };
        axios(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            reject(err)
        });
    });
}

function loadData2() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3P_BACKEND + '/charts/getResolucionesAnualesDependencia',
            json: true,
            method: "GET"
        };
        axios(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            reject(err);
        });
    });
}

let z = d3.scaleOrdinal()
    .range(["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
        "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
        "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
        "#FF5722", "#795548", "#9E9E9E", "#607D8B"]);


const DependenciasSanciones = (props) => {
    const [errorG1, setErrorG1] = React.useState(false);
    const [errorG2, setErrorG2] = React.useState(false);
    const [methods, setMethods] = React.useState({});
    const [config2, setConfig2] = React.useState({});

    const {classes} = props;
    React.useEffect(() => {
        aux().then(result => {
            let aux = result.data.data.map(item => {
                return {
                    "value": parseInt(item.total, 10),
                    "group": item.dependencia
                }
            });
            setMethods({
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
                legend: false,
                shapeConfig: {
                    label: function (d) {
                        return d["group"] + "\n" + d["value"] + " sanciones"
                    },
                    labelConfig: {
                        fontMax: 18,
                        fontMin: 10
                    },
                    fill: (d) => {
                        return z(d.group)
                    }
                },

            })

        }).catch(err => {
            console.error(err);
            setErrorG1(true);
        });

        loadData2().then(result2 => {
            let aux2 = result2.data.data.map(item => {
                return {
                    "value": parseInt(item.total, 10),
                    "group": item.dependencia,
                    "parent": item.anio
                }
            });
            setConfig2({
                data: aux2,
                height: 400,
                groupBy: ["parent", "group"],
                sum: "value",
                tooltipConfig: {
                    tbody: [
                        ["Número de sanciones: ", function (d) {
                            return d["value"]
                        }
                        ]
                    ]
                },
                legend: true,
                shapeConfig: {
                    label: function (d) {
                        return d["group"] + "\n" + d["value"] + " sanciones"
                    },
                    labelConfig: {
                        fontMax: 18,
                        fontMin: 10
                    },
                    fill: (d) => {
                        return z(d.parent)
                    }
                },
            })
        }).catch(err => {
            console.error(err);
            setErrorG2(true);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={0} justifyContent='center' className={classes.frameChart}>
                <Grid item xs={12}>
                    <Typography variant={"h6"} className={classes.titulo}>
                        <b>{"Dependencias con mayor número de sanciones"}</b>
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.descripcion}>
                    <Typography variant={"body1"}>
                        Con respecto a las dependencias que cuentan con más sanciones a particulares , el Instituto
                        Mexicano del Seguro Social es
                        la que cuenta con el mayor número de sanciones con un total de 343 o bien el <b>16.53%</b>,
                        seguida por la Secretaría de la
                        Función Pública con 272 que representa el <b>13.11%</b>, la Comisión Federal de Electricidad con
                        168 equivalente al <b>8.05%</b>.
                        <br/>El resto de las dependencias en el top, presentan un total de sanciones menor a 100.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    {
                        methods && methods.data &&
                        <Treemap config={methods}/>
                    }
                    {
                        errorG1 && <MensajeErrorDatos/>
                    }

                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"body1"} paragraph>
                        En la siguiente gráfica, se puede apreciar el detalle por año, del 2004 a enero 2022.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {
                        config2 && config2.data &&
                        <Treemap config={config2}/>
                    }
                    {
                        errorG2 && <MensajeErrorDatos/>
                    }
                </Grid>
            </Grid>

        </div>
    )


}

DependenciasSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DependenciasSanciones);