import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import Header from "./Header";
import Grid from "@material-ui/core/Grid/Grid";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Mensaje from "./Mensaje";
import Registro from "./Registro";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const styles = theme => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: '150px',
            marginRight: '150px',

        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,

        }
    },
    container1: {
        flexGrow: 1,
        backgroundColor: theme.palette.backDark.color
    },
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    titleLight: {
        color: "#e6e6e6",
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    titleDark: {
        color: "#e6e6e6",
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    summary: {
        color: theme.palette.primary.main,
    },
    textLight: {
        color: "#e6e6e6",
        textAlign: 'justify'
    },
    textDark: {
        color: theme.palette.textNormal,
        textAlign: 'justify'
    },
    container2: {
        flexGrow: 1,
        backgroundColor: theme.palette.backLight.color,
    },
    bgPanelDark: {
        backgroundColor: theme.palette.backDark.color,
    },
    bgPanelLight: {
        backgroundColor: theme.palette.white.color,
        minHeight : '550px',
        paddingBottom: '50px',
    },
    section: {
        maxWidth: '1024px'
    },
    bgImg: {
        height: '300px',
        backgroundImage: 'url(test2.jpg)',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        textAlign: 'left',
        backgroundSize: 'cover',
        width: '100%',
    },
    seccion: {
        backgroundColor: theme.palette.backDark.color
    },
    image: {
        width: '50%',
        height: '150px',
        borderRadius: '50px',
        display: 'inline-block'
    },
    bgContainer: {
        backgroundColor: theme.palette.grisTenue.color,
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5
    },
    center: {
        textAlign: 'center'
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    },
    container: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '100px',
            marginRight: '100px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        }
    },
    pdn: {
        [theme.breakpoints.up('sm')]: {
            paddingTop: '75px'
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: '40px'

        }
    },
    formControl: {
        margin: theme.spacing.unit,

    },
    button: {
        margin: theme.spacing.unit,
    },
});

class DemoDeclaraciones extends React.Component {
    state = {
        rol: '',
        nombre: '',
        apellidoUno: '',
        apellidoDos: '',
        bandera: 2,
        declaracion: {
            informacion_personal:{
                "informacion_general": {
                    "nombres": "Carlos",
                    "primer_apellido": "Pérez",
                    "segundo_apellido": "López",
                    "nacionalidades": [
                        {
                            "valor": "México",
                            "codigo": "MX"
                        }
                    ],
                    "pais_nacimiento": {
                        "valor": "México",
                        "codigo": "MX"
                    },
                    "entidad_federativa_nacimiento": {
                        "nom_ent": "México",
                        "cve_ent": 15
                    },
                    "curp": "BEML920313HMCLNS09",
                    "rfc": "GOAP780710RH7",
                    "fecha_nacimiento": "31/07/1980",
                    "numero_identificacion_oficial": "a1b2c3d4",
                    "correo_electronico": {
                        "personal": "jperez@ejemplo.com.mx",
                        "laboral": "jperez@ejemplo.com.mx"
                    },
                    "telefono": {
                        "personal": "+525510203040",
                        "celular": "+525510203040"
                    },
                    "domicilio": {
                        "pais": {
                            "valor": "México",
                            "codigo": "MX"
                        },
                        "entidad_federativa": {
                            "nom_ent": "México",
                            "cve_ent": 15
                        },
                        "municipio": {
                            "nom_mun": "Ecatepec de Morelos",
                            "cve_mun": 27
                        },
                        "cp": 55018,
                        "localidad": {
                            "nom_loc": "Ecatepec de Morelos",
                            "cve_loc": 1
                        },
                        "vialidad": {
                            "tipo_vial": "CALLE",
                            "nom_vial": "El Rosal"
                        },
                        "numExt": 24,
                        "numInt": 48
                    },
                    "estado_civil": {
                        "codigo": "CAS",
                        "valor": "Casado (a)"
                    },
                    "regimen_matrimonial": {
                        "codigo": "SBI",
                        "valor": "Separación de bienes"
                    },
                    "fecha_declaracion": "31/07/1980"
                },
                "datos_curriculares": {
                    "grado_maximo_escolaridad": "Licenciatura",
                    "grados_academicos": [
                        {
                            "grado_obtenido": "Licenciatura",
                            "institucion_educativa": "La Universidad Nacionalista México",
                            "lugar_institucion_educativa": {
                                "nom_ent": "México",
                                "cve_ent": 15
                            },
                            "carrera": "Ing. en Sistemas Computacionales",
                            "estatus": {
                                "codigo": "CURS",
                                "valor": "Cursando"
                            },
                            "ano_conclusion": "2005",
                            "documento_obtenido": {
                                "codigo": "BOL",
                                "valor": "Boleta"
                            },
                            "cedula_profesional": "2094884"
                        }
                    ]
                },
                "datos_encargo_actual": {
                    "ente_publico": "Presidencia de la República",
                    "empleo_cargo_comision": "Director General de Datos Abiertos",
                    "nivel_gobierno": {
                        "codigo": "EST",
                        "valor": "Estatal"
                    },
                    "poder_juridico": {
                        "codigo": "JUD",
                        "valor": "Judicial"
                    },
                    "contratado_honorarios": true,
                    "nivel_encargo": "CA0001",
                    "area_adscripcion": "Unidad de Política Regulatoria",
                    "fecha_posesion": "31/07/1980",
                    "lugar_ubicacion": {
                        "valor": "México",
                        "codigo": "MX"
                    },
                    "direccion_encargo": {
                        "pais": {
                            "valor": "México",
                            "codigo": "MX"
                        },
                        "entidad_federativa": {
                            "nom_ent": "México",
                            "cve_ent": 15
                        },
                        "municipio": {
                            "nom_mun": "Ecatepec de Morelos",
                            "cve_mun": 27
                        },
                        "cp": 55018,
                        "localidad": {
                            "nom_loc": "Ecatepec de Morelos",
                            "cve_loc": 1
                        },
                        "vialidad": {
                            "tipo_vial": "CALLE",
                            "nom_vial": "El Rosal"
                        },
                        "numExt": 24,
                        "numInt": 48
                    },
                    "sector_industria": {
                        "codigo": "SFS",
                        "valor": "Servicios de salud y asistencia social"
                    },
                    "funciones_principales": [
                        {
                            "codigo": "ABI",
                            "valor": "Administración de bienes"
                        }
                    ]
                },
                "experiencia_laboral": [
                    {
                        "ambito": {
                            "codigo": "Pub",
                            "valor": "Público"
                        },
                        "nivel_gobierno": {
                            "codigo": "EST",
                            "valor": "Estatal"
                        },
                        "poder_ente": {
                            "codigo": "JUD",
                            "valor": "Judicial"
                        },
                        "nombre_institucion": "Instituto Federal de Telecomunicaciones",
                        "unidad_administrativa": "Unidad de Política Regulatoria",
                        "direccion": {
                            "pais": {
                                "valor": "México",
                                "codigo": "MX"
                            },
                            "entidad_federativa": {
                                "nom_ent": "México",
                                "cve_ent": 15
                            },
                            "municipio": {
                                "nom_mun": "Ecatepec de Morelos",
                                "cve_mun": 27
                            },
                            "cp": 55018,
                            "localidad": {
                                "nom_loc": "Ecatepec de Morelos",
                                "cve_loc": 1
                            },
                            "vialidad": {
                                "tipo_vial": "CALLE",
                                "nom_vial": "El Rosal"
                            },
                            "numExt": 24,
                            "numInt": 48
                        },
                        "sector_industria": {
                            "codigo": "SFS",
                            "valor": "Servicios de salud y asistencia social"
                        },
                        "jerarquia_rango": "string",
                        "cargo_puesto": "Jefe de Departamento",
                        "fecha_ingreso": "31/07/1980",
                        "fecha_salida": "31/07/1980",
                        "funciones_principales": [
                            {
                                "codigo": "ABI",
                                "valor": "Administración de bienes"
                            }
                        ]
                    }
                ],
                "datos_dependientes_economicos": [
                    {
                        "nombres": "Carlos",
                        "primer_apellido": "Pérez",
                        "segundo_apellido": "López",
                        "tipo_relacion": {
                            "codigo": "CONY",
                            "valor": "Cónyuge"
                        },
                        "nacionalidad": {
                            "valor": "México",
                            "codigo": "MX"
                        },
                        "curp": "BEML920313HMCLNS09",
                        "rfc": "GOAP780710RH7",
                        "fecha_nacimiento": "31/07/1980",
                        "numero_identificacion_nacional": "ABCD1234",
                        "habita_domicilio_declarante": true,
                        "domicilio": {
                            "pais": {
                                "valor": "México",
                                "codigo": "MX"
                            },
                            "entidad_federativa": {
                                "nom_ent": "México",
                                "cve_ent": 15
                            },
                            "municipio": {
                                "nom_mun": "Ecatepec de Morelos",
                                "cve_mun": 27
                            },
                            "cp": 55018,
                            "localidad": {
                                "nom_loc": "Ecatepec de Morelos",
                                "cve_loc": 1
                            },
                            "vialidad": {
                                "tipo_vial": "CALLE",
                                "nom_vial": "El Rosal"
                            },
                            "numExt": 24,
                            "numInt": 48
                        },
                        "medio_contacto": "usuario@correo.com",
                        "ingresos_propios": true,
                        "ocupacion_profesion": "Administrador de empresas",
                        "sector_industria": {
                            "codigo": "SFS",
                            "valor": "Servicios de salud y asistencia social"
                        },
                        "proveedor_contratista_gobierno": true,
                        "tiene_intereses_mismo_sector_declarante": true,
                        "desarrolla_cabildeo_sector_declarante": true,
                        "beneficiario_programa_publico": [
                            {
                                "nombre_programa": "Prospera",
                                "institucion_otorga_apoyo": "XE-IPN Canal 11",
                                "tipo_apoyo": "Servicio",
                                "valor_apoyo": 4000
                            }
                        ],
                        "observaciones": "Esto es una observación"
                    }
                ]
            }
        }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    search = () => {
        alert("Buscando...");
        this.setState({
            bandera : this.state.bandera===1?2:1,
            rol: '',
            nombre: '',
            apellidoUno: '',
            apellidoDos: '',
        })
    };

    clean=()=>{
      this.setState({
          rol: '',
          nombre: '',
          apellidoUno: '',
          apellidoDos: '',
          bandera : 0
      })  ;
    };
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                <div className={classes.bgImg}>
                    <div className={classes.container}>
                        <Grid container spacing={24}>
                            <Grid item xs={12} align="center">
                                <Typography className={classes.pdn} variant="display2" style={{color: '#fff'}}>
                                    Sistema de declaración patrimonial y de intereses
                                </Typography>
                                <pre>
                                <Typography variant="subheading" style={{color: '#fff', paddingTop: '10px'}}>
                                    {'*Inicial \n' +
                                    '* Conclusión, ó \n' +
                                    '* Modificación patrimonial'
                                    }
                                </Typography>
                                </pre>
                                <br/>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.bgPanelLight}>
                    <div className={classes.root}>
                        <Grid container justify={'center'} spacing={0}>
                            <Grid item xs={12} className={classes.section}>
                                <Grid container spacing={16}>
                                    <Grid item xs={12}>
                                        <Typography variant={'title'} className={classes.title}> Consulta</Typography>
                                    </Grid>

                                    <Grid item xs={1}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="rol">Rol</InputLabel>
                                            <Select
                                                value={this.state.rol}
                                                onChange={this.handleChange('rol')}
                                                inputProps={{
                                                    name: 'rol',
                                                    id: 'rol',
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Ninguno</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Rol 1</MenuItem>
                                                <MenuItem value={20}>Rol 2</MenuItem>
                                                <MenuItem value={30}>Rol 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="standard-name"
                                            label="Nombre(s)"
                                            className={classes.textField}
                                            value={this.state.nombre}
                                            onChange={this.handleChange('nombre')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="standard-name"
                                            label="Apellido uno"
                                            className={classes.textField}
                                            value={this.state.apellidoUno}
                                            onChange={this.handleChange('apellidoUno')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="standard-name"
                                            label="Apellido dos"
                                            className={classes.textField}
                                            value={this.state.apellidoDos}
                                            onChange={this.handleChange('apellidoDos')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Tooltip title={'Buscar'}>
                                            <IconButton color="primary" className={classes.button}
                                                        aria-label="Add to shopping cart" onClick={this.search}>
                                                <SearchIcon/>
                                            </IconButton>
                                        </Tooltip>

                                    </Grid>
                                    <Grid item xs={1}>
                                        <Tooltip title={'Limpiar'}>
                                            <IconButton color="primary" className={classes.button}
                                                        aria-label="Add to shopping cart" onClick={this.clean}>
                                                <ClearIcon/>
                                            </IconButton>
                                        </Tooltip>

                                    </Grid>
                                    <Grid item xs={12}>
                                        {this.state.bandera!==0 && <Typography variant={'title'} className={classes.title}> Resultado</Typography>
                                        }

                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            this.state.bandera===1 && <Mensaje mensaje={'El usuario no cuenta con los permisos suficientes'}/>
                                        }
                                        {
                                            this.state.bandera===2 && <Registro declaracion={this.state.declaracion}/>
                                        }

                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>

                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

}

DemoDeclaraciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DemoDeclaraciones);