import React, {useEffect, useState} from 'react';
import {withStyles} from '@mui/styles';
import {Grid, Select, MenuItem, FormControl, Typography, InputLabel, Button, Alert} from '@mui/material';
import axios from 'axios';
import {BarChart} from "d3plus-react";
import ThemeV2 from "../../../ThemeV2";
import {ThemeProvider} from '@mui/material/styles';
import ContainerChart from "@Compartidos/Dashboards/ContainerChart";
import ModalInfo from "@Compartidos/Dashboards/ModalInfo";

const styles = theme => ({
    frameChart: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    titulo: {
        textAlign: "center",
        marginBottom: theme.spacing(2),
        fontWeight: "bold"
    },
    item: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    formControl: {
        width: '90%'
    },
    buttonContainer: {
        textAlign: "center",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },

});

let color = ["#F87268", "#DC6AF0", "#B286FD", "#8A97D6",
    "#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
    "#8BC34A", "#FFC107", "#FF9800", "#FF7247",
    "#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
    "#AD94D6", "#8A9BF9", "#6DBCFD", "#1C9BFD",
    "#1DE2FC", "#00DBC5", "#71E575", "#AFEE68",
    "#F9AE3E", "#FF9270", "#F2B39C"];

const Tops = (props) => {
    const [ejercicio, setEjercicio] = useState('any');
    const [ejercicios, setEjercicios] = useState([]);
    const [ramo, setRamo] = useState('any');
    const [ramos, setRamos] = useState([]);
    const [institucion, setInstitucion] = useState('any');
    const [instituciones, setInstituciones] = useState([]);
    const [top, setTop] = useState('INSTITUCION');
    const [error, setError] = useState(false)
    const [methods, setMethods] = useState({})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)
    const {classes} = props;

    useEffect(() => {
        loadEjercicios();
    }, [])

    useEffect(()=>{
        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getRamos',
            json: true,
            method: "post",
            data: {
                filtros: ejercicio !== 'any' ? ("ejercicio= '" + ejercicio + "'") : null
            }
        };

        axios(options).then(res => {
            let ramos = res.data.data.map((item, index) => ({id: index, ramo: item.ramo}));
            setRamos(ramos)
        }).catch(err => {
            console.log(err);
            setError(true)
        })
    },[ejercicio]);

    useEffect(() => {

        let filtros = [];
        if (ejercicio) filtros.push("ejercicio='" + ejercicio + "'");
        if (ramo) filtros.push("ramo='" + ramo + "'");

        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getInstituciones',
            json: true,
            method: "post",
            data: {
                filtros: filtros.length > 0 ? filtros : null
            }
        };

        axios(options).then(res => {
            let instituciones = res.data.data.map((item, index) => ({id: index, institucion: item.institucion}));
            setInstituciones(instituciones);
        }).catch(err => {
            console.log(err);
            setError(true)
        })
    }, [ramo])

    useEffect(() =>{
        let filtros = [];
        if (ejercicio !== "any") filtros.push("ejercicio='" + ejercicio + "'");
        if (ramo !== "any") filtros.push("ramo='" + ramo + "'");
        if (institucion !== "any") filtros.push("institucion='" + institucion + "'");

        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getTop',
            json: true,
            method: "post",
            data: {
                top: top,
                filtros: filtros.length > 0 ? filtros : null
            }
        };

        axios(options).then(res => {
            let aux = res.data.data.map(item => ({
                "top": item.top ? item.top : 'NO ESPECIFICADO',
                "total": parseInt(item.total, 10),
                "case": item.case ? item.case : null
            }));
            setMethods({
                data: aux.reverse(),
                discrete: "y",
                groupBy: "top",
                x: "total",
                y: "top",
                yConfig: {
                    title: top === "id_procedimiento" ? "PROCEDIMIENTO" : top === "UR" ? "UNIDADES RESPONSABLES" : top,
                    tickFormat: function (d) {
                        return "";
                    },
                },
                xConfig: {
                    title: "NÚMERO DE REGISTROS"
                },
                tooltipConfig: {
                    title: top === "id_procedimiento" ? function (d) {
                        return d["case"];
                    } : function (d) {
                        return d["top"];
                    },
                    tbody: [

                        ["Número de registros: ", function (d) {
                            return d["total"]
                        }
                        ]
                    ]
                },
                height: 400,
                shapeConfig: {
                    label: function (d) {
                        return d["case"] ? d["case"] : d["top"]
                    },
                    fill: (d, i) => {
                        return color[i]
                    }
                },
                axes: {
                    fill: "#666672"
                },
                title: "TOP 10 " + (top === "id_procedimiento" ? "PROCEDIMIENTO" : top === "UR" ? "UNIDADES RESPONSABLES" : top),

            })
        }).catch(err => {
            console.log(err);
            setError(true)
        });
    },[ejercicio,ramo,institucion, top])

    const loadEjercicios = () => {
        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getEjercicios',
            json: true,
            method: "get"
        };

        axios(options).then(res => {
            let ejercicios = res.data.data.map((item, index) => ({id: index, ejercicio: item.ejercicio}));
            setEjercicios(ejercicios)
        }).catch(err => {
            console.log(err);
            setError(true)
        })
    };



    const limpiarBusqueda = () => {
        setEjercicio('any');
        setRamo('any');
        setInstitucion('any');
        setError(false);
        setTop('INSTITUCION');
    };

    return (
        <ThemeProvider theme={ThemeV2}>
            <ModalInfo open={open} setOpen={setOpen}>
                <Typography variant={"body1"} paragraph>
                    En esta gráfica puedes visualizar los procedimientos, las instituciones y unidades responsables o puestos con más personas servidoras públicas que participan en  contrataciones públicas.
                </Typography>
            </ModalInfo>
            <ContainerChart handleOpen={handleOpen}>
                <Grid container>
                    <Grid item xs={12} className={classes.item}>
                        <Typography variant={"h6"} className={classes.titulo} paragraph>
                            Top 10
                        </Typography>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12}>
                            <Typography paragraph>
                                Selecciona uno o varios filtros de tu interés y da clic en el botón <b>Buscar</b>
                            </Typography>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="campoSelectEjercicio">Ejercicio</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={ejercicio}
                                        onChange={(e) => setEjercicio(e.target.value)}
                                        label={'Ejercicio'}
                                >
                                    <MenuItem key={'any'} value={'any'}> TODOS</MenuItem>
                                    {
                                        ejercicios.map(item => {
                                            return <MenuItem key={item.ejercicio} value={item.ejercicio}>
                                                {item.ejercicio}
                                            </MenuItem>
                                        })
                                    }
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="campoSelectRamo">Ramo</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={ramo}
                                        onChange={(e) => setRamo(e.target.value)}
                                        label={'Ramo'}
                                >
                                    <MenuItem value={'any'}>TODOS</MenuItem>
                                    {
                                        ramos.map(item => {
                                            return <MenuItem value={item.ramo} key={item.ramo}>
                                                {item.ramo}
                                            </MenuItem>
                                        })
                                    }
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="campoSelectInstitucion">Institución</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={institucion}
                                        onChange={(e) => setInstitucion(e.target.value)}
                                        label={'Institución'}
                                >
                                    <MenuItem value={'any'}>TODAS</MenuItem>
                                    {
                                        instituciones.map(item => {
                                            return <MenuItem value={item.institucion} key={item.institucion}>
                                                {item.institucion}
                                            </MenuItem>
                                        })
                                    }
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="selectTop">Top</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={top}
                                        onChange={(e) => setTop(e.target.value)}
                                        label={'Top'}
                                >
                                    <MenuItem key={0} value={"id_procedimiento"}>PROCEDIMIENTO</MenuItem>
                                    <MenuItem key={1} value={"INSTITUCION"}>INSTITUCIONES</MenuItem>
                                    <MenuItem key={2} value={"UR"}>UNIDADES RESPONSABLES</MenuItem>
                                    <MenuItem key={3} value={"PUESTO"}>PUESTOS</MenuItem>
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={11}/>

                        <Grid item xs={12} md={1} className={classes.buttonContainer}>
                            <Button variant="contained" color="secundario" className={classes.button}
                                    onClick={limpiarBusqueda}>
                                Limpiar
                            </Button>
                        </Grid>
                        <Grid item xs={12} id={"grafica"}>
                            {
                                methods && methods.data &&
                                <BarChart config={methods}/>
                            }
                            {
                                error &&
                                <Alert severity="error">No disponible por el momento, intente más tarde.</Alert>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </ContainerChart>
        </ThemeProvider>
    )

}


export default withStyles(styles)(Tops);