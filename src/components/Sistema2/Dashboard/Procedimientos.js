import React from 'react';
import {withStyles} from '@mui/styles';
import {Grid, Typography, List, ListItem, ListItemText, Alert} from "@mui/material";
import axios from 'axios';
import BarChart from "d3plus-react/es/src/BarChart";
import * as d3 from "d3";

const styles = theme => ({
    frameChart: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    titulo: {
        textAlign: "center",
        marginBottom: theme.spacing(2),
        fontWeight: "bold"
    },
    item: {
        marginTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        marginBottom: theme.spacing(3),
    },
    btnDownload: {
        textAlign: "right"
    },
});

const aux = () => axios({
    url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getProcedimientosPeriodo',
    json: true,
    method: "GET"
});

const z = d3.scaleOrdinal().range(["#2685C8","#48BF40","#7C2BCD","#FF6A00"]);

const Procedimiento = props => {

    const [state, setState] = React.useState({
        error: false
    });

    React.useEffect(() => {
        aux().then(result => {
            let data_ = result.data.data.map(item => ({
                "ejercicio": item.ejercicio,
                "total": parseInt(item.total,10),
                "procedimiento":item.case
            }));

            setState({
                methods: {
                    data: data_,
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
                        title: d => d["procedimiento"],
                        tbody: [
                            [ "Ejercicio fiscal: ", d => d["ejercicio"] ],
                            [ "Número de registros: ", d => d["total"] ]
                        ]
                    },
                    height: 400,
                    shapeConfig: {
                        fill: d => z(d.procedimiento)
                    },
                }
                }
            )
        }).catch(error => {
            console.error(error)
            setState({
                error: true
            });
        })
    },[]);


    const {classes} = props;
    return (
        <div>
            <Grid container spacing={0} justify='center' className={classes.frameChart}>
                <Grid item xs={12} className={classes.item}>
                    <Typography variant={"h6"} className={classes.titulo} paragraph>
                        Procedimientos
                    </Typography>

                    <Typography variant={"body1"} paragraph>
                        Los procesos de contratación están divididos en cuatro tipos, en la siguiente gráfica podrás observar cuántos procedimientos de cada tipo se
                        ejercieron del año 2015 a mayo 2021.
                        Como se aprecia, la contratación es el tipo más común a lo largo del tiempo, mientras que en las concesiones tuvieron incrementos a partir del
                        año 2017 (4,978 ) y hasta el 2019. También se observa que no existen registros respecto al tipo de proceso asignación y emisión de dictámenes de avalúos nacionales.
                    </Typography>

                    <Typography style={{fontWeight: "bold"}} paragraph>Tipos de procesos</Typography>

                    <List>
                        <ListItem>
                            <ListItemText>
                                1. <b>Contrataciones públicas: </b>Se contemplan aquellas sujetas a la Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público (LAASSP), la Ley de Obras Públicas y Servicios Relacionados con las Mismas (LOPSRM) y la Ley de Asociaciones Público Privadas (LAPP).
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                2. <b>Concesiones, licencias, permisos, autorizaciones y prórrogas: </b>Comprende los regulados por las diversas disposiciones jurídicas de carácter federal que otorgan las dependencias de la Administración Pública Federal (APF).
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                3. <b>Enajenación de bienes muebles: </b>Que incluyen los actos traslativos de propiedad de los bienes muebles de la federación y de las entidades paraestatales conforme a la Ley General de Bienes Nacionales (LGBN).
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                4. <b>Asignación y emisión de dictámenes de avalúos nacionales: </b>Comprende únicamente los que son competencia del Instituto de Administración y Avalúos de Bienes Nacionales (INDAABIN).
                            </ListItemText>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} id={"graf"}>
                    {
                        state.methods && state.methods.data &&
                        <BarChart config={state.methods}/>
                    }
                    {
                        state.error &&
                        <Alert severity="error"> No disponible por el momento, intente más tarde. </Alert>
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(Procedimiento);