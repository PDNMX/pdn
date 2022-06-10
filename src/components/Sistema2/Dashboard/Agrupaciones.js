import React, {useState, useEffect} from 'react';
import {withStyles} from '@mui/styles';
import {
    Grid,
    Select,
    MenuItem,
    FormControl,
    Typography,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    Button,
    Alert
} from '@mui/material';
import axios from 'axios';
import {Treemap} from "d3plus-react";
import * as d3 from "d3";
import {ThemeProvider} from '@mui/material/styles';
import ThemeV2 from "../../../ThemeV2";
import ModalInfo from "@Compartidos/Dashboards/ModalInfo";
import ContainerChart from "@Compartidos/Dashboards/ContainerChart";

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

let z = d3.scaleOrdinal()
    .range(["#F87268", "#DC6AF0", "#B286FD", "#8A97D6",
        "#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
        "#8BC34A", "#FFC107", "#FF9800", "#FF7247",
        "#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
        "#AD94D6", "#8A9BF9", "#6DBCFD", "#1C9BFD",
        "#1DE2FC", "#00DBC5", "#71E575", "#AFEE68",
        "#F9AE3E", "#FF9270", "#F2B39C"]);

const Agrupaciones = (props) => {
    const [ejercicio, setEjercicio] = useState('any');
    const [ejercicios, setEjercicios] = useState([]);
    const [ramo, setRamo] = useState('any');
    const [ramos, setRamos] = useState([]);
    const [institucion, setInstitucion] = useState('any');
    const [instituciones, setInstituciones] = useState([]);
    const [error, setError] = useState(false);
    const [config, setConfig] = useState({});
    const {classes} = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    useEffect(() => {
        loadEjercicios();
    }, [])

    useEffect(() => {
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
            setRamos(ramos);
            setRamo('any');
        }).catch(err => {
            setError(true);
            console.log(err);
        });
    }, [ejercicio])
    useEffect(() => {
        let filtros = [];
        if (ejercicio !== 'any') filtros.push("ejercicio='" + ejercicio + "'");
        if (ramo !== 'any') filtros.push("ramo='" + ramo + "'");

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
            setInstitucion('any')
        }).catch(err => {
            console.log(err);
            setError(true)
        })
    }, [ramo])

    useEffect(() =>{
        let filtros = [];
        if (ejercicio !== 'any') filtros.push("ejercicio='" + ejercicio + "'");
        if (ramo !== 'any') filtros.push("ramo='" + ramo + "'");
        if (institucion !== 'any') filtros.push("institucion='" + institucion + "'");

        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getAgrupaciones',
            json: true,
            method: "post",
            data: {
                filtros: filtros
            }
        };

        let v = "";
        if (ejercicio !== 'any' && ramo === 'any' && institucion === 'any')
            v = "group";
        else if (ejercicio !== 'any' && ramo !== 'any' && institucion === 'any')
            v = "subgroup"
        else if ((ejercicio !== 'any' && ramo !== 'any' && institucion !== 'any')
            || (ejercicio !== 'any' && ramo === 'any' && institucion !== 'any'))
            v = "subgroup";
        else if ((ejercicio === 'any' && ramo !== 'any' && institucion === 'any')
            || (ejercicio === 'any' && ramo === 'any' && institucion !== 'any')
            || (ejercicio === 'any' && ramo !== 'any' && institucion !== 'any'))
            v = "parent";

        axios(options).then(res => {
            let aux2 = res.data.data.map(item => ({
                "value": parseInt(item.total, 10),
                "subgroup": item.institucion,
                "group": item.ramo,
                "parent": item.ejercicio
            }));
            setConfig({
                data: aux2,
                height: 400,
                groupBy: v,
                sum: "value",
                tooltipConfig: {
                    tbody: [
                        ["Número de personas servidoras públicas: ", function (d) {
                            return d["value"]
                        }
                        ]
                    ]
                },
                legend: false,
                shapeConfig: {
                    label: function (d) {
                        return d[v] ? d[v] : "General \n" + d["value"] + " personas servidoras públicas"
                    },
                    labelConfig: {
                        fontMax: 18,
                        fontMin: 10
                    },
                    fill: (d) => {
                        return z(d[v])
                    }
                },
            })

        }).catch(err => {
            console.log(err);
            setError(true)
        });
    },[ejercicio,ramo,institucion])

    const loadEjercicios = () => {
        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getEjercicios',
            json: true,
            method: "get"
        };

        axios(options).then(res => {
            let ejercicios = res.data.data.map((item, index) => ({id: (index + 1), ejercicio: item.ejercicio}));
            setEjercicios(ejercicios);
            setEjercicio(ejercicios[ejercicios.length - 1].ejercicio)
        }).catch(err => {
            console.log(err);
            setError(true)
        })
    };

    const limpiarBusqueda = () => {
        setEjercicio(ejercicios[ejercicios.length - 1].ejercicio);
        setRamo('any');
        setInstitucion('any');
        setError(false);
    };

    return (
        <ThemeProvider theme={ThemeV2}>
            <ModalInfo open={open} setOpen={setOpen}>
                <List>
                    <ListItem>
                        <ListItemText>
                            1. <b>Ejercicio fiscal:</b> Permite conocer el total de personas servidoras públicas que  intervinieron en procesos de contratación en un ejercicio fiscal específico.
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            2. <b>Ramo:</b> Permite conocer el número de personas servidoras públicas que intervinieron en procesos de contratación dentro de ese ramo.
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            3. <b>Institución:</b> Permite conocer los datos de las personas servidoras públicas , que participan en procedimientos de contratación en una institución determinada.
                        </ListItemText>
                    </ListItem>
                </List>
            </ModalInfo>
            <ContainerChart handleOpen={handleOpen}>
                <Grid container>
                    <Grid xs={12} className={classes.item}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            Ejercicios, ramos e instituciones
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.item}>
                        <Typography variant={"body1"} paragraph>
                            Selecciona un o varios filtro de interés y da clic en el botón <b>Buscar</b>
                        </Typography>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="campoSelectEjercicio">Ejercicio fiscal</InputLabel>
                            <Select style={{marginTop: '0px'}}
                                    value={ejercicio}
                                    onChange={(e) => setEjercicio(e.target.value)}
                                    label='Ejercicio fiscal'
                            >
                                <MenuItem key={''} value={'any'}> TODOS</MenuItem>
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
                    <Grid item md={4} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="campoSelectRamo">Ramo</InputLabel>
                            <Select style={{marginTop: '0px'}}
                                    value={ramo}
                                    onChange={(e) => setRamo(e.target.value)}
                                    label={'Ramo federal'}
                            >
                                <MenuItem key={''} value={'any'}> TODOS</MenuItem>
                                {
                                    ramos.map(item => {
                                        return <MenuItem key={item.ramo} value={item.ramo}>
                                            {item.ramo}
                                        </MenuItem>
                                    })
                                }
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="campoSelectInstitucion">Institución</InputLabel>
                            <Select style={{marginTop: '0px'}}
                                    value={institucion}
                                    onChange={(e) => setInstitucion(e.target.value)}
                                    label={'Institución'}
                            >
                                <MenuItem key={''} value={'any'}>TODAS</MenuItem>
                                {
                                    instituciones.map(item => {
                                        return <MenuItem key={item.institucion} value={item.institucion}>
                                            {item.institucion}
                                        </MenuItem>
                                    })
                                }
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
                    <Grid item xs={12}>
                        {
                            config && config.data &&
                            <Treemap config={config}/>
                        }
                        {
                            error &&
                            <Alert severity="error">No disponible por el momento, intente más tarde.</Alert>
                        }
                    </Grid>
                </Grid>
            </ContainerChart>
        </ThemeProvider>

    )
}

export default withStyles(styles)(Agrupaciones);