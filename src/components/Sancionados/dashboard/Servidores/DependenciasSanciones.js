import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {Treemap} from "d3plus-react";
import axios from 'axios';
import * as d3 from "d3";
import MensajeErrorDatos from "@Mensajes/MensajeErrorDatos";
import ContainerChart from "@Compartidos/Dashboards/ContainerChart";

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
        marginBottom: theme.spacing(2)
    },
    descripcion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/charts/getDependenciaMayor',
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

function loadData2() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/charts/getSancionesAnualesDependencia',
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
    .range(["#F87268", "#DC6AF0", "#B286FD", "#8A97D6",
        "#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
        "#8BC34A", "#FFC107", "#FF9800", "#FF7247",
        "#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
        "#AD94D6", "#8A9BF9", "#6DBCFD", "#1C9BFD",
        "#1DE2FC", "#00DBC5", "#71E575", "#AFEE68",
        "#F9AE3E", "#FF9270", "#F2B39C"]);

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
                    "value": parseInt(item.total_sanciones, 10),
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
                }

            })
        }).catch(err => {
            console.error(err);
            setErrorG1(true)
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
            setErrorG2(true)
        });

    }, []);

    return (
        <div>
            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={10}>
                    <ContainerChart>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>{"Sanciones a personas servidoras públicas por Institución"}</b>
                        </Typography>
                        {
                            methods && methods.data &&
                            <Treemap config={methods}/>
                        }
                        {
                            errorG1 && <MensajeErrorDatos/>
                        }
                    </ContainerChart>
                </Grid>
                {
                    /*
                  <Grid item xs={12}>
                    <ContainerChart>
                        {
                            config2 && config2.data &&
                            <Treemap config={config2}/>
                        }
                        {
                            errorG2 && <MensajeErrorDatos/>
                        }
                    </ContainerChart>
                </Grid>
                    * */
                }
            </Grid>

        </div>
    )


}

DependenciasSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DependenciasSanciones);